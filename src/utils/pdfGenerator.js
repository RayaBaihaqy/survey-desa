import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { SURVEY_TYPES, KEPUASAN_QUESTIONS, GRATIFIKASI_QUESTIONS, IDENTITAS_FIELDS } from '../data/questions';
import logoKendal from '../assets/logo_kendal.png';

const generatePDF = async (data) => {
  const { identitas, answers, surveyType } = data;
  const isKepuasan = surveyType === SURVEY_TYPES.KEPUASAN;
  const questions = isKepuasan ? KEPUASAN_QUESTIONS : GRATIFIKASI_QUESTIONS;

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  
  // A4 Landscape is approx 1123px width x 794px height (at 96 DPI)
  container.style.width = '1123px';
  container.style.height = '794px'; 
  container.style.backgroundColor = '#ffffff';
  container.style.padding = '25px 35px'; // slightly smaller padding to maximize space
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = '"Times New Roman", Times, serif';
  container.style.color = '#000000';
  container.style.display = 'flex';
  container.style.gap = '20px'; // gap between the 2 columns

  // Left Column Content
  let leftHtml = `
    <div style="flex: 1; display: flex; flex-direction: column; height: 100%;">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; border-bottom: 2px solid black; padding-bottom: 8px; margin-bottom: 10px; height: 90px; box-sizing: border-box;">
        <div style="width: 70px; text-align: center;">
          <img src="${logoKendal}" style="width: 55px; height: auto;" crossorigin="anonymous" />
        </div>
        <div style="flex-grow: 1; text-align: center;">
          <h2 style="margin: 0; font-size: 16px; font-weight: normal; line-height: 1.2;">PEMERINTAH KABUPATEN KENDAL</h2>
          <h1 style="margin: 2px 0; font-size: 20px; font-weight: bold; letter-spacing: 1px; line-height: 1.2;">KECAMATAN NGAMPEL</h1>
          <p style="margin: 0; font-size: 10px; line-height: 1.2;">Jl. Sunan Ampel KM. 2 Ngampel, 087832456444, 087700374714</p>
          <p style="margin: 0; font-size: 10px; line-height: 1.2;">Email: pemdesngampelwetan@gmail.com Website ngampelwetan.kendalkab.go.id</p>
        </div>
      </div>

      <!-- Title -->
      <div style="text-align: center; margin-bottom: 12px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <h3 style="margin: 0; font-size: 11px; font-weight: bold; line-height: 1.3;">
          ${isKepuasan 
            ? 'KUESIONER SURVEY KEPUASAN MASYARAKAT<br/>PELAYANAN UMUM DESA NGAMPEL WETAN KECAMATAN NGAMPEL' 
            : 'KUESIONER SURVEY PERILAKU MASYARAKAT TERHADAP GRATIFIKASI<br/>DESA NGAMPEL WETAN KECAMATAN NGAMPEL'}
        </h3>
      </div>
  `;

  // Info & Identitas Table (Left Column)
  const namaKuesioner = isKepuasan ? 'Survey Kepuasan Masyarakat 2026' : 'Survey Perilaku Masyarakat Terhadap Gratifikasi 2026';
  
  const today = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);
  
  leftHtml += `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 10px; border: 1px solid black;">
        <tr>
          <td colspan="2" style="border: 1px solid black; padding: 4px; font-weight: bold; width: 40%;">Nama Kuesioner</td>
          <td style="border: 1px solid black; padding: 4px; width: 60%;">${namaKuesioner}</td>
        </tr>
        <tr>
          <td colspan="2" style="border: 1px solid black; padding: 4px; font-weight: bold;">Periode</td>
          <td style="border: 1px solid black; padding: 4px;">Tahun 2026 (Semester I) (01 Januari 2026 s/d 30 Juni 2026)</td>
        </tr>
        <tr>
          <td colspan="2" style="border: 1px solid black; padding: 4px; font-weight: bold;">Tanggal</td>
          <td style="border: 1px solid black; padding: 4px;">${formattedDate}</td>
        </tr>
        <tr>
          <th colspan="3" style="border: 1px solid black; padding: 5px; background-color: #f0f0f0; text-align: center; font-size: 11px;">IDENTITAS RESPONDEN</th>
        </tr>
  `;

  // Use 8 fields for Kepuasan, and 4 fields for Gratifikasi
  const currentIdentitasFields = isKepuasan
    ? IDENTITAS_FIELDS
    : IDENTITAS_FIELDS.filter(f => ['nama', 'umur', 'jk', 'alamat'].includes(f.id));

  currentIdentitasFields.forEach((field, index) => {
    let value = identitas[field.id] || '-';
    if (field.id === 'jk') {
       const isLaki = value === 'Laki-laki';
       const isPerempuan = value === 'Perempuan';
       value = `
         <div style="display: flex; gap: 15px;">
           <div>${isLaki ? '☑' : '☐'} Laki-laki</div>
           <div>${isPerempuan ? '☑' : '☐'} Perempuan</div>
         </div>
       `;
    }

    leftHtml += `
        <tr>
          <td style="border: 1px solid black; padding: 4px; text-align: center; width: 20px;">${index + 1}.</td>
          <td style="border: 1px solid black; padding: 4px; width: 100px;">${field.label}</td>
          <td style="border: 1px solid black; padding: 4px;">${value}</td>
        </tr>
    `;
  });
  leftHtml += `</table>`;

  // Function to render a single question row
  const renderQuestionRow = (q, index, isFirstRow) => {
    const ans = answers[q.id] || {};
    const kinerjaChecked = (opt) => ans.kinerja === opt ? '☑' : '☐';
    const kepentinganChecked = (opt) => ans.kepentingan === opt ? '☑' : '☐';

    // Special case for Pungli question (no number, 2 columns only)
    if (isKepuasan && q.id === 'pungli') {
      return `
        <tr>
          <td colspan="2" style="border: 1px solid black; padding: 4px; vertical-align: middle; font-size: 10px; line-height: 1.2;">${q.pertanyaan}</td>
          <td colspan="2" style="border: 1px solid black; padding: 4px; vertical-align: middle;">
            <div style="display: flex; gap: 30px; font-size: 10px; padding-left: 10px;">
              ${q.kinerja.map(opt => `<div>${kinerjaChecked(opt)} ${opt}</div>`).join('')}
            </div>
          </td>
        </tr>
      `;
    }

    const kinerjaHtml = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px;">
        ${q.kinerja.map(opt => `<div>${kinerjaChecked(opt)} ${opt}</div>`).join('')}
      </div>
    `;
    
    let kepentinganHtml = '';
    if (isKepuasan) {
      if (q.kepentingan) {
        kepentinganHtml = `
          <td style="border: 1px solid black; padding: 4px; vertical-align: top;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 10px;">
              ${q.kepentingan.map(opt => `<div>${kepentinganChecked(opt)} ${opt}</div>`).join('')}
            </div>
          </td>
        `;
      } else {
        kepentinganHtml = `<td style="border: 1px solid black; padding: 4px; background-color: #f9f9f9;"></td>`;
      }
    }

    // Set fixed widths so both left and right tables match exactly
    return `
      <tr>
        <td style="border: 1px solid black; padding: 4px; text-align: center; vertical-align: top; width: 5%; font-size: 10px;">${index + 1}.</td>
        <td style="border: 1px solid black; padding: 4px; vertical-align: top; width: 35%; font-size: 10px; line-height: 1.2;">${q.pertanyaan}</td>
        <td style="border: 1px solid black; padding: 4px; vertical-align: top; width: ${isKepuasan ? '30%' : '60%'};">${kinerjaHtml}</td>
        ${kepentinganHtml}
      </tr>
    `;
  };

  // Questions Table (Left Column)
  const thHeaders = isKepuasan 
    ? `<th style="border: 1px solid black; padding: 5px; width: 30%;">Kinerja/Kenyataannya</th><th style="border: 1px solid black; padding: 5px; width: 30%;">Tingkat Kepentingan</th>`
    : `<th style="border: 1px solid black; padding: 5px; width: 60%;">Kinerja/Kenyataannya</th>`;

  leftHtml += `
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black; font-size: 10px;">
        <tr>
          <td colspan="${isKepuasan ? 4 : 3}" style="border: 1px solid black; padding: 5px; font-weight: bold; text-align: center; font-size: 11px; background-color: #f0f0f0;">
            Pendapat Responden Tentang Kualitas Pelayanan dan Tingkat Kepentingannya
          </td>
        </tr>
        <tr>
          <th style="border: 1px solid black; padding: 5px; width: 5%; text-align: center;">No</th>
          <th style="border: 1px solid black; padding: 5px; width: 35%; text-align: center;">Pertanyaan</th>
          ${thHeaders}
        </tr>
  `;

  // Split questions. Left gets 6 for Gratifikasi, 3 for Kepuasan (to prevent cut off on the bottom left)
  const splitIndex = isKepuasan ? 3 : 6;
  const leftQuestions = questions.slice(0, splitIndex);
  const rightQuestions = questions.slice(splitIndex);

  leftQuestions.forEach((q, idx) => {
    leftHtml += renderQuestionRow(q, idx, false);
  });
  leftHtml += `</table></div>`;

  // Right Column Content
  let rightHtml = `
    <div style="flex: 1; display: flex; flex-direction: column; height: 100%;">
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black; font-size: 10px;">
        <!-- Invisible header to force exact same column widths as left side -->
        <tr style="visibility: collapse;">
          <th style="border: none; padding: 0; width: 5%;"></th>
          <th style="border: none; padding: 0; width: 35%;"></th>
          <th style="border: none; padding: 0; width: ${isKepuasan ? '30%' : '60%'};"></th>
          ${isKepuasan ? '<th style="border: none; padding: 0; width: 30%;"></th>' : ''}
        </tr>
  `;

  rightQuestions.forEach((q, idx) => {
    rightHtml += renderQuestionRow(q, splitIndex + idx, idx === 0);
  });
  rightHtml += `</table></div>`;

  container.innerHTML = leftHtml + rightHtml;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { 
      scale: 2, // High resolution
      useCORS: true,
      logging: false,
      width: 1123,
      height: 794
    });
    
    // Create A4 Landscape PDF directly
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4' // 297mm x 210mm
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Margins (in mm)
    // Top: 10, Bottom: 5, Left: 5, Right: 5
    // Width = 297 - Left - Right = 297 - 10 = 287
    // Height = 210 - Top - Bottom = 210 - 15 = 195
    pdf.addImage(imgData, 'JPEG', 5, 10, 287, 195);
    
    const typeLabel = isKepuasan ? 'Kepuasan' : 'Gratifikasi';
    const userName = identitas.nama ? identitas.nama.trim().replace(/\s+/g, '_') : 'Anonim';
    const fileName = `Survey_${typeLabel}_${userName}.pdf`;
    
    pdf.save(fileName);
    const base64String = pdf.output('datauristring');
    
    document.body.removeChild(container);
    return base64String;
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
};

export default generatePDF;
