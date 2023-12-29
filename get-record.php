<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    pg_close($db);
    exit();
}

$email = $_SESSION['email'];

$sql = 'SELECT MAX(score) FROM "game" WHERE email = $1';
$result = pg_prepare($db, "Get-Record", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Get-Record", array($email));
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$row = pg_fetch_assoc($result);
$record = $row['max'];
if ($record) {
    echo $record;
} else {
    echo "0";
}

pg_close($db);
