from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# pyrefly: ignore [missing-import]
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
            "Keep your responses very concise, direct, and easy to read. "
            "Limit your answer to 3-4 key points. "
            "Use clear, numbered lists or bullet points. Avoid long paragraphs. "
            "Format important names or headers in bold using double asterisks (e.g. **Header**: text). "
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

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Serve static files in production if dist folder exists
dist_path = os.path.join(os.path.dirname(__file__), "../dist")
if os.path.exists(dist_path):
    assets_path = os.path.join(dist_path, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")
        
    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(dist_path, "index.html"))
        
    @app.get("/{path_name:path}")
    async def serve_static_or_index(path_name: str):
        file_path = os.path.join(dist_path, path_name)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
