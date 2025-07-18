# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

# Получаем ключ из переменных окружения
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Настройки CORS — чтобы фронт мог общаться с бэком
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # На проде заменить на домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модель запроса от клиента
class ChatRequest(BaseModel):
    inputCode: str
    model: str
    apiKey: str  # пока не используем, но вдруг пригодится

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model=req.model,
            messages=[
                {"role": "system", "content": "Ты полезный GPT‑ассистент от Luquk."},
                {"role": "user", "content": req.inputCode},
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return {"output": response["choices"][0]["message"]["content"]}
    except Exception as e:
        return {"error": str(e)}