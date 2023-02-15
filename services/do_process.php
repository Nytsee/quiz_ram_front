<?php 

sleep(1.2);

// $etat = 0 ;
// $matchedCode = true;
// $showOTP = false;

// $code = $_POST["ccode"];

// if(isset($code) && !empty($code)){
// 	//We got an sms code field filled-in through the form
// 	if($code == 1234){
// 	  // ---- actions : update active status = 1
// 	  $matchedCode = true ;
//       $etat = 1 ;
//       $showOTP = false ;
// 	}else{
// 	  // the code dosn't match the generated sms code for the registred form
// 	  $showOTP = true ;
// 	  $etat = 0 ;
// 	  $matchedCode = false ;	
// 	}
// }else{
// 	//the sms code filed insn't populated, the user is submiting the form for the first time
// 	// ---- actions : storing form data + active status = 0
// 	$showOTP = true ;
// 	$etat = 0 ;
// }


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $to = "jamal@tribalddb.ma";
    $message = "";

	$civility = @$_POST["civility"];
	$user_firstname = @$_POST["user_firstname"];
	$user_lastname = @$_POST["user_lastname"];
	$user_city = @$_POST["user_city"];
	$user_mail = @$_POST["user_mail"];
	$user_phone = @$_POST["user_phone"];
	$indicatif = @$_POST["indicatif"];
	$user_phone = @$_POST["user_phone"];
	$user_message = @$_POST["user_message"];



	$subject = 'Nouveau message reçu via ____CIH Partenaires ?___.ma';
	
	$headers = "From: " . strip_tags($user_mail) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($user_mail) . "\r\n";
	// $headers .= "CC: susan@example.com\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	$message = '<html><body>';
	// $message .= '<img src="" alt="" />';
	$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
	$message .= "<tr style='background: #eee;'><td><strong>Nom:</strong> </td><td>" . strip_tags($user_lastname) . "</td></tr>";
	$message .= "<tr><td><strong>Prénom:</strong> </td><td>" . strip_tags($user_firstname) . "</td></tr>";
	$message .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($user_mail) . "</td></tr>";
	$message .= "<tr><td><strong>Téléphone:</strong> </td><td> (" . strip_tags($indicatif ) . ") " . strip_tags($user_phone) . "</td></tr>";
	$message .= "<tr><td><strong>Ville:</strong> </td><td>" . $user_city . "</td></tr>";
	$message .= "<tr><td><strong>Message:</strong> </td><td>" . $user_message . "</td></tr>";

	$message .= "</table>";
	$message .= "<strong>Nouveau message reçu via Code30.ma / Contact form</strong>";
	$message .= "</body></html>";

	$isSent = mail($to, $subject, $message, $headers);

	if($isSent){
		$response = array('etat' => 1, 'msg' => "Nous avons bien reçu votre demande. Un de nos conseillers prendra contact avec vous dans les plus brefs délais pour répondre à vos besoins.");
	}else{
		$response = array('etat' => 0, 'msg' => "Désolé, votre demande de contact n'a pas pu être envoyée. Veuillez vérifier les informations saisies et réessayer ultérieurement.");
	}

	echo (json_encode($response));		

}


 



?>