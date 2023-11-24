<!DOCTYPE html>
<html lang="it" dir="ltr">

<head>
    <meta charset="UTF-8" />
    <meta name="description" content="🎮 #1 Online Space Gaming Platform 🎮" />
    <meta name="keywords" content="Space, Gaming, Game" />
    <meta name="author" content="Software Dev Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Home | Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
</head>

<body>
    <ul class="navbar">
        <li>
            <a href="index.php">
                <img src="img/logo.png" alt="Space eXplorer" title="Space eXplorer" width="32" height="32" />
                &nbsp;
                Space eXplorer
            </a>
            <i id="menu" class="bi bi-list"></i>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="#">
                <i class="bi bi-trophy-fill"></i>
                &nbsp;
                Classifica
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="#">
                <i class="bi bi-people-fill"></i>
                &nbsp;
                Community
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="#">
                <i class="bi bi-person-circle"></i>
                &nbsp;
                My Hub
            </a>
        </li>
    </ul>
    <div class="cover">
        <h1 data-aos="fade-up" data-aos-duration="1000">Space eXplorer</h1>
        <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">🎮 #1 Online Space Gaming Platform 🎮</h2>
        <hr data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" />
        <form class="sign-up" method="post" action="index.php">
            <input type="email" id="email" name="email" placeholder="Inserisci qui la tua e-mail" required data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150" />
            <input type="submit" id="submit" name="submit" value="Registrati" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" />
        </form>
    </div>

    <div class="story">
        <div class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img src="img/story1.png" alt="story1" title="story1" width="356" height="200" />
            </div>
            <div class="story-item-text">
                <h3>1.</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet tempus massa, vitae
                volutpat sem mollis vel. Praesent sed risus tortor. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Suspendisse id blandit mi.
            </div>
        </div>
        <div class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img src="img/story2.png" alt="story2" title="story2" width="203" height="200" />

            </div>
            <div class="story-item-text">
                <h3>2.</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet tempus massa, vitae
                volutpat sem mollis vel. Praesent sed risus tortor. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Suspendisse id blandit mi.
            </div>
        </div>
        <div class="story-item" data-aos="fade-up" data-aos-duration="500">
            <div class="story-item-image">
                <img src="img/story3.png" alt="story3" title="story3" width="171" height="200" />
            </div>
            <div class="story-item-text">
                <h3>3.</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet tempus massa, vitae
                volutpat sem mollis vel. Praesent sed risus tortor. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Suspendisse id blandit mi.
            </div>
        </div>
    </div>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="js/responsive-text.js" type="text/javascript"></script>
    <script src="js/mobile-menu.js" type="text/javascript"></script>

    <script>
        AOS.init();
    </script>
</body>

</html>