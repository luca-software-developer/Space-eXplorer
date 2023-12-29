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

if (!isset($_POST['message'])) {
    echo "Richiesta non valida!";
    pg_close($db);
    exit();
}

$message = $_POST['message'];

//  Controllo ridondante (sicurezza)
if (trim($message) == '') {
    pg_close($db);
    exit();
}

$sql = 'INSERT INTO "post" ("email", "text") VALUES ($1, $2)';
$result = pg_prepare($db, "Send-Message", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Send-Message", array($email, $message));
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

pg_close($db);
