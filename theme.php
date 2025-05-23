<?php global $Wcms ?>

<!DOCTYPE html>
<html lang="<?= $Wcms->getSiteLanguage() ?>">
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
    <link href="https://fonts.googleapыis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">

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

    <div class="sidebar">
        <div class="sidebar-header">
            <h2 class="site-title"><?php echo $Wcms->get('config', 'siteTitle'); ?></h2>
            <span class="site-author">by author</span>
        </div>
        <nav class="sidebar-nav">
            <?php echo $Wcms->menu(); ?>
        </nav>
        <div class="sidebar-footer">
            <!-- Удалили кнопку переключения темы -->
        </div>
    </div>
    
    <div class="content">
        <div class="page-content">
            <?= $Wcms->page('content') ?>
        </div>
    </div>
    
    <footer class="footer">

            <?= $Wcms->footer() ?>

    </footer>
    
    <script src="<?php echo $Wcms->asset('js/script.js'); ?>?v=1.5"></script>
    <?php echo $Wcms->js(); ?>
</body>
</html>