<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

session_start();

if (!isset($_SESSION['email'])) {
    echo '<div class="empty-chat">Sessione non valida</div>';
    pg_close($db);
    exit();
}

$email = $_SESSION['email'];

$sql = 'SELECT * 
        FROM (SELECT * FROM "post" INNER JOIN "user" ON "post".email = "user".email) 
        ORDER BY "id" DESC';
$result = pg_prepare($db, "Get-Messages", $sql);
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
    exit();
}

$result = pg_execute($db, "Get-Messages", array());
if (!$result) {
    echo pg_last_error($db);
    pg_close($db);
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

pg_close($db);
