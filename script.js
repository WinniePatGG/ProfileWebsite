let darkMode = true;
function toggleMode() {
  darkMode = !darkMode;
  document.documentElement.style.setProperty('--bg-color', darkMode ? '#0d0d0d' : '#f5f5f5');
  document.documentElement.style.setProperty('--text-color', darkMode ? '#00ff99' : '#222');
  document.documentElement.style.setProperty('--terminal-bg', darkMode ? '#1a1a1a' : '#fff');
  document.documentElement.style.setProperty('--card-bg', darkMode ? '#121212' : '#e0e0e0');
  document.documentElement.style.setProperty('--accent', darkMode ? '#00ffaa' : '#007acc');
}

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({length: 100}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 1,
  vy: (Math.random() - 0.5) * 1,
  r: Math.random() * 2 + 1
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffaa';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
