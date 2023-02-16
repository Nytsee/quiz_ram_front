<?php
include_once "../panel/includes/functions.inc.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    //Get the Quiz ID
    $idQuiz = filter_var($_POST["idQuiz"] , FILTER_SANITIZE_NUMBER_INT);
    //Get total questions
    $nbrQuetions = $_POST["nbrQuestions"];

    //Score :: @var $score
    $score = 0;
    $wrong = 0;
    $right = 0;
  

    //Let's fetch the max questions number of this quiz :: @var $maxq
    try{
        $database = new Connection();
        $db = $database->openConnection();
    
        $id = intval($idQuiz);
    
    
        $sql = "SELECT * from quizs WHERE id = ?";
        $stmt= $db->prepare($sql);
        $stmt->execute([$id]); 
    
        $quiz = $stmt->fetch(PDO::FETCH_OBJ);
    
        if( $stmt->rowCount() < 1){
          echo "No Quiz with that ID !";
          return;
        }
    
         $maxq = $quiz->maxq;
         $database->closeConnection();
    
      }
      catch(PDOException $e){
        echo "There is some problem in connection: " . $e->getMessage();
      }

       //Control process - Anti-fraude
       if($nbrQuetions !=  $maxq){
        echo "Dirty manipulation";
             die();
             return;
       }else{
            //Let's connect once ! for the for loop
            $database = new Connection();
            $db = $database->openConnection();

            for($i=0; $i<$maxq ; $i++):

                //echo $_POST["questionID_$i"]." - ". $_POST["reponse_$i"] ."<br>";
                //Lets calculate the score 

                $idQuestion = filter_var($_POST["questionID_$i"] , FILTER_SANITIZE_NUMBER_INT);
                $idReponse = filter_var($_POST["reponse_$i"] , FILTER_SANITIZE_NUMBER_INT);
                
                               
                try{
                            
                  $sql = "SELECT * from questions WHERE id = ? AND id_quiz = ?";
                  $stmt= $db->prepare($sql);
                  $stmt->execute([$idQuestion, $idQuiz]); 
              
                  $question = $stmt->fetch(PDO::FETCH_OBJ);
              
                  if( $stmt->rowCount() < 1){
                    //echo "No Question with that ID ! - possible form Manipulation";
                    die();
                    return;
                  }
              
                   if($question->reponse == $idReponse){
                    $score += 1;
                    $right += 1;
                    $wrong += 1;
                   }
                   
                  }
                  catch(PDOException $e){
                    echo "There is some problem in connection: " . $e->getMessage();
                  }
                       
                endfor;

                //echo $score ."/". $maxq;


                //Let's persist data into 'parties' table for that player :: sql Query & return json / Ajax

                try{
                            
                  $sql = "INSERT INTO `parties` (`id_player`, `id_quiz`, `score`, `right_answers`, `wrong_answers`)
                  VALUES (?,?,?,?,?);";
                  $stmt= $db->prepare($sql);
                  $newParty = $stmt->execute([$_SESSION["player"]["userID"], $idQuiz,$score, $right, $wrong]);
                  $lasteinserted = $db->lastInsertId();
                  
                  if($newParty):
                    //Let's say a winning party is ($maxq - 1), example maxq = 7, user has 6 correct answers over 7
                    if($score >= ($maxq-1)){
                      $response = array('etat' => 1, 'score' => $score, 'maxq' => $maxq, 'msg' => "wining party");
                    }else{
                      $response = array('etat' => 0, 'score' => $score, 'maxq' => $maxq, 'msg' => "loosing party");
                    }
		                echo (json_encode($response));
                  endif;
                
                }
                catch(PDOException $e){
                  echo "There is some problem in connection: " . $e->getMessage();
                }



                //We close the db connection
                $database->closeConnection();
       }

      
      

     


   

}

?>