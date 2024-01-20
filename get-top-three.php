<?php
require_once "./logindb.php";
require_once "./get-ranking.php";

$ranking = get_ranking($connection_string, 3);
if (!$ranking) {
    echo pg_last_error($db);
    exit();
}

$delay = 200;
$count = 0;
echo '<ol class="top-three">';
foreach ($ranking as $row) {
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
