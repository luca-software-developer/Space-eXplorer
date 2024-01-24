<?php
session_start();

//  Se l'utente non è loggato, non ha accesso a questa pagina.
if (!isset($_SESSION['email'])) {
    header('Location: login.php?action=signin');
}
?>
<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <meta name="description" content="🎮 #1 Online Space Gaming Platform 🎮" />
    <meta name="keywords" content="Space, Gaming, Game" />
    <meta name="author" content="Gruppo 32" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Dashboard | Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/base.css" type="text/css" />
    <link rel="stylesheet" href="css/footer.css" type="text/css" />
    <link rel="stylesheet" href="css/navbar.css" type="text/css" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
</head>

<body>
    <?php include 'navbar.php'; ?>

    <div class="dashboard-container">
        <main class="dashboard">
            <div class="row">
                <div class="col">
                    <section data-aos="fade-down" data-aos-duration="1000" class="item">
                        <div class="container">
                            <div class="container-item">
                                <h1 data-aos="fade-down" data-aos-duration="1000">Dashboard</h1>
                                <h2 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="50">
                                    <?php echo $_SESSION['nickname']; ?>
                                </h2>
                                <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100" class="info-line">
                                    <div class="info-icon">
                                        <i class="bi bi-envelope-at-fill"></i>
                                    </div>
                                    <div class="info-content">
                                        <?php echo $_SESSION['email']; ?>
                                    </div>
                                </div>
                                <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="150" class="info-line">
                                    <div class="info-icon">
                                        <i class="bi bi-clock-history"></i>
                                    </div>
                                    <div class="info-content">
                                        Online dalle ore
                                        <?php echo date("H:i", $_SESSION['access_timestamp']); ?>
                                        del
                                        <?php echo date("d/m/Y", $_SESSION['access_timestamp']); ?>
                                    </div>
                                </div>
                                <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200" class="game-access">
                                    <a class="game-access-button" href="game/game.php">Accedi al gioco</a>
                                </div>
                            </div>
                            <div class="container-item">
                                <figure data-aos="fade-down" data-aos-duration="1000" class="illustration-container">
                                    <img src="img/story1.png" alt="story1" title="Dashboard" width="356" height="200" />
                                </figure>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <section data-aos="fade-right" data-aos-duration="1000" class="item">
                        <h2 data-aos="fade-up" data-aos-duration="1000">Statistiche</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">Il mio record</h3>
                        <div class="my-record-container">
                            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" id="my-record" class="my-record">
                                <?php include './get-record.php' ?>
                            </p>
                        </div>
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">Top 3</h3>
                        <div id="ranking" class="top-three-container">
                            <?php include './get-top-three.php' ?>
                        </div>
                    </section>
                </div>
                <div class="col">
                    <section data-aos="fade-left" data-aos-duration="1000" class="item">
                        <h2 data-aos="fade-up" data-aos-duration="1000">Account</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">Azioni rapide</h3>
                        <div class="account-options-container">
                            <button data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" type="button" id="log-out" class="account-option" onclick="location.replace('logout.php');">Disconnetti</button>
                        </div>
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Impostazioni account</h3>
                        <div class="account-options-container">
                            <button data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250" type="button" id="change-password" class="account-option">Cambia password</button>
                            <button data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" type="button" id="delete-account" class="account-option">Elimina account</button>
                        </div>
                    </section>
                </div>
            </div>
            <div id="change-password-row" class="row hidden">
                <div class="col">
                    <section class="item">
                        <h2>
                            <button type="button" id="change-password-back" class="back-button">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            Cambia password
                        </h2>
                        <div class="options-container">
                            <p>
                                Questa procedura consente di modificare la password che usi per accedere al tuo account Space eXplorer.
                            </p>
                            <form action="change-password.php" method="post">
                                <p>
                                    <label for="old-password">Vecchia password</label>
                                    <input type="password" id="old-password" name="old-password" />
                                </p>
                                <p>
                                    <label for="new-password">Nuova password</label>
                                    <input type="password" id="new-password" name="new-password" />
                                </p>
                                <p>
                                    <label for="re-password">Ripeti password</label>
                                    <input type="password" id="re-password" name="re-password" />
                                </p>
                                <p>
                                    <label></label>
                                    <input type="button" id="submit-change-password" value="Cambia password" disabled />
                                </p>
                            </form>
                            <p id="form-check-status"></p>
                        </div>
                    </section>
                </div>
            </div>
            <div id="delete-account-row" class="row hidden">
                <div class="col">
                    <section class="item">
                        <h2>
                            <button type="button" id="delete-account-back" class="back-button">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            Elimina account
                        </h2>
                        <div class="options-container">
                            <p>
                                Questa procedura consente di eliminare il tuo account Space eXplorer e tutte le informazioni ad esso collegate.
                            </p>
                            <form action="delete-account.php" method="post">
                                <input type="button" id="submit-delete-account" value="Elimina account" />
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>

    <?php include 'top.php'; ?>
    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/config.js"></script>
    <script src="js/mobile-menu.js"></script>
    <script src="js/top.js"></script>
    <script src="js/dashboard.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>