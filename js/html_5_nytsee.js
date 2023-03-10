jQuery(document).ready(function( $ ) {// wait for document ready
    //@var :: debugMode -- Turn it to false when going live
    debugMode = false;

    $(".finalResult_screen").hide();
    

    $('.options').each(function(){
        var options = $(this);
        var elements = options.children('.option_reponse');
        while (elements.length) {
            options.append(elements.splice(Math.floor(Math.random() * elements.length), 1)[0]);
        }
    })



    totalScreens = $(".screen").length ;
    $(".nbrQuestions").val(totalScreens-1)
    currentScreen = 0;
    $(".screen").hide().eq("0").show();

    //Remove Quiz game
    //$("section.quiz").remove()

    $(".btnNext").click(function(){
        reponse = $(this).parents(".quizbox").find(".reponseField").val()
        if(reponse == ""){
             //alert("Merci de faire un choix"); return false
       
                TweenMax.fromTo($(this), 0.1, {
                  x: -3,
                }, {
                  x: 3,
                  repeat: 5,
                  yoyo: true,
                  ease: Quad.easeInOut
                });
        

               return false;          
         }

        $(this).parents(".quizbox").hide();
        currentScreen ++
        if(currentScreen < totalScreens){
            $(".counter").html(currentScreen+"/"+ (totalScreens-1))
            $(".screen").hide().eq(currentScreen).show();
            //console.log(currentScreen)
        }else{
            $(".quizForm").submit();
            //Hide all screens
            $(".screen").hide();
        }
    })



   $(".option_reponse").click(function(){
    $(".option_reponse").removeClass("selected");
    $(this).addClass("selected");
    $(this).parents(".quizbox").find(".reponseField").val($(this).attr("data-reponse"))
   })



    const swiper = new Swiper('.contElemNew_boxs', {
        // Optional parameters
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
      
        // If we need pagination
        pagination: {
          el: '.nouveauteDots',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        breakpoints: { 
           // at this viewport size w're just deleted wrapper margins to kill left and right spaces (CSS)
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            320: {  
               slidesPerView: 2,
               spaceBetween: 10,
               centeredSlides: true,
            }
        }       
      });











    //Let's apply tilting effect on .boxDiscount --- Header
    $.getScript( "js/tilting.js" )
    .done(function( script, textStatus ) {
        TiltAnimation.init();
    })
    .fail(function( jqxhr, settings, exception ) {
    });




        /// init Pagination Script

        $.getScript( "js/simplePagination.js" )
        .done(function( script, textStatus ) {
            setUp_Pagination($(".listing .elemCard"), $(".listing"));
        })
        .fail(function( jqxhr, settings, exception ) {
        });

        setUp_Pagination = function(elm, scrollTosection_){
            // jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
    
            var items = elm;
                var numItems = items.length;
                var perPage = 6;
    
                items.slice(perPage).hide();
    
                $('#paginationContainer').pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: '',
                    prevText: "<i class='fal fa-long-arrow-left'></i>",
                    nextText: "<i class='fal fa-long-arrow-right'></i>",
                    onPageClick: function (pageNumber) {
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        items.hide().slice(showFrom, showTo).show();
                        scrollTo( scrollTosection_.offset().top);
                    }
                });
    
            //Delete auto generated weirdo divs in the bottom of the document  
                setTimeout(function(){
                    for (let i = 0; i < 2; i++) {
                            //$(document).find("div:last").remove()
                        }
                },500)
        }



        $(".searchBar input:eq(0)").focus(function(){
            $(".searchBar button").addClass("focus")
        }).blur(function(){
            $(".searchBar button").removeClass("focus")
        })

        $(".selectCities select").change(function(){
            $(".city_field").val($(this).val());
        })

        $(".categotiesSide ul.catList li a").click(function(e){
            e.preventDefault();
            $(".catId_field").val($(this).attr("data-catID"))
            $(".FormFilter").submit();
        })



        $(".scrolTo_avantages_section").click(function(){
            scrollTo( $(".mainContent").offset().top - 10);
        })

        $(".scrolTo_partenerForm_section").click(function(){
            scrollTo( $(".contFormulaire").offset().top);
        })


        $(".categotiesSide h4 i").click(function(){
            if($(".catList").is(":visible")){
                $(".catList").slideUp(250);
            }else{                
                $(".catList").slideDown(250);
            }
        })


        $(".listing .elemCard").click(function(){            
            getPartnerInfos($(this).attr("data-idPartner"));
        })


        

        $(document).on('click', 'section.popup .header .close', function() {
            //$("section.popup").fadeTo(300,0, function(){$(".mainWrapper").fadeTo(200,1); $(this).remove(); })
            gsap.fromTo($("section.popup"), {display: "flex", opacity:1, top:0}, {display: "none", opacity: 0, top:-10, duration: 0.5, onComplete: function(){
                $(".mainWrapper").fadeTo(200,1);
                $("section.popup").remove();
                
                // we bring back user to initial scroll position 
                $('html, body').stop().animate({
                    scrollTop: bringMeBackTo_
                }, 10,"easeInOutQuart");
                
            } });
        })




        function getPartnerInfos(idPartner){
            
            bringMeBackTo_ = document.documentElement.scrollTop || document.body.scrollTop

            var idPartner =  idPartner;
                console.log("Partner ID ? : "+ idPartner  )
      
            $.ajax({
              type:'post',
              url:"services/getPartnerInfos.php",
              dataType: "json",
              data: { 
                idPartner :  idPartner 
              }, beforeSend:function(xhr, settings){
                  launchpreloader();
              },
              complete:function(){
                  
              },
              success:function(result){
                console.log("____________ : "+result.status)
                $("body").prepend(result.output).find("section.popup").hide();
                $(".mainWrapper").hide();


                //TweenMax.staggerFromTo($("section.popup"), 1.5, {autoAlpha:0} , {autoAlpha:1, ease: "Expo.easeInOut" },0);
                gsap.fromTo($("section.popup"), {display: "none", opacity:0, top:10}, {display: "flex", opacity: 1, top:0, duration: 0.5});
                stopPreloader();

      
                // updateScrollNav($("#widgetPopup .page"));
                // setTimeout(function(){
                // },10)          

              },
              error: function (request, status, error) {
                console.log(request.responseText);
              }
            });
      
        }
      




        // setup listener for custom event to re-initialize on change
        $('#user_agency').on('contentChanged', function() {
            $(this).formSelect();
        });


       $('#user_city').on('change', function() {
        if(this.value == "Casablanca"){
           $(".elemquartier").fadeIn("Slow");
        }else{
           $(".elemquartier").fadeOut("Slow");
        }


        $.post("https://codesakane.ma/services/getAgencies.php",{
            userCity : this.value,
            lang : $("html").attr("lng")
          },function(data, status){
           if(status){
             //alert(data)
             console.log(data);
                  if(data.etat == "1"){              
                    $("#user_agency").parents(".elemForm").show();
                        $("#user_agency").empty().append(data.agencies)                        
                        //Updating agencies list
                        $("#user_agency").trigger('contentChanged');
                    }else{
                        //Error
                        $("#user_agency").parents(".elemForm").hide();
                        console.log("no agencies found !");
                  }
                 }
              }, 'json'); 

     });

$("html").easeScroll();	

//Create Mobile navigation


if( $(".cont_timeLine").length ){
    TweenMax.set($(".cont_timeLine .underlined_title"), {y:50, opacity:0});
    TweenMax.set($(".cont_timeLine .timeline"), {y:50, opacity:0});
    TweenMax.set($(".cont_timeLine h5"), {x:-50, opacity:0});
    TweenMax.set($(".cont_timeLine h1"), {opacity:0});
 }

initAfter_loading = function(){  
  if( $(".cont_timeLine").length ){
    TweenMax.staggerFromTo($(".cont_timeLine h1"), 1.5, {opacity:0} , {opacity:1, ease: "Expo.easeInOut" },0);
    setTimeout(function(){
      TweenMax.staggerFromTo($(".cont_timeLine .underlined_title"), 1, {y:50, opacity:0} , {y:0, opacity:1, ease: "Expo.easeInOut" }, 0.2);
      TweenMax.staggerFromTo($(".cont_timeLine .timeline"), 1, {y:50, opacity:0} , {y:0, opacity:1, ease: "Expo.easeInOut" }, 0.3);
      TweenMax.staggerFromTo($(".cont_timeLine h5") , 1, {x:-50, opacity:0} , {x:0, opacity:1, ease: "Expo.easeInOut" }, 0.25);
    },450)
  }
}






// init Masonry

$.getScript( "js/mgrid.js" )
  .done(function( script, textStatus ) {
    buildMaonry();
  })
  .fail(function( jqxhr, settings, exception ) {
});


function buildMaonry(){  
    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
      // layout Isotope after each image loads
      $grid.imagesLoaded().progress( function() {
        $grid.masonry();
      }); 
}






$("#mainMenu ul li").each(function(){
  if($(this).has("ul").length){
    $(this).addClass("hasChild");
  }
})



$("#hamburger_hotspot").click(function(){

     $('html, body').stop().animate({
              scrollTop: 0
     }, 300,"easeInOutQuart");

  if($("#mobile_nav").is(":visible")){ 
    return false;
  }


 $("#mobile_nav .closeNav i").css({"opacity":0},150)
 $("#mobile_nav").slideDown(800, "easeInOutExpo");
 $("#mobile_nav").find("li").css({"opacity":0})
 $("#hamburger_hotspot").hide();
   setTimeout(function(){
     $("#mobile_nav").find("li").each(function(idx){
        $(this).delay(80*idx).animate({"opacity":1})
     })
   },300)
   $("#mobile_nav .closeNav i").delay(400).animate({"opacity":1}, 1000)
})

$("#mobile_nav .closeNav i").click(function(){
    window.dispatchEvent(new Event('resize'));
  $("#mobile_nav .closeNav i").animate({"opacity":0},150)
  $("#mobile_nav").slideUp(800, "easeInOutExpo");
   $("#hamburger_hotspot").show();
   setTimeout(function(){
   },1000)
})





$("#menuHamburger").click(function(){
  if($(this).hasClass("opened")){
    $(this).removeClass("opened")
  }else{
    $(this).addClass("opened");
  }
})



$("#mobile_nav").append($("#mainMenu").html())






$(window).on('resize', function() {
    console.log($(window ).width())
      if($( window ).width() > 768){
       $("#mobile_nav .closeNav i").trigger("click");
       $("#hamburger_hotspot").hide();
      }else{
       $("#hamburger_hotspot").show();
      }
 })



$(".accordion_default .elem h5").click(function(){
  if($(this).next(".content").is(":visible")){
     $(this).next(".content").slideUp(400, "easeInExpo"); 
      $(this).removeClass("active");
  } else{ 
    $(this).next(".content").slideDown(400, "easeOutExpo");
     $(this).addClass("active");
  }
})
//Init accordion
setTimeout(function(){
 $(".accordion_default .elem:eq(0) h5").trigger("click");
},2500)







    
    
    function isMobile() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return true;
        }
        else {
            return false;
        }
    }
    
    
    if(isMobile()){
      
    }
    


Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

ok = 12000
//alert(ok.format());





    //Home page main slider owl
     $(".mainSlider").owlCarousel({
        "items" : 1,
        "autoplay":true,
        "loop":true,
        "autoplayTimeout":4000,
        "autoplayHoverPause":true,    
        //"smartSpeed": 1200,
        // "animateIn": 'ease',
        // "animateOut": 'ease',           
        "dots" : true
     });



  //Programme slider
    var programmeOWL =  $(".contPartners");
    programmeOWL.owlCarousel({
        "items" : 5,
        "autoplay":true,
        "loop":true,
        "autoplayTimeout":4000,
        "autoplayHoverPause":false,    
        //"smartSpeed": 1200,
        // "animateIn": 'ease',
        // "animateOut": 'ease',         
        "dots" : false,
                      responsive : {
                  // breakpoint from 0 up
                  0 : {
                     "items" : 3
                  },
                  // breakpoint from 480 up
                  425 : {
                      "items" : 3
                  },
                  // breakpoint from 768 up
                  768 : {
                      "items" : 4
                  },
                  1024 : {
                      "items" : 5
                  }                  
              }
     });
    // Go to the next item
    $('.contProgramme .goRight').click(function() {
        programmeOWL.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.contProgramme .goLeft').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        programmeOWL.trigger('prev.owl.carousel', [300]);
    })

    programmeOWL.on('changed.owl.carousel', function(event) {
       //alert(event.item.index);

        TweenMax.staggerFromTo($(".data .contRestos .collection:eq("+event.item.index+")").find(".elem"), 1.4, {opacity:0}, {opacity:1}, 0.02);
       $(".data .contRestos .collection").hide()
       $(".data .contRestos .collection:eq("+event.item.index+")").show();
       
       if(event.item.index == $(".contProgramme .containerSlider .programme-carousel .elem").length - 1){
        $('.contProgramme .goRight').hide();
       }else{
        $('.contProgramme .goRight').show();
       }

        if(event.item.index == 0){
          $('.contProgramme .goLeft').hide();
        }else{
          $('.contProgramme .goLeft').show();
        }

       console.log("Current elem idx : "+ event.item.index)
       console.log("Total elems : "+ $(".contProgramme .containerSlider .programme-carousel .elem").length)

       });
       



    $('.contProgramme .goRight').trigger("click");

        
 








     //Nytsee slider setup


 
    //     var tl = gsap.timeline();

    //  inView_swticher = $(".nySlider .elemSwitcher.active");
    //  currentSwitcher = $(".nySlider .elemSwitcher").eq( $(this).index() );

    
    // tl.to( inView_swticher.find("h3"), { duration:1.5 , y:15 , opacity:0, delay:0, ease: "Expo.easeInOut"},0)
    // tl.to( inView_swticher.find(".detail"), { duration:1.5 , y:15 , opacity:0, delay:0.2, ease: "Expo.easeInOut"},0)
    // tl.to( inView_swticher.find(".contBtns"), { duration:1.5 , y:15 , opacity:0, delay:0.3, ease: "Expo.easeInOut"},0)

    // tl.from( inView_swticher.find(".contVis img"), { duration:1.5 , opacity:1, clipPath: "polygon(100% 0%,0% 0%,0% 100%,100% 100%)", delay:0.3, ease: "Expo.easeInOut"},0)        
    // tl.to( inView_swticher.find(".contVis img"), { duration:1.5 , opacity:1, clipPath: "polygon(53% 0%,53% 0%,42% 100%,42% 100%)", delay:0.3, ease: "Expo.easeInOut", onComplete:function(){
    //            showNext_();
    //         }},0)


    

    //   function showNext_(){

    //       $(".nySlider .elemSwitcher.active").hide().removeClass("active");
    //       currentSwitcher.show().addClass("active");
         
    

    //      gsap.fromTo( currentSwitcher.find("h3"),         { opacity: 0, y:15}, {opacity: 1, y:0, duration: 1,  ease: "Expo.easeInOut", delay:0});
    //      gsap.fromTo( currentSwitcher.find(".detail"),    { duration:1 , y:15 , opacity:0,  ease: "Expo.easeInOut"} , { y:0 , opacity:1 , delay:0.5})
    //      gsap.fromTo( currentSwitcher.find(".contBtns"),  { duration:1 , y:15 , opacity:0, ease: "Expo.easeInOut"} , { y:0 , opacity:1, delay: 0.8})

    //      gsap.fromTo( currentSwitcher.find(".contVis img"), { opacity:1, clipPath: "polygon(53% 0%,53% 0%,42% 100%,42% 100%)"}, {opacity:1, clipPath: "polygon(100% 0%,0% 0%,0% 100%,100% 100%)", ease: "Expo.easeInOut"})
         

    //   }









// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  //myFunction()
};

// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
//var sticky = header.offsetTop + 200;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}







  const langDoc = document.getElementsByTagName('html')[0].getAttribute('lang')
  const baseDoc = document.getElementsByTagName('html')[0].getAttribute('base')

  const baseUrl = location.protocol + '//' +location.hostname
        relativeBase = "/";
        if(langDoc == "ar"){  relativeBase = ".." }else{ relativeBase = "." }





//Auto scroll top for every page reload
$('html, body').stop().animate({
  scrollTop: 0
})

setTimeout(() => {
    $("body").fadeTo(600,1, function(){

        $("html").addClass("loaded");
        initAfter_loading();
    });
//},0)
 },Math.floor(Math.random() * 1100) + 500)
 



















  $('#cconfirmationMail').bind("cut copy paste",function(e) {
        e.preventDefault();
  });







$(".pdfReader .closePDF").click(function(){
    $(this).parents(".pdfReader").hide()
    $('html, body').stop().animate({
        scrollTop: UserPosScroll_
      },900, "easeInOutExpo")
      UserPosScroll_ = '';
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'));
      },200)
})

$(".displayPDFreader").click(function(e){
    e.preventDefault();
    UserPosScroll_ = document.documentElement.scrollTop || document.body.scrollTop
    $(".pdfReader[data-id='"+$(this).attr("data-id")+"']").show();
    scrollTo( $(".pdfReader[data-id='"+$(this).attr("data-id")+"']").offset().top);
})






setTimeout(function(){
$('select').formSelect();
},5)
$('.toolipInfos').tooltip();




//Back to top
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $("#backtoTop").addClass('show');
  } else {
    $("#backtoTop").removeClass('show');
  }
});

 $("#backtoTop").click(function(){
    $('html, body').stop().animate({
      scrollTop: 0
    },900, "easeInOutExpo")
 })



    /*alert(propag_val)
    propag_val = $(this).val().replace(/\./g, '').format();
    $("#cmontantBien_recal").val(parseInt(propag_val))
    $("#cmontantBien").val(parseInt(propag_val))*/

$(window).load(function(){
    setTimeout(function(){
        $(".material-tooltip:last").next( "div" ).remove();
    },50)
})



$(".bannerHeader .arrow").click(function(){
    scrollTo( $(".container:eq(0)").offset().top - 30);
})


//Navigation desktop
$("#mainMenu ul li").click(function(){
   scrollTo( $(".container:eq("+$(this).index()+")").offset().top - 30);
})

//Navigation Mobile
$("#mobile_nav ul li").click(function(){
 // alert($(this).index())
 const to_currentSection = $(this).index();
   setTimeout(function(){
    scrollTo( $(".container:eq("+to_currentSection+")").offset().top - 30);
   },600)
  $(".closeNav i").trigger("click");
})





        $(".form").validate({
            ignore: ":hidden:not(.fvf)",
            rules : {              
                switcherForm : {
                    required: true 
                },
                user_mail : {
                    realEmail: true
                },
                user_phone : {
                    required: true,
                    phone: true,                    
                    phoneZero: true,
                    maxlength: 10
                }
            },
                errorPlacement: function ($error, $element) {
                var name = $element.attr("id");
                $error.appendTo($("#" + name).parents('.elemForm').find('.error'))
               }          
        })  
        

        
//$('.form').on('submit', function(e) {
    // if ( $(".form").valid() ) {
    //     alert("sub form")
    // }
    //CAPTCHA AND SEND
    // if($("#captchaBox").length){
    // $("#captchaBox").parents(".elemForm").find(".error").hide();
    // if ( $(".form").valid() ) {
    //     if(grecaptcha.getResponse() == "") {
    //     e.preventDefault();
    //     $("#captchaBox").parents(".elemForm").find(".error").show();
    //     return false;
    //     }
    //  }
    // }
  //});


  $('.form').on('submit', function(e) {
    
    e.preventDefault();
    
     form___ = $(this) ;

    if(form___.valid() ){
           //console.log("Form serialized : " + form___.serialize())
           launchpreloader();
            $.ajax({
                type: 'POST',
                dataType: "json",
                url: form___.attr('action'),
                data: form___.serialize(),
                success: function (json) {
                    stopPreloader();
                   //console.log("Return Ajax : "+ JSON.stringify(json))
                   //console.log(json.etat)

                if(json.etat = 1){
                    

                    var userEmail____ = $("#user_mail").val();
                    // $(".popup_process_otp").hide();
                    // $(".contFormulaire").show();
                    //$(".msg_").html(json.msg).show();
                    //$(".after_success_suggestions").show();

                    //alert("inserted")
                    //form___[0].reset();        
                    //scrollTo(  $(".msg_").offset().top  );
                    
                    //$(".formFields").hide();
                    //$("section.page .container .right").addClass("done")
                    //$("#ccode").val("");
                    //$("#codeForm input").val("");
                    //$("#gtm_trigger").trigger("click");
                    
                    //document.location.href = form___.attr("data-next") + "?e=" + userEmail____;
                    document.location.href= json.redirect ;

                }else{
                    $(".msg_").html(json.msg).show();
                    $(".msg_").addClass("error_send");
                }

                },
                error: function(xhr, textStatus, error){
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                }
            });
    }

    // if($("#captchaBox").length){
    // $("#captchaBox").parents(".elemForm").find(".error").hide();
    // if ( $(".form").valid() ) {
    //     if(grecaptcha.getResponse() == "") {
    //     e.preventDefault();
    //     $("#captchaBox").parents(".elemForm").find(".error").show();
    //     return false;
    //     }
    //  }
    // }
  });











  $('.quizForm').on('submit', function(e) {
    
    e.preventDefault();
    
     form___ = $(this) ;

    if(form___.valid() ){
           //console.log("Form serialized : " + form___.serialize())
           launchpreloader();
            $.ajax({
                type: 'POST',
                dataType: "json",
                url: form___.attr('action'),
                data: form___.serialize(),
                success: function (json) {
                    stopPreloader();
                   //console.log("Return Ajax : "+ JSON.stringify(json))
                   //console.log(json.etat)

                if(json.etat == 1){
                   
                   ShowSomeHappyNess();
                   $(".quiz").remove(); 
                   $(".finalResult_screen").hide();
                   $(".finalResult_screen.winner").show();
                   $(".finalScore").html(json.score+"/"+json.maxq);
                   

                }else{

                    $(".quiz").remove(); 
                    $(".finalResult_screen").hide();
                    $(".finalResult_screen.looser").show();
                    $(".finalScore").html(json.score+"/"+json.maxq);

                }

                },
                error: function(xhr, textStatus, error){
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                }
            });
    }

  });













          /*
          BirthDay field controller
          */
          if($("#cdatenaissance").length){
            birthDay_field = document.getElementById("cdatenaissance");
            birthDay_field.classList.add("birthday_input");
            birthDay_field.onkeyup = function(evt) {
                if((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && 
                   evt.keyCode <= 105)) {
                   evt = evt || window.event;
                   var size = birthDay_field.value.length;
                   if ((size == 2 && birthDay_field.value > 31)|| (size == 5 && Number(birthDay_field.value.split('/')[1]) > 12) ) {
                       birthDay_field.value = ''; 
                       return false;
                   }
                   if ((size == 2 && birthDay_field.value < 32)|| (size == 5 && Number(birthDay_field.value.split('/')[1]) < 13)) {
                      birthDay_field.value += '/';        
                   } 
                }
            }
          }










                


















$('li[id^="select-options"]').on('touchend', function (e) {
   e.stopPropagation();
});


















          $(window).resize(function(){
                    buildTable();
          })






function isInView(elm) {
    var elementTop = elm.offset().top;
    var elementBottom = elementTop + elm.outerHeight(true);

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + ($(window).height()-300);

    return elementBottom > viewportTop && elementTop < viewportBottom;
};





















//End Murabaha






















    
    $('.ny-select').formSelect();

   
   /*Fixing Zindex dropdown list for materializercss*/
   $(".section").each(function(){
      if($(this).find(".contForm").length){
        $(this).css({"zIndex":3});
      }
   })

$('.parallax').parallax();








 var StatusNav = false ;
 var animType2 = "easeInOutExpo";















//**** About sms code popup
init_popup_smsCode = function(){  
  $(".popup_process_simulator").show();
  $(".popup_process_simulator .aboutCode_popup").hide();
  $(".popup_process_simulator .aboutCode_popup:eq(0)").show();
}
$(".claimCodeAgain").click(function(){
  $(".popup_process_simulator .aboutCode_popup").hide();
  $(".popup_process_simulator .aboutCode_popup:eq(1)").show();
})
$(".popup_process_simulator .close_btn, .changePhoneNumber").click(function(){
  $(".popup_process_simulator").hide();
})
//**** End About sms code popup




$('.modal').modal();











function launchpreloader(){
  $("body").append('<div id="loaderLayer"><div class="loader"><img src="images/mainloader.svg" alt="" /></div></div>');
  $("#loaderLayer").fadeTo(300,1);
}
function stopPreloader(){
  $("#loaderLayer").fadeTo(300,0,function(){
    $("body #loaderLayer").remove();
  });
}








$('.dropdown-trigger').dropdown();





// $("body").mCustomScrollbar({
//    mouseWheelPixels: 400,
//    theme:"dark"
// });










       updateScrollNav = function(DomElem){
                DomElem.mCustomScrollbar({
                  scrollButtons:{
                     enable:false
                   },
                     advanced:{
                    updateOnContentResize: true,
                    snapOffset: 80,
                    autoHideScrollbar:true,
                    updateOnImageLoad: false
                  },
                  animationSpeed:1000,
                  mouseWheelPixels: 200
                });
       } 



       


      








        

    
    
  
      $('.nytList').formSelect();
     // setup listener for custom event to re-initialize on change
      $('.nytList').on('contentChanged', function() {
        $(this).formSelect();
      });
     
      // update function for demo purposes
      /*$("#myButton").click(function() {
        var newValue = "Jamel Nytsee"
        var $newOpt = $("<option>").attr("value",newValue).text(newValue)
        $("#myDropdown").append($newOpt);
        $("#myDropdown").trigger('contentChanged');
      });
      */

/*
              $('.datepicker').datepicker({
                  format : 'dd/mm/yyyy',
                  firstDay: 1,
                  yearRange : [2018,2022],
                  'i18n' : {
                       cancel : 'Annuler',
                       today: 'aujourd\'hui',
                       monthsShort: ['Janvier', 'F??vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao??t', 'Septembre', 'Octobre', 'Novembre', 'D??cembre'],
                       months: ['Janvier', 'F??vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao??t', 'Septembre', 'Octobre', 'Novembre', 'D??cembre'],
                       weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                       weekdaysAbbrev	: ['Di','Lu','Ma','Me','Je','Ve','Sa']
                       
                  }
              });


              $('.timepicker').timepicker({
                  twelveHour : false,
                  vibrate : true,
      
                  'i18n' : {
                       cancel : 'Annuler',
                       done : 'Ok'
                  }
              });
      
      
              $("#datevisite, #heurevisite").change(function() { 
                var datevisite = $("#datevisite").val();
                var heurevisite = $("#heurevisite").val();
                $(".dateRDV").val(datevisite+" "+heurevisite)
               });
      
               $(".selects-container").click(function(e){
                 return false;
               })*/
    



            function scrollTo(currentBlock){
              var decalage = 0;
              if($(".menu-icon a").is(':visible')){ decalage = 70 }
              $('html, body').stop().animate({
              scrollTop: currentBlock - decalage
              }, 1500,"easeInOutQuart");
            }
            
 


setTimeout(function(){
  
  if(isMobile()){    
    if( $(".dropdown-content").length ){
      $(".dropdown-content").each(function(){
        $(this).addClass("noTransorm");
      })
    }
  }

},500)


    






ShowSomeHappyNess = function(columnIdx){
    //alert(columnIdx)
// $("#tag_"+columnIdx).append('<canvas height="100%" class="canvas" id="canvas_'+columnIdx+'" width="100%"></canvas>');
$("body").append('<canvas height="100%" class="canvas" id="canvas_global" width="100%"></canvas>');
var retina = window.devicePixelRatio,

// Math shorthands
PI = Math.PI,
sqrt = Math.sqrt,
round = Math.round,
random = Math.random,
cos = Math.cos,
sin = Math.sin,

// Local WindowAnimationTiming interface
rAF = window.requestAnimationFrame,
cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame,
_now = Date.now || function () {return new Date().getTime();};

// Local WindowAnimationTiming interface polyfill
(function (w) {
/**
            * Fallback implementation.
            */
var prev = _now();
function fallback(fn) {
var curr = _now();
var ms = Math.max(0, 16 - (curr - prev));
var req = setTimeout(fn, ms);
prev = curr;
return req;
}

/**
            * Cancel.
            */
var cancel = w.cancelAnimationFrame
|| w.webkitCancelAnimationFrame
|| w.clearTimeout;

rAF = w.requestAnimationFrame
|| w.webkitRequestAnimationFrame
|| fallback;

cAF = function(id){
cancel.call(w, id);
};
}(window));


var speed = 50,
  duration = (1.0 / speed),
  confettiRibbonCount = 11,
  ribbonPaperCount = 30,
  ribbonPaperDist = 8.0,
  ribbonPaperThick = 8.0,
  confettiPaperCount = 95,
  DEG_TO_RAD = PI / 180,
  RAD_TO_DEG = 180 / PI,
  colors = [
    ["#df0049", "#660671"],
    ["#00e857", "#005291"],
    ["#2bebbc", "#05798a"],
    ["#ffd200", "#b06c00"]
  ];

function Vector2(_x, _y) {
this.x = _x, this.y = _y;
this.Length = function() {
  return sqrt(this.SqrLength());
}
this.SqrLength = function() {
  return this.x * this.x + this.y * this.y;
}
this.Add = function(_vec) {
  this.x += _vec.x;
  this.y += _vec.y;
}
this.Sub = function(_vec) {
  this.x -= _vec.x;
  this.y -= _vec.y;
}
this.Div = function(_f) {
  this.x /= _f;
  this.y /= _f;
}
this.Mul = function(_f) {
  this.x *= _f;
  this.y *= _f;
}
this.Normalize = function() {
  var sqrLen = this.SqrLength();
  if (sqrLen != 0) {
    var factor = 1.0 / sqrt(sqrLen);
    this.x *= factor;
    this.y *= factor;
  }
}
this.Normalized = function() {
  var sqrLen = this.SqrLength();
  if (sqrLen != 0) {
    var factor = 1.0 / sqrt(sqrLen);
    return new Vector2(this.x * factor, this.y * factor);
  }
  return new Vector2(0, 0);
}
}
Vector2.Lerp = function(_vec0, _vec1, _t) {
return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
}
Vector2.Distance = function(_vec0, _vec1) {
return sqrt(Vector2.SqrDistance(_vec0, _vec1));
}
Vector2.SqrDistance = function(_vec0, _vec1) {
var x = _vec0.x - _vec1.x;
var y = _vec0.y - _vec1.y;
return (x * x + y * y + z * z);
}
Vector2.Scale = function(_vec0, _vec1) {
return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
}
Vector2.Min = function(_vec0, _vec1) {
return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
}
Vector2.Max = function(_vec0, _vec1) {
return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
}
Vector2.ClampMagnitude = function(_vec0, _len) {
var vecNorm = _vec0.Normalized;
return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
}
Vector2.Sub = function(_vec0, _vec1) {
return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
}

function EulerMass(_x, _y, _mass, _drag) {
this.position = new Vector2(_x, _y);
this.mass = _mass;
this.drag = _drag;
this.force = new Vector2(0, 0);
this.velocity = new Vector2(0, 0);
this.AddForce = function(_f) {
  this.force.Add(_f);
}
this.Integrate = function(_dt) {
  var acc = this.CurrentForce(this.position);
  acc.Div(this.mass);
  var posDelta = new Vector2(this.velocity.x, this.velocity.y);
  posDelta.Mul(_dt);
  this.position.Add(posDelta);
  acc.Mul(_dt);
  this.velocity.Add(acc);
  this.force = new Vector2(0, 0);
}
this.CurrentForce = function(_pos, _vel) {
  var totalForce = new Vector2(this.force.x, this.force.y);
  var speed = this.velocity.Length();
  var dragVel = new Vector2(this.velocity.x, this.velocity.y);
  dragVel.Mul(this.drag * this.mass * speed);
  totalForce.Sub(dragVel);
  return totalForce;
}
}

function ConfettiPaper(_x, _y) {
this.pos = new Vector2(_x, _y);
this.rotationSpeed = (random() * 600 + 800);
this.angle = DEG_TO_RAD * random() * 360;
this.rotation = DEG_TO_RAD * random() * 360;
this.cosA = 1.0;
this.size = 5.0;
this.oscillationSpeed = (random() * 1.5 + 0.5);
this.xSpeed = 40.0;
this.ySpeed = (random() * 60 + 50.0);
this.corners = new Array();
this.time = random();
var ci = round(random() * (colors.length - 1));
this.frontColor = colors[ci][0];
this.backColor = colors[ci][1];
for (var i = 0; i < 4; i++) {
  var dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
  var dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
  this.corners[i] = new Vector2(dx, dy);
}
this.Update = function(_dt) {
  this.time += _dt;
  this.rotation += this.rotationSpeed * _dt;
  this.cosA = cos(DEG_TO_RAD * this.rotation);
  this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt
  this.pos.y += this.ySpeed * _dt;
  if (this.pos.y > ConfettiPaper.bounds.y) {
    this.pos.x = random() * ConfettiPaper.bounds.x;
    this.pos.y = 0;
  }
}
this.Draw = function(_g) {
  if (this.cosA > 0) {
    _g.fillStyle = this.frontColor;
  } else {
    _g.fillStyle = this.backColor;
  }
  _g.beginPath();
  _g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
  for (var i = 1; i < 4; i++) {
    _g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
  }
  _g.closePath();
  _g.fill();
}
}
ConfettiPaper.bounds = new Vector2(0, 0);

function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag) {
this.particleDist = _dist;
this.particleCount = _count;
this.particleMass = _mass;
this.particleDrag = _drag;
this.particles = new Array();
var ci = round(random() * (colors.length - 1));
this.frontColor = colors[ci][0];
this.backColor = colors[ci][1];
this.xOff = (cos(DEG_TO_RAD * _angle) * _thickness);
this.yOff = (sin(DEG_TO_RAD * _angle) * _thickness);
this.position = new Vector2(_x, _y);
this.prevPosition = new Vector2(_x, _y);
this.velocityInherit = (random() * 2 + 4);
this.time = random() * 100;
this.oscillationSpeed = (random() * 2 + 2);
this.oscillationDistance = (random() * 40 + 40);
this.ySpeed = (random() * 40 + 80);
for (var i = 0; i < this.particleCount; i++) {
  this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
}
this.Update = function(_dt) {
  var i = 0;
  this.time += _dt * this.oscillationSpeed;
  this.position.y += this.ySpeed * _dt;
  this.position.x += cos(this.time) * this.oscillationDistance * _dt;
  this.particles[0].position = this.position;
  var dX = this.prevPosition.x - this.position.x;
  var dY = this.prevPosition.y - this.position.y;
  var delta = sqrt(dX * dX + dY * dY);
  this.prevPosition = new Vector2(this.position.x, this.position.y);
  for (i = 1; i < this.particleCount; i++) {
    var dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
    dirP.Normalize();
    dirP.Mul((delta / _dt) * this.velocityInherit);
    this.particles[i].AddForce(dirP);
  }
  for (i = 1; i < this.particleCount; i++) {
    this.particles[i].Integrate(_dt);
  }
  for (i = 1; i < this.particleCount; i++) {
    var rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
    rp2.Sub(this.particles[i - 1].position);
    rp2.Normalize();
    rp2.Mul(this.particleDist);
    rp2.Add(this.particles[i - 1].position);
    this.particles[i].position = rp2;
  }
  if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
    this.Reset();
  }
}
this.Reset = function() {
  this.position.y = -random() * ConfettiRibbon.bounds.y;
  this.position.x = random() * ConfettiRibbon.bounds.x;
  this.prevPosition = new Vector2(this.position.x, this.position.y);
  this.velocityInherit = random() * 2 + 4;
  this.time = random() * 100;
  this.oscillationSpeed = random() * 2.0 + 1.5;
  this.oscillationDistance = (random() * 40 + 40);
  this.ySpeed = random() * 40 + 80;
  var ci = round(random() * (colors.length - 1));
  this.frontColor = colors[ci][0];
  this.backColor = colors[ci][1];
  this.particles = new Array();
  for (var i = 0; i < this.particleCount; i++) {
    this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
  }
}
this.Draw = function(_g) {
  for (var i = 0; i < this.particleCount - 1; i++) {
    var p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
    var p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
    if (this.Side(this.particles[i].position.x, this.particles[i].position.y, this.particles[i + 1].position.x, this.particles[i + 1].position.y, p1.x, p1.y) < 0) {
      _g.fillStyle = this.frontColor;
      _g.strokeStyle = this.frontColor;
    } else {
      _g.fillStyle = this.backColor;
      _g.strokeStyle = this.backColor;
    }
    if (i == 0) {
      _g.beginPath();
      _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
      _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
      _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
      _g.closePath();
      _g.stroke();
      _g.fill();
      _g.beginPath();
      _g.moveTo(p1.x * retina, p1.y * retina);
      _g.lineTo(p0.x * retina, p0.y * retina);
      _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
      _g.closePath();
      _g.stroke();
      _g.fill();
    } else if (i == this.particleCount - 2) {
      _g.beginPath();
      _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
      _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
      _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
      _g.closePath();
      _g.stroke();
      _g.fill();
      _g.beginPath();
      _g.moveTo(p1.x * retina, p1.y * retina);
      _g.lineTo(p0.x * retina, p0.y * retina);
      _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
      _g.closePath();
      _g.stroke();
      _g.fill();
    } else {
      _g.beginPath();
      _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
      _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
      _g.lineTo(p1.x * retina, p1.y * retina);
      _g.lineTo(p0.x * retina, p0.y * retina);
      _g.closePath();
      _g.stroke();
      _g.fill();
    }
  }
}
this.Side = function(x1, y1, x2, y2, x3, y3) {
  return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
}
}
ConfettiRibbon.bounds = new Vector2(0, 0);
confetti = {};
confetti.Context = function(id) {
var i = 0;
//var canvas = document.getElementById("canvas_"+columnIdx);
canvas = document.getElementById("canvas_global");
var canvasParent = canvas.parentNode;
var canvasWidth = canvasParent.offsetWidth;
var canvasHeight = canvasParent.offsetHeight;
canvas.width = canvasWidth * retina;
canvas.height = canvasHeight * retina;
var context = canvas.getContext('2d');
var interval = null;
var confettiRibbons = new Array();
ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
for (i = 0; i < confettiRibbonCount; i++) {
  confettiRibbons[i] = new ConfettiRibbon(random() * canvasWidth, -random() * canvasHeight * 2, ribbonPaperCount, ribbonPaperDist, ribbonPaperThick, 45, 1, 0.05);
}
var confettiPapers = new Array();
ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
for (i = 0; i < confettiPaperCount; i++) {
  confettiPapers[i] = new ConfettiPaper(random() * canvasWidth, random() * canvasHeight);
}
this.resize = function() {
  canvasWidth = canvasParent.offsetWidth;
  canvasHeight = canvasParent.offsetHeight;
  canvas.width = canvasWidth * retina;
  canvas.height = canvasHeight * retina;
  ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
  ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
}
this.start = function() {
  this.stop()
  var context = this;
  this.update();
}
this.stop = function() {
  cAF(this.interval);
}
this.update = function() {
  var i = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < confettiPaperCount; i++) {
    confettiPapers[i].Update(duration);
    confettiPapers[i].Draw(context);
  }
  for (i = 0; i < confettiRibbonCount; i++) {
    confettiRibbons[i].Update(duration);
    confettiRibbons[i].Draw(context);
  }
  this.interval = rAF(function() {
    confetti.update();
  });
}
}
var confetti = new confetti.Context('confetti');
confetti.start();
window.addEventListener('resize', function(event){
confetti.resize();
});

} //End Happyness






});
    
    
    











(function ($) {
    // your code
    /****** Pop Up system based of Lity Lib ******/
    pop_sys = function(media_ny, url_ny, blank_ny, delay_ny, active_ny){
        //active_ny ? '' : exit;
        if(!active_ny){ return false; }
        setTimeout(function(){
        if( localStorage.getItem('popon_ny')){     
            //alert(localStorage.getItem('popon_ny'))
        }else{
            localStorage.setItem('popon_ny', '1');
            if(blank_ny) { blank_ny = "target='_blank'" }else{ blank_ny = ''}
            $("body").append('<a class="firepopup" '+blank_ny+ 'href="#" data-lity data-lity-target="'+media_ny+'"></a>');
            $(".firepopup").trigger('click');
            if(url_ny!=""){
              $(document).on('click', '.lity-content', function() { 
                 blank_ny ? '_blank' : blank_ny = '_self' ;
                 window.open(url_ny, blank_ny);
               });
            }                                               
        }
        //localStorage.removeItem('popon_ny');
      },delay_ny)
     }


})(jQuery);













//The code bellow is to manipulate the phone indicatif in forms / does'nt require Jquery bib
(function(factory) {
    var intlTelInput = factory(window, document);
    if (typeof module === "object" && module.exports) module.exports = intlTelInput; else window.intlTelInput = intlTelInput;
})(function(window, document, undefined) {
    "use strict";
    return function() {
        // Array of country objects for the flag dropdown.
        // Here is the criteria for the plugin to support a given country/territory
        // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
        // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
        // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
        // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
        // Each country array has the following information:
        // [
        //    Country name,
        //    iso2 code,
        //    International dial code,
        //    Order (if >1 country with same dial code),
        //    Area codes
        // ]
        var allCountries = [ [ "Afghanistan (???????????????????????????)", "af", "93" ], [ "Albania (Shqip??ri)", "al", "355" ], [ "Algeria (???????????????????????)", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia (????????????????)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61", 0 ], [ "Austria (??sterreich)", "at", "43" ], [ "Azerbaijan (Az??rbaycan)", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain (???????????????????????)", "bh", "973" ], [ "Bangladesh (????????????????????????)", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus (????????????????)", "by", "375" ], [ "Belgium (Belgi??)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (B??nin)", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan (???????????????)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (?????????? ?? ??????????????????????)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria (????????????????)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (?????????????????????)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic (R??publique centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (??????)", "cn", "86" ], [ "Christmas Island", "cx", "61", 2 ], [ "Cocos (Keeling) Islands", "cc", "61", 1 ], [ "Colombia", "co", "57" ], [ "Comoros (????????? ????????????????)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "C??te d???Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Cura??ao", "cw", "599", 0 ], [ "Cyprus (????????????)", "cy", "357" ], [ "Czech Republic (??esk?? republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic (Rep??blica Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (???????????????)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (F??royar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana (Guyane fran??aise)", "gf", "594" ], [ "French Polynesia (Polyn??sie fran??aise)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (??????????????????????????????)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (????????????)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea (Guin??e)", "gn", "224" ], [ "Guinea-Bissau (Guin?? Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (??????)", "hk", "852" ], [ "Hungary (Magyarorsz??g)", "hu", "36" ], [ "Iceland (??sland)", "is", "354" ], [ "India (????????????)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (???????????????????)", "ir", "98" ], [ "Iraq (?????????????????????)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel (???????????????????)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan (??????)", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan (?????????????????????)", "jo", "962" ], [ "Kazakhstan (??????????????????)", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait (?????????????????????)", "kw", "965" ], [ "Kyrgyzstan (????????????????????)", "kg", "996" ], [ "Laos (?????????)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (???????????????????)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (???????????????????)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (??????)", "mo", "853" ], [ "Macedonia (FYROM) (????????????????????)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (???????????????????????????)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico (M??xico)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (????????????)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco (?????????????????????)", "ma", "212", 0 ], [ "Mozambique (Mo??ambique)", "mz", "258" ], [ "Myanmar (Burma) (??????????????????)", "mm", "95" ], [ "Namibia (Namibi??)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (???????????????)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Cal??donie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (?????? ???????????? ?????? ?????????)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway (Norge)", "no", "47", 0 ], [ "Oman (???????????????????)", "om", "968" ], [ "Pakistan (???????????????????????)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (?????????????????????)", "ps", "970" ], [ "Panama (Panam??)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Per??)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (???????????????)", "qa", "974" ], [ "R??union (La R??union)", "re", "262", 0 ], [ "Romania (Rom??nia)", "ro", "40" ], [ "Russia (????????????)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barth??lemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Saint Martin (Saint-Martin (partie fran??aise))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "S??o Tom?? and Pr??ncipe (S??o Tom?? e Pr??ncipe)", "st", "239" ], [ "Saudi Arabia (????????????????? ?????????????? ??????????????????????)", "sa", "966" ], [ "Senegal (S??n??gal)", "sn", "221" ], [ "Serbia (????????????)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (????????????)", "kr", "82" ], [ "South Sudan (??????????? ????????????????????)", "ss", "211" ], [ "Spain (Espa??a)", "es", "34" ], [ "Sri Lanka (??????????????? ???????????????)", "lk", "94" ], [ "Sudan (???????????????????????)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Swaziland", "sz", "268" ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (???????????????????)", "sy", "963" ], [ "Taiwan (??????)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (?????????)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia (?????????????????)", "tn", "216" ], [ "Turkey (T??rkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uganda", "ug", "256" ], [ "Ukraine (??????????????)", "ua", "380" ], [ "United Arab Emirates (??????????????????? ?????????????? ????????????????????)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (O??zbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Citt?? del Vaticano)", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Vi???t Nam)", "vn", "84" ], [ "Wallis and Futuna (Wallis-et-Futuna)", "wf", "681" ], [ "Western Sahara (????????????????? ????????????????????)", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen (???????????????????)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "??land Islands", "ax", "358", 1, [ "18" ] ] ];
        // loop over all of the countries above, restructuring the data to be objects with named keys
        for (var i = 0; i < allCountries.length; i++) {
            var c = allCountries[i];
            allCountries[i] = {
                name: c[0],
                iso2: c[1],
                dialCode: c[2],
                priority: c[3] || 0,
                areaCodes: c[4] || null
            };
        }
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        window.intlTelInputGlobals = {
            getInstance: function getInstance(input) {
                var id = input.getAttribute("data-intl-tel-input-id");
                return window.intlTelInputGlobals.instances[id];
            },
            instances: {}
        };
        // these vars persist through all instances of the plugin
        var id = 0;
        var defaults = {
            // whether or not to allow the dropdown
            allowDropdown: true,
            // if there is just a dial code in the input: remove it on blur
            autoHideDialCode: true,
            // add a placeholder in the input with an example number for the selected country
            autoPlaceholder: "polite",
            // modify the parentClass
            customContainer: "",
            // modify the auto placeholder
            customPlaceholder: null,
            // append menu to specified element
            dropdownContainer: null,
            // don't display these countries
            excludeCountries: [],
            // format the input value during initialisation and on setNumber
            formatOnDisplay: true,
            // geoIp lookup function
            geoIpLookup: null,
            // inject a hidden input with this name, and on submit, populate it with the result of getNumber
            hiddenInput: "",
            // initial country
            initialCountry: "",
            // localized country names e.g. { 'de': 'Deutschland' }
            localizedCountries: null,
            // don't insert international dial codes
            nationalMode: true,
            // display only these countries
            onlyCountries: [],
            // number type to use for placeholders
            placeholderNumberType: "MOBILE",
            // the countries at the top of the list. defaults to united states and united kingdom
            preferredCountries: [ "us", "gb" ],
            // display the country dial code next to the selected flag so it's not part of the typed number
            separateDialCode: false,
            // specify the path to the libphonenumber script to enable validation/formatting
            utilsScript: ""
        };
        // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
        var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
        // keep track of if the window.load event has fired as impossible to check after the fact
        window.addEventListener("load", function() {
            // UPDATE: use a public static field so we can fudge it in the tests
            window.intlTelInputGlobals.windowLoaded = true;
        });
        // utility function to iterate over an object. can't use Object.entries or native forEach because
        // of IE11
        var forEachProp = function forEachProp(obj, callback) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                callback(keys[i], obj[keys[i]]);
            }
        };
        // run a method on each instance of the plugin
        var forEachInstance = function forEachInstance(method) {
            forEachProp(window.intlTelInputGlobals.instances, function(key) {
                window.intlTelInputGlobals.instances[key][method]();
            });
        };
        // this is our plugin class that we will create an instance of
        // eslint-disable-next-line no-unused-vars
        var Iti = /*#__PURE__*/
        function() {
            function Iti(input, options) {
                var _this = this;
                _classCallCheck(this, Iti);
                this.id = id++;
                this.telInput = input;
                this.activeItem = null;
                this.highlightedItem = null;
                // process specified options / defaults
                // alternative to Object.assign, which isn't supported by IE11
                var customOptions = options || {};
                this.options = {};
                forEachProp(defaults, function(key, value) {
                    _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
                });
                this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
            }
            _createClass(Iti, [ {
                key: "_init",
                value: function _init() {
                    var _this2 = this;
                    // if in nationalMode, disable options relating to dial codes
                    if (this.options.nationalMode) this.options.autoHideDialCode = false;
                    // if separateDialCode then doesn't make sense to A) insert dial code into input
                    // (autoHideDialCode), and B) display national numbers (because we're displaying the country
                    // dial code next to them)
                    if (this.options.separateDialCode) {
                        this.options.autoHideDialCode = this.options.nationalMode = false;
                    }
                    // we cannot just test screen size as some smartphones/website meta tags will report desktop
                    // resolutions
                    // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
                    // rest of these declarations
                    // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
                    this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (this.isMobile) {
                        // trigger the mobile dropdown css
                        //document.body.classList.add("iti-mobile");
                        document.body.classList.add("iti_mobile_full");
                        // on mobile, we want a full screen dropdown, so we must append it to the body
                        //if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                    }
                    // these promises get resolved when their individual requests complete
                    // this way the dev can do something like iti.promise.then(...) to know when all requests are
                    // complete
                    if (typeof Promise !== "undefined") {
                        var autoCountryPromise = new Promise(function(resolve, reject) {
                            _this2.resolveAutoCountryPromise = resolve;
                            _this2.rejectAutoCountryPromise = reject;
                        });
                        var utilsScriptPromise = new Promise(function(resolve, reject) {
                            _this2.resolveUtilsScriptPromise = resolve;
                            _this2.rejectUtilsScriptPromise = reject;
                        });
                        this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                    } else {
                        // prevent errors when Promise doesn't exist
                        this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
                        this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
                    }
                    // in various situations there could be no country selected initially, but we need to be able
                    // to assume this variable exists
                    this.selectedCountryData = {};
                    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                    this._processCountryData();
                    // generate the markup
                    this._generateMarkup();
                    // set the initial state of the input value and the selected flag
                    this._setInitialState();
                    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
                    this._initListeners();
                    // utils script, and auto country
                    this._initRequests();
                }
            }, {
                key: "_processCountryData",
                value: function _processCountryData() {
                    // process onlyCountries or excludeCountries array if present
                    this._processAllCountries();
                    // process the countryCodes map
                    this._processCountryCodes();
                    // process the preferredCountries
                    this._processPreferredCountries();
                    // translate countries according to localizedCountries option
                    if (this.options.localizedCountries) this._translateCountriesByLocale();
                    // sort countries by name
                    if (this.options.onlyCountries.length || this.options.localizedCountries) {
                        this.countries.sort(this._countryNameSort);
                    }
                }
            }, {
                key: "_addCountryCode",
                value: function _addCountryCode(iso2, dialCode, priority) {
                    if (dialCode.length > this.dialCodeMaxLen) {
                        this.dialCodeMaxLen = dialCode.length;
                    }
                    if (!this.countryCodes.hasOwnProperty(dialCode)) {
                        this.countryCodes[dialCode] = [];
                    }
                    // bail if we already have this country for this dialCode
                    for (var i = 0; i < this.countryCodes[dialCode].length; i++) {
                        if (this.countryCodes[dialCode][i] === iso2) return;
                    }
                    // check for undefined as 0 is falsy
                    var index = priority !== undefined ? priority : this.countryCodes[dialCode].length;
                    this.countryCodes[dialCode][index] = iso2;
                }
            }, {
                key: "_processAllCountries",
                value: function _processAllCountries() {
                    if (this.options.onlyCountries.length) {
                        var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
                            return country.toLowerCase();
                        });
                        this.countries = allCountries.filter(function(country) {
                            return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                        });
                    } else if (this.options.excludeCountries.length) {
                        var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
                            return country.toLowerCase();
                        });
                        this.countries = allCountries.filter(function(country) {
                            return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                        });
                    } else {
                        this.countries = allCountries;
                    }
                }
            }, {
                key: "_translateCountriesByLocale",
                value: function _translateCountriesByLocale() {
                    for (var i = 0; i < this.countries.length; i++) {
                        var iso = this.countries[i].iso2.toLowerCase();
                        if (this.options.localizedCountries.hasOwnProperty(iso)) {
                            this.countries[i].name = this.options.localizedCountries[iso];
                        }
                    }
                }
            }, {
                key: "_countryNameSort",
                value: function _countryNameSort(a, b) {
                    return a.name.localeCompare(b.name);
                }
            }, {
                key: "_processCountryCodes",
                value: function _processCountryCodes() {
                    this.dialCodeMaxLen = 0;
                    this.countryCodes = {};
                    // first: add dial codes
                    for (var i = 0; i < this.countries.length; i++) {
                        var c = this.countries[i];
                        this._addCountryCode(c.iso2, c.dialCode, c.priority);
                    }
                    // next: add area codes
                    // this is a second loop over countries, to make sure we have all of the "root" countries
                    // already in the map, so that we can access them, as each time we add an area code substring
                    // to the map, we also need to include the "root" country's code, as that also matches
                    for (var _i = 0; _i < this.countries.length; _i++) {
                        var _c = this.countries[_i];
                        // area codes
                        if (_c.areaCodes) {
                            var rootCountryCode = this.countryCodes[_c.dialCode][0];
                            // for each area code
                            for (var j = 0; j < _c.areaCodes.length; j++) {
                                var areaCode = _c.areaCodes[j];
                                // for each digit in the area code to add all partial matches as well
                                for (var k = 1; k < areaCode.length; k++) {
                                    var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                    // start with the root country, as that also matches this dial code
                                    this._addCountryCode(rootCountryCode, partialDialCode);
                                    this._addCountryCode(_c.iso2, partialDialCode);
                                }
                                // add the full area code
                                this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                            }
                        }
                    }
                }
            }, {
                key: "_processPreferredCountries",
                value: function _processPreferredCountries() {
                    this.preferredCountries = [];
                    for (var i = 0; i < this.options.preferredCountries.length; i++) {
                        var countryCode = this.options.preferredCountries[i].toLowerCase();
                        var countryData = this._getCountryData(countryCode, false, true);
                        if (countryData) this.preferredCountries.push(countryData);
                    }
                }
            }, {
                key: "_createEl",
                value: function _createEl(name, attrs, container) {
                    var el = document.createElement(name);
                    if (attrs) forEachProp(attrs, function(key, value) {
                        return el.setAttribute(key, value);
                    });
                    if (container) container.appendChild(el);
                    return el;
                }
            }, {
                key: "_generateMarkup",
                value: function _generateMarkup() {
                    // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                    // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                    // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
                    this.telInput.setAttribute("autocomplete", "off");
                    // containers (mostly for positioning)
                    var parentClass = "iti";
                    if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
                    if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
                    if (this.options.customContainer) {
                        parentClass += " ";
                        parentClass += this.options.customContainer;
                    }
                    var wrapper = this._createEl("div", {
                        "class": parentClass
                    });
                    this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                    this.flagsContainer = this._createEl("div", {
                        "class": "iti__flag-container"
                    }, wrapper);
                    wrapper.appendChild(this.telInput);
                    // selected flag (displayed to left of input)
                    this.selectedFlag = this._createEl("div", {
                        "class": "iti__selected-flag",
                        role: "combobox",
                        "aria-owns": "country-listbox"
                    }, this.flagsContainer);
                    this.selectedFlagInner = this._createEl("div", {
                        "class": "iti__flag"
                    }, this.selectedFlag);
                    if (this.options.separateDialCode) {
                        this.selectedDialCode = this._createEl("div", {
                            "class": "iti__selected-dial-code"
                        }, this.selectedFlag);
                    }
                    if (this.options.allowDropdown) {
                        // make element focusable and tab navigable
                        this.selectedFlag.setAttribute("tabindex", "0");
                        this.dropdownArrow = this._createEl("div", {
                            "class": "iti__arrow"
                        }, this.selectedFlag);
                        // country dropdown: preferred countries, then divider, then all countries
                        this.countryList = this._createEl("ul", {
                            "class": "iti__country-list iti__hide",
                            id: "country-listbox",
                            "aria-expanded": "false",
                            role: "listbox"
                        });
                        if (this.preferredCountries.length) {
                            this._appendListItems(this.preferredCountries, "iti__preferred");
                            this._createEl("li", {
                                "class": "iti__divider",
                                role: "separator",
                                "aria-disabled": "true"
                            }, this.countryList);
                        }
                        this._appendListItems(this.countries, "iti__standard");
                        // create dropdownContainer markup
                        if (this.options.dropdownContainer) {
                            this.dropdown = this._createEl("div", {
                                "class": "iti iti--container"
                            });
                            this.dropdown.appendChild(this.countryList);
                        } else {
                            this.flagsContainer.appendChild(this.countryList);
                        }
                    }
                    if (this.options.hiddenInput) {
                        var hiddenInputName = this.options.hiddenInput;
                        var name = this.telInput.getAttribute("name");
                        if (name) {
                            var i = name.lastIndexOf("[");
                            // if input name contains square brackets, then give the hidden input the same name,
                            // replacing the contents of the last set of brackets with the given hiddenInput name
                            if (i !== -1) hiddenInputName = "".concat(name.substr(0, i), "[").concat(hiddenInputName, "]");
                        }
                        this.hiddenInput = this._createEl("input", {
                            type: "hidden",
                            name: hiddenInputName
                        });
                        wrapper.appendChild(this.hiddenInput);
                    }
                }
            }, {
                key: "_appendListItems",
                value: function _appendListItems(countries, className) {
                    // we create so many DOM elements, it is faster to build a temp string
                    // and then add everything to the DOM in one go at the end
                    var tmp = "";
                    // for each country
                    for (var i = 0; i < countries.length; i++) {
                        var c = countries[i];
                        // open the list item
                        tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-item-").concat(c.iso2, "' role='option' data-dial-code='").concat(c.dialCode, "' data-country-code='").concat(c.iso2, "'>");
                        // add the flag
                        tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
                        // and the country name and dial code
                        tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
                        tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                        // close the list item
                        tmp += "</li>";
                    }
                    this.countryList.insertAdjacentHTML("beforeend", tmp);
                }
            }, {
                key: "_setInitialState",
                value: function _setInitialState() {
                    var val = this.telInput.value;
                    var dialCode = this._getDialCode(val);
                    var isRegionlessNanp = this._isRegionlessNanp(val);
                    var _this$options = this.options, initialCountry = _this$options.initialCountry, nationalMode = _this$options.nationalMode, autoHideDialCode = _this$options.autoHideDialCode, separateDialCode = _this$options.separateDialCode;
                    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                    // flag, else fall back to the default country
                    if (dialCode && !isRegionlessNanp) {
                        this._updateFlagFromNumber(val);
                    } else if (initialCountry !== "auto") {
                        // see if we should select a flag
                        if (initialCountry) {
                            this._setFlag(initialCountry.toLowerCase());
                        } else {
                            if (dialCode && isRegionlessNanp) {
                                // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                                this._setFlag("us");
                            } else {
                                // no dial code and no initialCountry, so default to first in list
                                this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                                if (!val) {
                                    this._setFlag(this.defaultCountry);
                                }
                            }
                        }
                        // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                        if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                            this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                        }
                    }
                    // NOTE: if initialCountry is set to auto, that will be handled separately
                    // format - note this wont be run after _updateDialCode as that's only called if no val
                    if (val) this._updateValFromNumber(val);
                }
            }, {
                key: "_initListeners",
                value: function _initListeners() {
                    this._initKeyListeners();
                    if (this.options.autoHideDialCode) this._initBlurListeners();
                    if (this.options.allowDropdown) this._initDropdownListeners();
                    if (this.hiddenInput) this._initHiddenInputListener();
                }
            }, {
                key: "_initHiddenInputListener",
                value: function _initHiddenInputListener() {
                    var _this3 = this;
                    this._handleHiddenInputSubmit = function() {
                        _this3.hiddenInput.value = _this3.getNumber();
                    };
                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                }
            }, {
                key: "_getClosestLabel",
                value: function _getClosestLabel() {
                    var el = this.telInput;
                    while (el && el.tagName !== "LABEL") {
                        el = el.parentNode;
                    }
                    return el;
                }
            }, {
                key: "_initDropdownListeners",
                value: function _initDropdownListeners() {
                    var _this4 = this;
                    // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                    // open the dropdown would then automatically trigger a 2nd click on the input which would
                    // close it again
                    this._handleLabelClick = function(e) {
                        // if the dropdown is closed, then focus the input, else ignore the click
                        if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus(); else e.preventDefault();
                    };
                    var label = this._getClosestLabel();
                    if (label) label.addEventListener("click", this._handleLabelClick);
                    // toggle country dropdown on click
                    this._handleClickSelectedFlag = function() {
                        // only intercept this event if we're opening the dropdown
                        // else let it bubble up to the top ("click-off-to-close" listener)
                        // we cannot just stopPropagation as it may be needed to close another instance
                        if (_this4.countryList.classList.contains("iti__hide") && !_this4.telInput.disabled && !_this4.telInput.readOnly) {
                            _this4._showDropdown();
                        }
                    };
                    this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                    // open dropdown list if currently focused
                    this._handleFlagsContainerKeydown = function(e) {
                        var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
                        if (isDropdownHidden && [ "ArrowUp", "ArrowDown", " ", "Enter" ].indexOf(e.key) !== -1) {
                            // prevent form from being submitted if "ENTER" was pressed
                            e.preventDefault();
                            // prevent event from being handled again by document
                            e.stopPropagation();
                            _this4._showDropdown();
                        }
                        // allow navigation from dropdown to input on TAB
                        if (e.key === "Tab") _this4._closeDropdown();
                    };
                    this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
                }
            }, {
                key: "_initRequests",
                value: function _initRequests() {
                    var _this5 = this;
                    // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                    if (this.options.utilsScript && !window.intlTelInputUtils) {
                        // if the plugin is being initialised after the window.load event has already been fired
                        if (window.intlTelInputGlobals.windowLoaded) {
                            window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                        } else {
                            // wait until the load event so we don't block any other requests e.g. the flags image
                            window.addEventListener("load", function() {
                                window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                            });
                        }
                    } else this.resolveUtilsScriptPromise();
                    if (this.options.initialCountry === "auto") this._loadAutoCountry(); else this.resolveAutoCountryPromise();
                }
            }, {
                key: "_loadAutoCountry",
                value: function _loadAutoCountry() {
                    // 3 options:
                    // 1) already loaded (we're done)
                    // 2) not already started loading (start)
                    // 3) already started loading (do nothing - just wait for loading callback to fire)
                    if (window.intlTelInputGlobals.autoCountry) {
                        this.handleAutoCountry();
                    } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                        // don't do this twice!
                        window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                        if (typeof this.options.geoIpLookup === "function") {
                            this.options.geoIpLookup(function(countryCode) {
                                window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                                // tell all instances the auto country is ready
                                // TODO: this should just be the current instances
                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                                // setTimeout means that the current thread of execution will finish before executing
                                // this, which allows the plugin to finish initialising.
                                setTimeout(function() {
                                    return forEachInstance("handleAutoCountry");
                                });
                            }, function() {
                                return forEachInstance("rejectAutoCountryPromise");
                            });
                        }
                    }
                }
            }, {
                key: "_initKeyListeners",
                value: function _initKeyListeners() {
                    var _this6 = this;
                    // update flag on keyup
                    this._handleKeyupEvent = function() {
                        if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                            _this6._triggerCountryChange();
                        }
                    };
                    this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                    // update flag on cut/paste events (now supported in all major browsers)
                    this._handleClipboardEvent = function() {
                        // hack because "paste" event is fired before input is updated
                        setTimeout(_this6._handleKeyupEvent);
                    };
                    this.telInput.addEventListener("cut", this._handleClipboardEvent);
                    this.telInput.addEventListener("paste", this._handleClipboardEvent);
                }
            }, {
                key: "_cap",
                value: function _cap(number) {
                    var max = this.telInput.getAttribute("maxlength");
                    return max && number.length > max ? number.substr(0, max) : number;
                }
            }, {
                key: "_initBlurListeners",
                value: function _initBlurListeners() {
                    var _this7 = this;
                    // on blur or form submit: if just a dial code then remove it
                    this._handleSubmitOrBlurEvent = function() {
                        _this7._removeEmptyDialCode();
                    };
                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                    this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
                }
            }, {
                key: "_removeEmptyDialCode",
                value: function _removeEmptyDialCode() {
                    if (this.telInput.value.charAt(0) === "+") {
                        var numeric = this._getNumeric(this.telInput.value);
                        // if just a plus, or if just a dial code
                        if (!numeric || this.selectedCountryData.dialCode === numeric) {
                            this.telInput.value = "";
                        }
                    }
                }
            }, {
                key: "_getNumeric",
                value: function _getNumeric(s) {
                    return s.replace(/\D/g, "");
                }
            }, {
                key: "_trigger",
                value: function _trigger(name) {
                    // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
                    var e = document.createEvent("Event");
                    e.initEvent(name, true, true);
                    // can bubble, and is cancellable
                    this.telInput.dispatchEvent(e);
                }
            }, {
                key: "_showDropdown",
                value: function _showDropdown() {
                    this.countryList.classList.remove("iti__hide");
                    this.countryList.setAttribute("aria-expanded", "true");
                    this._setDropdownPosition();
                    // update highlighting and scroll to active list item
                    if (this.activeItem) {
                        this._highlightListItem(this.activeItem, false);
                        this._scrollTo(this.activeItem, true);
                    }
                    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                    this._bindDropdownListeners();
                    // update the arrow
                    this.dropdownArrow.classList.add("iti__arrow--up");
                    this._trigger("open:countrydropdown");
                }
            }, {
                key: "_toggleClass",
                value: function _toggleClass(el, className, shouldHaveClass) {
                    if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className); else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
                }
            }, {
                key: "_setDropdownPosition",
                value: function _setDropdownPosition() {
                    var _this8 = this;
                    if (this.options.dropdownContainer) {
                        this.options.dropdownContainer.appendChild(this.dropdown);
                    }
                    if (!this.isMobile) {
                        var pos = this.telInput.getBoundingClientRect();
                        // windowTop from https://stackoverflow.com/a/14384091/217866
                        var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                        var inputTop = pos.top + windowTop;
                        var dropdownHeight = this.countryList.offsetHeight;
                        // dropdownFitsBelow = (dropdownBottom < windowBottom)
                        var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                        var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                        // by default, the dropdown will be below the input. If we want to position it above the
                        // input, we add the dropup class.
                        this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
                        // if dropdownContainer is enabled, calculate postion
                        if (this.options.dropdownContainer) {
                            // by default the dropdown will be directly over the input because it's not in the flow.
                            // If we want to position it below, we need to add some extra top value.
                            var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                            // calculate placement
                            this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                            this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                            // close menu on window scroll
                            this._handleWindowScroll = function() {
                                return _this8._closeDropdown();
                            };
                            window.addEventListener("scroll", this._handleWindowScroll);
                        }
                    }
                }
            }, {
                key: "_getClosestListItem",
                value: function _getClosestListItem(target) {
                    var el = target;
                    while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
                        el = el.parentNode;
                    }
                    // if we reached the countryList element, then return null
                    return el === this.countryList ? null : el;
                }
            }, {
                key: "_bindDropdownListeners",
                value: function _bindDropdownListeners() {
                    var _this9 = this;
                    // when mouse over a list item, just highlight that one
                    // we add the class "highlight", so if they hit "enter" we know which one to select
                    this._handleMouseoverCountryList = function(e) {
                        // handle event delegation, as we're listening for this event on the countryList
                        var listItem = _this9._getClosestListItem(e.target);
                        if (listItem) _this9._highlightListItem(listItem, false);
                    };
                    this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                    // listen for country selection
                    this._handleClickCountryList = function(e) {
                        var listItem = _this9._getClosestListItem(e.target);
                        if (listItem) _this9._selectListItem(listItem);
                    };
                    this.countryList.addEventListener("click", this._handleClickCountryList);
                    // click off to close
                    // (except when this initial opening click is bubbling up)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    var isOpening = true;
                    this._handleClickOffToClose = function() {
                        if (!isOpening) _this9._closeDropdown();
                        isOpening = false;
                    };
                    document.documentElement.addEventListener("click", this._handleClickOffToClose);
                    // listen for up/down scrolling, enter to select, or letters to jump to country name.
                    // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                    // just hit down and hold it to scroll down (no keyup event).
                    // listen on the document because that's where key events are triggered if no input has focus
                    var query = "";
                    var queryTimer = null;
                    this._handleKeydownOnDropdown = function(e) {
                        // prevent down key from scrolling the whole page,
                        // and enter key from submitting a form etc
                        e.preventDefault();
                        // up and down to navigate
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") _this9._handleUpDownKey(e.key); else if (e.key === "Enter") _this9._handleEnterKey(); else if (e.key === "Escape") _this9._closeDropdown(); else if (/^[a-zA-Z??-?? ]$/.test(e.key)) {
                            // jump to countries that start with the query string
                            if (queryTimer) clearTimeout(queryTimer);
                            query += e.key.toLowerCase();
                            _this9._searchForCountry(query);
                            // if the timer hits 1 second, reset the query
                            queryTimer = setTimeout(function() {
                                query = "";
                            }, 1e3);
                        }
                    };
                    document.addEventListener("keydown", this._handleKeydownOnDropdown);
                }
            }, {
                key: "_handleUpDownKey",
                value: function _handleUpDownKey(key) {
                    var next = key === "ArrowUp" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                    if (next) {
                        // skip the divider
                        if (next.classList.contains("iti__divider")) {
                            next = key === "ArrowUp" ? next.previousElementSibling : next.nextElementSibling;
                        }
                        this._highlightListItem(next, true);
                    }
                }
            }, {
                key: "_handleEnterKey",
                value: function _handleEnterKey() {
                    if (this.highlightedItem) this._selectListItem(this.highlightedItem);
                }
            }, {
                key: "_searchForCountry",
                value: function _searchForCountry(query) {
                    for (var i = 0; i < this.countries.length; i++) {
                        if (this._startsWith(this.countries[i].name, query)) {
                            var listItem = this.countryList.querySelector("#iti-item-".concat(this.countries[i].iso2));
                            // update highlighting and scroll
                            this._highlightListItem(listItem, false);
                            this._scrollTo(listItem, true);
                            break;
                        }
                    }
                }
            }, {
                key: "_startsWith",
                value: function _startsWith(a, b) {
                    return a.substr(0, b.length).toLowerCase() === b;
                }
            }, {
                key: "_updateValFromNumber",
                value: function _updateValFromNumber(originalNumber) {
                    var number = originalNumber;
                    if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                        var useNational = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) !== "+");
                        var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                        var format = useNational ? NATIONAL : INTERNATIONAL;
                        number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
                    }
                    number = this._beforeSetNumber(number);
                    this.telInput.value = number;
                }
            }, {
                key: "_updateFlagFromNumber",
                value: function _updateFlagFromNumber(originalNumber) {
                    // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
                    // with a +1 so _getDialCode will be able to extract the area code
                    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                    // from the number), that means we're initialising the plugin with a number that already has a
                    // dial code, so fine to ignore this bit
                    var number = originalNumber;
                    var selectedDialCode = this.selectedCountryData.dialCode;
                    var isNanp = selectedDialCode === "1";
                    if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
                        if (number.charAt(0) !== "1") number = "1".concat(number);
                        number = "+".concat(number);
                    }
                    // update flag if user types area code for another country
                    if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                        number = "+".concat(selectedDialCode).concat(number);
                    }
                    // try and extract valid dial code from input
                    var dialCode = this._getDialCode(number);
                    var numeric = this._getNumeric(number);
                    var countryCode = null;
                    if (dialCode) {
                        var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                        // check if the right country is already selected. this should be false if the number is
                        // longer than the matched dial code because in this case we need to make sure that if
                        // there are multiple country matches, that the first one is selected (note: we could
                        // just check that here, but it requires the same loop that we already have later)
                        var alreadySelected = countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                        var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                        // only update the flag if:
                        // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                        // AND
                        // B) the right country is not already selected
                        if (!isRegionlessNanpNumber && !alreadySelected) {
                            // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                            // non-empty index
                            for (var j = 0; j < countryCodes.length; j++) {
                                if (countryCodes[j]) {
                                    countryCode = countryCodes[j];
                                    break;
                                }
                            }
                        }
                    } else if (number.charAt(0) === "+" && numeric.length) {
                        // invalid dial code, so empty
                        // Note: use getNumeric here because the number has not been formatted yet, so could contain
                        // bad chars
                        countryCode = "";
                    } else if (!number || number === "+") {
                        // empty, or just a plus, so default
                        countryCode = this.defaultCountry;
                    }
                    if (countryCode !== null) {
                        return this._setFlag(countryCode);
                    }
                    return false;
                }
            }, {
                key: "_isRegionlessNanp",
                value: function _isRegionlessNanp(number) {
                    var numeric = this._getNumeric(number);
                    if (numeric.charAt(0) === "1") {
                        var areaCode = numeric.substr(1, 3);
                        return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                    }
                    return false;
                }
            }, {
                key: "_highlightListItem",
                value: function _highlightListItem(listItem, shouldFocus) {
                    var prevItem = this.highlightedItem;
                    if (prevItem) prevItem.classList.remove("iti__highlight");
                    this.highlightedItem = listItem;
                    this.highlightedItem.classList.add("iti__highlight");
                    if (shouldFocus) this.highlightedItem.focus();
                }
            }, {
                key: "_getCountryData",
                value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                    var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                    for (var i = 0; i < countryList.length; i++) {
                        if (countryList[i].iso2 === countryCode) {
                            return countryList[i];
                        }
                    }
                    if (allowFail) {
                        return null;
                    }
                    throw new Error("No country data for '".concat(countryCode, "'"));
                }
            }, {
                key: "_setFlag",
                value: function _setFlag(countryCode) {
                    var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                    // do this first as it will throw an error and stop if countryCode is invalid
                    this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
                    // update the defaultCountry - we only need the iso2 from now on, so just store that
                    if (this.selectedCountryData.iso2) {
                        this.defaultCountry = this.selectedCountryData.iso2;
                    }
                    this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                    // update the selected country's title attribute
                    //updated line by me
                    //var title = countryCode ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
                    var title = countryCode ? "+".concat(this.selectedCountryData.dialCode) : "Unknown";
                    this.selectedFlag.setAttribute("title", title);
                    if (this.options.separateDialCode) {
                        var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                        this.selectedDialCode.innerHTML = dialCode;
                        // offsetWidth is zero if input is in a hidden container during initialisation
                        var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                        // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                        this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                    }
                    // and the input's placeholder
                    this._updatePlaceholder();
                    // update the active list item
                    if (this.options.allowDropdown) {
                        var prevItem = this.activeItem;
                        if (prevItem) {
                            prevItem.classList.remove("iti__active");
                            prevItem.setAttribute("aria-selected", "false");
                        }
                        if (countryCode) {
                            var nextItem = this.countryList.querySelector("#iti-item-".concat(countryCode));
                            nextItem.setAttribute("aria-selected", "true");
                            nextItem.classList.add("iti__active");
                            this.activeItem = nextItem;
                            this.countryList.setAttribute("aria-activedescendant", nextItem.getAttribute("id"));
                        }
                    }
                    // return if the flag has changed or not
                    
                    //document.querySelector(".indicatif_val").setAttribute('value', title)

                   //$(".indicatif_val").attr("value",title)


                    return prevCountry.iso2 !== countryCode;
                }
            }, {
                key: "_getHiddenSelectedFlagWidth",
                value: function _getHiddenSelectedFlagWidth() {
                    // to get the right styling to apply, all we need is a shallow clone of the container,
                    // and then to inject a deep clone of the selectedFlag element
                    var containerClone = this.telInput.parentNode.cloneNode();
                    containerClone.style.visibility = "hidden";
                    document.body.appendChild(containerClone);
                    var selectedFlagClone = this.selectedFlag.cloneNode(true);
                    containerClone.appendChild(selectedFlagClone);
                    var width = selectedFlagClone.offsetWidth;
                    containerClone.remove();
                    return width;
                }
            }, {
                key: "_updatePlaceholder",
                value: function _updatePlaceholder() {
                    var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
                    if (window.intlTelInputUtils && shouldSetPlaceholder) {
                        var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                        var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
                        placeholder = this._beforeSetNumber(placeholder);
                        if (typeof this.options.customPlaceholder === "function") {
                            placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                        }
                        this.telInput.setAttribute("placeholder", placeholder);
                    }
                }
            }, {
                key: "_selectListItem",
                value: function _selectListItem(listItem) {
                    // update selected flag and active list item
                    var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                    this._closeDropdown();
                    this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
                    // focus the input
                    this.telInput.focus();
                    // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
                    // inserting dial code), who try to put the cursor at the beginning the first time
                    var len = this.telInput.value.length;
                    this.telInput.setSelectionRange(len, len);
                    if (flagChanged) {
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "_closeDropdown",
                value: function _closeDropdown() {
                    this.countryList.classList.add("iti__hide");
                    this.countryList.setAttribute("aria-expanded", "false");
                    // update the arrow
                    this.dropdownArrow.classList.remove("iti__arrow--up");
                    // unbind key events
                    document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                    document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                    this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                    this.countryList.removeEventListener("click", this._handleClickCountryList);
                    // remove menu from container
                    if (this.options.dropdownContainer) {
                        if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                        if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                    }
                    this._trigger("close:countrydropdown");
                }
            }, {
                key: "_scrollTo",
                value: function _scrollTo(element, middle) {
                    var container = this.countryList;
                    // windowTop from https://stackoverflow.com/a/14384091/217866
                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                    var containerHeight = container.offsetHeight;
                    var containerTop = container.getBoundingClientRect().top + windowTop;
                    var containerBottom = containerTop + containerHeight;
                    var elementHeight = element.offsetHeight;
                    var elementTop = element.getBoundingClientRect().top + windowTop;
                    var elementBottom = elementTop + elementHeight;
                    var newScrollTop = elementTop - containerTop + container.scrollTop;
                    var middleOffset = containerHeight / 2 - elementHeight / 2;
                    if (elementTop < containerTop) {
                        // scroll up
                        if (middle) newScrollTop -= middleOffset;
                        container.scrollTop = newScrollTop;
                    } else if (elementBottom > containerBottom) {
                        // scroll down
                        if (middle) newScrollTop += middleOffset;
                        var heightDifference = containerHeight - elementHeight;
                        container.scrollTop = newScrollTop - heightDifference;
                    }
                }
            }, {
                key: "_updateDialCode",
                value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
                    var inputVal = this.telInput.value;
                    // save having to pass this every time
                    var newDialCode = "+".concat(newDialCodeBare);
                    var newNumber;
                    if (inputVal.charAt(0) === "+") {
                        // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                        var prevDialCode = this._getDialCode(inputVal);
                        if (prevDialCode) {
                            // current number contains a valid dial code, so replace it
                            newNumber = inputVal.replace(prevDialCode, newDialCode);
                        } else {
                            // current number contains an invalid dial code, so ditch it
                            // (no way to determine where the invalid dial code ends and the rest of the number begins)
                            newNumber = newDialCode;
                        }
                    } else if (this.options.nationalMode || this.options.separateDialCode) {
                        // don't do anything
                        return;
                    } else {
                        // nationalMode is disabled
                        if (inputVal) {
                            // there is an existing value with no dial code: prefix the new dial code
                            newNumber = newDialCode + inputVal;
                        } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                            // no existing value and either they've just selected a list item, or autoHideDialCode is
                            // disabled: insert new dial code
                            newNumber = newDialCode;
                        } else {
                            return;
                        }
                    }
                    this.telInput.value = newNumber;
                }
            }, {
                key: "_getDialCode",
                value: function _getDialCode(number) {
                    var dialCode = "";
                    // only interested in international numbers (starting with a plus)
                    if (number.charAt(0) === "+") {
                        var numericChars = "";
                        // iterate over chars
                        for (var i = 0; i < number.length; i++) {
                            var c = number.charAt(i);
                            // if char is number (https://stackoverflow.com/a/8935649/217866)
                            if (!isNaN(parseInt(c, 10))) {
                                numericChars += c;
                                // if current numericChars make a valid dial code
                                if (this.countryCodes[numericChars]) {
                                    // store the actual raw string (useful for matching later)
                                    dialCode = number.substr(0, i + 1);
                                }
                                if (numericChars.length === this.dialCodeMaxLen) {
                                    break;
                                }
                            }
                        }
                    }
                    return dialCode;
                }
            }, {
                key: "_getFullNumber",
                value: function _getFullNumber() {
                    var val = this.telInput.value.trim();
                    var dialCode = this.selectedCountryData.dialCode;
                    var prefix;
                    var numericVal = this._getNumeric(val);
                    if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                        // when using separateDialCode, it is visible so is effectively part of the typed number
                        prefix = "+".concat(dialCode);
                    } else {
                        prefix = "";
                    }
                    return prefix + val;
                }
            }, {
                key: "_beforeSetNumber",
                value: function _beforeSetNumber(originalNumber) {
                    var number = originalNumber;
                    if (this.options.separateDialCode) {
                        var dialCode = this._getDialCode(number);
                        // if there is a valid dial code
                        if (dialCode) {
                            // in case _getDialCode returned an area code as well
                            dialCode = "+".concat(this.selectedCountryData.dialCode);
                            // a lot of numbers will have a space separating the dial code and the main number, and
                            // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                            // rid of it
                            // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                            var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                            number = number.substr(start);
                        }
                    }
                    return this._cap(number);
                }
            }, {
                key: "_triggerCountryChange",
                value: function _triggerCountryChange() {
                    this._trigger("countrychange");
                }
            }, {
                key: "handleAutoCountry",
                value: function handleAutoCountry() {
                    if (this.options.initialCountry === "auto") {
                        // we must set this even if there is an initial val in the input: in case the initial val is
                        // invalid and they delete it - they should see their auto country
                        this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                        // if there's no initial value in the input, then update the flag
                        if (!this.telInput.value) {
                            this.setCountry(this.defaultCountry);
                        }
                        this.resolveAutoCountryPromise();
                    }
                }
            }, {
                key: "handleUtils",
                value: function handleUtils() {
                    // if the request was successful
                    if (window.intlTelInputUtils) {
                        // if there's an initial value in the input, then format it
                        if (this.telInput.value) {
                            this._updateValFromNumber(this.telInput.value);
                        }
                        this._updatePlaceholder();
                    }
                    this.resolveUtilsScriptPromise();
                }
            }, {
                key: "destroy",
                value: function destroy() {
                    var form = this.telInput.form;
                    if (this.options.allowDropdown) {
                        // make sure the dropdown is closed (and unbind listeners)
                        this._closeDropdown();
                        this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                        this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                        // label click hack
                        var label = this._getClosestLabel();
                        if (label) label.removeEventListener("click", this._handleLabelClick);
                    }
                    // unbind hiddenInput listeners
                    if (this.hiddenInput && form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
                    // unbind autoHideDialCode listeners
                    if (this.options.autoHideDialCode) {
                        if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                        this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                    }
                    // unbind key events, and cut/paste events
                    this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                    this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                    this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                    // remove attribute of id instance: data-intl-tel-input-id
                    this.telInput.removeAttribute("data-intl-tel-input-id");
                    // remove markup (but leave the original input)
                    var wrapper = this.telInput.parentNode;
                    wrapper.parentNode.insertBefore(this.telInput, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                    delete window.intlTelInputGlobals.instances[this.id];
                }
            }, {
                key: "getExtension",
                value: function getExtension() {
                    if (window.intlTelInputUtils) {
                        return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
                    }
                    return "";
                }
            }, {
                key: "getNumber",
                value: function getNumber(format) {
                    if (window.intlTelInputUtils) {
                        var iso2 = this.selectedCountryData.iso2;
                        return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                    }
                    return "";
                }
            }, {
                key: "getNumberType",
                value: function getNumberType() {
                    if (window.intlTelInputUtils) {
                        return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
                    }
                    return -99;
                }
            }, {
                key: "getSelectedCountryData",
                value: function getSelectedCountryData() {
                    return this.selectedCountryData;
                }
            }, {
                key: "getValidationError",
                value: function getValidationError() {
                    if (window.intlTelInputUtils) {
                        var iso2 = this.selectedCountryData.iso2;
                        return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                    }
                    return -99;
                }
            }, {
                key: "isValidNumber",
                value: function isValidNumber() {
                    var val = this._getFullNumber().trim();
                    var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
                    return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
                }
            }, {
                key: "setCountry",
                value: function setCountry(originalCountryCode) {
                    var countryCode = originalCountryCode.toLowerCase();
                    // check if already selected
                    if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
                        this._setFlag(countryCode);
                        this._updateDialCode(this.selectedCountryData.dialCode, false);
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "setNumber",
                value: function setNumber(number) {
                    // we must update the flag first, which updates this.selectedCountryData, which is used for
                    // formatting the number before displaying it
                    var flagChanged = this._updateFlagFromNumber(number);
                    this._updateValFromNumber(number);
                    if (flagChanged) {
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "setPlaceholderNumberType",
                value: function setPlaceholderNumberType(type) {
                    this.options.placeholderNumberType = type;
                    this._updatePlaceholder();
                }
            } ]);
            return Iti;
        }();
        /********************
         *  STATIC METHODS
         ********************/
        // get the country data object
        window.intlTelInputGlobals.getCountryData = function() {
            return allCountries;
        };
        // inject a <script> element to load utils.js
        var injectScript = function injectScript(path, handleSuccess, handleFailure) {
            // inject a new script element into the page
            var script = document.createElement("script");
            script.onload = function() {
                forEachInstance("handleUtils");
                if (handleSuccess) handleSuccess();
            };
            script.onerror = function() {
                forEachInstance("rejectUtilsScriptPromise");
                if (handleFailure) handleFailure();
            };
            script.className = "iti-load-utils";
            script.async = true;
            script.src = path;
            document.body.appendChild(script);
        };
        // load the utils script
        window.intlTelInputGlobals.loadUtils = function(path) {
            // 2 options:
            // 1) not already started loading (start)
            // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
            // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
            if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                // only do this once
                window.intlTelInputGlobals.startedLoadingUtilsScript = true;
                // if we have promises, then return a promise
                if (typeof Promise !== "undefined") {
                    return new Promise(function(resolve, reject) {
                        return injectScript(path, resolve, reject);
                    });
                }
                injectScript(path);
            }
            return null;
        };
        // default options
        window.intlTelInputGlobals.defaults = defaults;
        // version
        window.intlTelInputGlobals.version = "16.0.0";
        // convenience wrapper
        return function(input, options) {
            var iti = new Iti(input, options);
            iti._init();
            input.setAttribute("data-intl-tel-input-id", iti.id);
            window.intlTelInputGlobals.instances[iti.id] = iti;
            return iti;
        };
    }();
});




// Init phone indicatif part 
(function ($) {
    // your code

    $(document).find(".phoneIndic").each(function(indx){ 
      // init plugin

      window.intlTelInput(document.querySelectorAll(".phoneIndic")[indx], {
         allowDropdown: true,
        // autoHideDialCode: false,
        //= autoPlaceholder: "off",
        //dropdownContainer: document.body,
        //dropdownContainer:null,
        excludeCountries: ["eh"],
         formatOnDisplay: true,
        // geoIpLookup: function(callback) {
        //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        // hiddenInput: "full_number",
        initialCountry: "ma",
        //localizedCountries: { 'de': 'Deutschland' },
        // nationalMode: false,
        // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        // placeholderNumberType: "MOBILE",
           preferredCountries: ['ma'],
        // separateDialCode: true,
          //utilsScript: "utils.js",
      });

    })

    if($(".iti__selected-flag").length){
       $(".iti__selected-flag").each(function(){
           $(this).closest(".customPhone").find(".indicatif_val").attr("value", $(this).attr("title"));
       })
    } 

    $(document).on("click",".iti__country-list",function(classment__) {
        indicatif_val = ($(this).find("li.iti__active").attr("data-dial-code"))
        $(this).closest(".customPhone").find(".indicatif_val").attr("value", "+"+indicatif_val);
    });

    $(".customPhone input:eq(0)").on("focus", function(){
       $(this).parent().parent().find("label").addClass("active_for_indic")
    }).blur(function(){
       if($(this).val() == ""){
           $(this).parent().parent().find("label").removeClass("active_for_indic")
       }else{         
           $(this).parent().parent().find("label").css({"color":"#9e9e9e"});
       }
    })

    if(!debugMode){
        console = {
            log: function() {}
          };
    }

})(jQuery); //phone indicatif part 
    


