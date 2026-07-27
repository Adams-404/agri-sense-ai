from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AgriSense AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY environment variable is not set")

client = Groq(api_key=api_key)

class ChatRequest(BaseModel):
    message: str
    language: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        lang_names = {
            'en': 'English',
            'ha': 'Hausa',
            'ful': 'Fulfulde',
            'yo': 'Yoruba',
            'ig': 'Igbo',
            'kr': 'Kanuri'
        }
        target_lang = lang_names.get(request.language, 'English')
        
        system_prompt = (
            "You are AgriSense AI, a helpful, knowledgeable, and empathetic AI farming assistant "
            "dedicated to helping Nigerian farmers. Provide practical, accurate, and actionable "
            "advice on crops, soil, pests, weather, and farming techniques. "
            f"Crucially, you MUST respond entirely in the {target_lang} language."
        )
        
        completion = client.chat.completions.create(
            model=os.environ.get("GROQ_MODEL", "llama-3.1-8b-instant"),
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=1024,
        )
        
        response_text = completion.choices[0].message.content
        return {"reply": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
