<?php
require_once "./logindb.php";

$sql = 'SELECT nickname, MAX(score) AS hiscore
        FROM (SELECT * FROM "game" INNER JOIN "user" ON "game".email = "user".email)
        GROUP BY nickname
        ORDER BY hiscore DESC
        LIMIT 3';
$result = pg_prepare($db, "Get-Top-Three", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Get-Top-Three", array());
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$delay = 200;
$count = 0;
echo '<ol class="top-three">';
while ($row = pg_fetch_assoc($result)) {
    echo '<li data-aos="fade-up" data-aos-duration="1000" data-aos-delay="' . $delay . '" class="top-three-item">';
    echo '<span class="top-three-item-nickname">' . $row['nickname'] . '</span> (<span class="top-three-item-score">' . $row['hiscore'] . '</span>)';
    echo '</li>';
    $delay += 50;
    $count++;
}
echo '</ol>';

if ($count == 0) {
    echo '<p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="' . $delay . '">Nessun record!</p>';
}
