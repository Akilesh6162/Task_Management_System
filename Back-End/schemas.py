from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    description: str = ""


class TaskUpdate(BaseModel):
    title: str
    description: str
    completed: bool


class TaskResponse(TaskCreate):
    id: int
    completed: bool

    model_config = ConfigDict(from_attributes=True)