<?php


// id partner -> $idPartner
$idPartner = @$_POST["idPartner"];


sleep(1.3);


$output = '<section class="popup">
<div class="container">
  <div class="header">
    <img src="images/brand_pop_cover.png" alt="" />
    <div class="modalities_payment_popup"><img src="images/modalities_payment_popup.png" alt="" /></div>
    <div class="close"><i class="fal fa-times"></i></div>
  </div>

  <div class="description">
   <h3>Restauration</h3>
   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ab omnis molestiae nisi ea ratione doloremque tenetur deleniti fugiat corporis?
  </div>

   <div class="subInfo_popup">
      <div class="elem">
         <div class="picto_alpha">20%</div>
         <p>de réduction</p>
      </div>

      <div class="elem">
         <div class="picto_alpha"><i class="fal fa-map-marker-alt"></i></div>
         <p>Casablanca<br>Marrakech</p>
      </div>
      
      <div class="elem">
      <div class="picto_alpha"><i class="fal fa-credit-card"></i></div>
      <p>Valable sur tous les restaurents</p>
      </div>
   </div>


   <p class="mention_note">* Oﬀre disponible en ligne et en magasin </p>

   <div class="contBtns">
      <div class="defaultBtn centred blueColor iconRight"><a href="#" title="">Voir partenaire <i class="fal fa-long-arrow-right"></i></a></div>
   </div>            

</div>
</section>';

$response = array(
     'status' => 1,
     'output' => $output
);


  echo (json_encode($response));

?>