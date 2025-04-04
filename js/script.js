document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const themeToggle = document.querySelector('.theme-toggle');
    const loader = document.querySelector('.loader');

    // Управление боковым меню
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        if (content) {
            content.addEventListener('click', () => {
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            });
        }

        const navLinks = document.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    } else {
        console.error('Menu toggle or sidebar not found!');
    }

    // Переключение темы
    if (themeToggle) {
        const moonIcon = themeToggle.querySelector('.moon-icon');
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const themeText = themeToggle.querySelector('span');

        // Проверяем текущую тему при загрузке
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
            themeText.textContent = 'Light';
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
            themeText.textContent = 'Dark';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);

            // Обновляем иконку и текст
            if (newTheme === 'dark') {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'inline';
                themeText.textContent = 'Light';
            } else {
                moonIcon.style.display = 'inline';
                sunIcon.style.display = 'none';
                themeText.textContent = 'Dark';
            }
        });
    }

    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // SPA функционал
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentArea = document.querySelector('.page-content');

    function updateActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.sidebar-nav a.nav-link');

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
            const normalizedLinkPath = linkPath.endsWith('/') ? linkPath : linkPath + '/';
            if (normalizedCurrentPath === normalizedLinkPath) {
                link.parentElement.classList.add('active');
            }
        });
    }

    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loader.style.display = 'block';
            const url = link.getAttribute('href');

            fetch(url, { method: 'GET' })
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newContent = doc.querySelector('.page-content').innerHTML;
                    contentArea.innerHTML = newContent;
                    window.history.pushState({}, document.title, url);
                    updateActiveLink();

                    if (window.innerWidth <= 600) {
                        sidebar.classList.remove('active');
                    }
                    loader.style.display = 'none';
                })
                .catch(error => {
                    console.error('Ошибка загрузки:', error);
                    contentArea.innerHTML = '<p>Ошибка загрузки страницы</p>';
                    loader.style.display = 'none';
                });
        });
    });

    window.addEventListener('popstate', () => {
        fetch(window.location.pathname, { method: 'GET' })
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                contentArea.innerHTML = doc.querySelector('.page-content').innerHTML;
                updateActiveLink();
            });
    });
});
