<?php
/*
CSRF Protection
*/
define("APIKEY","6Ld-2dcZAAAAABgHsHWcHOUoLd6EbdHZJLVYQWRq");
define("SECRETKEY","6Ld-2dcZAAAAAHCPzuFC7GPctUat72KQfCQCiCzR");

if (!empty($_POST) AND isset($_POST) ){
  $response = $_POST["g-recaptcha-response"];
  $payload  = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".SECRETKEY."&response=".$response);
  $result   = json_decode($payload, TRUE);
  //var_dump($result) ;
  if($result["success"] == 1){
      echo "Status : Verified submit form ! do your logic !<br>";
      echo "Host name :".$result["hostname"]."<br>";
      echo "Time submit :".$result["challenge_ts"]."<br>";
      echo "Persist data in the data base / send mail";
  }else{
      echo "Doubtful submission :/ ";
  }
}

?>