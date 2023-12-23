<?php
require_once "./logindb.php";

$sql = 'SELECT COUNT(*) FROM "game"';
$result = pg_prepare($db, "Get-Games-Count", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Get-Games-Count", array());
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$row = pg_fetch_assoc($result);
$count = $row['count'];
if ($count) {
    echo sprintf('%06d', $count);
} else {
    echo "000000";
}
