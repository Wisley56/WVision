async function loadComponent(id, file) {
    const container = document.getElementById(id);
    if (container) {
        const response = await fetch(file);
        const html = await response.text();
        container.innerHTML = html;
    }
}

const isSrc = window.location.pathname.includes('/src/');
const basePath = isSrc ? '../' : './';

window.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-container', `${basePath}src/html/navbar.html`);
  loadComponent('footer-container', `${basePath}src/html/footer.html`);
});

function setActiveNavLink() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    link.classList.remove('active');

    if (href && path.endsWith(href.replace(/^.*\/([^\/]+)$/, '$1'))) {
      link.classList.add('active');
    }
  });
}
  
// Espera navbar ser carregada, já que ela vem via JS
document.addEventListener('DOMContentLoaded', () => {
  // Delay pra garantir que o conteúdo da navbar tenha carregado via JS
  setTimeout(setActiveNavLink, 100);
});

const observer = new MutationObserver(() => {
const formSearch = document.getElementById("formSearchMovie");
const inputSearch = document.getElementById("inputSearchMovie");
const modalSearchEl = document.getElementById("modalSearchResult");
const modalSearchContent = document.getElementById("modalSearchContent");

// só continua se os elementos existirem
if (formSearch && inputSearch && modalSearchEl && modalSearchContent) {
  const modalSearch = new bootstrap.Modal(modalSearchEl);

  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = inputSearch.value.trim().toLowerCase();
    if (!query) return;

    const movies = JSON.parse(localStorage.getItem("userMovies") || "[]");
    const found = movies.find(m => m.title.toLowerCase().includes(query));

    if (found) {
      modalSearchContent.innerHTML = `
        <div class="text-center">
          <img src="${found.image}" alt="${found.title}" class="img-fluid rounded mb-3" style="max-height: 200px;">
          <h5>${found.title}</h5>
          <p><strong>Gênero:</strong> ${found.genre}</p>
          <p><strong>Classificação:</strong> ${found.classification}</p>
          <p><strong>Duração:</strong> ${found.duration} min</p>
          <p><strong>Estreia:</strong> ${found.premiereDate}</p>
          <p>${found.description}</p>
        </div>
      `;
    } else {
      modalSearchContent.innerHTML = `<p class="text-center">Nenhum filme encontrado com o título informado.</p>`;
    }

    modalSearch.show();
  });

  observer.disconnect(); // para de observar após encontrar os elementos
}
});

// Inicia observação
observer.observe(document.body, { childList: true, subtree: true });
