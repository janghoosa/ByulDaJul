from asyncio.windows_events import NULL
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class ItemForTranslation(BaseModel):
    user_input: str = ""

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/translate", tags=["translate"])
def translate(ItemForTranslation):
    data = {
        "user_input": ItemForTranslation.user_input,
        "output": "",
        "error": None
    }

    try:
        data["output"] = "Hello, World!"
    except Exception as e:
        data["error"] = str(e)

    return data