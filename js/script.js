// ═══ DATA ═══
const perButir = [
  { kode:'P01', label:'Praktik hemat energi sehari-hari',           rata:3.51, sering:98.6, jarang:1.4  },
  { kode:'P02', label:'Tindakan nyata di bengkel/lab/kelas/rumah',  rata:3.46, sering:95.4, jarang:4.6  },
  { kode:'P03', label:'Matikan lampu/AC/kipas saat kelas kosong',   rata:3.37, sering:90.6, jarang:9.4  },
  { kode:'P04', label:'Batasi penggunaan gawai/laptop',             rata:3.22, sering:86.3, jarang:13.7 },
  { kode:'P05', label:'Pilih fasilitas/transportasi hemat energi',  rata:3.30, sering:86.6, jarang:13.4 },
  { kode:'P06', label:'Cabut charger/steker setelah dipakai',       rata:3.45, sering:92.0, jarang:8.0  },
  { kode:'P07', label:'Manfaatkan cahaya matahari',                 rata:3.36, sering:89.5, jarang:10.5 },
  { kode:'P08', label:'Atur suhu AC/kipas secukupnya',              rata:3.31, sering:90.4, jarang:9.6  },
  { kode:'P09', label:'Berani menegur/mengajak teman',              rata:3.22, sering:86.8, jarang:13.2 },
  { kode:'P10', label:'Pastikan peralatan mati sebelum pulang',     rata:3.41, sering:91.7, jarang:8.3  },
];

const perJurusan = [
  { kode:'PMN',  nama:'Pemasaran',                              n:72,  avg:3.51, total:35.08, pct_sb:70.8 },
  { kode:'HTL',  nama:'Perhotelan',                             n:69,  avg:3.46, total:34.58, pct_sb:65.2 },
  { kode:'KLN',  nama:'Kuliner',                                n:71,  avg:3.43, total:34.30, pct_sb:64.8 },
  { kode:'TJKT', nama:'Tek. Jaringan Komputer & Telkom',        n:104, avg:3.42, total:34.24, pct_sb:67.3 },
  { kode:'DKV',  nama:'Desain Komunikasi Visual',               n:107, avg:3.34, total:33.45, pct_sb:57.9 },
  { kode:'MPLB', nama:'Manajemen Perkantoran & Layanan Bisnis', n:37,  avg:3.24, total:32.35, pct_sb:51.4 },
  { kode:'PPLG', nama:'Pengembangan Perangkat Lunak & Gim',     n:176, avg:3.24, total:32.36, pct_sb:48.3 },
];

const sebaran = [
  {s:10,j:1},{s:18,j:1},{s:20,j:1},{s:22,j:1},{s:23,j:3},{s:24,j:5},
  {s:25,j:12},{s:26,j:6},{s:27,j:22},{s:28,j:26},{s:29,j:35},{s:30,j:64},
  {s:31,j:44},{s:32,j:37},{s:33,j:44},{s:34,j:50},{s:35,j:51},{s:36,j:42},
  {s:37,j:45},{s:38,j:34},{s:39,j:26},{s:40,j:86}
];

// ═══ CHART DEFAULTS (light theme) ═══
Chart.defaults.color        = '#64748b';
Chart.defaults.borderColor  = '#e2e8f0';
Chart.defaults.font.family  = 'Inter';
Chart.defaults.font.size    = 12;

// helpers
const C = {
  green:  'rgba(34,197,94,',
  teal:   'rgba(20,184,166,',
  lime:   'rgba(132,204,22,',
  amber:  'rgba(245,158,11,',
  red:    'rgba(248,113,113,',
};

// ── Chart 1: Per Butir ──
new Chart(document.getElementById('chartButir'), {
  type: 'bar',
  data: {
    labels: perButir.map(d => d.kode),
    datasets: [{
      label: 'Rata-rata Skor',
      data: perButir.map(d => d.rata),
      backgroundColor: perButir.map(d =>
        d.rata >= 3.4 ? C.green+'0.75)' :
        d.rata >= 3.3 ? C.teal+'0.65)'  : C.amber+'0.65)'
      ),
      borderColor: perButir.map(d =>
        d.rata >= 3.4 ? '#22c55e' : d.rata >= 3.3 ? '#14b8a6' : '#f59e0b'
      ),
      borderWidth: 1.5, borderRadius: 7, borderSkipped: false,
    }]
  },
  options: {
    responsive:true,
    plugins:{
      legend:{display:false},
      tooltip:{callbacks:{
        label: ctx => ` Rata-rata: ${ctx.parsed.y}`,
        afterLabel: ctx => {
          const d = perButir[ctx.dataIndex];
          return [`Sering: ${d.sering}%  |  Jarang: ${d.jarang}%`, d.label];
        }
      }}
    },
    scales:{
      y:{ min:2.9, max:3.7, grid:{color:'#f1f5f9'}, ticks:{stepSize:.1} },
      x:{ grid:{display:false} }
    }
  }
});

// ── Chart 2: Donut dashboard ──
const donutData = {
  labels:['Sangat Baik','Baik','Cukup','Kurang'],
  datasets:[{
    data:[59.4,36.8,3.6,0.2],
    backgroundColor:['#22c55e','#14b8a6','#f59e0b','#f87171'],
    borderColor:'#ffffff', borderWidth:3, hoverOffset:8,
  }]
};
new Chart(document.getElementById('chartKategori'), {
  type:'doughnut', data: donutData,
  options:{ responsive:true, cutout:'70%',
    plugins:{ legend:{position:'bottom',labels:{padding:14,font:{size:11}}},
      tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.raw}%`}} }
  }
});

// ── Chart 3: Jurusan Horizontal Bar ──
new Chart(document.getElementById('chartJurusan'), {
  type:'bar',
  data:{
    labels: perJurusan.map(d=>d.kode),
    datasets:[{
      label:'Rata-rata Skor',
      data: perJurusan.map(d=>d.avg),
      backgroundColor:['#22c55e','#34d399','#4ade80','#2dd4bf','#38bdf8','#fbbf24','#f87171'],
      borderColor:'transparent', borderRadius:7, borderSkipped:false,
    }]
  },
  options:{
    indexAxis:'y', responsive:true,
    plugins:{ legend:{display:false}, tooltip:{callbacks:{label:ctx=>` ${ctx.parsed.x}`}} },
    scales:{
      x:{ min:3.0,max:3.7, grid:{color:'#f1f5f9'}, ticks:{stepSize:.1} },
      y:{ grid:{display:false} }
    }
  }
});

// ── Chart 4: Sebaran ──
new Chart(document.getElementById('chartSebaran'), {
  type:'bar',
  data:{
    labels: sebaran.map(d=>d.s),
    datasets:[{
      label:'Jumlah Siswa',
      data: sebaran.map(d=>d.j),
      backgroundColor: sebaran.map(d =>
        d.s>=33 ? C.green+'0.75)' : d.s>=26 ? C.teal+'0.6)' : C.amber+'0.5)'
      ),
      borderColor:'transparent', borderRadius:4,
    }]
  },
  options:{
    responsive:true,
    plugins:{ legend:{display:false}, tooltip:{callbacks:{label:ctx=>` ${ctx.parsed.y} siswa`}} },
    scales:{
      y:{ grid:{color:'#f1f5f9'}, ticks:{stepSize:10} },
      x:{ grid:{display:false} }
    }
  }
});

// ── Chart 5: Sering vs Jarang ──
new Chart(document.getElementById('chartSeringJarang'), {
  type:'bar',
  data:{
    labels: perButir.map(d=>d.kode),
    datasets:[
      { label:'% Sering (skor 3–4)', data:perButir.map(d=>d.sering),
        backgroundColor:'rgba(34,197,94,.75)', borderColor:'#22c55e', borderWidth:1,
        borderRadius:{topLeft:5,topRight:5} },
      { label:'% Jarang (skor 1–2)', data:perButir.map(d=>d.jarang),
        backgroundColor:'rgba(248,113,113,.65)', borderColor:'#f87171', borderWidth:1,
        borderRadius:{topLeft:5,topRight:5} }
    ]
  },
  options:{
    responsive:true,
    plugins:{ legend:{labels:{padding:20,font:{size:12}}}, tooltip:{mode:'index',intersect:false} },
    scales:{
      y:{ grid:{color:'#f1f5f9'}, max:105, ticks:{callback:v=>v+'%'} },
      x:{ grid:{display:false} }
    }
  }
});

// ── Chart About Donut (fix size) ──
new Chart(document.getElementById('chartAbout'), {
  type:'doughnut', data: donutData,
  options:{
    responsive:false, maintainAspectRatio:false,
    cutout:'68%',
    plugins:{ legend:{display:false}, tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.raw}%`}} }
  }
});

// ── Progress List ──
const progList = document.getElementById('progList');
perButir.forEach(d => {
  const isLow = d.rata <= 3.25;
  const pct = ((d.rata-1)/3)*100;
  progList.innerHTML += `
    <div class="prog-item">
      <div class="prog-header">
        <div class="prog-info">
          <span class="prog-code">${d.kode}</span>
          <span class="prog-label">${d.label}</span>
        </div>
        <div class="prog-scores">
          <span class="prog-avg">${d.rata}</span>
          <span class="prog-pct">${d.sering}% sering</span>
        </div>
      </div>
      <div class="prog-bar">
        <div class="prog-fill ${isLow?'low':''}" style="width:${pct}%"></div>
      </div>
    </div>`;
});

// ── Jurusan Table ──
const tbody = document.getElementById('jurusanTable');
perJurusan.forEach((d,i) => {
  const rk = i===0?'r1':i<=2?'r2':i>=5?'rl':'r3';
  const sc = d.avg>=3.4?'sc-h':'sc-m';
  const kat = d.avg>=3.26
    ? `<span style="color:var(--green-700);font-weight:700">Sangat Baik</span>`
    : `<span style="color:var(--teal-600);font-weight:700">Baik</span>`;
  tbody.innerHTML += `<tr>
    <td><span class="rank-badge ${rk}">${i+1}</span></td>
    <td><strong style="color:var(--text-900)">${d.kode}</strong><br><span style="font-size:.74rem">${d.nama}</span></td>
    <td>${d.n} siswa</td>
    <td><span class="score-pill ${sc}">${d.avg}</span></td>
    <td>${d.total}</td>
    <td>${d.pct_sb}%</td>
    <td>${kat}</td>
  </tr>`;
});

// ── Scroll Reveal ──
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
}, {threshold:.08});

document.querySelectorAll('.aksi-card,.kpi-card,.chart-card,.finding-card,.prog-item,.about-visual').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(18px)';
  el.style.transition='opacity .5s ease, transform .5s ease';
  reveal.observe(el);
});