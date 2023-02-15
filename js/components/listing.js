

function Listing(){

    const {useState, useEffect} = React;
    useEffect(() => console.log('Hooks are working!!'))

return(
         <div>

         <div className="upperListing">
            <div className="searchBar">
               <form>
                  <input type="text" value="" placeholder="Recherche"/>
                  <button type="submit"><i className="fal fa-search"></i></button>
               </form>
            </div>
            <div className="selectCities">                        
               <select>
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
               <div className="iconLocalistion"><i className="fas fa-map-marker-alt"></i></div>
            </div>
         </div>

         <div className="listing">
            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/wayback_cover.jpg" alt="" />
                     <div className="logo"><img src="images/wayback.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Food</span>
                           <span>Shooping</span>
                        </div>
                        <div className="brandName">WAYBACK Burgers</div>
                     </div>
                     <div className="discountValue">-20%</div>
                  </div>
               </a>
            </div> 
            
            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/diamontine_cover.jpg" alt="" />
                     <div className="logo"><img src="images/diamontine_logo.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Prét à porter</span>                                    
                        </div>
                        <div className="brandName">DIAMONTINE</div>
                     </div>
                     <div className="discountValue">-15%</div>
                  </div>
               </a>
            </div> 
            
            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/ezio_cover.jpg" alt="" />
                     <div className="logo"><img src="images/ezio_logo.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Déco/maison</span>
                        </div>
                        <div className="brandName">Ezio design</div>
                     </div>
                     <div className="discountValue">-10%</div>
                  </div>
               </a>
            </div>       
            
            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/cosmos_cover.jpg" alt="" />
                     <div className="logo"><img src="images/cosmos_logo.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Shooping</span>
                        </div>
                        <div className="brandName">cosmos</div>
                     </div>
                     <div className="discountValue">-5%</div>
                  </div>
               </a>
            </div> 
            

            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/sushiclub_cover.jpg" alt="" />
                     <div className="logo"><img src="images/sushiclub_logo.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Food</span>
                        </div>
                        <div className="brandName">Sushiclub</div>
                     </div>
                     <div className="discountValue">-15%</div>
                  </div>
               </a>
            </div> 
            
            

            <div className="elemCard">
               <a href="#" title="">
                  <div className="imgCover">
                     <img src="images/puma_cover.jpg" alt="" />
                     <div className="logo"><img src="images/puma_logo.png" alt="" /></div>
                  </div>
                  <div className="footerCard">
                     <div className="infos">
                        <div className="tags">
                           <span>Sport</span>
                        </div>
                        <div className="brandName">Puma</div>
                     </div>
                     <div className="discountValue">-10%</div>
                  </div>
               </a>
            </div>           

         </div> 


         <div className="contBtns">
            <div className="defaultBtn centred blueColor iconRight"><a href="#" title="">Chargez plus <i className="fal fa-chevron-right"></i></a></div>
         </div>

          </div>
);
 

}



ReactDOM.render(<Listing/>, document.querySelector(".listingSide"))