// ============================================================
// AgriSense AI — FEATURES
// Disease Detection, Chat, Marketplace, Prices,
// Weather, Forum, Dashboard, News
// ============================================================

// ---- Helpers ----
function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

// ============================================================
// DISEASE DETECTION
// ============================================================
let uploadedFile = null;

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image too large. Max 5MB.', 'error');
    return;
  }
  uploadedFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('previewImg').src = ev.target.result;
    document.getElementById('imagePreview').classList.remove('hidden');
    document.getElementById('diseaseResult').classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function analyzeDisease() {
  if (!uploadedFile) {
    showToast('Please upload a crop image first.', 'error');
    return;
  }

  document.getElementById('diseaseLoading').classList.remove('hidden');
  document.getElementById('diseaseResult').classList.add('hidden');

  const diseases = [
    {
      name: 'Cassava Mosaic Disease', conf: '94.2%',
      treatment: 'Remove and destroy infected plants. Use resistant varieties like TME 419. Apply insecticide to control whitefly vectors.',
      prevention: 'Plant certified virus-free cuttings. Use intercropping with legumes. Maintain field sanitation.'
    },
    {
      name: 'Maize Northern Leaf Blight', conf: '91.7%',
      treatment: 'Apply fungicides containing tebuconazole or propiconazole. Remove infected leaves. Improve air circulation.',
      prevention: 'Plant resistant hybrids. Practice crop rotation. Avoid overhead irrigation.'
    },
    {
      name: 'Tomato Late Blight', conf: '96.1%',
      treatment: 'Apply copper-based fungicides immediately. Remove and destroy affected fruits and leaves.',
      prevention: 'Use resistant varieties. Ensure proper spacing. Water at soil level not on leaves.'
    },
    {
      name: 'Yam Anthracnose', conf: '88.9%',
      treatment: 'Remove infected vines. Apply mancozeb or copper fungicides. Improve drainage.',
      prevention: 'Use disease-free setts. Practice crop rotation. Plant in well-drained soil.'
    },
    {
      name: 'Rice Blast', conf: '93.5%',
      treatment: 'Apply tricyclazole or carbendazim. Reduce nitrogen fertilizer. Flood fields to suppress disease.',
      prevention: 'Plant resistant varieties. Use balanced fertilization. Space planting to reduce humidity.'
    },
    {
      name: 'Sorghum Head Smut', conf: '90.3%',
      treatment: 'Remove and destroy infected heads before spores release. Apply seed treatment fungicides.',
      prevention: 'Use certified treated seeds. Practice crop rotation. Remove crop residues.'
    }
  ];

  setTimeout(() => {
    document.getElementById('diseaseLoading').classList.add('hidden');
    document.getElementById('diseaseResult').classList.remove('hidden');

    const result = diseases[Math.floor(Math.random() * diseases.length)];
    document.getElementById('diseaseName').textContent = result.name;
    document.getElementById('diseaseConfidence').textContent = `Confidence: ${result.conf}`;
    document.getElementById('treatmentText').textContent = result.treatment;
    document.getElementById('preventionText').textContent = result.prevention;

    updateDash('diseases');
    showToast('Diagnosis complete!', 'success');
  }, 2500);
}

// Drag-and-drop for upload zone
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
  ['dragover', 'dragenter'].forEach(ev => {
    uploadZone.addEventListener(ev, e => {
      e.preventDefault();
      uploadZone.classList.add('dragging');
    });
  });
  ['dragleave', 'drop'].forEach(ev => {
    uploadZone.addEventListener(ev, () => uploadZone.classList.remove('dragging'));
  });
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const dt = { target: { files: [file] } };
      handleImageUpload(dt);
    }
  });
}

// ============================================================
// AI CHAT
// ============================================================
function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const container = document.getElementById('chatMessages');

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-message user';
  userDiv.innerHTML = `<div class="msg-label">You</div>${escapeHtml(msg)}`;
  container.appendChild(userDiv);
  input.value = '';

  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message assistant';
  typingDiv.innerHTML = `<div class="msg-label">AgriSense AI</div><div class="loader" style="margin:0;width:20px;height:20px;border-width:2px;"></div>`;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;

  const lang = currentLang;
  const responses = {
    en: [
      'Great question! For maize farming in Nigeria, plant at the start of the rainy season (April–May). Use improved varieties like SAMMAZ 52. Apply NPK fertilizer 2–3 weeks after planting.',
      'To control fall armyworm, use neem extract spray or recommended insecticides like emamectin benzoate. Early detection is key — check for leaf damage every morning.',
      'For cassava, the best planting time is at the onset of rains. Use disease-free cuttings 25 cm long. Harvest after 12–18 months depending on the variety.',
      'Tomatoes need well-drained soil with pH 5.5–6.5. Stake your plants to reduce disease. Water consistently — irregular watering causes blossom end rot.',
      'Soil testing is important! Take samples from different parts of your farm, mix them, and test at an agricultural extension office. This tells you what nutrients your soil needs.',
      'For poultry farming, ensure proper housing with ventilation. Vaccinate against Newcastle disease. Feed balanced rations with 18–20% protein for layers.',
      'Rice farming: prepare your paddy field well. Flood to 5–10 cm depth after transplanting. Apply nitrogen fertilizer at tillering and panicle initiation stages.',
      'To make organic pesticide: blend 500 g of neem leaves with 100 g of garlic and 10 g of chili. Soak in 5 L water overnight, strain and spray.'
    ],
    ha: [
      'Tambaya mai kyau! Don noman masara a Najeriya, shuka a farkon damina (Afrilu–Mayu). Yi amfani da iri ingantattu kamar SAMMAZ 52. Yi amfani da taki NPK bayan makonni 2–3.',
      'Don shawo kan tsutsar fall armyworm, yi amfani da ruwan neem ko magungunan kashe kwari kamar emamectin benzoate. Gano wuri yana da mahimmanci.',
      'Don rogo, mafi kyawun lokacin shuka shine farkon damina. Yi amfani da tsire-tsire marasa cuta. Girbi bayan watanni 12–18.',
      'Tumatir suna buƙatar ƙasa mai laushi da pH 5.5–6.5. Ɗora turakun don rage cututtuka. Yi shayarwa akai-akai.',
      'Gwajin ƙasa yana da mahimmanci! Ɗauki samfura daga sassa daban-daban na gonarka.'
    ],
    yo: [
      'Ibeere to dara! Fun gbigbin agbado ni Naijiria, gbin ni ibẹrẹ akoko ojo (Oṣu Kẹrin–Karun). Lo awọn iru didara bii SAMMAZ 52.',
      'Lati ṣakoso fall armyworm, lo omi neem tabi awọn oogun kokoro bi emamectin benzoate. Ṣawari ibẹrẹ ṣe pataki.',
      'Fun gbigbin isu, akoko ti o dara julọ ni ibẹrẹ ojo. Lo awọn eso ti ko ni arun. Ikore lẹhin oṣu 12–18.'
    ],
    ig: [
      'Ajụjụ mara mma! Maka ịkụ ọka na Naijiria, kụọ na mmalite oge mmiri (Eprel–Mee). Jiri ụdị ndị ka mma dị ka SAMMAZ 52.',
      'Iji chịkwaa fall armyworm, jiri mmiri neem ma ọ bụ ọgwụ ụmụ ahụhụ dị ka emamectin benzoate. Nchọpụta mbụ dị mkpa.',
      'Maka akpu, oge kacha mma ịkụ ya bụ mmalite oge mmiri. Jiri mkpụrụ na-enweghị ọrịa. Gbute mgbe ọnwa 12–18 gachara.'
    ],
    ful: [
      'Lamɓe moƴƴe! Ngam remri masiro nder Naajeeriya, remu nder fuɗɗam dumgol (Abriil–Mee). Huutoro iri moƴƴi bana SAMMAZ 52.',
      'Ngam haɓugo bee nyiwu fall armyworm, huutoro ndiyam neem maa kahol bana emamectin benzoate.',
      'Ngam roogo, sahaaji ɓurɗi moƴƴude ngam remru ko fuɗɗam dumgol. Huutoro remruɗe ɗe ngalaa nyawu.'
    ],
    kr: [
      'Tambayowu cidau! Kowa ngama masara shibe Najeriya, shiboro wanyike dagan (April–May). SAMMAZ 52 awa gowuri kuruwa.',
      'Fall armyworm kashinangaro, neem nyiji awa emamectin benzoate defowo. Dagan cidau buktuwa.',
      'Kowa ngama rogo, wanyike dagan shiboro cidau. Kesuwa awa kuruwa. 12–18 wunan kwaskene.'
    ]
  };

  setTimeout(() => {
    container.removeChild(typingDiv);
    const replyDiv = document.createElement('div');
    replyDiv.className = 'chat-message assistant';
    const pool = responses[lang] || responses.en;
    const reply = pool[Math.floor(Math.random() * pool.length)];
    replyDiv.innerHTML = `<div class="msg-label">AgriSense AI (${langLabels[lang] || 'English'})</div>${escapeHtml(reply)}`;
    container.appendChild(replyDiv);
    container.scrollTop = container.scrollHeight;
    updateDash('chats');
  }, 1400 + Math.random() * 1200);
}

// ============================================================
// MARKETPLACE
// ============================================================
let products = [
  { name: 'Fresh Tomatoes',   category: 'Vegetables', price: 6500,   unit: 'crate',  location: 'Kano State',    phone: '+2348012345678', desc: 'Farm-fresh Roma tomatoes' },
  { name: 'Organic Maize',    category: 'Grains',     price: 32000,  unit: 'bag',    location: 'Kaduna State',  phone: '+2348023456789', desc: 'White maize, freshly harvested' },
  { name: 'Cassava Tubers',   category: 'Tubers',     price: 8500,   unit: 'bag',    location: 'Benue State',   phone: '+2348034567890', desc: 'Sweet cassava, ready for gari processing' },
  { name: 'Yam Tubers',       category: 'Tubers',     price: 12000,  unit: 'bag',    location: 'Oyo State',     phone: '+2348045678901', desc: 'White yam, best for pounding' },
  { name: 'Fresh Peppers',    category: 'Vegetables', price: 4500,   unit: 'crate',  location: 'Kano State',    phone: '+2348056789012', desc: 'Red tattasai and rodo' },
  { name: 'Pure Honey',       category: 'Other',      price: 3500,   unit: 'kg',     location: 'Adamawa State', phone: '+2348067890123', desc: 'Natural forest honey' },
  { name: 'Soybeans',         category: 'Grains',     price: 28000,  unit: 'bag',    location: 'Benue State',   phone: '+2348078901234', desc: 'High-protein soybeans' },
  { name: 'Goat (Live)',      category: 'Livestock',  price: 45000,  unit: 'piece',  location: 'Sokoto State',  phone: '+2348089012345', desc: 'Healthy adult goat' },
  { name: 'Fresh Tilapia',    category: 'Livestock',  price: 2500,   unit: 'kg',     location: 'Lagos State',   phone: '+2348090123456', desc: 'Fresh fish from local pond' },
  { name: 'Groundnut',        category: 'Grains',     price: 22000,  unit: 'bag',    location: 'Kano State',    phone: '+2348101234567', desc: 'Dried groundnuts, premium quality' }
];

function renderMarketplace() {
  const grid   = document.getElementById('marketGrid');
  const search = (document.getElementById('marketSearch').value || '').toLowerCase();
  const filter = document.getElementById('marketFilter').value;

  let filtered = products;
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search));
  if (filter !== 'all') filtered = filtered.filter(p => p.category === filter);

  if (!filtered.length) {
    grid.innerHTML = '<div class="text-center" style="grid-column:1/-1;padding:48px;color:var(--text-muted);">No products found. Be the first to list!</div>';
    return;
  }

  const iconSvg = `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const pinSvg  = `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const tagSvg  = `<svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="img">${iconSvg}</div>
      <div class="body">
        <h4>${escapeHtml(p.name)}</h4>
        <div class="price">₦${p.price.toLocaleString()} / ${p.unit}</div>
        <div class="meta">
          <span>${pinSvg}${escapeHtml(p.location)}</span>
          <span>${tagSvg}${p.category}</span>
        </div>
        <p style="font-size:13px;color:var(--text-muted);margin-top:8px;">${escapeHtml(p.desc)}</p>
        <button class="btn btn-primary btn-sm mt-2" onclick="contactSeller('${escapeHtml(p.phone)}', '${escapeHtml(p.name)}')">Contact Seller</button>
      </div>
    </div>
  `).join('');
}

function contactSeller(phone, name) {
  showToast(`Contact ${name} at ${phone}`, 'info');
}

function showAddProduct() {
  document.getElementById('addProductModal').classList.remove('hidden');
}

function closeAddProduct() {
  document.getElementById('addProductModal').classList.add('hidden');
}

function addProduct() {
  const name     = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const price    = parseFloat(document.getElementById('prodPrice').value);
  const unit     = document.getElementById('prodUnit').value;
  const location = document.getElementById('prodLocation').value.trim();
  const desc     = document.getElementById('prodDesc').value.trim();
  const phone    = document.getElementById('prodPhone').value.trim();

  if (!name || !price || !location || !phone) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  products.unshift({ name, category, price, unit, location, desc, phone });
  renderMarketplace();
  closeAddProduct();
  document.querySelector('#addProductModal form').reset();
  showToast('Product listed successfully!', 'success');
  updateDash('products');
}

// ============================================================
// MARKET PRICES
// ============================================================
const priceData = [
  { crop: 'Maize (White)',    market: 'Dawanau, Kano',       price: 28500,  unit: 'bag (100kg)', trend: 'up' },
  { crop: 'Maize (Yellow)',   market: 'Bata, Nasarawa',      price: 27000,  unit: 'bag (100kg)', trend: 'down' },
  { crop: 'Rice (Local)',     market: 'Aba, Abia',           price: 45000,  unit: 'bag (50kg)',  trend: 'up' },
  { crop: 'Rice (Imported)',  market: 'Mile 12, Lagos',      price: 52000,  unit: 'bag (50kg)',  trend: 'up' },
  { crop: 'Tomatoes',         market: 'Yankaba, Kano',       price: 5800,   unit: 'crate',       trend: 'down' },
  { crop: 'Peppers (Rodo)',   market: 'Kurmi, Kano',         price: 4200,   unit: 'crate',       trend: 'up' },
  { crop: 'Onions',           market: 'Gwadabawa, Sokoto',   price: 8500,   unit: 'bag',         trend: 'stable' },
  { crop: 'Cassava',          market: 'Otukpo, Benue',       price: 7500,   unit: 'bag',         trend: 'up' },
  { crop: 'Yam',              market: 'Bodija, Ibadan',      price: 11000,  unit: 'bag',         trend: 'stable' },
  { crop: 'Groundnut',        market: 'Sabon Gari, Kano',    price: 24000,  unit: 'bag',         trend: 'down' },
  { crop: 'Soybeans',         market: 'Makurdi, Benue',      price: 26500,  unit: 'bag',         trend: 'up' },
  { crop: 'Cowpea',           market: 'Mando, Kaduna',       price: 32000,  unit: 'bag',         trend: 'up' },
  { crop: 'Sorghum',          market: 'Gusau, Zamfara',      price: 19500,  unit: 'bag',         trend: 'down' },
  { crop: 'Millet',           market: 'Potiskum, Yobe',      price: 18000,  unit: 'bag',         trend: 'stable' },
  { crop: 'Cocoa',            market: 'Akure, Ondo',         price: 850000, unit: 'tonne',       trend: 'up' }
];

function renderPrices() {
  const tbody = document.getElementById('priceBody');
  tbody.innerHTML = priceData.map(p => {
    const trendClass = p.trend === 'up' ? 'up' : p.trend === 'down' ? 'down' : 'stable';
    const trendLabel = p.trend === 'up' ? '▲ Up' : p.trend === 'down' ? '▼ Down' : '→ Stable';
    return `
      <tr>
        <td><strong>${p.crop}</strong></td>
        <td>${p.market}</td>
        <td><strong>₦${p.price.toLocaleString()}</strong></td>
        <td>${p.unit}</td>
        <td><span class="trend-badge ${trendClass}">${trendLabel}</span></td>
        <td style="font-size:12px;color:var(--text-subtle);">Today</td>
      </tr>`;
  }).join('');
}

// ============================================================
// WEATHER
// ============================================================
const weatherData = {
  'Kano':          { temp: 32, condition: 'Sunny',         humidity: 45, wind: 12, rain: 0,  uv: 6, advice: 'Good day for planting. Soil moisture levels are adequate. Consider irrigating in the evening.',           crops: 'Maize, Millet, Sorghum, Groundnut', icon: 'sun' },
  'Kaduna':        { temp: 29, condition: 'Partly Cloudy', humidity: 52, wind: 10, rain: 10, uv: 5, advice: 'Good conditions for transplanting seedlings.',                                                            crops: 'Maize, Yam, Cassava, Rice', icon: 'cloud' },
  'Lagos':         { temp: 30, condition: 'Light Rain',    humidity: 78, wind: 15, rain: 60, uv: 3, advice: 'Rain expected. Hold off on fertilizer application.',                                                      crops: 'Cassava, Vegetables, Rice, Plantain', icon: 'rain' },
  'Abuja':         { temp: 31, condition: 'Sunny',         humidity: 40, wind: 8,  rain: 0,  uv: 7, advice: 'Ideal for groundnut and soybean planting.',                                                              crops: 'Maize, Sorghum, Soybean, Groundnut', icon: 'sun' },
  'Ibadan':        { temp: 28, condition: 'Partly Cloudy', humidity: 65, wind: 9,  rain: 20, uv: 4, advice: 'Good for yam mound preparation.',                                                                        crops: 'Yam, Cassava, Maize, Cocoa', icon: 'cloud' },
  'Maiduguri':     { temp: 36, condition: 'Sunny',         humidity: 25, wind: 18, rain: 0,  uv: 9, advice: 'Very hot. Irrigate crops in early morning or evening.',                                                  crops: 'Millet, Sorghum, Cowpea, Groundnut', icon: 'sun' },
  'Jos':           { temp: 25, condition: 'Cloudy',        humidity: 58, wind: 11, rain: 15, uv: 4, advice: 'Cool conditions good for vegetable farming.',                                                            crops: 'Potatoes, Cabbage, Tomatoes, Carrots', icon: 'cloud' },
  'Sokoto':        { temp: 34, condition: 'Sunny',         humidity: 30, wind: 14, rain: 0,  uv: 8, advice: 'Dry conditions. Focus on drought-resistant crops.',                                                      crops: 'Sorghum, Millet, Cowpea, Groundnut', icon: 'sun' },
  'Enugu':         { temp: 29, condition: 'Partly Cloudy', humidity: 62, wind: 7,  rain: 30, uv: 5, advice: 'Good for cassava and yam planting.',                                                                     crops: 'Yam, Cassava, Maize, Palm Oil', icon: 'cloud' },
  'Port Harcourt': { temp: 28, condition: 'Rainy',         humidity: 82, wind: 13, rain: 70, uv: 2, advice: 'Heavy rain expected. Ensure proper drainage.',                                                           crops: 'Cassava, Plantain, Oil Palm, Vegetables', icon: 'rain' }
};

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weatherIcons = {
  sun:   '&#9728;',  // ☀
  cloud: '&#9925;',  // ⛅
  rain:  '&#127783;' // 🌧
};
const forecastIcons = ['&#9728;', '&#9925;', '&#127783;', '&#9728;', '&#9925;', '&#127783;', '&#9728;'];

function updateWeather() {
  const region = document.getElementById('weatherRegion').value;
  const data = weatherData[region] || weatherData['Kano'];

  document.getElementById('weatherCity').textContent      = region;
  document.getElementById('weatherTemp').textContent      = `${data.temp}°C`;
  document.getElementById('weatherCondition').textContent = data.condition;
  document.getElementById('weatherHumidity').textContent  = `${data.humidity}%`;
  document.getElementById('weatherWind').textContent      = `${data.wind} km/h`;
  document.getElementById('weatherRain').textContent      = `${data.rain}%`;
  document.getElementById('weatherUv').textContent        = data.uv;
  document.getElementById('weatherAdvice').textContent    = data.advice;
  document.getElementById('weatherCrops').textContent     = data.crops;

  const week = document.getElementById('weatherWeek');
  const today = new Date();
  week.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dayTemp = data.temp + Math.floor(Math.random() * 7) - 3;
    const icon = forecastIcons[(d.getDay() + i) % forecastIcons.length];
    week.innerHTML += `
      <div class="weather-day">
        <div class="day-name">${i === 0 ? 'Today' : dayNames[d.getDay()]}</div>
        <div class="day-icon">${icon}</div>
        <div class="day-temp">${dayTemp}°</div>
      </div>`;
  }
}

// ============================================================
// FORUM
// ============================================================
let forumPosts = [
  { title: 'Best practices for cassava farming in dry season?', topic: 'Techniques', author: 'Aliyu B.',    date: '2 hours ago',  content: 'I need advice on how to maintain cassava during the dry months. Any tips?' },
  { title: 'Fall armyworm outbreak in Kaduna',                  topic: 'Pests',      author: 'Fatima S.',   date: '5 hours ago',  content: 'There is a serious armyworm infestation in my area. What is the best treatment?' },
  { title: 'Tomato prices dropping in Kano market',             topic: 'Market',     author: 'Chinedu O.',  date: '1 day ago',    content: 'Tomato prices have dropped 30% this week. Anyone know why?' },
  { title: 'When to plant maize in Benue?',                     topic: 'Crops',      author: 'Terseer A.',  date: '2 days ago',   content: 'What is the optimal planting window for maize in Benue State this season?' },
  { title: 'Organic fertilizer recommendations',                topic: 'Techniques', author: 'Grace O.',    date: '3 days ago',   content: 'Looking for affordable organic fertilizer options for my vegetable farm.' },
  { title: 'Rainfall forecast for August in the North',         topic: 'Weather',    author: 'Sani M.',     date: '4 days ago',   content: 'Any predictions for rainfall patterns this August in northern Nigeria?' }
];

function renderForum() {
  const container = document.getElementById('forumPosts');
  const filter = document.getElementById('forumFilter').value;
  let filtered = forumPosts;
  if (filter !== 'all') filtered = filtered.filter(p => p.topic === filter);

  if (!filtered.length) {
    container.innerHTML = '<div class="text-center" style="padding:48px;color:var(--text-muted);">No posts yet. Start a discussion!</div>';
    return;
  }

  const personSvg = `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const clockSvg  = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

  container.innerHTML = filtered.map(p => `
    <div class="forum-post">
      <div style="display:flex;justify-content:space-between;align-items:start;gap:12px;">
        <h4>${escapeHtml(p.title)}</h4>
        <span class="badge" style="flex-shrink:0;">${p.topic}</span>
      </div>
      <p style="font-size:14px;color:var(--text-muted);margin:8px 0;">${escapeHtml(p.content)}</p>
      <div class="meta">
        <span>${personSvg}${escapeHtml(p.author)}</span>
        <span>${clockSvg}${p.date}</span>
      </div>
    </div>
  `).join('');
}

function showNewPost() {
  document.getElementById('newPostModal').classList.remove('hidden');
}

function closeNewPost() {
  document.getElementById('newPostModal').classList.add('hidden');
}

function addForumPost() {
  const title   = document.getElementById('postTitle').value.trim();
  const topic   = document.getElementById('postTopic').value;
  const content = document.getElementById('postContent').value.trim();
  if (!title || !content) {
    showToast('Please fill in title and content.', 'error');
    return;
  }
  forumPosts.unshift({ title, topic, author: 'You', date: 'Just now', content });
  renderForum();
  closeNewPost();
  document.querySelector('#newPostModal form').reset();
  showToast('Post added to community!', 'success');
}

// ============================================================
// DASHBOARD
// ============================================================
const dashCounts = { diseases: 0, chats: 0, products: 0, priceChecks: 0 };

function updateDash(type) {
  if (dashCounts[type] !== undefined) dashCounts[type]++;
  document.getElementById('dashDiseases').textContent   = dashCounts.diseases;
  document.getElementById('dashChats').textContent      = dashCounts.chats;
  document.getElementById('dashProducts').textContent   = dashCounts.products;
  document.getElementById('dashPriceChecks').textContent = dashCounts.priceChecks;
  updateActivity();
}

function updateActivity() {
  const container = document.getElementById('dashActivity');
  const activities = [];
  if (dashCounts.diseases   > 0) activities.push(`${dashCounts.diseases} disease detection${dashCounts.diseases > 1 ? 's' : ''}`);
  if (dashCounts.chats      > 0) activities.push(`${dashCounts.chats} AI chat session${dashCounts.chats > 1 ? 's' : ''}`);
  if (dashCounts.products   > 0) activities.push(`${dashCounts.products} product${dashCounts.products > 1 ? 's' : ''} listed`);
  if (dashCounts.priceChecks > 0) activities.push(`${dashCounts.priceChecks} price check${dashCounts.priceChecks > 1 ? 's' : ''}`);

  if (!activities.length) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No activity yet. Start using AgriSense AI!</p>';
  } else {
    container.innerHTML = activities.map(a =>
      `<div style="padding:10px 0;border-bottom:1px solid var(--border);font-size:14px;display:flex;align-items:center;gap:10px;"><div style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0;"></div>${a}</div>`
    ).join('');
  }
}

// ============================================================
// NEWS
// ============================================================
const newsArticles = [
  { title: 'Federal Government Launches New Agricultural Extension Program',              source: 'NAN',           date: '2 days ago',  summary: 'The FG has announced a ₦50 billion program to train 10,000 extension officers across Nigeria.' },
  { title: 'Cassava Value Chain: Nigeria Targets ₦20 Trillion Export by 2027',           source: 'Business Day',  date: '4 days ago',  summary: 'New processing technologies and export partnerships aimed at boosting cassava revenue.' },
  { title: 'Dry Season Farming Gets Boost with New Irrigation Scheme',                   source: 'Daily Trust',   date: '1 week ago',  summary: 'The government launches 15 new irrigation projects across northern states to support dry season farming.' },
  { title: 'Climate-Smart Agriculture: Nigeria Adopts New Farming Techniques',           source: 'Premium Times', date: '1 week ago',  summary: 'Farmers trained in drought-resistant crops and water-efficient techniques to combat climate change.' },
  { title: 'Maize Production Hits Record High in 2025 Season',                           source: 'AgriNews NG',   date: '2 weeks ago', summary: 'Nigerian maize production reaches 15 million metric tonnes, driven by improved varieties and good rainfall.' }
];

function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = newsArticles.map(n => `
    <div class="card news-card">
      <div class="source-badge">${escapeHtml(n.source)}</div>
      <h4>${escapeHtml(n.title)}</h4>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">${escapeHtml(n.summary)}</p>
      <div class="date">${n.date}</div>
    </div>
  `).join('');
}
