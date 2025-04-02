// Управление боковым меню
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    // Проверка, найдены ли элементы
    console.log('Menu toggle:', menuToggle);
    console.log('Sidebar:', sidebar);
    console.log('Content:', content);

    if (menuToggle && sidebar) {
        // Открытие/закрытие меню при клике на кнопку
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            console.log('Button clicked!');
            sidebar.classList.toggle('active');
        });

        // Закрытие меню при клике на пустое поле (.content)
        if (content) {
            content.addEventListener('click', () => {
                if (sidebar.classList.contains('active')) {
                    console.log('Content clicked, closing sidebar!');
                    sidebar.classList.remove('active');
                }
            });
        }

        // Закрытие меню при клике на ссылку в меню (уже есть в вашем коде, но добавим stopPropagation)
        const navLinks = document.querySelectorAll('.sidebar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                // Остальной код для SPA
            });
        });
    } else {
        console.error('Menu toggle or sidebar not found!');
    }

    // Функция для обновления класса active
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

    // SPA функционал
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentArea = document.querySelector('.page-content');

    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
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

                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                    }
                })
                .catch(error => {
                    console.error('Ошибка загрузки:', error);
                    contentArea.innerHTML = '<p>Ошибка загрузки страницы</p>';
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