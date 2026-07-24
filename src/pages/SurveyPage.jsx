import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SURVEY_TYPES, KEPUASAN_QUESTIONS, GRATIFIKASI_QUESTIONS } from '../data/questions';
import { ArrowLeft, Send } from 'lucide-react';
import generatePDF from '../utils/pdfGenerator';

const SurveyPage = () => {
  const { surveyType } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = surveyType === SURVEY_TYPES.KEPUASAN ? KEPUASAN_QUESTIONS : GRATIFIKASI_QUESTIONS;

  useEffect(() => {
    // Check if identitas exists, if not redirect to home
    const identitas = localStorage.getItem('survey_identitas');
    if (!identitas) {
      navigate('/');
    }
  }, [navigate]);

  const handleAnswerChange = (questionId, type, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [type]: value
      }
    }));
  };

  const isFormComplete = () => {
    for (const q of questions) {
      const qAnswer = answers[q.id];
      if (!qAnswer || !qAnswer.kinerja) return false;
      if (q.kepentingan && !qAnswer.kepentingan) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete()) {
      alert('Mohon lengkapi semua pertanyaan sebelum mengirim.');
      return;
    }

    setIsSubmitting(true);
    try {
      const identitas = JSON.parse(localStorage.getItem('survey_identitas'));
      const data = {
        identitas,
        answers,
        surveyType
      };

      // Generate PDF Base64
      const pdfBase64 = await generatePDF(data);

      // We will send this to Google Apps Script later. For now, simulate network delay
      // then redirect to success
      
      // Simulating a backend call:
      // await fetch('GOOGLE_APPS_SCRIPT_URL', { method: 'POST', body: JSON.stringify({ pdf: pdfBase64, type: surveyType }) });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.removeItem('survey_identitas');
      navigate('/success');
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
          {surveyType === SURVEY_TYPES.KEPUASAN ? 'Kuesioner Kepuasan Masyarakat' : 'Kuesioner Perilaku Gratifikasi'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <h3 className="question-title">{index + 1}. {q.pertanyaan}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Kinerja / Kenyataannya */}
              <div>
                <p style={{ fontWeight: '500', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                  {surveyType === SURVEY_TYPES.KEPUASAN ? 'Kinerja / Kenyataannya:' : 'Pilihan Jawaban:'}
                </p>
                <div className="options-grid">
                  {q.kinerja.map((opt) => (
                    <div 
                      key={opt}
                      className={`option-box ${answers[q.id]?.kinerja === opt ? 'selected' : ''}`}
                      onClick={() => handleAnswerChange(q.id, 'kinerja', opt)}
                    >
                      <label className="custom-cb-container" onClick={(e) => e.preventDefault()}>
                        <input type="checkbox" checked={answers[q.id]?.kinerja === opt} readOnly />
                        <div className="custom-cb-checkmark"></div>
                      </label>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tingkat Kepentingan (Only for some Kepuasan questions) */}
              {q.kepentingan && (
                <div>
                  <p style={{ fontWeight: '500', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                    Tingkat Kepentingan:
                  </p>
                  <div className="options-grid">
                    {q.kepentingan.map((opt) => (
                      <div 
                        key={opt}
                        className={`option-box ${answers[q.id]?.kepentingan === opt ? 'selected' : ''}`}
                        onClick={() => handleAnswerChange(q.id, 'kepentingan', opt)}
                      >
                        <label className="custom-cb-container" onClick={(e) => e.preventDefault()}>
                          <input type="checkbox" checked={answers[q.id]?.kepentingan === opt} readOnly />
                          <div className="custom-cb-checkmark"></div>
                        </label>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="button" onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>
            <ArrowLeft size={20} style={{ marginRight: '0.75rem' }} /> Kembali
          </button>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim Data...' : (
              <>Kirim Jawaban <Send size={20} style={{ marginLeft: '0.75rem' }} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;
