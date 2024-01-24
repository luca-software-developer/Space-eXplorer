<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

if (isset($_POST['signup-email'])) {
    $signup_email = trim($_POST['signup-email']);

    //  Verifica se l'e-mail è nel formato corretto.
    if (!filter_var($signup_email, FILTER_VALIDATE_EMAIL)) {
        echo "Non disponibile";
        pg_close($db);
        exit();
    }

    //  Verifica la disponibilità della e-mail.
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
