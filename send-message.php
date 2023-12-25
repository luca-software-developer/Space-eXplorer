<?php
require_once "./logindb.php";

session_start();

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    exit();
}

$email = $_SESSION['email'];

if (!isset($_POST['message'])) {
    echo "Richiesta non valida!";
    exit();
}

$message = $_POST['message'];

//  Controllo ridondante (sicurezza)
if (trim($message) == '') {
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
