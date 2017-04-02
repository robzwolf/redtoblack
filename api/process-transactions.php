<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

#FUNCTIONS
#Connecting to LOCAL.
$servername = "localhost";
$username = "root";
$password = "root";
$dbname_uni = "redtoblack";

try {
    $local_DBH = new PDO("mysql:host=$servername;dbname=$dbname_uni", $username, $password);
    // set the PDO error mode to exception
    $local_DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

//Gett