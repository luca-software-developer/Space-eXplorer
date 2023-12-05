<?php
$host = "localhost";
$port = '5432';
$dbname = 'gruppoXX';
$username = 'www';
$password = 'tw2024';

$connection_string = "host=$host port=$port dbname=$dbname user=$username password=$password";
$db = pg_connect($connection_string) or die('Impossibile connettersi al database!');
