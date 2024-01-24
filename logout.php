<?php
//  Effettua il log-out.
session_start();
session_unset();
session_destroy();

//  Reindirizza l'utente alla home page.
header("Location: ./index.php");
