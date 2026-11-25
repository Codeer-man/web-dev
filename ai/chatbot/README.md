# PDF Q&A with LangChain and Ollama

A Streamlit application that reads uploaded PDF, TXT, and Markdown files, splits their text into chunks, embeds the chunks with Ollama, retrieves the four most relevant chunks for each question, and generates an answer grounded in that retrieved context.

## Requirements

- Python 3.12+
- Ollama installed and running
- A chat model and an embedding model pulled in Ollama

```bash
ollama pull llama3.2:3b
ollama pull nomic-embed-text
```

## Install and run

```bash
uv sync
uv run streamlit run src/main.py
```

Or install the dependencies with pip and run:

```bash
pip install -e .
streamlit run src/main.py
```

## Optional model configuration

Create a `.env` file in the project root:

```env
OLLAMA_CHAT_MODEL=llama3.2:3b
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

The app uses an in-memory vector store. Uploaded documents are re-indexed when you click **Process documents**; the index is not persisted after the app process stops.

Scanned/image-only PDFs need OCR because `pypdf` extracts embedded text but does not perform OCR.
