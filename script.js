const faders = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.style.animationPlayState = 'running';
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.style.animationPlayState = 'paused';
    appearOnScroll.observe(fader);
});

const projectsContainer = document.getElementById("github-projects");

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/winniepatgg/repos?sort=updated&per_page=9`);
        let repos = await response.json();

        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        repos.forEach((repo, index) => {
            const card = document.createElement("div");
            card.classList.add("card", "fade-up");
            card.style.animationDelay = `${0.15 * (index+1)}s`;

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description available."}</p>
            `;

            card.addEventListener('click', () => {
                window.open(repo.html_url, '_blank');
            });

            projectsContainer.appendChild(card);
            appearOnScroll.observe(card);
        });

    } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
        projectsContainer.innerHTML = "<p>Failed to load projects.</p>";
    }
}

const linkCards = [
    {
        title: "Status Page",
        description: "Check my server status and uptime.",
        url: "https://status.winniepat.de"
    },
    {
        title: "API",
        description: "Check out my API",
        url: "https://api.winniepat.de"
    },
        {
        title: "Lunaris Network",
        description: "My Minecraft Server network",
        url: "https://lunaris-mc.de"
    }
];

const linkContainer = document.getElementById("link-cards");

linkCards.forEach((link, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "fade-up");
    card.style.animationDelay = `${0.15 * (index+1)}s`;

    card.innerHTML = `
        <h3>${link.title}</h3>
        <p>${link.description}</p>
    `;

    card.addEventListener('click', () => {
        window.open(link.url, '_blank');
    });

    linkContainer.appendChild(card);
    appearOnScroll.observe(card);
});

fetchGitHubProjects();
