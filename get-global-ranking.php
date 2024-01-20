<?php
require_once "./logindb.php";
require_once "./get-ranking.php";

$ranking = get_ranking($connection_string, 10);
if (!$ranking) {
    echo pg_last_error($db);
    exit();
}

$delay = 50;
$count = 0;
echo '<ul class="ranking-content">';
foreach ($ranking as $row) {
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
