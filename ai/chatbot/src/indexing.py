# seperate into small chunks and put in index same in in memory vector db

from langchain_core.vectorstores import InMemoryVectorStore
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from ai.chatbot.src.fileReader import read_mutiple_pdf

embeddings = OllamaEmbeddings(model="nomic-embed-text")
vector_storage = InMemoryVectorStore(embedding=embeddings)

# get the doc,convert into chunks and indexing
docs_path = []
docs = read_mutiple_pdf(docs_path)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chuk_overlay=50)
all_splits = text_splitter.split_documents(docs)

# store in in e=memory vector db
vector_storage.add_documents(documents=all_splits)
