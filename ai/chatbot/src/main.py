"""Streamlit PDF question-answering app using a simple Ollama RAG pipeline."""

from __future__ import annotations

import hashlib
import io
import os

import streamlit as st
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

from prompts import RAG_WORKFLOW_INSTRUCTIONS

load_dotenv()


def apply_dashboard_theme() -> None:
    """Apply the dark emerald dashboard styling used by the project thumbnail."""
    st.markdown(
        """
        <style>
        :root {
            --emerald: #18b66a;
            --emerald-bright: #4ade80;
            --emerald-dark: #087443;
            --surface: #111716;
            --surface-raised: #17201e;
            --border: #2a3834;
            --muted: #9aaba5;
        }

        .stApp {
            color: #f4f7f5;
            background:
                radial-gradient(circle at 85% 0%, rgba(18, 143, 83, 0.20), transparent 32rem),
                radial-gradient(circle at 10% 100%, rgba(5, 95, 54, 0.16), transparent 28rem),
                #090d0c;
        }

        [data-testid="stHeader"] {
            background: transparent;
        }

        [data-testid="stSidebar"] {
            background: linear-gradient(180deg, #101715 0%, #0b100f 100%);
            border-right: 1px solid var(--border);
        }

        [data-testid="stSidebar"] [data-testid="stMarkdownContainer"] p,
        [data-testid="stSidebar"] label {
            color: #c9d4d0;
        }

        .block-container {
            max-width: 1180px;
            padding-top: 2.2rem;
            padding-bottom: 4rem;
        }

        .rag-hero {
            position: relative;
            overflow: hidden;
            margin-bottom: 1.5rem;
            padding: 1.7rem 2rem;
            border: 1px solid #254237;
            border-radius: 18px;
            background: linear-gradient(115deg, rgba(21, 44, 36, .96), rgba(14, 21, 19, .96));
            box-shadow: 0 18px 50px rgba(0, 0, 0, .28);
        }

        .rag-hero::after {
            content: "";
            position: absolute;
            width: 280px;
            height: 280px;
            right: -80px;
            top: -150px;
            border-radius: 50%;
            background: rgba(24, 182, 106, .18);
            filter: blur(20px);
        }

        .rag-eyebrow {
            margin-bottom: .45rem;
            color: var(--emerald-bright);
            font-size: .76rem;
            font-weight: 800;
            letter-spacing: .16em;
            text-transform: uppercase;
        }

        .rag-title {
            margin: 0;
            color: #ffffff;
            font-size: clamp(2rem, 4vw, 3.25rem);
            font-weight: 850;
            letter-spacing: -.045em;
            line-height: 1;
        }

        .rag-title span { color: var(--emerald-bright); }

        .rag-subtitle {
            max-width: 690px;
            margin: .85rem 0 0;
            color: var(--muted);
            font-size: 1rem;
        }

        [data-testid="stFileUploaderDropzone"],
        [data-testid="stChatMessage"],
        div[data-testid="stAlert"] {
            border: 1px solid var(--border);
            border-radius: 14px;
            background: rgba(20, 29, 27, .90);
        }

        [data-testid="stChatMessage"] {
            margin-bottom: .7rem;
            padding: .35rem .45rem;
        }

        [data-testid="stChatMessage"]:has([data-testid="chatAvatarIcon-assistant"]) {
            border-left: 3px solid var(--emerald);
        }

        .stButton > button[kind="primary"] {
            border: 1px solid #31ce80;
            background: linear-gradient(135deg, #15975a, #087443);
            color: white;
            font-weight: 750;
            box-shadow: 0 8px 24px rgba(18, 166, 93, .22);
        }

        .stButton > button[kind="primary"]:hover {
            border-color: #65e59d;
            background: linear-gradient(135deg, #1db86c, #09864d);
        }

        .stButton > button[kind="secondary"] {
            border-color: var(--border);
            background: var(--surface-raised);
            color: #dbe5e1;
        }

        [data-testid="stChatInput"] {
            border: 1px solid #315144;
            border-radius: 14px;
            background: #121a18;
            box-shadow: 0 10px 35px rgba(0, 0, 0, .25);
        }

        [data-testid="stChatInput"]:focus-within {
            border-color: var(--emerald);
            box-shadow: 0 0 0 2px rgba(24, 182, 106, .14);
        }

        [data-testid="stFileUploaderDropzone"] button {
            border-color: #277e55;
            background: #163326;
            color: #dff8e9;
        }

        h1, h2, h3 { letter-spacing: -.025em; }
        a { color: var(--emerald-bright) !important; }
        </style>
        """,
        unsafe_allow_html=True,
    )


def uploaded_file_to_document(uploaded_file) -> Document:
    """Extract text from an uploaded PDF, TXT, or Markdown file."""
    raw_data = uploaded_file.getvalue()
    suffix = uploaded_file.name.rsplit(".", 1)[-1].lower()

    if suffix == "pdf":
        reader = PdfReader(io.BytesIO(raw_data))
        text = "\\n".join(page.extract_text() or "" for page in reader.pages)
    else:
        text = raw_data.decode("utf-8", errors="replace")

    if not text.strip():
        raise ValueError(
            f"No readable text was found in {uploaded_file.name}. "
            "If this is a scanned PDF, it needs OCR first."
        )

    return Document(
        page_content=text,
        metadata={"source": uploaded_file.name},
    )


def file_set_id(uploaded_files) -> str:
    """Create an ID from uploaded file names and contents."""
    digest = hashlib.sha256()
    for uploaded_file in uploaded_files:
        digest.update(uploaded_file.name.encode("utf-8"))
        digest.update(uploaded_file.getvalue())
    return digest.hexdigest()


def build_rag_pipeline(documents: list[Document]):
    """Split documents, embed chunks, and create the Ollama chat model."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
    )
    chunks = splitter.split_documents(documents)

    if not chunks:
        raise ValueError("No text chunks were created from the uploaded documents.")

    embeddings = OllamaEmbeddings(
        model=os.getenv("OLLAMA_EMBEDDING_MODEL", "nomic-embed-text")
    )
    vector_store = InMemoryVectorStore(embedding=embeddings)
    vector_store.add_documents(chunks)

    llm = ChatOllama(
        model=os.getenv("OLLAMA_CHAT_MODEL", "llama3.2:3b"),
        temperature=0,
    )

    return vector_store, llm, len(chunks)


def answer_question(question: str, vector_store, llm) -> str:
    """Retrieve relevant PDF chunks and answer using only their contents."""
    retrieved_docs = vector_store.similarity_search(question, k=4)

    if not retrieved_docs:
        return "I couldn't find relevant information in the uploaded documents."

    context_parts = []
    sources = []
    for index, doc in enumerate(retrieved_docs, start=1):
        source = doc.metadata.get("source", "Uploaded document")
        context_parts.append(
            f"[Document {index}: {source}]\\n{doc.page_content}"
        )
        if source not in sources:
            sources.append(source)

    context = "\\n\\n---\\n\\n".join(context_parts)

    messages = [
        SystemMessage(
            content=(
                "You are a PDF question-answering assistant. "
                "Answer the user's question using only the provided document context. "
                "Do not answer with general knowledge or explain unrelated topics. "
                "If the answer is not present in the context, clearly say: "
                "'I couldn't find this information in the uploaded PDF(s).' "
                "Do not invent facts. Give a clear, direct answer and preserve "
                "important details from the documents."
            )
        ),
        HumanMessage(
            content=(
                f"Question:\\n{question}\\n\\n"
                f"Retrieved document context:\\n{context}"
            )
        ),
    ]

    response = llm.invoke(messages)
    answer = response.content

    if isinstance(answer, list):
        answer = "\\n".join(
            item.get("text", str(item)) if isinstance(item, dict) else str(item)
            for item in answer
        )

    answer = str(answer).strip()
    source_text = ", ".join(sources)
    return f"{answer}\\n\\n**Sources:** {source_text}"


def main() -> None:
    st.set_page_config(page_title="PDF Q&A", page_icon="📚", layout="wide")
    apply_dashboard_theme()

    st.markdown(
        """
        <section class="rag-hero">
            <div class="rag-eyebrow">LangChain · Retrieval augmented generation</div>
            <h1 class="rag-title">Chat with your <span>PDFs</span></h1>
            <p class="rag-subtitle">
                Upload your documents, retrieve relevant passages, and get answers
                grounded in the content of your files.
            </p>
        </section>
        """,
        unsafe_allow_html=True,
    )

    if "messages" not in st.session_state:
        st.session_state.messages = []

    with st.sidebar:
        st.markdown("### ◈ Knowledge base")
        uploaded_files = st.file_uploader(
            "Upload PDF, TXT, or Markdown files",
            type=["pdf", "txt", "md"],
            accept_multiple_files=True,
        )

        process_clicked = st.button(
            "Process documents",
            type="primary",
            disabled=not uploaded_files,
            use_container_width=True,
        )

        if process_clicked:
            try:
                current_id = file_set_id(uploaded_files)
                with st.spinner("Reading, splitting, and embedding documents..."):
                    documents = [
                        uploaded_file_to_document(file)
                        for file in uploaded_files
                    ]
                    vector_store, llm, chunk_count = build_rag_pipeline(documents)

                st.session_state.vector_store = vector_store
                st.session_state.llm = llm
                st.session_state.file_set_id = current_id
                st.session_state.messages = []
                st.success(
                    f"Processed {len(documents)} document(s) into {chunk_count} chunks."
                )
            except Exception as exc:
                st.error(f"Could not process the documents: {exc}")

        if uploaded_files and "file_set_id" in st.session_state:
            if file_set_id(uploaded_files) != st.session_state.file_set_id:
                st.warning("Your files changed. Process them again before asking questions.")

        if st.button("Clear conversation", use_container_width=True):
            st.session_state.messages = []
            st.rerun()

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    ready = "vector_store" in st.session_state and "llm" in st.session_state
    question = st.chat_input(
        "Ask a question about your uploaded PDFs",
        disabled=not ready,
    )

    if question:
        st.session_state.messages.append({"role": "user", "content": question})
        with st.chat_message("user"):
            st.markdown(question)

        with st.chat_message("assistant"):
            with st.spinner("Searching your documents..."):
                try:
                    answer = answer_question(
                        question,
                        st.session_state.vector_store,
                        st.session_state.llm,
                    )
                except Exception as exc:
                    answer = f"I couldn't answer that question: {exc}"
            st.markdown(answer)

        st.session_state.messages.append(
            {"role": "assistant", "content": answer}
        )

    if not ready:
        st.info("Upload and process at least one document to start chatting.")


if __name__ == "__main__":
    main()
