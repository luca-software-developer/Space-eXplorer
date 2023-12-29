<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

$sql = 'SELECT COUNT(*) FROM "user"';
$result = pg_prepare($db, "Get-Users-Count", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Get-Users-Count", array());
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$row = pg_fetch_assoc($result);
$count = $row['count'];
if ($count) {
    echo sprintf('%06d', $count);
} else {
    echo "000000";
}

pg_close($db);
