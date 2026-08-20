
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || el.dataset.ran) return;
    el.dataset.ran = '1';
    const target = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased) + '+';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: .35 });
  obs.observe(el);
});



const amountSlider = document.querySelector('#donationAmount');
const amountDisplay = document.querySelector('[data-amount-display]');
const amountCaption = document.querySelector('[data-amount-caption]');
const tubeFill = document.querySelector('#tubePaintFill');
const quickButtons = document.querySelectorAll('[data-quick-amount]');
const materials = [...document.querySelectorAll('[data-threshold]')];

const milestones = [
  { max: 49, caption: 'Help add paper and basic drawing supplies to the table.', color: '#ffe990' },
  { max: 99, caption: 'Help put markers, paper, and simple craft materials into young artists’ hands.', color: '#ffb2d0' },
  { max: 249, caption: 'Help restock paints, brushes, adhesives, and workshop basics.', color: '#a6edf0' },
  { max: 499, caption: 'Help provide materials for a full Hands & Canvas workshop.', color: '#d8c4ff' },
  { max: 999, caption: 'Support materials across a multi-session creative program.', color: '#ffb2d0' },
  { max: 1999, caption: 'Help supply months of free art programming across our community programs.', color: '#a6edf0' },
  { max: Infinity, caption: 'Sponsor a year of core art materials and help keep creativity free.', color: '#d8c4ff' }
];

function formatMoney(v) {
  return '$' + Number(v).toLocaleString('en-CA');
}
function updateDonation(value) {
  value = Number(value);
  if (amountDisplay) amountDisplay.textContent = formatMoney(value);
  const milestone = milestones.find(m => value <= m.max);
  if (amountCaption) amountCaption.textContent = milestone.caption;

  // The supplied PNG has a transparent paint window.
  // Fill that window from bottom to top as the slider increases.
  if (tubeFill) {
    const ratio = Math.max(0, Math.min(value / 2000, 1));
    tubeFill.style.height = (ratio * 100) + '%';
    tubeFill.style.setProperty('--fill-color', milestone.color);
  }

  materials.forEach(el => {
    const threshold = Number(el.dataset.threshold);
    el.classList.toggle('show', value >= threshold);
  });
  quickButtons.forEach(btn => btn.classList.toggle('active', Number(btn.dataset.quickAmount) === value));
}
if (amountSlider) {
  amountSlider.addEventListener('input', () => updateDonation(amountSlider.value));
  updateDonation(amountSlider.value);
}
quickButtons.forEach(btn => btn.addEventListener('click', () => {
  const v = Number(btn.dataset.quickAmount);
  if (amountSlider) amountSlider.value = v;
  updateDonation(v);
}));

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
document.querySelectorAll('[data-placeholder-action]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showToast(el.dataset.placeholderAction);
  });
});


// V8 navigation dropdowns + hide-on-scroll behavior
const siteNavWrap = document.getElementById('siteNav');
const dropdownToggles = document.querySelectorAll('.nav-drop-toggle');
dropdownToggles.forEach(btn => btn.addEventListener('click', e => {
  if (window.innerWidth > 900) return;
  const item = e.currentTarget.closest('.nav-item');
  const willOpen = !item.classList.contains('open');
  document.querySelectorAll('.nav-item.open').forEach(x => x.classList.remove('open'));
  item.classList.toggle('open', willOpen);
  e.currentTarget.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}));
let lastScrollY = window.scrollY;
let navTicking = false;
window.addEventListener('scroll', () => {
  if (!siteNavWrap || navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y > 150 && y > lastScrollY + 5) siteNavWrap.classList.add('nav-hidden');
    if (y < lastScrollY - 5 || y < 80) siteNavWrap.classList.remove('nav-hidden');
    lastScrollY = y;
    navTicking = false;
  });
}, {passive:true});

// Independent homepage paint-splotch facts: several may stay open at once.
document.querySelectorAll('[data-hotspot]').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = document.getElementById(btn.dataset.hotspot);
    if (!card) return;
    const open = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// Paint timeline scroll fill.
const timelineSection = document.getElementById('paintTimeline');
const paintPath = document.getElementById('paintProgressPath');
const paintShadowPath = document.getElementById('paintProgressShadow');
const paintHighlightPath = document.getElementById('paintHighlightPath');
if (timelineSection && paintPath) {
  const paths=[paintPath,paintShadowPath,paintHighlightPath].filter(Boolean);
  const length=paintPath.getTotalLength();
  paths.forEach(path=>{path.style.strokeDasharray=length;path.style.strokeDashoffset=length;});
  const updateTimeline=()=>{
    const rect=timelineSection.getBoundingClientRect();
    const viewport=window.innerHeight;
    const total=rect.height-viewport*.25;
    const traveled=viewport*.46-rect.top;
    const progress=Math.max(0,Math.min(1,traveled/total));
    paths.forEach(path=>path.style.strokeDashoffset=length*(1-progress));
  };
  updateTimeline();
  window.addEventListener('scroll',updateTimeline,{passive:true});
  window.addEventListener('resize',updateTimeline);
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('in-view');
      const n=entry.target.dataset.event;
      const dot=n?document.querySelector(`[data-dot="${n}"]`):null;
      if(dot)dot.classList.add('active');
    });
  },{threshold:.28});
  document.querySelectorAll('.timeline-event-v10').forEach(el=>observer.observe(el));
}