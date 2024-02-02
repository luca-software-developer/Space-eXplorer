<?php
//  Effettua il log-out.
session_start();
session_unset();
if (session_id() != "" || isset($_COOKIE[session_name()])) {
    setcookie(session_name(), "", time() - 2592000, '/');
}
session_destroy();

//  Reindirizza l'utente alla home page.
header("Location: ./index.php");
