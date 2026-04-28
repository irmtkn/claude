// ═══════════════════════════════════════
// TEKLİF FORMU — MULTI-STEP LOGIC
// ═══════════════════════════════════════

(function() {

  const OWNER_EMAIL = 'irem-isty@hotmail.com';
  const WA_LINK     = '#'; // WhatsApp müşteri iletişim linki (sonradan eklenecek)

  const contactFields = [
    { id: 'musteriTelefon', label: 'Cep Telefonu', type: 'tel',   placeholder: '0532 123 45 67' },
    { id: 'musteriEmail',   label: 'E-posta',       type: 'email', placeholder: 'ornek@mail.com' },
  ];

  const typeLabels = {
    kasko: 'Kasko', trafik: 'Trafik Sigortası', konut: 'Konut Sigortası',
    saglik: 'Sağlık Sigortası', seyahat: 'Seyahat Sigortası',
    isyeri: 'İşyeri Sigortası', evcil: 'Evcil Hayvan Sigortası', diger: 'Diğer',
  };

  const productFields = {
    kasko: [
      { id: 'tc',        label: 'TC Kimlik No',  type: 'text',   placeholder: '12345678901' },
      { id: 'plaka',     label: 'Plaka',          type: 'text',   placeholder: '34 ABC 123' },
      { id: 'aracMarka', label: 'Araç Markası',   type: 'text',   placeholder: 'Toyota, BMW...' },
      { id: 'aracModel', label: 'Araç Modeli',    type: 'text',   placeholder: 'Corolla' },
      { id: 'aracYil',   label: 'Model Yılı',     type: 'number', placeholder: '2021' },
    ],
    trafik: [
      { id: 'tc',           label: 'TC Kimlik No',           type: 'text', placeholder: '12345678901' },
      { id: 'plaka',        label: 'Plaka',                  type: 'text', placeholder: '34 ABC 123' },
      { id: 'ruhsatSeriNo', label: 'Ruhsat Tescil Seri No',  type: 'text', placeholder: 'AA 000000' },
    ],
    konut: [
      { id: 'tc',         label: 'TC Kimlik No',      type: 'text',   placeholder: '12345678901' },
      { id: 'konutIl',    label: 'İl',                type: 'text',   placeholder: 'İstanbul' },
      { id: 'konutIlce',  label: 'İlçe',              type: 'text',   placeholder: 'Kadıköy' },
      { id: 'yapiYasi',   label: 'Yapı Yaşı',         type: 'number', placeholder: '10' },
      { id: 'metrekare',  label: 'Metrekare (m²)',     type: 'number', placeholder: '120' },
      { id: 'yapiTipi',   label: 'Bina Yapı Tipi',    type: 'select', options: ['Betonarme', 'Yığma', 'Prefabrik', 'Diğer'] },
      { id: 'esyaDegeri', label: 'Eşya Değeri (₺)',   type: 'number', placeholder: '150000' },
    ],
    saglik: [
      { id: 'tc',             label: 'TC Kimlik No',            type: 'text',   placeholder: '12345678901' },
      { id: 'dogumTarihi',    label: 'Doğum Tarihi',            type: 'date' },
      { id: 'cinsiyet',       label: 'Cinsiyet',                type: 'select', options: ['Kadın', 'Erkek'] },
      { id: 'kronikHastalik', label: 'Kronik Hastalık Var mı?', type: 'select', options: ['Hayır', 'Evet'] },
    ],
    seyahat: [
      { id: 'tc',            label: 'TC Kimlik No',      type: 'text',   placeholder: '12345678901' },
      { id: 'pasaportNo',    label: 'Pasaport No',       type: 'text',   placeholder: 'U12345678' },
      { id: 'gidilecekUlke', label: 'Gidilecek Ülke',   type: 'text',   placeholder: 'Almanya, İtalya...' },
      { id: 'gidisTarihi',   label: 'Gidiş Tarihi',      type: 'date' },
      { id: 'donusTarihi',   label: 'Dönüş Tarihi',      type: 'date' },
      { id: 'kisiSayisi',    label: 'Kişi Sayısı',       type: 'number', placeholder: '1' },
    ],
    isyeri: [
      { id: 'tc',              label: 'TC Kimlik No',                type: 'text',   placeholder: '12345678901' },
      { id: 'vkn',             label: 'Vergi Kimlik No (VKN)',       type: 'text',   placeholder: '1234567890' },
      { id: 'isyeriIl',        label: 'İl',                          type: 'text',   placeholder: 'İstanbul' },
      { id: 'isyeriIlce',      label: 'İlçe',                        type: 'text',   placeholder: 'Beşiktaş' },
      { id: 'isyeriTur',       label: 'İşyeri Türü',                 type: 'select', options: ['Ofis', 'Market', 'Restoran', 'Atölye', 'Depo', 'Diğer'] },
      { id: 'isyeriMetrekare', label: 'Metrekare (m²)',              type: 'number', placeholder: '200' },
      { id: 'stokDegeri',      label: 'Stok / Demirbaş Değeri (₺)', type: 'number', placeholder: '500000' },
    ],
    evcil: [
      { id: 'tc',            label: 'TC Kimlik No',          type: 'text',   placeholder: '12345678901' },
      { id: 'evcilTur',      label: 'Hayvan Türü',           type: 'select', options: ['Köpek', 'Kedi', 'Diğer'] },
      { id: 'evcilIrk',      label: 'Irkı',                  type: 'text',   placeholder: 'Golden Retriever' },
      { id: 'evcilYas',      label: 'Yaşı',                  type: 'text',   placeholder: '3' },
      { id: 'kisirLastirma',  label: 'Kısırlaştırıldı mı?',  type: 'select', options: ['Evet', 'Hayır'] },
    ],
    diger: [
      { id: 'tc',            label: 'TC Kimlik No',                      type: 'text',     placeholder: '12345678901' },
      { id: 'digerAciklama', label: 'Ne tür sigortaya ihtiyacınız var?', type: 'textarea', placeholder: 'Lütfen açıklayın...' },
    ],
  };

  // Tüm ürünlerin sonuna iletişim + doküman + WhatsApp alanları eklenir
  const WHATSAPP_LINK = WA_LINK;

  let selectedType  = null;
  let builtFields   = [];

  function getEl(id) { return document.getElementById(id); }

  // ── Sigorta türü seçimi → otomatik ilerleme ──
  document.querySelectorAll('.type-card input').forEach(input => {
    input.addEventListener('change', () => {
      selectedType = input.value;
      setTimeout(() => { buildFields(); showStep(2); }, 180);
    });
  });

  // ── Step navigation ──
  function showStep(n) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    getEl('step' + n)?.classList.add('active');
    document.querySelectorAll('.step[data-step]').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.remove('active', 'completed');
      if (sn === n) s.classList.add('active');
      if (sn < n)  s.classList.add('completed');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Render a single field ──
  function renderField(f) {
    if (f.type === 'select') return `
      <div class="field-group">
        <label class="field-label">${f.label}</label>
        <select class="field-input" id="${f.id}">
          ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>
      </div>`;
    if (f.type === 'textarea') return `
      <div class="field-group">
        <label class="field-label">${f.label}</label>
        <textarea class="field-input" id="${f.id}" rows="4" placeholder="${f.placeholder || ''}"></textarea>
      </div>`;
    return `
      <div class="field-group">
        <label class="field-label">${f.label}</label>
        <input class="field-input" type="${f.type}" id="${f.id}" placeholder="${f.placeholder || ''}">
      </div>`;
  }

  // ── Build dynamic fields ──
  function buildFields() {
    const container = getEl('dynamicFields');
    if (!container || !selectedType) return;

    const specific = productFields[selectedType] || productFields.diger;
    builtFields = [...specific, ...contactFields];

    const uploadHTML = `
      <div class="field-group">
        <label class="field-label">Doküman Ekle <span class="optional-tag">isteğe bağlı</span></label>
        <label class="upload-area" id="uploadArea">
          <input type="file" id="docUpload" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style="display:none">
          <div class="upload-icon">📎</div>
          <div class="upload-text">Dosya seçin veya buraya sürükleyin</div>
          <div class="upload-hint">PDF, JPG, PNG, DOC — maks. 10 MB</div>
        </label>
        <div id="uploadedFiles" class="uploaded-files"></div>
      </div>`;

    const whatsappHTML = `
      <a href="${WHATSAPP_LINK}" class="whatsapp-btn" target="_blank" rel="noopener">
        <div class="wa-atlas">
          <svg width="36" height="42" viewBox="0 0 220 260" fill="none">
            <path d="M110 20 C110 20 48 72 48 138 C48 176 75 205 110 208 C145 205 172 176 172 138 C172 72 110 20 110 20Z" fill="url(#wabg)"/>
            <ellipse cx="88" cy="105" rx="16" ry="26" fill="rgba(255,255,255,0.22)" transform="rotate(-20 88 105)"/>
            <ellipse cx="92" cy="148" rx="10" ry="9" fill="white"/>
            <circle cx="94" cy="149" r="5.5" fill="#0A1628"/><circle cx="96" cy="147" r="1.8" fill="white"/>
            <ellipse cx="128" cy="148" rx="10" ry="9" fill="white"/>
            <circle cx="130" cy="149" r="5.5" fill="#0A1628"/><circle cx="132" cy="147" r="1.8" fill="white"/>
            <path d="M100 170 Q110 178 120 170" stroke="white" stroke-width="2.8" stroke-linecap="round" fill="none"/>
            <path d="M52 140 Q34 128 38 112" stroke="url(#waarm1)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <circle cx="37" cy="110" r="7" fill="url(#waarm1)"/>
            <path d="M168 140 Q186 128 182 112" stroke="url(#waarm2)" stroke-width="11" stroke-linecap="round" fill="none"/>
            <circle cx="183" cy="110" r="7" fill="url(#waarm2)"/>
            <defs>
              <linearGradient id="wabg" x1="48" y1="20" x2="172" y2="208" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#60A5FA"/><stop offset="55%" stop-color="#2563EB"/><stop offset="100%" stop-color="#1A40A8"/>
              </linearGradient>
              <linearGradient id="waarm1" x1="52" y1="140" x2="34" y2="108" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/>
              </linearGradient>
              <linearGradient id="waarm2" x1="168" y1="140" x2="186" y2="108" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#60A5FA"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="wa-content">
          <div class="wa-title">WhatsApp'tan hemen iletişime geç</div>
          <div class="wa-sub">Atlas sizi karşılayacak →</div>
        </div>
        <div class="wa-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.51 5.829L.057 23.216a.75.75 0 00.921.921l5.385-1.453A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.77-.524-5.337-1.437l-.382-.228-3.956 1.067 1.067-3.956-.228-.382A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="#25D366"/>
          </svg>
        </div>
      </a>`;

    container.innerHTML = builtFields.map(renderField).join('') + uploadHTML + whatsappHTML;

    // Dosya yükleme
    const uploadInput = getEl('docUpload');
    const uploadArea  = getEl('uploadArea');
    const filesDiv    = getEl('uploadedFiles');
    if (uploadArea && uploadInput) {
      uploadArea.addEventListener('click', () => uploadInput.click());
      uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
      uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
      uploadArea.addEventListener('drop', e => {
        e.preventDefault(); uploadArea.classList.remove('drag-over');
        renderFiles(e.dataTransfer.files);
      });
      uploadInput.addEventListener('change', () => renderFiles(uploadInput.files));
    }
    function renderFiles(files) {
      if (!files || !files.length) return;
      filesDiv.innerHTML = Array.from(files).map(f =>
        `<div class="file-chip">📄 ${f.name} <span>${(f.size/1024).toFixed(0)} KB</span></div>`
      ).join('');
    }
  }

  // ── Tüm form verilerini topla ──
  function collectData() {
    const data = { 'Sigorta Türü': typeLabels[selectedType] || selectedType };
    builtFields.forEach(f => {
      const el = getEl(f.id);
      if (el && el.value && el.value.trim()) data[f.label] = el.value.trim();
    });
    const adSoyad = getEl('adSoyad')?.value.trim();
    const notlar  = getEl('notlar')?.value.trim();
    if (adSoyad) data['Ad Soyad'] = adSoyad;
    if (notlar)  data['Ek Not']   = notlar;
    const fileInput = getEl('docUpload');
    if (fileInput && fileInput.files.length > 0)
      data['Doküman'] = Array.from(fileInput.files).map(f => f.name).join(', ');
    return data;
  }

  // ── Mesaj metni oluştur ──
  function buildMessage(data) {
    const lines = ['🛡️ *Yeni Teklif Talebi — Rem Sigorta*', ''];
    Object.entries(data).forEach(([k, v]) => lines.push(`*${k}:* ${v}`));
    lines.push('', '📅 ' + new Date().toLocaleString('tr-TR'));
    return lines.join('\n');
  }

  // ── Button listeners ──
  getEl('backToStep1')?.addEventListener('click', () => showStep(1));
  getEl('toStep3')?.addEventListener('click',    () => showStep(3));
  getEl('backToStep2')?.addEventListener('click', () => showStep(2));

  getEl('submitBtn')?.addEventListener('click', async () => {
    const ad   = getEl('adSoyad')?.value.trim();
    const kvkk = getEl('kvkk')?.checked;
    if (!ad)   { getEl('adSoyad').focus(); return; }
    if (!kvkk) { alert('Lütfen KVKK metnini onaylayın.'); return; }

    const btn = getEl('submitBtn');
    btn.textContent = 'Gönderiliyor...';
    btn.disabled = true;

    const data = collectData();

    // Formsubmit ile otomatik e-posta gönder
    try {
      await fetch('https://formsubmit.co/ajax/' + OWNER_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Yeni Teklif Talebi — ' + (data['Sigorta Türü'] || ''),
          _captcha: 'false',
          _template: 'table',
          ...data
        })
      });
    } catch(e) {
      // Sessizce geç, kullanıcı deneyimini engelleme
    }

    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    getEl('stepSuccess')?.classList.add('active');
    if (getEl('steps')) getEl('steps').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
