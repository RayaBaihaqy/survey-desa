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

  const getFieldProps = (field) => {
    switch (field.id) {
      case 'umur':
        return { min: 10, max: 120, placeholder: 'Contoh: 35' };
      case 'telp':
        return {
          pattern: '^[0-9+]{9,16}$',
          title: 'Nomor telepon harus berupa 9-16 digit angka',
          placeholder: 'Contoh: 081234567890'
        };
      case 'nama':
        return { minLength: 2, maxLength: 100, placeholder: 'Masukkan nama lengkap' };
      case 'alamat':
        return { minLength: 3, maxLength: 200, placeholder: 'Masukkan alamat/dusun' };
      case 'email':
        return { placeholder: 'nama@email.com' };
      default:
        return { placeholder: `Masukkan ${field.label.toLowerCase()}` };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean & trim all values
    const cleanedData = {};
    for (const key in formData) {
      cleanedData[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    }

    if (!cleanedData.nama || cleanedData.nama.length < 2) {
      alert('Mohon masukkan nama responden yang valid.');
      return;
    }

    if (!cleanedData.alamat || cleanedData.alamat.length < 3) {
      alert('Mohon masukkan alamat yang valid.');
      return;
    }

    const umurNum = parseInt(cleanedData.umur, 10);
    if (isNaN(umurNum) || umurNum < 10 || umurNum > 120) {
      alert('Mohon masukkan umur yang valid (antara 10 - 120 tahun).');
      return;
    }

    localStorage.setItem('survey_identitas', JSON.stringify(cleanedData));
    navigate(`/survey/${surveyType}`);
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(1rem, 3vw, 2rem) 0' }}>
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
                  {...getFieldProps(field)}
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
