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

$sql = 'DELETE FROM "user" WHERE email = $1';
$result = pg_prepare($db, "Delete-Account", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Delete-Account", array($email));
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

echo "Operazione completata!";

pg_close($db);
