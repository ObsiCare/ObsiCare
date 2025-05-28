from pydantic import BaseModel

class MakananCreate(BaseModel):
    nama: str
    kalori: float
    protein: float

class MakananResponse(BaseModel):
    id: int
    nama: str
    kalori: float
    protein: float
    kategori: str
    cluster: int

    class Config:
        orm_mode = True