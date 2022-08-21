from model import Model

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from argparse import ArgumentParser
from logger import get_logger

import json


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

@app.post("/translate")
def translate(inputs: ItemForTranslation):
    data = {
        "user_input": inputs.user_input,
        "output": "",
        "error": None
    }
    logger.info(f"User Inputs : {data['user_input']}")

    try:
        data["output"] = model.correct_spelling(data['user_input'])
        logger.info(f"Translated Outputs : {data['output']}")
    except Exception as e:
        data["error"] = str(e)
        logger.info(f"Error by : {data['output']}")

    return data

if __name__ == "__main__":    
    parser = ArgumentParser()
    parser.add_argument("--config", type=str, default='asset/config.json')
    parsed = parser.parse_args()

    config_path = parsed.config

    config=json.load(open(config_path, encoding="UTF-8"))
    logger = get_logger(__name__, config["log_dir"])

    model = Model()

    uvicorn.run(app, port=config["deploy_port"])
