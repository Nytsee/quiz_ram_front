<?php include_once "panel/includes/functions.inc.php";
      $FUNCTIONS = new FUNCTIONS();
      $FUNCTIONS->playerLoged();
      $quizs = $FUNCTIONS->getQuiz('22');
      include_once "tpl/header.php"; 
?>

    <section class="quiz">
      <form name="frm" action="services/checkquiz.php" class="quizForm" method="POST">
         <div class="container">


            <div class="screen">            
               <div class="quizbox">
               <div class="question">
                  دابا تخايل معايا غادي للخدمة فالصباح و لقيتي الطريق للي موالف دوز منها عامرة و بدلتي الطريق 
               </div>

               <div class="btnNext start"><i class="fal fa-arrow-right"></i></div>
               </div>
               
               <div class="quizImg">
                  <img src="images/img_quiz_1.png" alt=""/>
               </div>  
            </div> <!-- End .screen -->

            
            <?php if( sizeof($quizs) > 0 ): ?>
             <?php foreach($quizs as $i=>$quiz):?>
               <div class="screen">            
                  <div class="quizbox">
                  <div class="question">
                    <?= $quiz->question; ?>
                  </div>
                  <div class="options">

                  <?php foreach($options = unserialize($quiz->options) as $idx => $option): ?>
                     <div class="option_reponse" data-reponse="<?= $idx+1; ?>"><?= $option; ?></div>    
                  <?php endforeach;?>

                  </div>
                  <input type="hidden" value="<?= $quiz->questions_id; ?>" name="questionID_<?= $i; ?>" />
                  <input type="hidden" value="" class="reponseField" name="reponse_<?= $i; ?>" />
               
                  <div class="counter">5/7</div>
                  <div class="btnNext"><i class="fal fa-arrow-right"></i></div>
                  </div>
                  
                  <div class="quizImg">
                     <img src="panel/images/media/<?= $quiz->media; ?>" alt=""/>
                  </div>  
               </div> <!-- End .screen -->
             <?php endforeach; ?>
            <?php endif; ?>   

         
            <input type="hidden" name="idQuiz" value="22"/>
            <input type="hidden" name="nbrQuestions" class="nbrQuestions"/>

         </div> <!-- End .container -->
      </form>
    </section> <!-- End section.quiz -->













    <section class="page finalResult_screen winner">
      <div class="container">
         <div class="content">
        
         <div class="finalScore">5/6</div>
         <h4>هنيئاً ليك،</h4>
         <p>
            فزتي معانا<br>
            <span class="blue">ب entretien للسيارة ديالك،</span><br>
             غادي نتواصلو معاك قريباً باش نكولو ليك كيفاش توصل بالجائزة ديالك           
         </p>

         <span class="spacer-5"></span>

         <div class="macaronIntro">     
            <img src="images/macaronIntro.png" alt=""/>       
            * L’entretien contient: une vidange, un bilan général  
         </div>         

         </div>
      </div>
    </section>



    <section class="page finalResult_screen looser">
      <div class="container">
         <div class="content">
        
         <div class="finalScore">3/6</div>
         <h4>للأسف</h4>
         <p>
             ماتمكنتيش من إتمام الأجوبة الصحيحة<br><br>
            <span class="blue">حظ سعيد فالمرة القادمة</span>                 
         </p>
       

         </div>
      </div>
    </section>    















   <div class="fullbg overlay"><img src="images/bg_intro.jpg" alt=""/></div>

 



      <!-- <section class="footer">
         <div class="container">
            <footer>
               
            </footer>
         </div>
      </section> -->
      
      
      
      <?php include_once "tpl/footer.php"; ?>