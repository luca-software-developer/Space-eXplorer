<?php
session_start();
if (!isset($_SESSION['email'])) {
    header('Location: ../login.php?action=signin');
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

    <title>Space eXplorer</title>

    <link rel="icon" type="image/x-icon" href="../favicon.ico" />
    <link rel="stylesheet" href="css/style.css" type="text/css" />
</head>

<body>
    <div id="start-overlay">
        <h1>Space eXplorer</h1>
        <h2>🎮 Space Gaming Platform 🎮</h2>
        <button type="button" id="start-game" title="Start Game">
            Start Game
        </button>
        <button type="button" id="dashboard" title="Dashboard" onclick="location.replace('../dashboard.php');">
            Dashboard
        </button>
    </div>
    <div id="gameover-overlay">
        <h1>GAME OVER</h1>
        <button type="button" id="return" title="Return" onclick="location.reload();">
            Return
        </button>
    </div>

    <canvas id="canvas"></canvas>
    <div id="resources">
        <img src="img/spaceship.png" id="spaceship" alt="spaceship" title="spaceship" width="19500" height="92" />
        <img src="img/asteroid.png" id="asteroid" alt="asteroid" title="asteroid" width="24500" height="100" />
        <img src="img/explosion.png" id="explosion" alt="explosion" title="explosion" width="48000" height="600" />
        <img src="img/enemy.png" id="enemy" alt="enemy" title="enemy" width="150" height="72" />
        <img src="img/playerbullet.png" id="playerbullet" alt="playerbullet" title="playerbullet" width="50" height="29" />
        <img src="img/enemybullet.png" id="enemybullet" alt="enemybullet" title="enemybullet" width="50" height="29" />
    </div>

    <script src="js/game.js"></script>
</body>

</html>