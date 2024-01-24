<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

session_start();

//  Controllo ridondante (sicurezza).
if (!isset($_SESSION['email'])) {
    echo "Sessione non valida!";
    pg_close($db);
    exit();
}

if (isset($_POST['old-password']) && isset($_POST['new-password']) && isset($_POST['re-password'])) {
    $old_password = trim($_POST['old-password']);
    $new_password = trim($_POST['new-password']);
    $re_password = trim($_POST['re-password']);

    //  Controllo ridondante (sicurezza).
    if ($new_password != $re_password) {
        echo "Le password non corrispondono!";
        pg_close($db);
        exit();
    }

    //  Ottiene la vecchia password dal database per la verifica.
    $email = $_SESSION['email'];
    $sql = 'SELECT * FROM "user" WHERE email = $1';
    $result = pg_prepare($db, "Change-Password", $sql);
    if (!$result) {
        echo pg_last_error($db);
        pg_close($db);
        exit();
    }

    $result = pg_execute($db, "Change-Password", array($email));
    if (!$result) {
        echo pg_last_error($db);
        pg_close($db);
        exit();
    }

    if ($row = pg_fetch_assoc($result)) {
        //  Verifica se la vecchia password è errata.
        if (!password_verify($old_password, $row['password'])) {
            echo "Password errata!";
            pg_close($db);
            exit();
        }
        
        //  Verifica se la nuova password è uguale a quella vecchia.
        if ($new_password == $old_password) {
            echo "La nuova password non può essere uguale alla vecchia password!";
            pg_close($db);
            exit();
        }

        //  Aggiorna la password nel database
        $sql = 'UPDATE "user" SET "password" = $1 WHERE email = $2';
        $result = pg_prepare($db, "Update-Password", $sql);
        if (!$result) {
            echo pg_last_error($db);
            pg_close($db);
            exit();
        }

        //  Calcola il risultato della funzione di hash eseguita sulla nuova password.
        $hash = password_hash($new_password, PASSWORD_DEFAULT);
        $result = pg_execute($db, "Update-Password", array($hash, $email));
        if (!$result) {
            echo pg_last_error($db);
            pg_close($db);
            exit();
        }

        echo "Operazione completata!";
    } else {
        //  Controllo ridondante (sicurezza).
        echo "Utente inesistente!";
    }
}

pg_close($db);
