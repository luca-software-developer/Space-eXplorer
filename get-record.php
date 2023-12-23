<?php
require_once "./logindb.php";

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    exit();
}

$email = $_SESSION['email'];

$sql = 'SELECT MAX(score) FROM "game" WHERE email = $1';
$result = pg_prepare($db, "Get-Record", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Get-Record", array($email));
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$row = pg_fetch_assoc($result);
$record = $row['max'];
if ($record) {
    echo $record;
} else {
    echo "0";
}