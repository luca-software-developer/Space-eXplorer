<?php
require_once "./logindb.php";

$sql = 'SELECT nickname, MAX(score) AS hiscore
        FROM (SELECT * FROM "game" INNER JOIN "user" ON "game".email = "user".email)
        GROUP BY nickname
        ORDER BY hiscore DESC
        LIMIT 10';
$result = pg_prepare($db, "Get-Global-Ranking", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Get-Global-Ranking", array());
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$delay = 50;
$count = 0;
echo '<ul class="ranking-content">';
while ($row = pg_fetch_assoc($result)) {
    echo '<li class="rank" data-aos="fade-up" data-aos-duration="500" data-aos-delay="' . $delay . '">';
    echo '<div class="user">' . $row['nickname'] . '</div>';
    echo '<div class="score">' . $row['hiscore'] . '</div>';
    echo '</li>';
    $delay += 50;
    $count++;
}
echo '</ul>';

if ($count == 0) {
    echo '<p data-aos="fade-up" data-aos-duration="500" data-aos-delay="' . $delay . '">Nessun record!</p>';
}
