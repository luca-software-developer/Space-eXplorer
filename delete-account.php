<?php
require_once "./logindb.php";

session_start();

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    exit();
}

$email = $_SESSION['email'];

$sql = 'DELETE FROM "user" WHERE email = $1';
$result = pg_prepare($db, "Delete-Account", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Delete-Account", array($email));
if (!$result) {
    echo pg_last_error($db);
    exit();
}

echo "Operazione completata!";
