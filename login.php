<?php
session_start();

//  Gestione del redirect (user intent).
$redirect = 'dashboard.php';
if (isset($_GET['redirect'])) {
    $redirect = $_GET['redirect'];
}
if (isset($_SESSION['nickname'])) {
    header('Location: ' . $redirect);
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

    <title>Log-In | Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/base.css" type="text/css" />
    <link rel="stylesheet" href="css/footer.css" type="text/css" />
    <link rel="stylesheet" href="css/navbar.css" type="text/css" />
    <link rel="stylesheet" href="css/login.css" type="text/css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
</head>

<body>
    <?php include 'navbar.php'; ?>
    <main id="login">
        <div data-aos="fade-up" data-aos-duration="1000" id="login-form-container">
            <h1>Space eXplorer</h1>
            <?php
            if (isset($_GET['action'])) {
                $action = $_GET['action'];
            } else {
                $action = 'signup';
            }
            if ($action == 'signup') {
            ?>
                <div id="signup-form-container">
                    <h2>Sign-Up</h2>
                    <form id="signup-form" class="login-form" action="signup.php" method="post">
                        <input type="hidden" name="signup-redirect" value="<?php echo $redirect; ?>" />
                        <p>
                            <label data-aos="fade-up" data-aos-duration="1000" for="signup-email">E-mail</label>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" type="email" id="signup-email" name="signup-email" value="<?php echo $_SESSION['signup-email'] ?? $_POST['signup-email'] ?? ''; ?>" required />
                        </p>
                        <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" id="email-hint">
                            <span>Disponibilità dell'e-mail</span>
                            <span id="email-badge"></span>
                        </p>
                        <p>
                            <label data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" for="signup-nickname">Nickname</label>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" type="text" id="signup-nickname" name="signup-nickname" value="<?php echo $_SESSION['signup-nickname'] ?? ''; ?>" required />
                        </p>
                        <p>
                            <label data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250" for="signup-password">Password</label>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" type="password" id="signup-password" name="signup-password" value="<?php echo $_SESSION['signup-password'] ?? ''; ?>" title="La password deve contenere almeno una lettera maiuscola, una lettera minuscola, un numero e un simbolo ed avere una lunghezza minima di 6 caratteri." required />
                        <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="350" id="security-hint">
                            <span>Sicurezza della password</span>
                            <span id="security-badge"></span>
                        </p>
                        <p>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" type="submit" id="signup-submit" name="signup-submit" value="Sign Up!" disabled />
                        </p>
                    </form>
                    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="450">
                        Hai già un account? <a href="?action=signin&redirect=<?php echo $redirect; ?>">Accedi</a>
                    </p>
                </div>
            <?php
            } else {
            ?>
                <div id="signin-form-container">
                    <h2>Sign-In</h2>
                    <form id="signin-form" class="login-form" action="signin.php" method="post">
                        <input type="hidden" name="signin-redirect" value="<?php echo $redirect; ?>" />
                        <p>
                            <label data-aos="fade-up" data-aos-duration="1000" for="signin-email">E-mail</label>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" type="email" id="signin-email" name="signin-email" value="<?php echo $_SESSION['signin-email'] ?? ''; ?>" required />
                        </p>
                        <p>
                            <label data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" for="signin-password">Password</label>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" type="password" id="signin-password" name="signin-password" value="<?php echo $_SESSION['signin-password'] ?? ''; ?>" required />
                        </p>
                        <p>
                            <input data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" type="submit" id="signin-submit" name="signin-submit" value="Sign In!" />
                        </p>
                    </form>
                    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                        Non hai un account? <a href="?action=signup&redirect=<?php echo $redirect; ?>">Iscriviti</a>
                    </p>
                </div>
            <?php
            }
            ?>
        </div>
    </main>

    <?php include 'top.php'; ?>
    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/config.js"></script>
    <?php
    if ($action == 'signup') {
    ?>
        <script src="js/login-validation.js"></script>
    <?php
    }
    ?>
    <script src="js/mobile-menu.js"></script>
    <script src="js/top.js"></script>
    <script src="js/login-error.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>