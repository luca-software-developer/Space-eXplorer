<?php
session_start();
if (!isset($_SESSION['email'])) {
    header('Location: login.php?action=signin');
}
?>
<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
    <meta charset="UTF-8" />
    <meta name="description" content="🎮 #1 Online Space Gaming Platform 🎮" />
    <meta name="keywords" content="Space, Gaming, Game" />
    <meta name="author" content="Gruppo 32" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Community | Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/base.css" type="text/css" />
    <link rel="stylesheet" href="css/footer.css" type="text/css" />
    <link rel="stylesheet" href="css/navbar.css" type="text/css" />
    <link rel="stylesheet" href="css/community.css" type="text/css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
</head>

<body>
    <?php include 'navbar.php'; ?>

    <div class="community-container">
        <main class="community">
            <section data-aos="fade-down" data-aos-duration="1000" class="item">
                <div class="container">
                    <div class="container-item">
                        <h2 data-aos="fade-down" data-aos-duration="1000">Community</h2>
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
                        <br />
                        <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200" id="chat-container"></div>
                        <br />
                        <div class="container-item">
                            <form id="send-message-container">
                                <label for="message" id="message-label">Scrivi un post</label>
                                <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250" type="text" id="message" name="message" />
                                <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" type="button" id="send" name="send" value="Pubblica" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <?php include 'top.php'; ?>
    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/mobile-menu.js"></script>
    <script src="js/top.js"></script>
    <script src="js/community.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>