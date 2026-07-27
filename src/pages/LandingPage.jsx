import { useNavigate } from 'react-router-dom';
import { SURVEY_TYPES } from '../data/questions';
import { FileText, ShieldAlert } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelectSurvey = (type) => {
    navigate(`/data-diri/${type}`);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 4vw, 2rem)', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontWeight: '700', marginBottom: '0.5rem' }}>Selamat Datang</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Silakan pilih jenis survey yang ingin Anda isi.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.5rem, 4vw, 3rem)', justifyContent: 'center', width: '100%', maxWidth: '900px', padding: '0 0.5rem' }}>
        {/* Card 1: Kepuasan Masyarakat */}
        <div className="blob-card" onClick={() => handleSelectSurvey(SURVEY_TYPES.KEPUASAN)}>
          <div className="bg"></div>
          <div className="blob"></div>
          <div className="content">
            <FileText size={48} color="var(--color-primary)" />
            <p className="blob-card-title">Kuesioner Survey Kepuasan Masyarakat Pelayanan Umum Desa Ngampel Wetan Kecamatan Ngampel</p>
          </div>
        </div>

        {/* Card 2: Gratifikasi */}
        <div className="blob-card" onClick={() => handleSelectSurvey(SURVEY_TYPES.GRATIFIKASI)}>
          <div className="bg"></div>
          <div className="blob"></div>
          <div className="content">
            <ShieldAlert size={48} color="var(--color-primary)" />
            <p className="blob-card-title">Kuesioner Survey Perilaku Masyarakat Terhadap Gratifikasi Desa Ngampel Wetan Kecamatan Ngampel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
