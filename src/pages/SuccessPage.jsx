import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '3rem 2rem' }}>
        <div style={{ color: '#10b981', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <CheckCircle size={80} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
          Survey Berhasil Dikirim!
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Terima kasih atas partisipasi Anda. Jawaban Anda telah berhasil disimpan dan diteruskan ke sistem pelayanan Desa Ngampel Wetan.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%' }}>
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
