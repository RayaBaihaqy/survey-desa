import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { SURVEY_TYPES } from '../data/questions';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const completedSurvey = location.state?.completedSurvey;
  const identitas = location.state?.identitas;

  let nextSurveyType = null;
  let nextSurveyTitle = 'Lanjut Survey Lainnya';

  if (completedSurvey === SURVEY_TYPES.KEPUASAN) {
    nextSurveyType = SURVEY_TYPES.GRATIFIKASI;
    nextSurveyTitle = 'Lanjut Survey Gratifikasi';
  } else if (completedSurvey === SURVEY_TYPES.GRATIFIKASI) {
    nextSurveyType = SURVEY_TYPES.KEPUASAN;
    nextSurveyTitle = 'Lanjut Survey Kepuasan Masyarakat';
  }

  const handleNextSurvey = () => {
    if (nextSurveyType) {
      if (identitas) {
        // Simpan kembali identitas agar responden tidak perlu mengisi dua kali
        localStorage.setItem('survey_identitas', JSON.stringify(identitas));
        navigate(`/survey/${nextSurveyType}`);
      } else {
        navigate(`/data-diri/${nextSurveyType}`);
      }
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '0 0.5rem' }}>
      <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)' }}>
        <div style={{ color: '#10b981', display: 'flex', justifyContent: 'center', margin: '0 auto clamp(1rem, 3vw, 1.5rem)' }}>
          <CheckCircle size={64} />
        </div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.75rem)', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
          Survey Berhasil Dikirim!
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: '1.6', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
          Terima kasih atas partisipasi Anda. Jawaban Anda telah berhasil disimpan dan diteruskan ke sistem pelayanan Desa Ngampel Wetan.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleHome} className="btn btn-outline" style={{ flex: '1', minWidth: '200px' }}>
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
            Kembali ke Beranda
          </button>
          
          {nextSurveyType && (
            <button onClick={handleNextSurvey} className="btn btn-primary" style={{ flex: '1', minWidth: '200px' }}>
              {nextSurveyTitle}
              <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
