<?php 
  include_once "panel/includes/functions.inc.php";
  include_once "tpl/header.php";
?>


    <section class="page">
      <div class="container">
         <div class="content">
         <p>السلام <span><?= $_SESSION["player"]["userLNAME"]; ?></span> </p>

         <p>بمناسبة <span class="default">اليوم الوطني للسلامة الطرقية،</span > غادي نتخيلو جميع الطريق لي كاتاخد كل نهار للخدمة أو الدراسة، باش نديرو مراجعة ديال أولويات السياقة الآمنة.</span> </p>
         
         <p>
         جرب حظك، يمكن ليك تفوز معنا ب
          Entretien* للسيارة ديالك، مهدية ليك من طرف الملكية المغربية للتأمين.
         </p>

         <p>
          السلامة ديال سيارتك عندها دور كبير فالسلامة ديالك فالطريق.
         </p>

         <div class="contBtns">
            <div class="defaultBtn iconRight"><a href="quiz.php">Commencer <i class="fal fa-long-arrow-right"></i></a></div>
         </div>

         <span class="spacer-40"></span>

         <div class="macaronIntro">            
            * L’entretien contient: une vidange, un bilan général  
         </div>         

         </div>
      </div>
    </section>

   <div class="fullbg overlay"><img src="images/bg_intro.jpg" alt=""/></div>

 

      
      
<?php include_once "tpl/footer.php"; ?>