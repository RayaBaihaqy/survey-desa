import { useNavigate } from 'react-router-dom';
import { SURVEY_TYPES } from '../data/questions';
import { FileText, ShieldAlert } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelectSurvey = (type) => {
    navigate(`/data-diri/${type}`);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Selamat Datang</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Silakan pilih jenis survey yang ingin Anda isi.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', width: '100%', maxWidth: '900px' }}>
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
