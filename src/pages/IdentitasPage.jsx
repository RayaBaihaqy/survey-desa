import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDENTITAS_FIELDS } from '../data/questions';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const IdentitasPage = () => {
  const { surveyType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('survey_identitas', JSON.stringify(formData));
    navigate(`/survey/${surveyType}`);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <form className="neo-form" onSubmit={handleSubmit}>
        <p>
          Selamat Datang,
          <span>silahkan isi data diri anda</span>
        </p>
        
        <div className="neo-form-grid">
          {IDENTITAS_FIELDS.map((field) => (
            <div key={field.id} className="neo-input-group">
              <label className="neo-label">{field.label}</label>
              
              {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' ? (
                <input
                  type={field.type}
                  name={field.id}
                  className="neo-input"
                  required
                  onChange={handleChange}
                  value={formData[field.id] || ''}
                  placeholder={`Masukkan ${field.label.toLowerCase()}`}
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.id}
                  className="neo-select"
                  required
                  onChange={handleChange}
                  value={formData[field.id] || ''}
                >
                  <option value="" disabled>Pilih {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <div className="neo-radio-group">
                  {field.options.map((opt) => (
                    <label key={opt} className="neo-radio-label">
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        required
                        onChange={handleChange}
                        checked={formData[field.id] === opt}
                        style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="neo-button"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>

          <button type="submit" className="neo-button">
            Selanjutnya
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdentitasPage;
