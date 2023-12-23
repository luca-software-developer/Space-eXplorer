<?php
require_once "./logindb.php";

session_start();

//  Controllo ridondante (sicurezza)
if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    exit();
}

if (isset($_POST['old-password']) && isset($_POST['new-password']) && isset($_POST['re-password'])) {
    $old_password = $_POST['old-password'];
    $new_password = $_POST['new-password'];
    $re_password = $_POST['re-password'];

    //  Controllo ridondante (sicurezza)
    if ($new_password != $re_password) {
        echo "Le password non corrispondono!";
        exit();
    }

    $email = $_SESSION['email'];
    $sql = 'SELECT * FROM "user" WHERE email = $1';
    $result = pg_prepare($db, "Change-Password", $sql);
    if (!$result) {
        echo pg_last_error($db);
        exit();
    }

    $result = pg_execute($db, "Change-Password", array($email));
    if (!$result) {
        echo pg_last_error($db);
        exit();
    }

    if ($row = pg_fetch_assoc($result)) {
        if (!password_verify($old_password, $row['password'])) {
            echo "Password errata!";
            exit();
        }
        $sql = 'UPDATE "user" SET "password" = $1 WHERE email = $2';
        $result = pg_prepare($db, "Update-Password", $sql);
        if (!$result) {
            echo pg_last_error($db);
            exit();
        }
        
        $hash = password_hash($new_password, PASSWORD_DEFAULT);
        $result = pg_execute($db, "Update-Password", array($hash, $email));
        if (!$result) {
            echo pg_last_error($db);
            exit();
        }

        echo "Operazione completata!";
    } else {
        //  Controllo ridondante (sicurezza)
        echo "Utente inesistente!";
    }
}
