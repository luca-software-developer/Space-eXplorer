<?php
require_once "./logindb.php";

if (isset($_POST["signup-email"]) && isset($_POST["signup-nickname"]) && isset($_POST["signup-password"])) {
    $signup_email = $_POST["signup-email"];
    $signup_nickname = $_POST["signup-nickname"];
    $signup_password = $_POST["signup-password"];

    $signup_password = password_hash($signup_password, PASSWORD_DEFAULT);

    $sql = 'INSERT INTO "user" ("email", "nickname", "password") VALUES ($1, $2, $3)';
    $result = pg_prepare($db, "Sign-Up", $sql);

    if (!$result) {
        echo pg_last_error($db);
        pg_close($db);
    } else {
        $result = pg_execute($db, "Sign-Up", array($signup_email, $signup_nickname, $signup_password));
        if (!$result) {
            echo pg_last_error($db);
            pg_close($db);
        } else {
            session_start();
            $_SESSION['email'] = $signup_email;
            $_SESSION['nickname'] = $signup_nickname;
            $_SESSION['access_timestamp'] = time();
            pg_close($db);
            header("location: dashboard.php");
        }
    }
} else {
    header("location: index.php");
    pg_close($db);
}
