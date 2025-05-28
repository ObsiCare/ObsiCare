from pydantic import BaseModel

class CatatMakananRequest(BaseModel):
    makanan_id: int
