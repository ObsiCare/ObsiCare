from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    usia = Column(Integer, nullable=True)
    berat_badan = Column(Float, nullable=True)
    tinggi_badan = Column(Float, nullable=True)
    jenis_kelamin = Column(String, nullable=True)
    aktivitas_fisik = Column(String, nullable=True)
    kalori = Column(Float, nullable=True)
    bmr = Column(Float, nullable=True)           
    bmi = Column(Float, nullable=True)           
    klasifikasi = Column(String, nullable=True)  
