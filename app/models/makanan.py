from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Makanan(Base):
    __tablename__ = "makanan"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama = Column(String, nullable=False)
    kalori = Column(Float, nullable=False)
    protein = Column(Float, nullable=False)
    kategori = Column(String, nullable=False)
    cluster = Column(Integer, nullable=False)
