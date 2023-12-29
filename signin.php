<?php
require_once "./logindb.php";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');

if (isset($_POST['signin-email']) && isset($_POST['signin-password'])) {
    $signin_email = $_POST['signin-email'];
    $signin_password = $_POST['signin-password'];
    $password_hash = get_password_hash($db, $signin_email);
    if ($password_hash) {
        if (password_verify($signin_password, $password_hash)) {
            $sql = 'SELECT "nickname" FROM "user" WHERE email = $1 ;';
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
                        session_start();
                        $_SESSION['email'] = $signin_email;
                        $_SESSION['nickname'] = $signin_nickname;
                        $_SESSION['access_timestamp'] = time();
                        pg_close($db);
                        header('location: dashboard.php');
                    } else {
                        echo pg_last_error($db);
                    }
                }
            }
        } else {
            header('location: login.php?action=signin&error=incorrect-password');
        }
    } else {
        header('location: login.php?action=signup&error=inexistent-user');
    }
}

pg_close($db);

function get_password_hash($db, $signin_email)
{
    $sql = 'SELECT "password" FROM "user" WHERE email = $1 ;';
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
