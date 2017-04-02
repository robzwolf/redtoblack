<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

#FUNCTIONS
#Connecting to LOCAL.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "redtoblack";

try {
    $local_DBH = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $local_DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

//Registration Functions.
function registerUser($firstName,$lastName,$email,$password,$local_DBH) {

    //Storing the data in local.
    $SQL = "INSERT INTO user(userID, firstName, lastName, email, password) VALUES (0,".$local_DBH->quote($firstName).",".$local_DBH->quote($lastName).",".$local_DBH->quote($email).",".$local_DBH->quote($password).")";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();

    //Getting ID
    $SQL = "SELECT userID FROM user WHERE email = ".$local_DBH->quote($email)." LIMIT 1;";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $userID = $STH->fetchAll(PDO::FETCH_ASSOC);

//    TODO - Populate status code. Error handling.

    $status = "OK";
    $output = ["status" => $status, "userID" => $userID];

    return json_encode($output);

}

//Registration Functions.
function updateDetails($userID,$rentAmount,$sfaAmount,$additionalAmount,$universityName,$local_DBH) {

    //Check if the user exists.
    $checkQuery  = "SELECT * FROM userdetails WHERE userID = $userID";
    $STH = $local_DBH->prepare($checkQuery);
    $STH->execute();
    $row = $STH->fetch();

    //If user exists update.
    if ($row) {
        $SQL = "INSERT INTO userdetails (`userID`,`rentAmount`,`sfaAmount`,`additionalAmount`,`universityName`) VALUES ($userID, $rentAmount, $sfaAmount, $additionalAmount, $local_DBH->quote($universityName);";
    } else {
        //If not, create insert.
        $SQL = "UPDATE userdetails SET `rentAmount` = $rentAmount, `sfaAmount` = $sfaAmount, `additionalAmount` = $additionalAmount WHERE `userID` = $userID";
    }

    $STH = $local_DBH->prepare($SQL);
    $STH->execute();

    //TODO - Return a status code.
    $status = "OK";
    $output = ["status" => $status];

    return json_encode($output);

}

function updateUI($userID ,$local_DBH){

    //Fetch finance data for user.
    $SQL = "SELECT * FROM activitybudget WHERE $userID LIMIT 1";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $financeData = $STH->fetchAll(PDO::FETCH_ASSOC);

    #TODO - for starling SQL for one week.
    //Fetch transactions data for user.
    $SQL = "SELECT * FROM transactions WHERE userID = $userID";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $transactions = $STH->fetchAll(PDO::FETCH_ASSOC);

    $status = "OK";
    $output = ["status" => $status,"payload" => $financeData, "transactions" => $transactions];
    return json_encode($output);

}

function weeklySpend($userID, $local_DBH){
    $SQL = "SELECT *  FROM activitybudget WHERE $userID LIMIT 1";
    $STH = $local_DBH->prepare($SQL);
    $STH->execute();
    $data= $STH->fetch(PDO::FETCH_ASSOC);
    $food = array(
      "limit" => $data["foodTotal"],
      "spend" => $data["foodSpent"]
    );
    $leisure = array(
      "limit" => $data["leisureTotal"],
      "spend" => $data["leisureSpent"]
    );
    $travel = array(
      "limit" => $data["travelTotal"],
      "spend" => $data["travelSpent"]
    );
    $bills = array(
      "limit" => $data["billsTotal"],
      "spend" => $data["billsSpent"]
    );

    $JSONOutput = array(
      "food" => $food,
      "leisure" => $leisure,
      "travel" => $travel,
      "bills" => $bills
    );
    return json_encode($JSONOutput);
}

switch ($_GET['action']) {

    case 'registerUser':
        #Retrieving the data
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        echo(registerUser($firstName,$lastName,$email,$password,$local_DBH));
        break;

    case 'updateDetails':
        #Retrieving the data
        $userID = $_POST["userID"];
        $rentAmount = $_POST["rentAmount"];
        $sfaAmount = $_POST["sfaAmount"];
        $additionalAmount = $_POST["additionalAmount"];
        $universityName = $_POST["universityName"];
        echo(updateDetails($userID,$rentAmount,$sfaAmount,$additionalAmount,$universityName,$local_DBH));
        break;

    case 'updateUI':
        $userID = $_POST["userID"];
        echo(updateUI($userID, $local_DBH));
        break;

    case  'weeklySpend':
        $userID = $_GET["userID"];
        echo(weeklySpend($userID,$local_DBH));
        break;
}

?>
