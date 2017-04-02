<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

#FUNCTIONS
#Connecting to LOCAL.
$servername = "localhost";
$username = "root";
$password = "";
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

function getRemainingBalance($userID, $local_DBH){
    $SQL = "SELECT `rentAmount`, `sfaAmount`, `additionalAmount` FROM userdetails WHERE $userID LIMIT 1";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $userData = $STH->fetch(PDO::FETCH_ASSOC);
    $rentAmount = $userData["rentAmount"];
    $sfaAmount = $userData["sfaAmount"];
    $additionalAmount = $userData["additionalAmount"];
    $leftOverBalance = ($sfaAmount + $additionalAmount) - $rentAmount;
    return $leftOverBalance;
}

function setupGoals($userID, $local_DBH, $leftOverBalance){
    $leftOverBalance = $leftOverBalance/30;
    $leisureTotal = 0.4 * $leftOverBalance;
    $travelTotal = 0.15 * $leftOverBalance;
    $foodTotal = 0.25 * $leftOverBalance;
    $billsTotal = 0.20 * $leftOverBalance;

    $SQL = "SELECT * FROM transactions WHERE $userID";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $transactionsArray = $STH->fetchAll(PDO::FETCH_ASSOC);
    $leisureSpent = 0.00;
    $travelSpent = 0.00;
    $foodSpent = 0.00;
    $billsSpent = 0.00;
    for($i = 0; $i <= sizeof($transactionsArray); $i++){
        if($transactionsArray[$i]["activityID"] == 1){
            $leisureSpent += $transactionsArray[$i]["amount"];
        }
        elseif($transactionsArray[$i]["activityID"] == 2){
            $travelSpent += $transactionsArray[$i]["amount"];
        }
        elseif($transactionsArray[$i]["activityID"] == 3){
            $foodSpent += $transactionsArray[$i]["amount"];
        }
        elseif($transactionsArray[$i]["activityID"] == 4){
            $billsSpent += $transactionsArray[$i]["amount"];
        }
        print_r($transactionsArray[$i]);
        print("<br>");
    }
    print($leisureSpent);
    print("<br>");
    print($travelSpent);
    print("<br>");
    print($foodSpent);
    print("<br>");
    print($billsSpent);
    print("<br>");


    $checkQuery  = "SELECT * FROM activitybudget WHERE userID = $userID";
    $STH = $local_DBH->prepare($checkQuery);
    $STH->execute();
    $row = $STH->fetch();


    if ($row) {
        $SQL = "UPDATE activitybudget SET `leisureSpent` = $leisureSpent, `leisureTotal` = $leisureTotal, `travelSpent` = $travelSpent, `travelTotal` = $travelTotal, `foodSpent` = $foodSpent, `foodTotal` = $foodTotal, `billsSpent`= $billsSpent, `billsTotal` = $billsTotal  WHERE `userID` = $userID";

        } else {
                  //If not, create insert.
        $SQL = "INSERT INTO activitybudget (`leisureSpent`,`leisureTotal`,`travelSpent`,`travelTotal`,`foodSpent`,`foodTotal`,`billsSpent`,`billsTotal`,`userID`) VALUES ($leisureSpent, $leisureTotal, $travelSpent, $travelTotal, $foodSpent, $foodTotal, $billsSpent, $billsTotal, $userID);";

        }
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
}

echo(setupGoals(1,$local_DBH,getRemainingBalance(1, $local_DBH)));
?>
