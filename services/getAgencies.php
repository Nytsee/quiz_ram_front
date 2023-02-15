<?php 
header("Access-Control-Allow-Origin: *");
include "../cnx.php";


$userCity = htmlspecialchars(@$_POST["userCity"]);
$lang = htmlspecialchars(@$_POST["lang"]);

$etat = 0 ;



$conn = new mysqli($host, $login, $pass, $bdd);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM agencies WHERE city = '". $userCity ."' ORDER BY name" ;


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $etat = 1 ;
    $agencies = $lang == "fr" ? "<option value=''>Choisissez une agence</option>" : "<option value=''> إختز الوكالة</option>";
    while($row = $result->fetch_object()) {
        $agencies .= "<option value='". $row->name ."'>". $row->name ."</option>";
    }
} else {
    $etat = 0 ;
}
$conn->close();


 
$response = array('etat' => $etat, 'agencies' => $agencies);
echo (json_encode($response));


?>