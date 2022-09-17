from fastapi import FastAPI
from model.data import DB, Comment
from pydantic import BaseModel

class CommentModel(BaseModel):
    id: int
    username: str
    text: str
    datapoint: int

app = FastAPI()
db = DB()

@app.get("/data/")
async def data():
    return { "datapoints": db.get_data() }

@app.get("/comments/")
async def get_comments():
    return { "comments": db.get_comments() }

@app.post("/comments/add/")
async def add_comment(c: CommentModel):
    new_comment = Comment(c.id, c.username, c.text, c.datapoint)
    db.add_comment(new_comment)
    return { "comment": new_comment }
