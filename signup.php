<?php include_once "panel/includes/functions.inc.php";
      $FUNCTIONS = new FUNCTIONS();
      $FUNCTIONS->playerLoged();
      include_once "tpl/header.php";
?>

    <section class="page">
      <div class="container">
         <div class="contFormulaire">               
            <!-- Form Start -->
            <div class="generic_form">
               <h2> باش تشارك،<div clas="breaker"></div>
                 المرجو إدخال المعلومات التالية  :
               </h2>
               <div class="msg_"></div>                     
               <!-- <div class="content"></div> -->
               <form name="frm" action="services/signup.php" method="POST" class="form">
                  <!-- <div class="champsMe elemForm full">
                     <div class="radioSets">
                        <label>
                        <input class="with-gap" name="civility" value="Mme" type="radio" id="civility" required />
                        <span>Mme</span>
                        </label>   
                        <label>
                        <input class="with-gap" name="civility" value="M." type="radio" id="civility" />
                        <span>M.</span>
                        </label> 
                     </div>
                     <span class="error"></span>                  
                  </div> -->
                  <div class="champsMe elemForm">
                     <input type="text" value="" name="user_firstname" class="inputDefault" id="user_firstname" placeholder="Nom *" required>
                     <span class="error"></span>
                  </div>
                  <div class="champsMe elemForm">
                     <input type="text" value="" name="user_lastname" class="inputDefault" id="user_lastname" placeholder="Prénom *" required>
                     <span class="error"></span>
                  </div>
                  <div class="champsMe elemForm">
                     <select name="user_city" id="user_city" required>
                        <option value="">Choisissez votre ville</option>
   <option value="Agadir">Agadir</option>
   <option value="Ahfir">Ahfir</option>
   <option value="Ain aouda">Ain aouda</option>
   <option value="Ain attig">Ain attig</option>
   <option value="Ain harrouda">Ain harrouda</option>
   <option value="Ain taoujdate">Ain taoujdate</option>
   <option value="Ait amira">Ait amira</option>
   <option value="Ait baha">Ait baha</option>
   <option value="Ait melloul">Ait melloul</option>
   <option value="Ait ourir">Ait ourir</option>
   <option value="Aklim">Aklim</option>
   <option value="Aknoul">Aknoul</option>
   <option value="Al aaroui">Al aaroui</option>
   <option value="Al hoceima">Al hoceima</option>
   <option value="Aoulouz">Aoulouz</option>
   <option value="Arfoud">Arfoud</option>
   <option value="Azemmour">Azemmour</option>
   <option value="Azilal">Azilal</option>
   <option value="Azrou">Azrou</option>
   <option value="Bab berred">Bab berred</option>
   <option value="Bab taza">Bab taza</option>
   <option value="Ben ahmed">Ben ahmed</option>
   <option value="Ben guerir">Ben guerir</option>
   <option value="Beni mellal">Beni mellal</option>
   <option value="Benslimane">Benslimane</option>
   <option value="Berkane">Berkane</option>
   <option value="Berrechid">Berrechid</option>
   <option value="Biougra">Biougra</option>
   <option value="Bir jdid">Bir jdid</option>
   <option value="Bni bouayach">Bni bouayach</option>
   <option value="Bouarfa">Bouarfa</option>
   <option value="Boufakrane">Boufakrane</option>
   <option value="Bouizakarne">Bouizakarne</option>
   <option value="Boulemane dades">Boulemane dades</option>
   <option value="Bouskoura">Bouskoura</option>
   <option value="Bouznika">Bouznika</option>
   <option value="Bradia">Bradia</option>
   <option value="Casablanca">Casablanca</option>
   <option value="Chefchaouen">Chefchaouen</option>
   <option value="Chemaia">Chemaia</option>
   <option value="Chichaoua">Chichaoua</option>
   <option value="Dakhla">Dakhla</option>
   <option value="Dar gueddari">Dar gueddari</option>
   <option value="Dcheira">Dcheira</option>
   <option value="Demnate">Demnate</option>
   <option value="Deroua">Deroua</option>
   <option value="Driouch">Driouch</option>
   <option value="El  attaouia">El  attaouia</option>
   <option value="El aioun sidi mellouk">El aioun sidi mellouk</option>
   <option value="El borouj">El borouj</option>
   <option value="El gara">El gara</option>
   <option value="El guerdane">El guerdane</option>
   <option value="El hajeb">El hajeb</option>
   <option value="El jadida">El jadida</option>
   <option value="El kelaa des sraghna">El kelaa des sraghna</option>
   <option value="El ksiba">El ksiba</option>
   <option value="El menzel">El menzel</option>
   <option value="Er-rich">Er-rich</option>
   <option value="Errachidia">Errachidia</option>
   <option value="Essaouira">Essaouira</option>
   <option value="Fes">Fes</option>
   <option value="Fnidq">Fnidq</option>
   <option value="Fquih ben salah">Fquih ben salah</option>
   <option value="Ghafsai">Ghafsai</option>
   <option value="Goulmima">Goulmima</option>
   <option value="Guelmim">Guelmim</option>
   <option value="Guercif">Guercif</option>
   <option value="Had belfaa">Had belfaa</option>
   <option value="Had soualem">Had soualem</option>
   <option value="Imouzzer kandar">Imouzzer kandar</option>
   <option value="Imzouren">Imzouren</option>
   <option value="Inezgane">Inezgane</option>
   <option value="Issaguen">Issaguen</option>
   <option value="Jaadar">Jaadar</option>
   <option value="Jerada">Jerada</option>
   <option value="Jorf el melha">Jorf el melha</option>
   <option value="Kalaat m'gouna">Kalaat m'gouna</option>
   <option value="Kariat ba mohamed">Kariat ba mohamed</option>
   <option value="Kasba tadla">Kasba tadla</option>
   <option value="Kenitra">Kenitra</option>
   <option value="Khemis zemamra">Khemis zemamra</option>
   <option value="Khemisset">Khemisset</option>
   <option value="Khenifra">Khenifra</option>
   <option value="Khouribga">Khouribga</option>
   <option value="Kolea">Kolea</option>
   <option value="Ksar el kebir">Ksar el kebir</option>
   <option value="Laayoune">Laayoune</option>
   <option value="Larache">Larache</option>
   <option value="M">M'rirt</option>
   <option value="Marrakech">Marrakech</option>
   <option value="Massa">Massa</option>
   <option value="Meknes">Meknes</option>
   <option value="Midelt">Midelt</option>
   <option value="Missour">Missour</option>
   <option value="Mohammedia">Mohammedia</option>
   <option value="Nador">Nador</option>
   <option value="Ouarzazate">Ouarzazate</option>
   <option value="Oued laou">Oued laou</option>
   <option value="Oued zem">Oued zem</option>
   <option value="Ouezzane">Ouezzane</option>
   <option value="Oujda">Oujda</option>
   <option value="Oulad ayad">Oulad ayad</option>
   <option value="Oulad frej">Oulad frej</option>
   <option value="Oulad teima">Oulad teima</option>
   <option value="Ouled berhil">Ouled berhil</option>
   <option value="Oulmes">Oulmes</option>
   <option value="Outat el haj">Outat el haj</option>
   <option value="Rabat">Rabat</option>
   <option value="Rommani">Rommani</option>
   <option value="Sabaa aiyoun">Sabaa aiyoun</option>
   <option value="Safi">Safi</option>
   <option value="Sale">Sale</option>
   <option value="Sale karit oulad moussa">Sale karit oulad moussa</option>
   <option value="Sebt gzoula">Sebt gzoula</option>
   <option value="Sebt oulad nemma">Sebt oulad nemma</option>
   <option value="Sefrou">Sefrou</option>
   <option value="Selouane">Selouane</option>
   <option value="Semara">Semara</option>
   <option value="Settat">Settat</option>
   <option value="Sidi allal el bahraoui">Sidi allal el bahraoui</option>
   <option value="Sidi bennour">Sidi bennour</option>
   <option value="Sidi bibi">Sidi bibi</option>
   <option value="Sidi kacem">Sidi kacem</option>
   <option value="Sidi slimane">Sidi slimane</option>
   <option value="Sidi yahya el gharb">Sidi yahya el gharb</option>
   <option value="Skhirate">Skhirate</option>
   <option value="Souk el arbaa">Souk el arbaa</option>
   <option value="Tafraout">Tafraout</option>
   <option value="Tahnaout">Tahnaout</option>
   <option value="Tamanar">Tamanar</option>
   <option value="Tamelelt">Tamelelt</option>
   <option value="Tamesna">Tamesna</option>
   <option value="Tan tan">Tan tan</option>
   <option value="Tanger">Tanger</option>
   <option value="Taounate">Taounate</option>
   <option value="Taourirt">Taourirt</option>
   <option value="Targuist">Targuist</option>
   <option value="Taroudannt">Taroudannt</option>
   <option value="Tata">Tata</option>
   <option value="Taza">Taza</option>
   <option value="Temara">Temara</option>
   <option value="Temsamane">Temsamane</option>
   <option value="Tetouan">Tetouan</option>
   <option value="Tiflet">Tiflet</option>
   <option value="Tinghir">Tinghir</option>
   <option value="Tinjdad">Tinjdad</option>
   <option value="Tissa">Tissa</option>
   <option value="Tit mellil">Tit mellil</option>
   <option value="Tiznit">Tiznit</option>
   <option value="Youssoufia">Youssoufia</option>
   <option value="Zagora">Zagora</option>
   <option value="Zaio">Zaio</option>
   <option value="Zeghanghane">Zeghanghane</option>
                     </select>
                     <span class="error">
                       <label for="user_city" generated="true" class="error customError"></label>
                     </span>
                  </div>
                  <div class="champsMe elemForm">
                     <input type="text" value="" name="user_mail" class="inputDefault" id="user_mail" placeholder="E-mail *" required>
                     <span class="error"></span>
                  </div>

                  <div class="champsMe elemForm">
                     <input type="text" value="" name="user_policeumber" class="inputDefault" id="user_policeumber" placeholder="Numéro de police  *" required>
                     <span class="error"></span>
                  </div>

                  <div class="customPhone champsMe elemForm">
                     <input type="text" name="user_phone"  id="user_phone" class="inputDefault phoneIndic" placeholder="Téléphone *" required>
                     <input type="hidden" class="indicatif_val" name="indicatif">
                     <div class="spacer-8"></div>
                     <span class="error"></span>
                  </div>
                  <!-- <div class="champsMe elemForm full">
                     <textarea class="inputDefault areaField" placeholder="Message" name="user_message"></textarea>   
                  </div> -->


                  <div class="subCont_form">
                     <button type="submit" id="subForm">Valider <i class="fal fa-paper-plane"></i></button>
                  </div>
               </form>
            </div>
            <!--generic_form-->
            <!-- Form End -->
         </div>
      </div>
    </section>

   <div class="fullbg overlay"><img src="images/bg_intro.jpg" alt=""/></div>

 


      <!-- End Section .devenirPartenaire-->


      <!-- <section class="footer">
         <div class="container">
            <footer>
               
            </footer>
         </div>
      </section> -->
      
      
      
<?php  include_once "tpl/footer.php"; ?>