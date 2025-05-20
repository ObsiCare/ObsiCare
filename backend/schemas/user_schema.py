from pydantic import BaseModel, EmailStr
from typing import Literal

class UserRegister(BaseModel):
    nama: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    usia: int
    berat_badan: float
    tinggi_badan: float
    jenis_kelamin: Literal["laki-laki", "perempuan"]
    aktivitas_fisik: Literal["sedentari","ringan", "sedang", "berat"]

class UserResponse(BaseModel):
    id: int
    nama: str  # Sesuaikan dengan nama kolom di database
    email: str  # Sesuaikan dengan kolom yang ada
    kalori: float
    bmr: float
    bmi: float
    klasifikasi: str

    class Config:
        orm_mode = True

class UserResponseUsername(BaseModel):
    nama: str

    class Config: 
        orm_mode = True

class UpdateBBTB(BaseModel):
    berat_badan: float
    tinggi_badan: float