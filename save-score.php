<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

session_start();

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    pg_close($db);
    exit();
}

$email = $_SESSION['email'];

if (!isset($_POST['score'])) {
    echo "Richiesta non valida!";
    pg_close($db);
    exit();
}

$score = $_POST['score'];

$sql = 'INSERT INTO "game" ("email", "score") VALUES ($1, $2)';
$result = pg_prepare($db, "Save-Score", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Save-Score", array($email, $score));
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

pg_close($db);
