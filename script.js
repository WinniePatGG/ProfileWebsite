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

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

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
    const updatedDate = new Date(repo.updated_at);
    const formattedDate = updatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = formatTime(updatedDate);
    
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = repo.html_url;
    card.target = '_blank';
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description in GitHub repo'}</p>
      <div class="repo-meta">
        <span class="updated">Updated: ${formattedDate} at ${formattedTime}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

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
  fetchGitHubActivity();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

async function fetchGitHubActivity() {
  try {
    const username = 'WinniePatGG';
    const activityChart = document.getElementById('github-activity');
    const img = document.createElement('img');
    img.src = `https://ghchart.rshah.org/${username}`;
    img.alt = 'GitHub Activity Chart';
    img.style.width = '100%';
    activityChart.appendChild(img);
  } catch (error) {
    console.error('Error loading GitHub activity chart:', error);
    document.getElementById('github-activity').innerHTML = '<p>Failed to load activity chart. Please try again later.</p>';
  }
}