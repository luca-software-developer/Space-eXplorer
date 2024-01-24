<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

//  Ottiene il numero di partite dal database utilizzando
//  la funzione di aggregazione COUNT.
$sql = 'SELECT COUNT(*) FROM "game"';
$result = pg_prepare($db, "Get-Games-Count", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Get-Games-Count", array());
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

//  Fornisce in output il numero di partite su 6 cifre.
$row = pg_fetch_assoc($result);
$count = $row['count'];
if ($count) {
    echo sprintf('%06d', $count);
} else {
    echo "000000";
}

pg_close($db);
