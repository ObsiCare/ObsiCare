import pandas as pd
from user import hitung_kebutuhan_kalori

# Ambil data user
user_data = hitung_kebutuhan_kalori()

# Tampilkan hasil awal
print("\n===== HASIL PERHITUNGAN USER =====")
for key, value in user_data.items():
    if isinstance(value, float):
        print(f"{key.replace('_', ' ').capitalize()}: {value:.2f}")
    else:
        print(f"{key.replace('_', ' ').capitalize()}: {value}")

# Cek apakah perlu lanjut
kalori_tersisa = user_data['kalori_harian']
if kalori_tersisa is None:
    print("\n❗ Disarankan konsultasi ke tenaga ahli.")
    exit()

# Load data makanan yang sudah ada clusternya
df = pd.read_csv("makanan_cluster_kmeans.csv")

# Normalisasi nama makanan
df['name'] = df['name'].str.strip()
df['name_lower'] = df['name'].str.lower()

# Fungsi menentukan klaster rekomendasi berdasarkan kalori tersisa
def klaster_sesuai(sisa_kalori):
    if sisa_kalori > 1000:
        return [2]  
    elif 300 <= sisa_kalori <= 1000:
        return [0]
    else:
        return [1]  

# Fungsi filter berdasarkan cluster
def filter_rekomendasi(df, sisa_kalori):
    klaster_target = klaster_sesuai(sisa_kalori)
    return df[df['cluster'].isin(klaster_target)]

# Cek apakah user sudah makan
sudah_makan = input("\nApakah Anda sudah makan? (ya/tidak): ").lower()

# Input makanan yang dikonsumsi jika sudah makan
makanan_dikonsumsi = []

if sudah_makan == 'ya':
    print("\nMasukkan makanan yang telah dikonsumsi. Ketik 'selesai' jika sudah.")
    while True:
        makanan = input("Makanan: ").strip()
        if makanan.lower() == 'selesai':
            break
        match = df[df['name_lower'] == makanan.lower()]
        if not match.empty:
            kalori = match.iloc[0]['calories']
            makanan_dikonsumsi.append((match.iloc[0]['name'], kalori))
        else:
            print("❌ Makanan tidak ditemukan.")

    total_konsumsi = sum(k[1] for k in makanan_dikonsumsi)
    kalori_tersisa -= total_konsumsi

    print("\n📊 Rincian Makanan yang Dikonsumsi:")
    for m, k in makanan_dikonsumsi:
        print(f"- {m}: {k} kcal")

    print(f"\nTotal kalori dikonsumsi: {total_konsumsi} kcal")
    print(f"Sisa kalori harian: {kalori_tersisa:.2f} kcal\n")

elif sudah_makan == 'tidak':
    print("\nAnda belum makan. Menampilkan semua makanan sebagai rekomendasi awal.\n")
else:
    print("Jawaban tidak dikenali. Keluar dari program.")
    exit()

# Rekomendasi makanan berdasarkan cluster
while kalori_tersisa > 0:
    print("\n🍽️ === Rekomendasi Makanan ===")
    rekomendasi = filter_rekomendasi(df, kalori_tersisa)
    if rekomendasi.empty:
        print("Tidak ada makanan yang sesuai dengan kebutuhan saat ini.")
        break
    print(rekomendasi[['name', 'calories', 'proteins', 'cluster']].to_string(index=False))

    lagi = input("\nMau input makanan yang dikonsumsi lagi? (ya/tidak): ").lower()
    if lagi != 'ya':
        break

    makanan = input("Masukkan makanan: ").strip()
    match = df[df['name_lower'] == makanan.lower()]
    if not match.empty:
        kalori = match.iloc[0]['calories']
        kalori_tersisa -= kalori
        print(f"Kalori dari {match.iloc[0]['name']}: {kalori} kcal")
        print(f"Sisa kalori harian: {kalori_tersisa:.2f} kcal")
    else:
        print("❌ Makanan tidak ditemukan.")

if kalori_tersisa <= 0:
    print("\n✅ Kalori harian sudah tercukupi. Jaga asupan cairan agar tidak dehidrasi. 💧")
