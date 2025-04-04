<?php global $Wcms ?>

<!DOCTYPE html>
<html lang="<?= $Wcms->getSiteLanguage() ?>" data-theme="light">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <meta name="title" content="<?= $Wcms->get('config', 'siteTitle') ?> - <?= $Wcms->page('title') ?>" />
    <meta name="description" content="<?= $Wcms->page('description') ?>">
    <meta name="keywords" content="<?= $Wcms->page('keywords') ?>">
    <meta property="og:url" content="<?= $this->url() ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="<?= $Wcms->get('config', 'siteTitle') ?>" />
    <meta property="og:title" content="<?= $Wcms->page('title') ?>" />

    <title><?= $Wcms->get('config', 'siteTitle') ?> - <?= $Wcms->page('title') ?></title>
    
    <!-- Подключаем Google Fonts (Inter) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="<?= $Wcms->asset('css/style.css') ?>?v=2.0">
    <?= $Wcms->css() ?>
</head>
<body>
    <?= $Wcms->settings() ?>
    <?= $Wcms->alerts() ?>
    
    <!-- Кнопка бургера -->
    <button class="menu-toggle" type="button">☰</button>
    
    <!-- Затемнение фона для мобильного меню -->
    <div class="overlay"></div>
    
    <!-- Лоадер для SPA -->
    <div class="loader"></div>

    <div class="sidebar">
        <div class="sidebar-header">
            <h2 class="site-title"><?php echo $Wcms->get('config', 'siteTitle'); ?></h2>
            <span class="site-author">by kate_may</span>
        </div>
        <nav class="sidebar-nav">
            <?php echo $Wcms->menu(); ?>
        </nav>
        <div class="sidebar-footer">
            <button class="theme-toggle">
                <svg class="theme-icon moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <svg class="theme-icon sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>Dark</span>
            </button>
        </div>
    </div>
    
    <div class="content">
        <div class="page-content">
            <?= $Wcms->page('content') ?>
        </div>
    </div>
    
    <footer class="footer">
        <div class="footer-content">
            <?= $Wcms->footer() ?>
        </div>
    </footer>
    
    <script src="<?php echo $Wcms->asset('js/script.js'); ?>?v=1.5"></script>
    <?php echo $Wcms->js(); ?>
</body>
</html>
