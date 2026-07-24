export const SURVEY_TYPES = {
  KEPUASAN: 'kepuasan',
  GRATIFIKASI: 'gratifikasi'
};

export const IDENTITAS_FIELDS = [
  { id: 'nama', label: 'Nama Responden', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'telp', label: 'No. Telp/HP', type: 'tel' },
  { id: 'umur', label: 'Umur', type: 'number' },
  { id: 'jk', label: 'Jenis Kelamin', type: 'radio', options: ['Laki-laki', 'Perempuan'] },
  { id: 'alamat', label: 'Alamat', type: 'text' },
  { id: 'pendidikan', label: 'Pendidikan Terakhir', type: 'select', options: ['SD/Sederajat', 'SLTP', 'SLTA', 'Diploma (D-1, D-2, D-3)', 'Sarjana (S-1)', 'Pasca Sarjana (S-2, S-3)'] },
  { id: 'pekerjaan', label: 'Pekerjaan Utama', type: 'select', options: ['PNS/TNI/Polri', 'Pensiunan', 'Pegawai Swasta', 'Wiraswasta', 'Buruh (Tani/Bangunan)', 'Pelajar/Mahasiswa', 'Tidak Bekerja', 'Lainnya'] },
];

export const KEPUASAN_QUESTIONS = [
  {
    id: 'U1',
    pertanyaan: 'Bagaimana pendapat Saudara tentang kesesuaian persyaratan yang harus dipenuhi dengan jenis pelayanan yang dimohon? (U1)',
    kinerja: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U2',
    pertanyaan: 'Bagaimana pemahaman Saudara tentang alur prosedur dalam pengurusan suatu jenis pelayanan di Desa Ngampel Wetan ini? (U2)',
    kinerja: ['Tidak Mudah', 'Kurang Mudah', 'Mudah', 'Sangat Mudah'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U3',
    pertanyaan: 'Bagaimana pendapat Saudara tentang kesesuaian antara standar waktu yang ditetapkan dengan kenyataan dalam penyelesaian suatu jenis pelayanan ? (U3)',
    kinerja: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U4',
    pertanyaan: 'Bagaimana pendapat Saudara tentang besaran biaya/tarif atas suatu jenis pelayanan? (U4)',
    kinerja: ['Sangat mahal dari yang ditetapkan', 'Cukup mahal dari yang ditetapkan', 'Murah meskipun kurang sesuai dengan yang ditetapkan', 'Sesuai tarif yang ditetapkan (bagi pelayanan yang berbiaya)/gratis (bagi pelayanan yang tidak berbiaya)'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U5',
    pertanyaan: 'Bagaimana pendapat Saudara tentang hasil pelayanan yang diberikan atau diterima pengguna layanan sesuai dengan ketentuan yang telah tercantum dalam standar pelayanan? (U5)',
    kinerja: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U6',
    pertanyaan: 'Bagaimana pendapat Saudara tentang kompetensi/kemampuan petugas dalam memberikan pelayanan? (U6)',
    kinerja: ['Tidak memiliki kompetensi / kemampuan', 'Kurang memiliki kompetensi / kemampuan', 'Memiliki kompetensi / kemampuan', 'Sangat kompeten / mampu'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U7',
    pertanyaan: 'Bagaimana pendapat saudara tentang perilaku petugas dalam pelayanan terkait kesopanan dan keramahan? (U7)',
    kinerja: ['Tidak sopan dan tidak ramah', 'Kurang sopan dan kurang ramah', 'Cukup sopan dan cukup ramah', 'Sangat sopan dan sangat ramah'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U8',
    pertanyaan: 'Bagaimana pendapat Saudara tentang tersedianya sarana penanganan pengaduan, saran (seperti kotak saran/email) ? (U8)',
    kinerja: ['Tidak tersedia sarana pengaduan', 'Ada tetapi tidak difungsikan', 'Ada namun belum ditangani', 'Tersedia dan ditangani dengan baik'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'U9',
    pertanyaan: 'Bagaimana pendapat Saudara tentang sarana prasarana yang tersedia bagi pengguna layanan (seperti tersedia ruang tunggu tersendiri, kursi yg memadai untuk pengguna layanan/dll)? (U9)',
    kinerja: ['Tidak Tersedia sarana prasarana pelayanan', 'Tersedia tetapi tidak cukup memadai', 'Tersedia dan cukup memadai', 'Tersedia sangat memadai dan nyaman'],
    kepentingan: ['Tidak Penting', 'Kurang Penting', 'Penting', 'Sangat Penting']
  },
  {
    id: 'pungli',
    pertanyaan: 'Apakah dalam pelaksanaan pelayanan ini terdapat pungutan biaya diluar biaya yang sudah ditentukan ( Pungli )?',
    kinerja: ['Ada', 'Tidak Ada'],
    kepentingan: null
  }
];

export const GRATIFIKASI_QUESTIONS = [
  {
    id: 'G1',
    pertanyaan: 'Apakah persyaratan pengajuan pelayanan yang ada dikantor sudah mempermudah saudara/i?',
    kinerja: ['Tidak Mudah', 'Kurang Mudah', 'Cukup Mudah', 'Sangat Mudah']
  },
  {
    id: 'G2',
    pertanyaan: 'Seberapa mudahkah prosedur pelayanan yang ada di desa setiap pengajuan kebutuhan?',
    kinerja: ['Tidak Mudah', 'Cukup Mudah', 'Mudah', 'Sangat Mudah']
  },
  {
    id: 'G3',
    pertanyaan: 'Seberapa cepat waktu yang dibutuhkan petugas di kantor desa dalam memberikan pelayanan?',
    kinerja: ['Tidak Cepat', 'Kadang-kadang', 'Cepat', 'Sangat Cepat']
  },
  {
    id: 'G4',
    pertanyaan: 'Apakah saudara/i pernah memberikan uang dalam pelayanan di Pemerintah Desa?',
    kinerja: ['Tidak Pernah', 'Kadang-kadang', 'Pernah', 'Sering']
  },
  {
    id: 'G5',
    pertanyaan: 'Apakah pernah ada permintaan uang/biaya dari perangkat desa dalam pelayanan?',
    kinerja: ['Tidak Pernah', 'Kadang-kadang', 'Pernah', 'Sering']
  },
  {
    id: 'G6',
    pertanyaan: 'Apakah jenis pelayanan yang diterima sesuai dengan kebutuhan saudara/i?',
    kinerja: ['Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai']
  },
  {
    id: 'G7',
    pertanyaan: 'Menurut pendapat saudara/i berapa biaya/tarif yang harus saudara/i bayarkan di Pemerintah Desa dalam melayani kebutuhan saudara/i?',
    kinerja: ['Mahal', 'Seikhlasnya', 'Murah', 'Gratis']
  },
  {
    id: 'G8',
    pertanyaan: 'Bagaimana pendapat saudara/i tentang kemampuan perangkat desa dalam memberikan penjelasan tentang prosedur pelayanan?',
    kinerja: ['Tidak Jelas', 'Kurang Jelas', 'Jelas', 'Sangat Jelas']
  },
  {
    id: 'G9',
    pertanyaan: 'Bagaimana pendapat saudara/i tentang kesopanan dan keramahan perangkat desa dalam memberikan pelayanan?',
    kinerja: ['Tidak Sopan Dan Tidak Ramah', 'Kurang Sopan Dan Kurang Ramah', 'Sopan Dan Ramah', 'Sangat Sopan Dan Sangat Ramah']
  },
  {
    id: 'G10',
    pertanyaan: 'Bagaimana pendapat anda tentang ketersediaan dan penanganan pelayanan pengaduan masyarakat?',
    kinerja: ['Tidak Ada', 'Ada tetapi belum ditangani dengan baik', 'Ada dan sudah ditangani dengan cukup baik', 'Ada dan sudah ditangani dengan sangat baik']
  },
  {
    id: 'G11',
    pertanyaan: 'Seberapa sering saudara/i melakukan pengaduan melalui desa?',
    kinerja: ['Sering', 'Jarang', 'Tidak pernah']
  },
  {
    id: 'G12',
    pertanyaan: 'Media apa yang paling sering saudara/i pergunakan pengaduan masyarakat?',
    kinerja: ['Kotak Pengaduan', 'Website/sosial media', 'Wa/sms', 'Tidak pernah']
  },
  {
    id: 'G13',
    pertanyaan: 'Bagaimana pendapat anda tentang ketersediaan dan efektifitas peralatan seperti komputer, scanner, dan jaringan internet yang digunakan dalam pelayanan?',
    kinerja: ['Tidak tersedia', 'Cukup tersedia tapi kurang efektif', 'Tersedia dan efektif', 'Tidak Tahu']
  },
  {
    id: 'G14',
    pertanyaan: 'Apakah Saudara/i bisa mengakses informasi standar pelayanan minimal (Kesehatan, Pendidikan, sosial, lingkungan, Trantibumlinmas, pekerjaan umum, pembangunan, kependudukan, keuangan dan pelayanan lainnya)?',
    kinerja: ['Tidak bisa', 'Kadang-kadang', 'Bisa', 'Sangat Bisa']
  },
  {
    id: 'G15',
    pertanyaan: 'Dimanakah saudara/i bisa memperoleh informasi standar pelayanan minimal (Kesehatan, Pendidikan, sosial, lingkungan, Trantibumlinmas, pekerjaan umum, pembangunan, kependudukan, keuangan dan pelayanan lainnya)?',
    kinerja: ['Pengumuman diluar ruangan (jalan umum,kantor desa, dusun)', 'Pengumuman di website', 'Tidak ada keduanya']
  }
];
