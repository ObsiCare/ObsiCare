from sqlalchemy import Column, Integer, ForeignKey, Float, Date
from sqlalchemy.orm import relationship
from app.database import Base

class RiwayatMakanan(Base):
    __tablename__ = "riwayat_makanan"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    makanan_id = Column(Integer, ForeignKey("makanan.id"))
    kalori = Column(Float)
    tanggal = Column(Date)

    user = relationship("User")
    makanan = relationship("Makanan")
