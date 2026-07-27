import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '0 0.5rem' }}>
      <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)' }}>
        <div style={{ color: '#10b981', display: 'flex', justifyContent: 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
          <CheckCircle size={64} />
        </div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.75rem)', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
          Survey Berhasil Dikirim!
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: '1.6', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
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
