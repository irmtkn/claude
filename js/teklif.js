// ═══════════════════════════════════════
// TEKLİF FORMU — MULTI-STEP LOGIC
// ═══════════════════════════════════════

(function() {

  // Sigorta türüne göre dinamik alanlar
  const fieldConfig = {
    kasko: [
      { id: 'aracMarka', label: 'Araç Markası', type: 'text', placeholder: 'Toyota, BMW, Renault...' },
      { id: 'aracModel', label: 'Model & Yıl', type: 'text', placeholder: '2021 Corolla' },
      { id: 'aracPlaka', label: 'Plaka (isteğe bağlı)', type: 'text', placeholder: '34 ABC 123' },
      { id: 'kaskoTipi', label: 'Teminat Tipi', type: 'select', options: ['Genişletilmiş Kasko', 'Mini Onarım Ekli', 'Dar Kasko', 'Hırsızlık Ekli'] },
    ],
    trafik: [
      { id: 'aracMarka', label: 'Araç Markası', type: 'text', placeholder: 'Toyota, BMW, Renault...' },
      { id: 'aracModel', label: 'Model & Yıl', type: 'text', placeholder: '2021 Corolla' },
      { id: 'aracPlaka', label: 'Plaka', type: 'text', placeholder: '34 ABC 123' },
    ],
    konut: [
      { id: 'konutTipi', label: 'Konut Tipi', type: 'select', options: ['Daire', 'Müstakil Ev', 'Villa', 'İş Yeri'] },
      { id: 'konutMetrekare', label: 'Metrekare (m²)', type: 'number', placeholder: '120' },
      { id: 'konutSehir', label: 'Şehir', type: 'text', placeholder: 'İstanbul' },
      { id: 'konutDeprem', label: 'DASK Dahil mi?', type: 'select', options: ['Evet, dahil edin', 'Hayır, sadece konut'] },
    ],
    saglik: [
      { id: 'saglikYas', label: 'Yaşınız', type: 'number', placeholder: '35' },
      { id: 'saglikKisi', label: 'Kaç kişi için?', type: 'select', options: ['Sadece ben', '2 kişi (çift)', '3+ kişi (aile)'] },
      { id: 'saglikPaket', label: 'Paket Tercihi', type: 'select', options: ['Tamamlayıcı Sağlık', 'Kapsamlı Sağlık', 'Diş + Göz Ekli', 'Kurumsal'] },
    ],
    seyahat: [
      { id: 'seyahatNereye', label: 'Seyahat Yeri', type: 'select', options: ['Yurt İçi', 'Avrupa', 'Dünya Geneli', 'Schengen'] },
      { id: 'seyahatTarih', label: 'Gidiş Tarihi', type: 'date' },
      { id: 'seyahatKisi', label: 'Yolcu Sayısı', type: 'number', placeholder: '2' },
    ],
    isyeri: [
      { id: 'isyeriTur', label: 'İşyeri Türü', type: 'select', options: ['Ofis', 'Market', 'Restoran', 'Atölye', 'Depo', 'Diğer'] },
      { id: 'isyeriMetrekare', label: 'Metrekare (m²)', type: 'number', placeholder: '200' },
      { id: 'isyeriSehir', label: 'Şehir', type: 'text', placeholder: 'İstanbul' },
    ],
    evcil: [
      { id: 'evcilTur', label: 'Hayvan Türü', type: 'select', options: ['Köpek', 'Kedi', 'Diğer'] },
      { id: 'evcilYas', label: 'Yaşı', type: 'text', placeholder: '3 yaşında' },
      { id: 'evcilIrk', label: 'Irkı (isteğe bağlı)', type: 'text', placeholder: 'Golden Retriever' },
    ],
    diger: [
      { id: 'digerAciklama', label: 'Ne tür sigortaya ihtiyacınız var?', type: 'textarea', placeholder: 'Lütfen açıklayın...' },
    ],
  };

  let selectedType = null;

  function getEl(id) { return document.getElementById(id); }

  // ── Sigorta türü seçimi ──
  const typeCards = document.querySelectorAll('.type-card input');
  const toStep2Btn = getEl('toStep2');

  typeCards.forEach(input => {
    input.addEventListener('change', () => {
      selectedType = input.value;
      if (toStep2Btn) toStep2Btn.disabled = false;
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

  // ── Build dynamic fields ──
  function buildFields() {
    const container = getEl('dynamicFields');
    if (!container || !selectedType) return;

    const fields = fieldConfig[selectedType] || fieldConfig.diger;
    container.innerHTML = fields.map(f => {
      if (f.type === 'select') {
        return `
          <div class="field-group">
            <label class="field-label">${f.label}</label>
            <select class="field-input" id="${f.id}">
              ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
            </select>
          </div>`;
      }
      if (f.type === 'textarea') {
        return `
          <div class="field-group">
            <label class="field-label">${f.label}</label>
            <textarea class="field-input" id="${f.id}" rows="4" placeholder="${f.placeholder || ''}"></textarea>
          </div>`;
      }
      return `
        <div class="field-group">
          <label class="field-label">${f.label}</label>
          <input class="field-input" type="${f.type}" id="${f.id}" placeholder="${f.placeholder || ''}">
        </div>`;
    }).join('');
  }

  // ── Button listeners ──
  getEl('toStep2')?.addEventListener('click', () => {
    if (!selectedType) return;
    buildFields();
    showStep(2);
  });

  getEl('backToStep1')?.addEventListener('click', () => showStep(1));
  getEl('toStep3')?.addEventListener('click', () => showStep(3));
  getEl('backToStep2')?.addEventListener('click', () => showStep(2));

  getEl('submitBtn')?.addEventListener('click', () => {
    const ad = getEl('adSoyad')?.value.trim();
    const tel = getEl('telefon')?.value.trim();
    const kvkk = getEl('kvkk')?.checked;

    if (!ad) { getEl('adSoyad').focus(); return; }
    if (!tel) { getEl('telefon').focus(); return; }
    if (!kvkk) { alert('Lütfen KVKK metnini onaylayın.'); return; }

    // Show success
    const successPhone = getEl('successPhone');
    if (successPhone) successPhone.textContent = tel;
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    getEl('stepSuccess')?.classList.add('active');
    getEl('steps')?.style && (getEl('steps').style.display = 'none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
