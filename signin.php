<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

if (isset($_POST['signin-email']) && isset($_POST['signin-password']) && isset($_POST['signin-redirect'])) {
    $signin_email = trim($_POST['signin-email']);
    $signin_password = trim($_POST['signin-password']);
    $password_hash = get_password_hash($db, $signin_email);

    //  Salva i valori temporanei dei campi nella sessione.
    session_start();
    $_SESSION['signin-email'] = $signin_email;
    $_SESSION['signin-password'] = $signin_password;

    //  Se l'utente specificato esiste...
    if ($password_hash) {
        //  Se la password è corretta...
        if (password_verify($signin_password, $password_hash)) {
            //  Otteniamo l'unica informazione mancante ovvero il nickname.
            $sql = 'SELECT "nickname" FROM "user" WHERE email = $1';
            $result = pg_prepare($db, "Sign-In", $sql);
            if (!$result) {
                echo pg_last_error($db);
            } else {
                $result = pg_execute($db, "Sign-In", array($signin_email));
                if (!$result) {
                    echo pg_last_error($db);
                } else {
                    if ($row = pg_fetch_assoc($result)) {
                        $signin_nickname = $row['nickname'];

                        //  Elimina le informazioni temporanee dalla sessione.
                        unset($_SESSION['signin-email']);
                        unset($_SESSION['signin-password']);

                        //  Memorizza le informazioni dell'utente nella sessione.
                        $_SESSION['email'] = $signin_email;
                        $_SESSION['nickname'] = $signin_nickname;
                        $_SESSION['access_timestamp'] = time();
                        pg_close($db);
                        //  Reindirizza l'utente alla pagina richiesta.
                        header('Location: ' . $_POST['signin-redirect']);
                    } else {
                        echo pg_last_error($db);
                    }
                }
            }
        } else {
            header('Location: login.php?action=signin&redirect=' . $_POST['signin-redirect'] . '&error=incorrect-password');
        }
    } else {
        header('Location: login.php?action=signup&redirect=' . $_POST['signin-redirect'] . '&error=inexistent-user');
    }
}

pg_close($db);

//  Restituisce l'hash della password corrispondente all'e-mail specificata.
function get_password_hash($db, $signin_email)
{
    $sql = 'SELECT "password" FROM "user" WHERE email = $1';
    $result = pg_prepare($db, "Get-Password-Hash", $sql);
    if (!$result) {
        echo pg_last_error($db);
        return false;
    } else {
        $result = pg_execute($db, "Get-Password-Hash", array($signin_email));
        if (!$result) {
            echo pg_last_error($db);
            return false;
        } else {
            if ($row = pg_fetch_assoc($result)) {
                return $row['password'];
            } else {
                return false;
            }
        }
    }
}
