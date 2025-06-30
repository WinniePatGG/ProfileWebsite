const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const characters = katakana + latin + nums;
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00aeff';
  ctx.font = fontSize + 'px monospace';
  
  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

async function fetchGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/WinniePatGG/repos?sort=updated&direction=desc');
    const repos = await response.json();
    displayRepos(repos.filter(repo => !repo.fork));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    document.getElementById('projects-grid').innerHTML = '<p>Failed to load projects. Please try again later.</p>';
  }
}

function displayRepos(repos) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  
  repos.forEach(repo => {
    const updated = new Date(repo.updated_at).toLocaleDateString();
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = repo.html_url;
    card.target = '_blank';
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description in GitHub repo'}</p>
      <div class="repo-meta">
        <span class="updated">Updated: ${updated}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  fetchGitHubRepos();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

window.addEventListener('DOMContentLoaded', () => {
  const age = calculateAge('2008-11-22');
  document.getElementById('age-display').textContent = `Hi I am WinniePatGG and I am ${age} years old.`;
  
  fetchGitHubRepos();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});