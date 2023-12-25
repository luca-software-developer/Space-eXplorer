<?php
require_once "./logindb.php";

session_start();

if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    exit();
}

$email = $_SESSION['email'];

$sql = 'SELECT * 
        FROM (SELECT * FROM "post" INNER JOIN "user" ON "post".email = "user".email) 
        ORDER BY "id" DESC 
        LIMIT 100';
$result = pg_prepare($db, "Get-Messages", $sql);
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$result = pg_execute($db, "Get-Messages", array());
if (!$result) {
    echo pg_last_error($db);
    exit();
}

$count = 0;
echo '<div id="chat">';
while ($row = pg_fetch_assoc($result)) {
    if ($row['email'] == $email) {
        echo '<div class="message user">';
    } else {
        echo '<div class="message">';
    }
    echo '<div class="sender">' . $row['nickname'] . '</div>' . $row['text'];
    echo '</div>';
    $count++;
}
if ($count == 0) {
    echo '<div class="empty-chat">Nessun messaggio</div>';
}
echo '</div>';