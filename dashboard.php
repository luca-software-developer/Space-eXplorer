<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
    <meta charset="UTF-8" />
    <meta name="description" content="🎮 #1 Online Space Gaming Platform 🎮" />
    <meta name="keywords" content="Space, Gaming, Game" />
    <meta name="author" content="Software Dev Team" />
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
                                <h2 data-aos="fade-down" data-aos-duration="1000">Dashboard</h2>
                                <h1 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="50">
                                    <?php echo $_SESSION['nickname']; ?>
                                </h1>
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
                                    <a href="game/">
                                        <button class="game-access-button" type="button">Accedi al gioco</button>
                                    </a>
                                </div>
                            </div>
                            <div class="container-item">
                                <div data-aos="fade-down" data-aos-duration="1000" class="illustration-container">
                                    <img src="img/story1.png" alt="story1" title="Dashboard" width="356" height="200" />
                                </div>
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
                            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" id="my-record" class="my-record">123455</p>
                        </div>
                        <br />
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">Top 3</h3>
                        <div class="top-three-container">
                            <ol class="top-three">
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" class="top-three-item">
                                    <span class="top-three-item-nickname">User #1</span> (<span class="top-three-item-score">123455</span>)
                                </li>
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250" class="top-three-item">
                                    <span class="top-three-item-nickname">User #2</span> (<span class="top-three-item-score">123454</span>)
                                </li>
                                <li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" class="top-three-item">
                                    <span class="top-three-item-nickname">User #3</span> (<span class="top-three-item-score">123453</span>)
                                </li>
                            </ol>
                        </div>
                    </section>
                </div>
                <div class="col">
                    <section data-aos="fade-left" data-aos-duration="1000" class="item">
                        <h2 data-aos="fade-up" data-aos-duration="1000">Account</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">Azioni rapide</h3>
                        <div class="account-options-container">
                            <a href="logout.php">
                                <button data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" type="button" id="log-out" class="account-option">Disconnetti</button>
                            </a>
                        </div>
                        <br />
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
                    <section data-aos="fade-up" data-aos-duration="1000" class="item">
                        <h2 data-aos="fade-up" data-aos-duration="1000">
                            <button type="button" id="change-password-back" class="back-button">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            Cambia password
                        </h2>

                    </section>
                </div>
            </div>
            <div id="delete-account-row" class="row hidden">
                <div class="col">
                    <section data-aos="fade-up" data-aos-duration="1000" class="item">
                        <h2 data-aos="fade-up" data-aos-duration="1000">
                            <button type="button" id="delete-account-back" class="back-button">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            Elimina account
                        </h2>
                    </section>
                </div>
            </div>
        </main>
    </div>

    <?php include 'top.php'; ?>
    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/responsive-text.js" type="text/javascript"></script>
    <script src="js/mobile-menu.js" type="text/javascript"></script>
    <script src="js/top.js" type="text/javascript"></script>
    <script src="js/dashboard.js" type="text/javascript"></script>
    <script type="text/javascript">
        AOS.init();
    </script>
</body>

</html>