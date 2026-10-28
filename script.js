const cover = document.getElementById('cover');
const isi = document.getElementById('isi');
const audio = document.getElementById('musik');
const musikBtn = document.getElementById('musik-btn');

const to = new URLSearchParams(location.search).get('to');
if (to) document.getElementById('namaTamu').textContent = to;

let musikDihentikan = false;
function setUI(playing) { musikBtn.classList.toggle('putar', playing); musikBtn.style.opacity = playing ? 1 : .6; }
function mulaiMusik() { return audio.play().then(() => setUI(true)).catch(() => setUI(false)); }

setUI(false);

musikBtn.addEventListener('click', () => {
  if (audio.paused) { musikDihentikan = false; mulaiMusik(); }
  else { musikDihentikan = true; audio.pause(); setUI(false); }
});

document.getElementById('btnBuka').addEventListener('click', () => {
  isi.classList.add('show');
  cover.classList.add('hide');
  document.body.classList.remove('locked');
  window.scrollTo(0, 0);
  if (!musikDihentikan) mulaiMusik();
  setTimeout(() => { cover.style.display = 'none'; observeReveal(); }, 900);
});

function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

document.getElementById('formUcapan').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
});