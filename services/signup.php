<?php 
include_once "../panel/includes/functions.inc.php";

sleep(1.2);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $fname = filter_var(@$_POST["user_firstname"] , FILTER_SANITIZE_STRING);
    $lname = filter_var(@$_POST["user_lastname"] , FILTER_SANITIZE_STRING);
    $city = filter_var(@$_POST["user_city"] , FILTER_SANITIZE_STRING);
    $police = filter_var(@$_POST["user_policeumber"] , FILTER_SANITIZE_STRING);
    $email = filter_var(@$_POST["user_mail"] , FILTER_SANITIZE_EMAIL);
    $phone = filter_var(@$_POST["user_phone"] , FILTER_SANITIZE_STRING);

    //$_SESSION["errors"] = [];

    try
    {
      $database = new Connection();
      $db = $database->openConnection();
      
      if(empty($fname) || empty($lname) || empty($police) || empty($email) || empty($phone)){
		$response = array('etat' => 0, 'msg' => "Some field are not filled");
      }

      $sql = "SELECT police, email, nom, prenom, id FROM players where email = ? AND police = ?";
      $stmt= $db->prepare($sql);
      $stmt->execute([$email, $police]);
	  $player = $stmt->fetch(PDO::FETCH_OBJ);

          if( $stmt->rowCount() == 1){
            //$_SESSION["errors"][] = "Email déjà existant !";
            //Creating user session
			unset($_SESSION["player"]);

            $_SESSION["player"]["userID"] = $player->id;
            $_SESSION["player"]["userLNAME"] = $player->nom;
			      $_SESSION["player"]["userFNAME"] = $player->prenom;
            $_SESSION["player"]["userEMAIL"] = $player->email;			
          }else{
            $sql = "INSERT INTO `players` (`nom`, `prenom`, `email`, `phone`, `ville`, `police`)
            VALUES (?,?,?,?,?,?);";
            $stmt= $db->prepare($sql);
            $stmt->execute([$fname,$lname,$email,$phone,$city,$police]);
            $lasteinserted = $db->lastInsertId();
            //unset($_SESSION['errors']);
            
            //Creating user session
            $_SESSION["player"]["userID"] = $lasteinserted;
            $_SESSION["player"]["userLNAME"] = $lname;
			      $_SESSION["player"]["userFNAME"] = $fname;
            $_SESSION["player"]["userEMAIL"] = $email;	

            //The user is connected and its session is live ! 
            //header('Location: quiz.html');
          }
          $database->closeConnection();
		  $response = array('etat' => 1, 'msg' => "Utilisateur identifié !", 'redirect' => "concept.php");
		  echo (json_encode($response));

      }
     catch (PDOException $e)
    {
       echo "There is some problem in connection: " . $e->getMessage();
    }
    
		

}


 



?>