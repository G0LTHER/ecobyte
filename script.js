document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DOS ELEMENTOS ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggleLink = document.getElementById('theme-toggle-link');
    const body = document.body;

    // --- FUNÇÕES PRINCIPAIS ---

    /**
     * Aplica o tema (claro ou escuro) e salva a preferência.
     * @param {string} theme - O tema a ser aplicado ('dark' ou 'light').
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem('ecobyte-theme', theme);
    }

    /**
     * Alterna o tema atual.
     */
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(currentTheme);
    }

    /**
     * Fecha o menu de navegação móvel.
     */
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        body.classList.remove('nav-active'); // Remove o overlay
    }

    // --- CONFIGURAÇÃO INICIAL E EVENTOS ---

    // 1. Carregar o tema salvo ao iniciar a página
    // Verifica se há um tema salvo no localStorage. Se não, usa a preferência do sistema.
    const savedTheme = localStorage.getItem('ecobyte-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);


    // 2. Evento para o botão de menu hambúrguer
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique feche o menu imediatamente
            navMenu.classList.add('active');
            body.classList.add('nav-active');
        });
    }

    // 3. Evento para o link de alternar tema
    if (themeToggleLink) {
        themeToggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }

    // 4. Evento para fechar o menu ao clicar em um link de navegação
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            // Não fecha se for o link do tema
            if (link.id !== 'theme-toggle-link') {
                link.addEventListener('click', closeMobileMenu);
            }
        });
    }

    // 5. Evento para fechar o menu ao clicar fora dele (no overlay)
    document.addEventListener('click', (event) => {
        if (body.classList.contains('nav-active')) {
            // Se o clique NÃO foi dentro do menu, feche-o
            if (!navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
});