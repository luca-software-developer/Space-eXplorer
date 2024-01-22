<?php
session_start();
?>
<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
    <meta charset="UTF-8" />
    <meta name="description" content="🎮 #1 Online Space Gaming Platform 🎮" />
    <meta name="keywords" content="Space, Gaming, Game" />
    <meta name="author" content="Gruppo 32" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Home | Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/base.css" type="text/css" />
    <link rel="stylesheet" href="css/footer.css" type="text/css" />
    <link rel="stylesheet" href="css/header.css" type="text/css" />
    <link rel="stylesheet" href="css/navbar.css" type="text/css" />
    <link rel="stylesheet" href="css/ranking.css" type="text/css" />
    <link rel="stylesheet" href="css/stats.css" type="text/css" />
    <link rel="stylesheet" href="css/story.css" type="text/css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
</head>

<body>
    <?php include 'navbar.php'; ?>
    <header id="cover">
        <h1 data-aos="fade-up" data-aos-duration="1000" data-rt-relative=".8" data-rt-maximum="600">Space eXplorer</h1>
        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" data-rt-relative=".7" data-rt-maximum="500">
            🎮 #1 Online Space Gaming Platform 🎮
        </h2>
        <hr data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" />
        <?php
        if (!isset($_SESSION['nickname'])) {
        ?>
            <form class="sign-up" method="post" action="login.php">
                <input type="email" id="email" name="email" value="<?php echo $_POST['email'] ?? ''; ?>" placeholder="Inserisci qui la tua e-mail" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" required />
                <input type="submit" id="submit" name="submit" value="Registrati" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" />
            </form>
            <p id="accedi" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">Hai già un account? <a href="login.php?action=signin">Accedi</a>
            </p>
        <?php
        } else {
        ?>
            <button type="button" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" onclick="location.replace('dashboard.php');">Accedi alla Dashboard</button>
        <?php
        }
        ?>
    </header>

    <section class="story">
        <figure class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img src="img/story1.png" alt="Planet" title="Planet" width="356" height="200" />
            </div>
            <figcaption class="story-item-text">
                <h3>1.</h3>
                <p>Space eXplorer è molto più di un videogame! Space eXplorer è la piattaforma di gaming spaziale che
                    unisce appassionati di videogiochi da tutto il mondo.</p>
            </figcaption>
        </figure>
        <figure class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img id="asteroid" src="img/story2.png" alt="Asteroid" title="Asteroid" width="203" height="200" />
            </div>
            <figcaption class="story-item-text">
                <h3>2.</h3>
                <p>Creando un account Space eXplorer avrai accesso a tutti i servizi della piattaforma, tra cui le
                    statistiche e l'accesso alla community!</p>
            </figcaption>
        </figure>
        <figure class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img src="img/story3.png" alt="Spaceship" title="Spaceship" width="171" height="200" />
            </div>
            <figcaption class="story-item-text">
                <h3>3.</h3>
                <p>Per iscriversi bastano pochi minuti e la tua e-mail. L'account include una dashboard personale con le
                    tue statistiche e i tuoi record. Inoltre, avrai accesso al gioco Space eXplorer!</p>
            </figcaption>
        </figure>
    </section>

    <section class="stats">
        <div class="stat" data-aos="fade-up" data-aos-duration="500">
            <h3>Utenti iscritti</h3>
            <p>
                <?php include './get-users-count.php' ?>
            </p>
        </div>
        <div class="stat" data-aos="fade-up" data-aos-duration="500" data-aos-delay="50">
            <h3>Partite giocate</h3>
            <p>
                <?php include './get-games-count.php' ?>
            </p>
        </div>
    </section>

    <div id="ranking" class="ranking-container">
        <section class="ranking">
            <header class="ranking-header" data-aos="fade-up" data-aos-duration="500">
                <h3>Classifica globale</h3>
                <h4>TOP 10</h4>
            </header>
            <?php include './get-global-ranking.php' ?>
        </section>
    </div>

    <?php include 'top.php'; ?>
    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/config.js"></script>
    <script src="js/responsive-text.js"></script>
    <script src="js/mobile-menu.js"></script>
    <script src="js/top.js"></script>
    <?php
    if (!isset($_SESSION['nickname'])) {
    ?>
        <script src="js/index-validation.js"></script>
    <?php
    }
    ?>
    <script>
        AOS.init();
    </script>
</body>

</html>