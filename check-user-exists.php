<?php
require_once "./logindb.php";

if (isset($_POST['signup-email'])) {
    $signup_email = $_POST['signup-email'];
    $sql = 'SELECT * FROM "user" WHERE email = $1';
    $result = pg_prepare($db, "Check-User-Exists", $sql);
    if (!$result) {
        echo pg_last_error($db);
    } else {
        $result = pg_execute($db, "Check-User-Exists", array($signup_email));
        if (!$result) {
            echo pg_last_error($db);
        } else {
            if ($row = pg_fetch_assoc($result)) {
                echo "Non disponibile";
            } else {
                echo "Disponibile";
            }
        }
    }
}

pg_close($db);
