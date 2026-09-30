import { buildIndex, search } from "./searchEngine";
import { megaResponses } from "./megaResponses";

interface StaticEntry {
  keywords: string[];
  answer: string;
}

const staticDB: StaticEntry[] = [
  ...megaResponses,
  {
    keywords: ["apa itu investasi", "pengertian investasi", "investasi adalah", "investasi"],
    answer:
      "Investasi adalah penanaman modal atau dana pada suatu aset dengan harapan mendapatkan keuntungan di masa depan. Contoh investasi yang umum di Indonesia adalah saham, reksa dana, obligasi (SBN), emas, dan properti.",
  },
  {
    keywords: ["apa itu ekonomi", "ekonomi adalah", "pengertian ekonomi", "definisi ekonomi", "apa ekonomi"],
    answer:
      "Ekonomi adalah ilmu yang mempelajari bagaimana manusia membuat keputusan dalam mengalokasikan sumber daya yang terbatas untuk memenuhi kebutuhan yang tidak terbatas. Ekonomi dibagi dua: mikroekonomi (perilaku individu/perusahaan) dan makroekonomi (perilaku ekonomi secara keseluruhan).",
  },
  {
    keywords: ["ilmu ekonomi", "cabang ekonomi", "ekonomi mikro", "ekonomi makro"],
    answer:
      "Ilmu ekonomi terbagi menjadi mikroekonomi (mempelajari perilaku konsumen, produsen, dan pasar individu) dan makroekonomi (mempelajari perekonomian secara agregat: PDB, inflasi, pengangguran, kebijakan fiskal dan moneter).",
  },
  {
    keywords: ["inflasi", "inflation"],
    answer:
      "Inflasi adalah kenaikan harga barang dan jasa secara umum dalam jangka waktu tertentu. Di Indonesia, inflasi diukur oleh BPS menggunakan Indeks Harga Konsumen (IHK). Target inflasi BI biasanya 2,5% ± 1%.",
  },
  {
    keywords: ["bi rate", "suku bunga", "bank indonesia", "bunga acuan"],
    answer:
      "BI Rate (BI 7-Day Reverse Repo Rate) adalah suku bunga acuan Bank Indonesia yang digunakan untuk mengendalikan inflasi dan stabilitas nilai tukar rupiah.",
  },
  {
    keywords: ["gdp", "pdb", "produk domestik bruto"],
    answer:
      "PDB (Produk Domestik Bruto) adalah total nilai barang dan jasa yang diproduksi dalam suatu negara dalam periode tertentu. PDB Indonesia termasuk terbesar di Asia Tenggara.",
  },
  {
    keywords: ["rupiah", "kurs", "nilai tukar", "usd", "dollar"],
    answer:
      "Nilai tukar rupiah terhadap dolar AS dipengaruhi oleh neraca perdagangan, aliran modal asing, inflasi, dan kebijakan Bank Indonesia. Anda bisa cek kurs terkini di website BI (bi.go.id).",
  },
  {
    keywords: ["saham", "bursa efek", "idx", "bei", "investasi saham"],
    answer:
      "Saham adalah bukti kepemilikan suatu perusahaan. Di Indonesia, perdagangan saham dilakukan di Bursa Efek Indonesia (BEI/IDX). Investor bisa membeli saham melalui broker atau aplikasi investasi seperti Ajaib, Stockbit, atau IPOT.",
  },
  {
    keywords: ["reksa dana", "reksadana"],
    answer:
      "Reksa dana adalah wadah investasi kolektif yang dikelola oleh Manajer Investasi. Cocok untuk pemula karena diversifikasi otomatis. Jenisnya antara lain: pasar uang, pendapatan tetap, campuran, dan saham.",
  },
  {
    keywords: ["obligasi", "sbn", "sukuk", "surat utang"],
    answer:
      "Obligasi adalah surat utang yang diterbitkan perusahaan atau pemerintah. SBN (Surat Berharga Negara) seperti ORI dan Sukuk Ritel diterbitkan pemerintah Indonesia dan bisa dibeli oleh masyarakat umum.",
  },
  {
    keywords: ["umkm", "usaha kecil", "modal usaha", "kur"],
    answer:
      "UMKM bisa mengakses KUR (Kredit Usaha Rakyat) dari bank dengan bunga rendah (3-6% per tahun) yang dijamin pemerintah. Program ini tersedia di BRI, BNI, Mandiri, dan bank lainnya.",
  },
  {
    keywords: ["pajak", "npwp", "spt", "pph", "ppn"],
    answer:
      "NPWP wajib dimiliki setiap wajib pajak. SPT Tahunan dilaporkan setiap tahun (paling lambat 31 Maret untuk orang pribadi). Informasi lengkap di website DJP (pajak.go.id).",
  },
  {
    keywords: ["ojk", "otoritas jasa keuangan"],
    answer:
      "OJK (Otoritas Jasa Keuangan) adalah lembaga yang mengatur dan mengawasi sektor keuangan di Indonesia, termasuk perbankan, pasar modal, dan asuransi. Website: ojk.go.id.",
  },
  {
    keywords: ["kripto", "bitcoin", "crypto", "aset digital"],
    answer:
      "Aset kripto di Indonesia diawasi oleh Bappebti (bukan OJK) dan termasuk kategori komoditas, bukan mata uang. Investasi kripto berisiko tinggi karena volatilitas harga yang ekstrem.",
  },
  {
    keywords: ["deposito", "tabungan"],
    answer:
      "Deposito adalah simpanan berjangka dengan bunga lebih tinggi dari tabungan biasa. Jangka waktu mulai 1, 3, 6, hingga 12 bulan. Dijamin oleh LPS hingga Rp 2 miliar per nasabah per bank.",
  },
  {
    keywords: ["lps", "lembaga penjamin simpanan"],
    answer:
      "LPS menjamin simpanan nasabah bank hingga Rp 2 miliar dengan bunga tidak melebihi bunga penjaminan LPS. Pastikan bank Anda adalah anggota LPS.",
  },
  {
    keywords: ["ekspor", "impor", "neraca perdagangan"],
    answer:
      "Neraca perdagangan Indonesia mencatat selisih nilai ekspor dan impor. Surplus berarti ekspor lebih besar dari impor, menguntungkan perekonomian dan nilai rupiah.",
  },
  {
    keywords: ["halo", "hai", "hi", "hello", "selamat pagi", "selamat siang", "selamat malam", "apa kabar"],
    answer:
      "Halo! Saya Seraya, asisten AI untuk topik ekonomi dan bisnis Indonesia. Ada yang bisa saya bantu hari ini? 😊",
  },
  {
    keywords: ["kamu siapa", "siapa kamu", "siapa seraya", "apa itu seraya"],
    answer:
      "Saya Seraya, asisten AI yang fokus pada topik ekonomi dan keuangan Indonesia. Tanyakan apapun seputar investasi, perbankan, bisnis, atau kebijakan ekonomi!",
  },
  {
    keywords: ["terima kasih", "makasih", "thanks", "thank you"],
    answer:
      "Sama-sama! Jangan ragu untuk bertanya lagi jika ada pertanyaan seputar ekonomi dan bisnis Indonesia. 😊",
  },
  // === PERBANKAN ===
  {
    keywords: ["atm", "transfer", "kirim uang", "biaya transfer"],
    answer:
      "Transfer antar bank di Indonesia bisa melalui ATM, mobile banking, atau BI-FAST (biaya Rp 2.500). BI-FAST tersedia 24/7 dan lebih murah dari SKN atau RTGS.",
  },
  {
    keywords: ["pinjaman", "kredit", "cicilan", "hutang"],
    answer:
      "Sebelum mengambil pinjaman, pastikan total cicilan tidak melebihi 30% dari penghasilan bulanan. Bandingkan bunga dari beberapa bank dan baca syarat & ketentuan dengan teliti.",
  },
  {
    keywords: ["kartu kredit", "credit card"],
    answer:
      "Kartu kredit berguna jika dilunasi penuh setiap bulan. Bunga kartu kredit di Indonesia bisa mencapai 1,75-2% per bulan (21% per tahun). Hindari hanya membayar minimum payment.",
  },
  {
    keywords: ["bank digital", "neobank", "jenius", "blu", "jago"],
    answer:
      "Bank digital seperti Jenius, Bank Jago, dan BLU menawarkan bunga tabungan lebih tinggi dan biaya transfer gratis. Tetap dijamin LPS asalkan bunganya tidak melebihi bunga penjaminan.",
  },
  // === INVESTASI ===
  {
    keywords: ["diversifikasi", "portofolio", "alokasi aset"],
    answer:
      "Diversifikasi berarti menyebar investasi ke berbagai aset (saham, obligasi, emas, deposito) agar risiko tidak terkonsentrasi. Prinsipnya: jangan taruh semua telur dalam satu keranjang.",
  },
  {
    keywords: ["emas", "logam mulia", "antam", "gold"],
    answer:
      "Emas cocok sebagai lindung nilai (hedge) terhadap inflasi. Di Indonesia, bisa beli emas Antam fisik, Tabungan Emas Pegadaian, atau emas digital di aplikasi seperti Tokopedia/Shopee.",
  },
  {
    keywords: ["dca", "dollar cost averaging", "nabung rutin", "investasi rutin"],
    answer:
      "DCA (Dollar Cost Averaging) adalah strategi investasi rutin dengan jumlah tetap setiap bulan, terlepas dari kondisi pasar. Strategi ini mengurangi risiko beli di harga puncak.",
  },
  {
    keywords: ["p2p lending", "peer to peer", "pinjol legal"],
    answer:
      "P2P Lending adalah platform pinjaman online yang mempertemukan peminjam dan pemberi pinjaman. Cek apakah platform terdaftar/berizin OJK di sikapiuangmu.ojk.go.id sebelum berinvestasi.",
  },
  {
    keywords: ["return", "imbal hasil", "keuntungan investasi", "roi"],
    answer:
      "ROI (Return on Investment) mengukur keuntungan relatif terhadap modal. Rumusnya: (Keuntungan - Modal) / Modal × 100%. Selalu bandingkan ROI dengan inflasi untuk melihat return riil.",
  },
  {
    keywords: ["risiko", "risk", "toleransi risiko"],
    answer:
      "Profil risiko investor dibagi tiga: konservatif (pilih deposito/obligasi), moderat (campuran), dan agresif (saham/kripto). Sesuaikan pilihan investasi dengan toleransi risiko dan jangka waktu Anda.",
  },
  // === BISNIS ===
  {
    keywords: ["pt", "perseroan terbatas", "cv", "badan usaha", "mendirikan usaha"],
    answer:
      "PT (Perseroan Terbatas) cocok untuk bisnis skala besar dengan modal dari beberapa pemegang saham. CV lebih sederhana untuk usaha kecil-menengah. Pendaftaran bisa dilakukan via OSS (oss.go.id).",
  },
  {
    keywords: ["oss", "perizinan usaha", "nib", "izin usaha"],
    answer:
      "NIB (Nomor Induk Berusaha) adalah identitas tunggal pelaku usaha di Indonesia, diperoleh melalui sistem OSS di oss.go.id. NIB menggantikan berbagai izin usaha sebelumnya.",
  },
  {
    keywords: ["franchise", "waralaba", "bisnis waralaba"],
    answer:
      "Franchise/waralaba adalah model bisnis di mana pembeli (franchisee) mendapat hak menggunakan merek dan sistem dari pemilik (franchisor). Di Indonesia diatur oleh PP No. 42 Tahun 2007.",
  },
  {
    keywords: ["break even", "bep", "titik impas", "balik modal"],
    answer:
      "BEP (Break Even Point) adalah titik di mana total pendapatan = total biaya, artinya tidak rugi tidak untung. Rumus BEP = Biaya Tetap / (Harga Jual - Biaya Variabel per Unit).",
  },
  {
    keywords: ["cash flow", "arus kas", "laporan keuangan"],
    answer:
      "Cash flow adalah aliran uang masuk dan keluar bisnis. Cash flow positif berarti bisnis sehat. Laporan keuangan utama: neraca, laporan laba rugi, dan laporan arus kas.",
  },
  {
    keywords: ["modal ventura", "venture capital", "startup", "pendanaan"],
    answer:
      "Startup di Indonesia bisa mencari pendanaan dari angel investor, venture capital (VC), atau program akselerator. Ekosistem startup Indonesia termasuk terbesar di Asia Tenggara.",
  },
  // === KEBIJAKAN EKONOMI ===
  {
    keywords: ["apbn", "anggaran negara", "belanja negara"],
    answer:
      "APBN (Anggaran Pendapatan dan Belanja Negara) adalah rencana keuangan tahunan pemerintah Indonesia. Sumber pendapatan utama adalah pajak. APBN ditetapkan melalui UU setiap tahunnya.",
  },
  {
    keywords: ["subsidi", "bbm", "pertalite", "bahan bakar"],
    answer:
      "Subsidi BBM adalah bantuan pemerintah untuk menjaga harga bahan bakar tetap terjangkau. Di Indonesia, BBM bersubsidi meliputi Pertalite dan Solar. Besarnya subsidi tergantung harga minyak dunia.",
  },
  {
    keywords: ["bumn", "perusahaan negara", "erick thohir"],
    answer:
      "BUMN (Badan Usaha Milik Negara) adalah perusahaan yang sahamnya dimiliki pemerintah. Contoh: Pertamina, PLN, BRI, BNI, Mandiri, Telkom. Diawasi oleh Kementerian BUMN.",
  },
  {
    keywords: ["mea", "asean", "perdagangan bebas", "fta"],
    answer:
      "MEA (Masyarakat Ekonomi ASEAN) adalah integrasi ekonomi negara-negara ASEAN yang memungkinkan arus bebas barang, jasa, investasi, dan tenaga kerja terampil di kawasan.",
  },
  {
    keywords: ["ibu kota", "ikn", "nusantara", "kalimantan"],
    answer:
      "IKN (Ibu Kota Nusantara) di Kalimantan Timur adalah proyek pemindahan ibu kota Indonesia. Proyek ini diharapkan mendorong pembangunan dan pemerataan ekonomi di luar Jawa.",
  },
  // === FINTECH & DIGITAL ===
  {
    keywords: ["qris", "pembayaran digital", "dompet digital", "e-wallet"],
    answer:
      "QRIS (Quick Response Code Indonesian Standard) adalah standar kode QR nasional yang memungkinkan pembayaran dari berbagai e-wallet (GoPay, OVO, Dana, dll.) ke satu kode QR merchant.",
  },
  {
    keywords: ["gopay", "ovo", "dana", "shopeepay", "linkaja"],
    answer:
      "E-wallet di Indonesia seperti GoPay, OVO, Dana, ShopeePay, dan LinkAja adalah uang elektronik yang diawasi Bank Indonesia. Limit saldo dan transaksi diatur sesuai ketentuan BI.",
  },
  {
    keywords: ["paylater", "buy now pay later", "bnpl", "cicil"],
    answer:
      "PayLater/BNPL memungkinkan belanja sekarang, bayar nanti. Praktis, tapi waspadai bunga dan denda keterlambatan. Pastikan hanya digunakan untuk kebutuhan, bukan keinginan impulsif.",
  },
  // === PERSONAL FINANCE ===
  {
    keywords: ["dana darurat", "emergency fund", "tabungan darurat"],
    answer:
      "Dana darurat idealnya 3-6 kali pengeluaran bulanan (6-12 bulan untuk yang punya tanggungan). Simpan di instrumen likuid seperti tabungan atau reksa dana pasar uang.",
  },
  {
    keywords: ["asuransi", "insurance", "premi", "klaim"],
    answer:
      "Asuransi wajib dimiliki untuk proteksi: jiwa (untuk yang punya tanggungan), kesehatan, dan aset. Utamakan asuransi murni (term life) daripada unit link yang lebih kompleks dan mahal.",
  },
  {
    keywords: ["bpjs", "bpjs kesehatan", "bpjs ketenagakerjaan", "jamsostek"],
    answer:
      "BPJS Kesehatan menanggung biaya pengobatan di fasilitas kesehatan. BPJS Ketenagakerjaan mencakup JHT, JP, JKK, dan JKM. Keduanya wajib bagi pekerja formal di Indonesia.",
  },
  {
    keywords: ["gaji", "upah", "umr", "umk", "upah minimum"],
    answer:
      "UMR/UMP (Upah Minimum Provinsi) dan UMK (Upah Minimum Kabupaten/Kota) ditetapkan setiap tahun oleh pemerintah daerah. Pengusaha wajib membayar upah minimal sesuai ketentuan ini.",
  },
  {
    keywords: ["phk", "pemutusan hubungan kerja", "pesangon"],
    answer:
      "PHK diatur dalam UU Cipta Kerja. Pekerja yang di-PHK berhak atas uang pesangon, penghargaan masa kerja, dan penggantian hak sesuai ketentuan. Konsultasi ke Disnaker jika ada sengketa.",
  },
  {
    keywords: ["freelance", "pekerja lepas", "self employed", "wirausaha"],
    answer:
      "Freelancer/pekerja lepas wajib mendaftar NPWP dan melaporkan penghasilan. Bisa daftar BPJS secara mandiri. Pertimbangkan dana pensiun mandiri karena tidak ada iuran dari perusahaan.",
  },
  {
    keywords: ["properti", "rumah", "kpr", "apartemen", "tanah"],
    answer:
      "KPR (Kredit Pemilikan Rumah) memungkinkan beli properti dengan cicilan. Uang muka minimal 10-20%. Pertimbangkan lokasi, harga, dan kemampuan cicilan (max 30% dari penghasilan).",
  },

  // === MIKROEKONOMI ===
  {
    keywords: ["permintaan", "demand", "hukum permintaan"],
    answer:
      "Hukum permintaan menyatakan: jika harga naik, jumlah yang diminta turun (ceteris paribus). Kurva permintaan berlereng negatif. Faktor penentu selain harga: pendapatan, selera, harga barang substitusi.",
  },
  {
    keywords: ["penawaran", "supply", "hukum penawaran"],
    answer:
      "Hukum penawaran: jika harga naik, jumlah yang ditawarkan produsen meningkat. Kurva penawaran berlereng positif. Faktor penentu: biaya produksi, teknologi, harga input, jumlah produsen.",
  },
  {
    keywords: ["keseimbangan pasar", "equilibrium", "harga keseimbangan"],
    answer:
      "Keseimbangan pasar terjadi saat jumlah yang diminta = jumlah yang ditawarkan. Titik ini menentukan harga dan kuantitas keseimbangan. Jika ada surplus atau shortage, harga akan bergerak menuju keseimbangan.",
  },
  {
    keywords: ["elastisitas", "elastisitas harga", "elastisitas permintaan"],
    answer:
      "Elastisitas mengukur seberapa sensitif permintaan/penawaran terhadap perubahan harga. Ed > 1 = elastis (sensitif), Ed < 1 = inelastis (tidak sensitif), Ed = 1 = uniter. Kebutuhan pokok cenderung inelastis.",
  },
  {
    keywords: ["utilitas", "utility", "kepuasan konsumen", "marginal utility"],
    answer:
      "Utilitas adalah kepuasan yang diperoleh konsumen dari mengonsumsi barang/jasa. Hukum utilitas marginal yang menurun: setiap tambahan unit konsumsi memberikan kepuasan tambahan yang makin kecil.",
  },
  {
    keywords: ["biaya produksi", "biaya tetap", "biaya variabel", "fixed cost", "variable cost"],
    answer:
      "Biaya tetap (fixed cost) tidak berubah dengan output, misal sewa gedung. Biaya variabel berubah sesuai output, misal bahan baku. Total biaya = biaya tetap + biaya variabel.",
  },
  {
    keywords: ["biaya marginal", "marginal cost", "mc"],
    answer:
      "Biaya marginal (MC) adalah tambahan biaya untuk memproduksi satu unit tambahan. Keputusan produksi optimal: produksi sampai MC = MR (marginal revenue). Di bawah titik ini, tambah produksi masih menguntungkan.",
  },
  {
    keywords: ["laba", "profit", "keuntungan perusahaan", "maximasi laba"],
    answer:
      "Laba = Total Pendapatan - Total Biaya. Perusahaan memaksimalkan laba pada kondisi MR = MC. Laba ekonomi berbeda dengan laba akuntansi karena memperhitungkan biaya oportunitas.",
  },
  {
    keywords: ["pasar persaingan sempurna", "perfect competition"],
    answer:
      "Pasar persaingan sempurna: banyak penjual & pembeli, produk homogen, informasi sempurna, bebas masuk/keluar pasar. Contoh: pasar komoditas pertanian. Harga ditentukan pasar, produsen adalah price taker.",
  },
  {
    keywords: ["monopoli", "pasar monopoli"],
    answer:
      "Monopoli: satu penjual menguasai pasar tanpa pesaing. Monopolis adalah price maker dan dapat menetapkan harga di atas biaya marginal. Contoh di Indonesia: PLN (listrik), PAM (air). Diatur pemerintah.",
  },
  {
    keywords: ["oligopoli", "pasar oligopoli"],
    answer:
      "Oligopoli: pasar dikuasai beberapa perusahaan besar. Ada saling ketergantungan antarpelaku. Contoh: industri telekomunikasi, semen, rokok. Risiko: kartel dan kolusi untuk menetapkan harga.",
  },
  {
    keywords: ["monopolistik", "persaingan monopolistik"],
    answer:
      "Persaingan monopolistik: banyak penjual dengan produk terdiferensiasi. Setiap perusahaan punya sedikit kekuatan pasar melalui diferensiasi produk. Contoh: restoran, pakaian, kosmetik.",
  },
  {
    keywords: ["eksternalitas", "externality", "efek samping ekonomi"],
    answer:
      "Eksternalitas adalah dampak aktivitas ekonomi ke pihak ketiga di luar transaksi. Eksternalitas negatif: polusi pabrik. Eksternalitas positif: edukasi/vaksinasi. Pemerintah mengintervensi melalui pajak atau subsidi.",
  },
  {
    keywords: ["barang publik", "public goods", "barang bebas"],
    answer:
      "Barang publik bersifat non-excludable (tidak bisa melarang orang menikmati) dan non-rival (konsumsi satu orang tidak mengurangi yang lain). Contoh: jalan raya, pertahanan nasional, udara bersih.",
  },
  {
    keywords: ["market failure", "kegagalan pasar"],
    answer:
      "Kegagalan pasar terjadi ketika mekanisme harga tidak menghasilkan alokasi sumber daya yang efisien. Penyebab: eksternalitas, barang publik, informasi asimetris, kekuatan monopoli.",
  },
  {
    keywords: ["surplus konsumen", "consumer surplus"],
    answer:
      "Surplus konsumen adalah selisih antara harga maksimum yang bersedia dibayar konsumen dengan harga aktual yang dibayar. Menggambarkan manfaat yang diterima konsumen di atas harga pasar.",
  },
  {
    keywords: ["surplus produsen", "producer surplus"],
    answer:
      "Surplus produsen adalah selisih antara harga yang diterima produsen dengan harga minimum yang bersedia diterimanya. Menggambarkan keuntungan produsen dari harga pasar yang berlaku.",
  },
  {
    keywords: ["opportunity cost", "biaya oportunitas", "biaya peluang"],
    answer:
      "Biaya oportunitas adalah nilai dari alternatif terbaik yang dikorbankan saat membuat keputusan. Contoh: kuliah vs bekerja — biaya oportunitas kuliah adalah gaji yang tidak diterima selama kuliah.",
  },
  {
    keywords: ["skala ekonomi", "economies of scale", "skala produksi"],
    answer:
      "Skala ekonomi terjadi ketika biaya rata-rata turun seiring peningkatan skala produksi. Perusahaan besar bisa produksi lebih murah per unit. Contoh: pabrik otomotif, supermarket vs warung.",
  },
  {
    keywords: ["kurva indiferensi", "indifference curve", "budget constraint"],
    answer:
      "Kurva indiferensi menunjukkan kombinasi dua barang yang memberikan utilitas sama bagi konsumen. Budget constraint menunjukkan kombinasi yang bisa dibeli dengan anggaran tertentu. Titik optimal di mana keduanya bersinggungan.",
  },

  // === MAKROEKONOMI ===
  {
    keywords: ["pertumbuhan ekonomi", "economic growth"],
    answer:
      "Pertumbuhan ekonomi diukur dari kenaikan PDB riil. Faktor pendorong: investasi, tenaga kerja, teknologi, dan institusi. Indonesia menargetkan pertumbuhan 5-6% per tahun untuk menuju negara maju.",
  },
  {
    keywords: ["resesi", "recession", "kontraksi ekonomi", "krisis ekonomi"],
    answer:
      "Resesi adalah penurunan aktivitas ekonomi selama dua kuartal berturut-turut (PDB negatif). Ditandai dengan: pengangguran naik, konsumsi turun, investasi berkurang. Resesi terbesar Indonesia: krisis 1998.",
  },
  {
    keywords: ["pengangguran", "unemployment", "tingkat pengangguran"],
    answer:
      "Pengangguran diukur dengan Tingkat Pengangguran Terbuka (TPT). Jenis: friksional (transisi kerja), struktural (mismatch skill), siklikal (karena resesi), musiman. BPS merilis data pengangguran setiap semester.",
  },
  {
    keywords: ["kebijakan fiskal", "fiscal policy", "kebijakan anggaran"],
    answer:
      "Kebijakan fiskal adalah penggunaan pendapatan dan belanja pemerintah untuk mempengaruhi ekonomi. Ekspansif: naikkan belanja/turunkan pajak (saat resesi). Kontraktif: kurangi belanja/naikkan pajak (saat inflasi tinggi).",
  },
  {
    keywords: ["kebijakan moneter", "monetary policy", "bank sentral"],
    answer:
      "Kebijakan moneter digunakan bank sentral (BI) untuk mengendalikan jumlah uang beredar dan suku bunga. Ekspansif: turunkan bunga, dorong kredit. Kontraktif: naikkan bunga, rem inflasi.",
  },
  {
    keywords: ["jumlah uang beredar", "money supply", "m1 m2"],
    answer:
      "Jumlah uang beredar dibagi: M1 (uang kartal + giro), M2 (M1 + tabungan + deposito), M3 (M2 + surat berharga). BI mengontrol JUB melalui operasi pasar terbuka, GWM, dan suku bunga.",
  },
  {
    keywords: ["multiplier effect", "efek pengganda", "pengganda fiskal"],
    answer:
      "Efek pengganda (multiplier) menjelaskan bagaimana perubahan pengeluaran awal menghasilkan perubahan pendapatan nasional yang lebih besar. Jika pemerintah belanja Rp 1 triliun, PDB bisa naik Rp 2-3 triliun.",
  },
  {
    keywords: ["neraca pembayaran", "balance of payment", "bop"],
    answer:
      "Neraca pembayaran mencatat semua transaksi ekonomi Indonesia dengan luar negeri. Terdiri dari: neraca transaksi berjalan (ekspor-impor), neraca modal (investasi), dan cadangan devisa.",
  },
  {
    keywords: ["cadangan devisa", "foreign reserve"],
    answer:
      "Cadangan devisa adalah aset valuta asing yang dipegang Bank Indonesia. Digunakan untuk stabilisasi nilai tukar rupiah dan membayar utang luar negeri. Umumnya dinyatakan cukup jika menutup 3 bulan impor.",
  },
  {
    keywords: ["devaluasi", "revaluasi", "depresiasi", "apresiasi", "nilai tukar"],
    answer:
      "Depresiasi: nilai rupiah melemah terhadap mata uang asing (otomatis oleh pasar). Apresiasi: rupiah menguat. Devaluasi/revaluasi adalah penyesuaian nilai tukar yang dilakukan pemerintah secara resmi.",
  },
  {
    keywords: ["kurva phillips", "phillips curve", "inflasi pengangguran"],
    answer:
      "Kurva Phillips menggambarkan hubungan terbalik antara inflasi dan pengangguran dalam jangka pendek: inflasi turun saat pengangguran naik, dan sebaliknya. Dalam jangka panjang, trade-off ini tidak berlaku.",
  },
  {
    keywords: ["aggregate demand", "permintaan agregat", "ad"],
    answer:
      "Permintaan agregat (AD) = C + I + G + (X-M): konsumsi rumah tangga, investasi, belanja pemerintah, dan ekspor neto. Penurunan AD menyebabkan resesi; kenaikan berlebih menyebabkan inflasi.",
  },
  {
    keywords: ["aggregate supply", "penawaran agregat", "as"],
    answer:
      "Penawaran agregat (AS) adalah total output yang diproduksi perekonomian. AS jangka pendek dapat bergeser karena perubahan biaya produksi. AS jangka panjang ditentukan oleh kapasitas produksi.",
  },
  {
    keywords: ["gdp nominal", "gdp riil", "pdb nominal", "pdb riil", "deflator"],
    answer:
      "PDB nominal dihitung menggunakan harga tahun berjalan; PDB riil menggunakan harga tahun dasar (menghilangkan efek inflasi). PDB riil lebih akurat untuk mengukur pertumbuhan ekonomi sejati.",
  },
  {
    keywords: ["indeks harga konsumen", "ihk", "cpi", "consumer price index"],
    answer:
      "IHK (Indeks Harga Konsumen) mengukur perubahan harga sekelompok barang dan jasa yang dikonsumsi rumah tangga. Digunakan BPS untuk menghitung tingkat inflasi bulanan dan tahunan.",
  },

  // === TEORI EKONOMI ===
  {
    keywords: ["adam smith", "invisible hand", "tangan tak terlihat"],
    answer:
      "Adam Smith (Bapak Ekonomi Modern) berteori bahwa pasar bebas diarahkan oleh 'tangan tak terlihat' — individu yang mengejar kepentingan pribadi secara tidak langsung menguntungkan masyarakat luas.",
  },
  {
    keywords: ["john maynard keynes", "keynesian", "teori keynes"],
    answer:
      "Keynes berpendapat pemerintah harus aktif campur tangan saat ekonomi lesu melalui kebijakan fiskal ekspansif. Teorinya menjadi dasar kebijakan stimulus ekonomi saat resesi.",
  },
  {
    keywords: ["milton friedman", "monetarisme", "monetarism"],
    answer:
      "Milton Friedman mengembangkan monetarisme: inflasi adalah 'fenomena moneter' — disebabkan pertumbuhan uang beredar yang terlalu cepat. Ia menganjurkan aturan moneter tetap daripada kebijakan diskresioner.",
  },
  {
    keywords: ["teori permainan", "game theory", "nash equilibrium"],
    answer:
      "Teori permainan menganalisis interaksi strategis antar pelaku ekonomi. Nash Equilibrium: kondisi di mana tidak ada pemain yang bisa meningkatkan payoff-nya dengan mengubah strategi secara unilateral.",
  },
  {
    keywords: ["pareto optimal", "pareto efficiency", "efisiensi pareto"],
    answer:
      "Alokasi Pareto optimal: kondisi di mana tidak mungkin membuat seseorang lebih baik tanpa membuat orang lain lebih buruk. Pasar kompetitif cenderung mencapai efisiensi Pareto.",
  },
  {
    keywords: ["teori kuantitas uang", "quantity theory of money", "mv=pt"],
    answer:
      "Teori Kuantitas Uang: MV = PT (Uang × Kecepatan = Harga × Transaksi). Implikasinya: penambahan uang beredar tanpa diimbangi kenaikan output riil akan menyebabkan inflasi.",
  },
  {
    keywords: ["comparative advantage", "keunggulan komparatif", "david ricardo"],
    answer:
      "Teori keunggulan komparatif (Ricardo): setiap negara sebaiknya berspesialisasi pada produksi barang yang biaya oportunitas-nya paling rendah. Dasar pemikiran perdagangan internasional yang saling menguntungkan.",
  },
  {
    keywords: ["absolute advantage", "keunggulan absolut"],
    answer:
      "Keunggulan absolut (Adam Smith): kemampuan memproduksi barang dengan input lebih sedikit dibanding negara lain. Berbeda dengan keunggulan komparatif yang melihat biaya relatif, bukan absolut.",
  },
  {
    keywords: ["invisible hand", "pasar bebas", "laissez faire"],
    answer:
      "Laissez-faire adalah doktrin ekonomi yang menentang campur tangan pemerintah dalam perekonomian. Pasar bebas dianggap mampu mengalokasikan sumber daya secara efisien melalui mekanisme harga.",
  },
  {
    keywords: ["welfare economics", "ekonomi kesejahteraan", "social welfare"],
    answer:
      "Ekonomi kesejahteraan mengkaji bagaimana kebijakan ekonomi mempengaruhi kesejahteraan masyarakat. Instrumen: analisis surplus, Pareto improvement, fungsi kesejahteraan sosial.",
  },

  // === PERDAGANGAN INTERNASIONAL ===
  {
    keywords: ["tarif", "bea masuk", "tariff", "proteksionisme"],
    answer:
      "Tarif adalah pajak atas barang impor untuk melindungi industri domestik. Dampak: harga barang impor naik, konsumen rugi, produsen domestik untung, pemerintah dapat pendapatan. Cenderung mengurangi efisiensi global.",
  },
  {
    keywords: ["kuota impor", "import quota", "pembatasan impor"],
    answer:
      "Kuota impor membatasi jumlah barang yang boleh diimpor. Dampaknya mirip tarif tapi pemerintah tidak mendapat pendapatan dari selisih harga. Sering digunakan untuk melindungi industri strategis.",
  },
  {
    keywords: ["wto", "world trade organization", "perdagangan dunia"],
    answer:
      "WTO (World Trade Organization) adalah organisasi internasional yang mengatur perdagangan antarnegara, menyelesaikan sengketa dagang, dan mendorong liberalisasi perdagangan melalui perundingan multilateral.",
  },
  {
    keywords: ["fdi", "investasi asing langsung", "foreign direct investment", "penanaman modal asing"],
    answer:
      "FDI adalah investasi dari luar negeri dalam bentuk kepemilikan aset produktif (pabrik, perusahaan) di Indonesia. Berbeda dari investasi portofolio (saham/obligasi). FDI membawa modal, teknologi, dan lapangan kerja.",
  },
  {
    keywords: ["terms of trade", "nilai tukar perdagangan", "tot"],
    answer:
      "Terms of Trade (ToT) adalah rasio harga ekspor terhadap harga impor. ToT membaik berarti satu unit ekspor bisa membeli lebih banyak impor. Indonesia sangat dipengaruhi harga komoditas ekspor seperti CPO dan batu bara.",
  },
  {
    keywords: ["globalisasi", "globalization"],
    answer:
      "Globalisasi adalah integrasi ekonomi, budaya, dan politik antarnegara. Dampak positif: akses pasar lebih luas, transfer teknologi, efisiensi. Dampak negatif: persaingan industri lokal meningkat, ketimpangan bisa melebar.",
  },
  {
    keywords: ["dumping", "anti dumping"],
    answer:
      "Dumping adalah praktik menjual produk ekspor di bawah harga pasar atau biaya produksi untuk merebut pangsa pasar. WTO memperbolehkan negara mengkenakan bea anti-dumping untuk melindungi industri domestik.",
  },

  // === PEMBANGUNAN EKONOMI ===
  {
    keywords: ["pembangunan ekonomi", "economic development", "indeks pembangunan manusia", "ipm", "hdi"],
    answer:
      "IPM (Indeks Pembangunan Manusia) mengukur pembangunan melalui tiga dimensi: umur panjang (harapan hidup), pendidikan (rata-rata lama sekolah), dan standar hidup (GNI per kapita). Diterbitkan UNDP setiap tahun.",
  },
  {
    keywords: ["kemiskinan", "garis kemiskinan", "poverty"],
    answer:
      "Garis kemiskinan BPS dihitung berdasarkan kebutuhan minimum makanan (2.100 kkal/hari) dan non-makanan. Kemiskinan ekstrem global diukur World Bank: hidup di bawah $2,15/hari (PPP). Indonesia berhasil turunkan angka kemiskinan signifikan sejak 1998.",
  },
  {
    keywords: ["ketimpangan", "gini coefficient", "koefisien gini", "inequality"],
    answer:
      "Koefisien Gini mengukur ketimpangan distribusi pendapatan (0 = merata sempurna, 1 = tidak merata total). Indonesia sekitar 0,38. Ketimpangan tinggi bisa menghambat pertumbuhan dan memicu ketidakstabilan sosial.",
  },
  {
    keywords: ["human capital", "modal manusia", "investasi pendidikan"],
    answer:
      "Modal manusia adalah nilai ekonomi dari keterampilan, pengetahuan, dan pengalaman tenaga kerja. Investasi pendidikan dan kesehatan meningkatkan produktivitas dan pertumbuhan ekonomi jangka panjang.",
  },
  {
    keywords: ["sustainable development", "pembangunan berkelanjutan", "sdg", "sdgs"],
    answer:
      "SDGs (Sustainable Development Goals) adalah 17 tujuan pembangunan PBB yang harus dicapai pada 2030, mencakup kemiskinan, pendidikan, kesehatan, energi bersih, hingga kesenjangan dan perubahan iklim.",
  },
  {
    keywords: ["industrialisasi", "sektor industri", "manufaktur"],
    answer:
      "Industrialisasi adalah proses transformasi ekonomi dari agraris ke industri manufaktur. Meningkatkan nilai tambah, lapangan kerja, dan ekspor. Indonesia mendorong industrialisasi melalui kawasan ekonomi khusus (KEK).",
  },

  // === KEUANGAN PUBLIK ===
  {
    keywords: ["defisit anggaran", "surplus anggaran", "defisit fiskal"],
    answer:
      "Defisit anggaran terjadi saat belanja pemerintah > pendapatan. Dibiayai dengan utang. UU Indonesia membatasi defisit APBN maksimal 3% dari PDB. Surplus artinya pendapatan > belanja.",
  },
  {
    keywords: ["utang negara", "utang pemerintah", "surat utang negara", "sun"],
    answer:
      "Utang pemerintah digunakan untuk menutup defisit APBN melalui penerbitan SUN (Surat Utang Negara) atau pinjaman luar negeri. Rasio utang Indonesia sekitar 38-40% dari PDB, masih dalam batas aman (<60% PDB).",
  },
  {
    keywords: ["pajak penghasilan", "pph", "income tax"],
    answer:
      "PPh (Pajak Penghasilan) dikenakan atas penghasilan. PPh 21 untuk karyawan, PPh 23 untuk jasa, PPh 25/29 untuk badan usaha. Tarif PPh orang pribadi progresif 5-35% tergantung penghasilan kena pajak.",
  },
  {
    keywords: ["ppn", "pajak pertambahan nilai", "value added tax", "vat"],
    answer:
      "PPN adalah pajak atas konsumsi barang/jasa. Tarif standar di Indonesia 11% (naik dari 10% sejak April 2022). Dikenakan pada setiap tahap produksi dan distribusi, ditanggung konsumen akhir.",
  },
  {
    keywords: ["transfer fiskal", "dana perimbangan", "dau", "dak", "desentralisasi fiskal"],
    answer:
      "Dana perimbangan adalah transfer dari pusat ke daerah: DAU (Dana Alokasi Umum) untuk kebutuhan umum, DAK (Dana Alokasi Khusus) untuk sektor tertentu. Bagian dari desentralisasi fiskal Indonesia sejak 2001.",
  },

  // === PASAR KEUANGAN ===
  {
    keywords: ["pasar modal", "capital market", "pasar uang"],
    answer:
      "Pasar modal adalah tempat jual beli instrumen keuangan jangka panjang (saham, obligasi). Pasar uang untuk instrumen jangka pendek (< 1 tahun) seperti SBI, SBPU. Keduanya diawasi OJK.",
  },
  {
    keywords: ["ihsg", "indeks saham", "jakarta composite index"],
    answer:
      "IHSG (Indeks Harga Saham Gabungan) mencerminkan kinerja seluruh saham yang terdaftar di BEI. Naik berarti pasar saham menguat secara keseluruhan. Dipengaruhi kondisi ekonomi global, inflasi, suku bunga, dan sentimen investor.",
  },
  {
    keywords: ["obligasi korporasi", "corporate bond", "yield obligasi"],
    answer:
      "Yield obligasi adalah imbal hasil investasi obligasi. Hubungan yield-harga obligasi berbanding terbalik: harga naik → yield turun. Yield spread korporasi vs pemerintah mencerminkan risiko kredit perusahaan.",
  },
  {
    keywords: ["derivatif", "futures", "options", "instrumen derivatif"],
    answer:
      "Derivatif adalah instrumen keuangan yang nilainya berasal dari aset dasar (saham, komoditas, kurs). Futures: kontrak beli/jual di masa depan pada harga tetap. Options: hak (bukan kewajiban) beli/jual. Digunakan untuk lindung nilai atau spekulasi.",
  },
  {
    keywords: ["pasar efisien", "efficient market hypothesis", "emh"],
    answer:
      "Hipotesis Pasar Efisien (EMH) menyatakan harga aset mencerminkan semua informasi yang tersedia. Implikasinya: sulit mengalahkan pasar secara konsisten. Ada tiga bentuk: lemah, setengah kuat, dan kuat.",
  },
  {
    keywords: ["beta saham", "alpha saham", "risiko sistematis"],
    answer:
      "Beta mengukur sensitivitas saham terhadap pergerakan pasar. Beta > 1: lebih volatile dari pasar. Beta < 1: lebih stabil. Alpha mengukur return saham melebihi benchmark. Risiko sistematis (beta) tidak bisa dihilangkan dengan diversifikasi.",
  },
  {
    keywords: ["capm", "capital asset pricing model"],
    answer:
      "CAPM menghitung return yang diharapkan dari aset berisiko: E(r) = Rf + β(Rm - Rf). Rf = risk-free rate, β = beta, Rm = return pasar. Digunakan untuk menilai apakah saham fairly priced.",
  },
  {
    keywords: ["valuation", "penilaian saham", "pe ratio", "pbv", "price to book"],
    answer:
      "Valuasi saham menggunakan rasio seperti P/E (Price to Earnings): harga saham dibagi laba per saham. P/E rendah bisa berarti murah atau perusahaan bermasalah. PBV (Price to Book Value) membandingkan harga dengan nilai buku.",
  },

  // === AKUNTANSI & MANAJEMEN KEUANGAN ===
  {
    keywords: ["neraca", "balance sheet", "laporan posisi keuangan"],
    answer:
      "Neraca menunjukkan posisi keuangan perusahaan: Aset = Liabilitas + Ekuitas. Aset lancar (kas, piutang) dan tidak lancar (aset tetap). Liabilitas: utang jangka pendek dan panjang. Ekuitas: modal pemilik.",
  },
  {
    keywords: ["laba rugi", "income statement", "laporan laba rugi"],
    answer:
      "Laporan laba rugi menunjukkan kinerja perusahaan selama periode tertentu: Pendapatan - HPP = Laba Kotor. Laba Kotor - Beban Operasional = EBIT. EBIT - Bunga - Pajak = Laba Bersih.",
  },
  {
    keywords: ["ebitda", "ebit", "laba sebelum pajak"],
    answer:
      "EBITDA = Earnings Before Interest, Tax, Depreciation & Amortization. Digunakan untuk mengukur profitabilitas operasional tanpa pengaruh struktur modal dan kebijakan akuntansi. Sering digunakan dalam valuasi perusahaan.",
  },
  {
    keywords: ["roe", "return on equity", "roa", "return on assets"],
    answer:
      "ROE = Laba Bersih / Ekuitas: mengukur efisiensi penggunaan modal pemilik. ROA = Laba Bersih / Total Aset: mengukur efisiensi penggunaan aset. ROE > 15% umumnya dianggap baik.",
  },
  {
    keywords: ["leverage", "hutang perusahaan", "debt to equity", "der"],
    answer:
      "Leverage mengukur seberapa besar perusahaan menggunakan utang. DER (Debt to Equity Ratio) = Total Utang / Ekuitas. DER tinggi berarti risiko finansial lebih besar, tapi juga bisa meningkatkan ROE (leverage effect).",
  },
  {
    keywords: ["likuiditas", "current ratio", "quick ratio", "rasio likuiditas"],
    answer:
      "Rasio likuiditas mengukur kemampuan perusahaan membayar kewajiban jangka pendek. Current Ratio = Aset Lancar / Liabilitas Lancar. CR > 2 dianggap sehat. Quick Ratio mengecualikan persediaan.",
  },
  {
    keywords: ["npv", "net present value", "irr", "internal rate of return"],
    answer:
      "NPV mengukur nilai sekarang dari arus kas masa depan dikurangi investasi awal. NPV > 0 berarti proyek layak. IRR adalah tingkat diskonto yang membuat NPV = 0. Proyek layak jika IRR > biaya modal.",
  },
  {
    keywords: ["time value of money", "nilai waktu uang", "present value", "future value"],
    answer:
      "Nilai waktu uang: Rp 1.000 hari ini lebih berharga dari Rp 1.000 tahun depan karena bisa diinvestasikan. PV = FV / (1+r)^n. FV = PV × (1+r)^n. Dasar dari seluruh analisis keuangan.",
  },
  {
    keywords: ["working capital", "modal kerja"],
    answer:
      "Modal kerja = Aset Lancar - Liabilitas Lancar. Menunjukkan likuiditas jangka pendek perusahaan. Modal kerja negatif berarti perusahaan mungkin kesulitan membayar kewajiban jangka pendeknya.",
  },

  // === EKONOMI INTERNASIONAL ===
  {
    keywords: ["imf", "international monetary fund", "dana moneter internasional"],
    answer:
      "IMF memberikan pinjaman darurat kepada negara yang mengalami krisis neraca pembayaran. Indonesia pernah menerima bantuan IMF saat krisis 1998. Biasanya disertai syarat reformasi ekonomi yang ketat.",
  },
  {
    keywords: ["world bank", "bank dunia"],
    answer:
      "Bank Dunia menyediakan pinjaman dan bantuan teknis untuk pembangunan ekonomi di negara berkembang. Berfokus pada pengurangan kemiskinan, pendidikan, infrastruktur, dan kesehatan.",
  },
  {
    keywords: ["ppp", "purchasing power parity", "paritas daya beli"],
    answer:
      "PPP (Purchasing Power Parity) membandingkan daya beli mata uang berbeda berdasarkan harga barang serupa. Digunakan untuk membandingkan PDB antarnegara secara lebih akurat daripada menggunakan nilai tukar nominal.",
  },
  {
    keywords: ["hot money", "capital flight", "pelarian modal"],
    answer:
      "Hot money adalah aliran modal jangka pendek yang masuk dan keluar negara dengan cepat, mencari imbal hasil tertinggi. Sering menyebabkan volatilitas nilai tukar dan pasar finansial negara berkembang.",
  },
  {
    keywords: ["debt trap", "jebakan utang", "utang luar negeri"],
    answer:
      "Jebakan utang terjadi ketika negara berkembang tidak mampu membayar utang luar negeri dan dipaksa menyerahkan aset strategis. Penting: kelola rasio utang terhadap PDB dan pastikan utang digunakan produktif.",
  },

  // === EKONOMI KONTEMPORER ===
  {
    keywords: ["ekonomi digital", "digital economy", "ekonomi platform"],
    answer:
      "Ekonomi digital mencakup seluruh aktivitas ekonomi berbasis data dan internet: e-commerce, fintech, platform digital, gig economy. Indonesia adalah salah satu ekonomi digital terbesar di Asia Tenggara.",
  },
  {
    keywords: ["gig economy", "ekonomi gig", "ojek online", "driver online"],
    answer:
      "Gig economy adalah model kerja berbasis tugas/proyek melalui platform digital (Gojek, Grab, dll.). Fleksibel tapi minim perlindungan sosial. Perdebatan: status mitra sebagai pekerja atau pengusaha mandiri.",
  },
  {
    keywords: ["ekonomi hijau", "green economy", "esg", "lingkungan"],
    answer:
      "Ekonomi hijau berupaya pertumbuhan ekonomi yang ramah lingkungan. ESG (Environmental, Social, Governance) menjadi kriteria investasi modern. Indonesia berkomitmen net zero emissions pada 2060.",
  },
  {
    keywords: ["ekonomi kreatif", "creative economy", "industri kreatif"],
    answer:
      "Ekonomi kreatif mencakup sektor berbasis kreativitas: fashion, kuliner, musik, film, desain, game, dll. Indonesia memiliki potensi besar di sektor ini, berkontribusi sekitar 7% PDB dengan jutaan tenaga kerja.",
  },
  {
    keywords: ["inflasi inti", "core inflation", "inflasi pangan", "inflasi energi"],
    answer:
      "Inflasi inti adalah inflasi setelah dikurangi komponen pangan dan energi yang volatil. Mencerminkan tekanan inflasi yang lebih persisten. BI fokus mengendalikan inflasi inti dalam menetapkan kebijakan suku bunga.",
  },
  {
    keywords: ["stagflasi", "stagflation"],
    answer:
      "Stagflasi adalah kondisi langka: inflasi tinggi bersamaan dengan pertumbuhan rendah dan pengangguran tinggi. Sulit diatasi karena kebijakan anti-inflasi (naikkan suku bunga) memperburuk pengangguran.",
  },
  {
    keywords: ["quantitative easing", "qe", "pelonggaran kuantitatif"],
    answer:
      "QE (Quantitative Easing) adalah kebijakan bank sentral membeli aset (biasanya obligasi pemerintah) untuk menyuntik likuiditas ke ekonomi saat suku bunga sudah mendekati nol. Digunakan AS, Eropa, dan Jepang pasca-2008.",
  },
  {
    keywords: ["yield curve", "kurva yield", "inverted yield curve"],
    answer:
      "Yield curve menggambarkan hubungan imbal hasil obligasi dengan jatuh tempo berbeda. Normally: yield jangka panjang > jangka pendek. Inverted yield curve (terbalik) sering menjadi sinyal resesi.",
  },
  {
    keywords: ["moral hazard", "adverse selection", "informasi asimetris"],
    answer:
      "Informasi asimetris terjadi ketika satu pihak punya informasi lebih dari pihak lain. Adverse selection: memilih mitra yang buruk karena info tidak lengkap. Moral hazard: perilaku buruk setelah kontrak ditandatangani (misal: asuransi).",
  },
  {
    keywords: ["principal agent", "agency problem", "masalah keagenan"],
    answer:
      "Masalah keagenan terjadi ketika agent (manajer) tidak selalu bertindak sesuai kepentingan principal (pemegang saham). Solusi: insentif berbasis kinerja (bonus, saham), monitoring, dan tata kelola perusahaan yang baik.",
  },
];



// Build BM25 index once at module load (server startup)
const index = buildIndex(staticDB);

/**
 * Find a static answer using BM25 Information Retrieval.
 * - Tokenizes the query and removes Indonesian stopwords
 * - Expands synonyms (e.g. "bunga" → "suku bunga")
 * - Scores each document using BM25 (k1=1.5, b=0.75)
 * - Returns best match above threshold, or null (falls through to AI)
 */
export function findStaticAnswer(message: string): string | null {
  const result = search(message, index);
  return result ? result.answer : null;
}
