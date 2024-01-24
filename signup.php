<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

if (isset($_POST["signup-email"]) && isset($_POST["signup-nickname"]) && isset($_POST["signup-password"]) && isset($_POST['signup-redirect'])) {
    $signup_email = trim($_POST["signup-email"]);
    $signup_nickname = trim($_POST["signup-nickname"]);
    $signup_password = trim($_POST["signup-password"]);

    //  Controllo ridondante (sicurezza).
    if (email_exists($db, $signup_email)) {
        //  Se il flusso di esecuzione entra in questo if significa
        //  che l'utente ha alterato il funzionamento della pagina di Log-In.
        header('Location: login.php?action=signup&redirect=' . $_POST['signup-redirect'] . '&error=email-exists');
    } else if (nickname_exists($db, $signup_nickname)) {
        header('Location: login.php?action=signup&redirect=' . $_POST['signup-redirect'] . '&error=nickname-exists');
    } else {
        //  Ottiene l'hash della password.
        $signup_password = password_hash($signup_password, PASSWORD_DEFAULT);

        //  Aggiunge l'utente al database.
        $sql = 'INSERT INTO "user" ("email", "nickname", "password") VALUES ($1, $2, $3)';
        $result = pg_prepare($db, "Sign-Up", $sql);

        if (!$result) {
            echo pg_last_error($db);
        } else {
            $result = pg_execute($db, "Sign-Up", array($signup_email, $signup_nickname, $signup_password));
            if (!$result) {
                echo pg_last_error($db);
            } else {
                //  Avvia la sessione e registra le informazioni necessarie.
                session_start();
                $_SESSION['email'] = $signup_email;
                $_SESSION['nickname'] = $signup_nickname;
                $_SESSION['access_timestamp'] = time();

                //  Reindirizza l'utente alla pagina richiesta.
                header('Location: ' . $_POST['signup-redirect']);
            }
        }
    }
} else {
    header("Location: index.php");
}

pg_close($db);

//  Restituisce true se l'e-mail è già presente nel database.
function email_exists($db, $email)
{
    $ret_val = false;
    $sql = 'SELECT * FROM "user" WHERE email = $1';
    $result = pg_prepare($db, "Email-Exists", $sql);
    if ($result) {
        $result = pg_execute($db, "Email-Exists", array($email));
        if ($result) {
            if (pg_fetch_assoc($result)) {
                $ret_val = true;
            }
        }
    }
    return $ret_val;
}

//  Restituisce true se esiste già un utente con il nickname specificato.
function nickname_exists($db, $nickname)
{
    $ret_val = false;
    $sql = 'SELECT * FROM "user" WHERE nickname = $1';
    $result = pg_prepare($db, "Nickname-Exists", $sql);
    if ($result) {
        $result = pg_execute($db, "Nickname-Exists", array($nickname));
        if ($result) {
            if (pg_fetch_assoc($result)) {
                $ret_val = true;
            }
        }
    }
    return $ret_val;
}
