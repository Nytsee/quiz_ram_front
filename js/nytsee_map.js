$(document).ready(function(){
/*jQuery.noConflict();*/

  var droped='false';
  var selectedMarker = ''; 
  var selectedMarkerToUse = ''; 
  var srcJson = $("#cont_gencies").attr("data-src");



function theCloser(){
  //alert("ok")
          // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
           
            console.log("Pos : "+pos.lat+" // "+pos.lng);
            find_closest_marker(pos.lat, pos.lng);                    
          });
        } 
}



function find_closest_marker( lat1, lon1 ) {    
    var pi = Math.PI;
    var R = 6371; //equatorial radius
    var distances = [];
    var closest = -1;

    for( i=0;i<markers.length; i++ ) {  
        var lat2 = markers[i].position.lat();
        var lon2 = markers[i].position.lng();

        var chLat = lat2-lat1;
        var chLon = lon2-lon1;

        var dLat = chLat*(pi/180);
        var dLon = chLon*(pi/180);

        var rLat1 = lat1*(pi/180);
        var rLat2 = lat2*(pi/180);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }
  
    // (debug) The closest marker is:
    console.log(markers[closest]);
    //alert(markers[closest].position.lat())
     
     setTimeout(function(){ 
               map.setCenter(new google.maps.LatLng( markers[closest].position.lat() , markers[closest].position.lng() ));
               map.setZoom(14);
     },1000)

}






  function initialise() {

    myLatlng = new google.maps.LatLng( 33.590777, -7.636222); // Add the coordinates
    mapOptions = {
      zoom: 9, // The initial zoom level when your map loads (0-20)
      center: myLatlng, // Centre the Map to our coordinates variable
      mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
      scrollwheel: false,
      zoomControl: true,
      scaleControl: true,
      streetViewControl: false,
      mapTypeControl:false
    }
    
    var marocStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
    {
    "featureType": "administrative.country",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
    var marocMapType = new google.maps.StyledMapType(marocStyles);
    
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById('theMap'), mapOptions); // Render our map within the empty div
    
    
    map.mapTypes.set('morocco', marocMapType );
    map.setMapTypeId('morocco');
    
    layer = new google.maps.FusionTablesLayer({
                query: {
                        select: 'geometry',
                        from: '1rMGnTdMG9ebpFdq7_AE4rTDeoutIgNpi5bZ6GZ_C',
                        where: "col0 contains 'MAR'"
                        },
                        styles: [{
                        polylineOptions: {
                        strokeColor: "#000000",
                        strokeWeight: 2
                                   }
            }]
    });

         layer.setMap(map);

      setMarkers();
  
  }




  
  google.maps.event.addDomListener(window, 'load', initialise); // Execute our 'initialise' function once the page has loaded.
  


var contentString = ''+
      '<div class="bodyContent">'+
      '<h1>ﺍﻟﻮﻛﺎﻟﺔ ﺭﻗﻢ 2</h1>'+
      '<p>'+
      ' <span>ﺍﻟﻔﺎﻛﺲ</span> : 04 48 59 21 22 50<br/>'+
      ' <span>ﺍﻟﻬﺎﺗﻒ</span>  : 87 48 59 21 22 50<br/>'+
      ' <span>ﺍﻟﻌﻨﻮﺍﻥ</span> : ﺃﻧﻜﺎﻳﺪﻳﺪﻳﻮﻧﺘﻴﻮﺕﻨﺎﻳﻢ,ﻛﻴﻮﺍﺱ ﺗﻴﻤﺒﻮﺭﻟﻮﺭﻳﻢ'+
      '.</p>'+
      '</div>';

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
 banks = [
  [contentString, 33.590777, -7.636222 , 'A little Title on mouse Hover !']
];



function setMarkers() {

  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
 image_type_marker = {
    url: $("#cont_gencies").attr("data"),
    /*url: 'images/myflag.png',*/

    // This marker is 20 pixels wide by 32 pixels high.
    /*size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    //anchor: new google.maps.Point(0, 32)*/
  };



  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 60, 60, 60, 60, 1],
    type: 'poly'
  };




  var infowindow = new google.maps.InfoWindow({});


  markers = [];

  for (var i = 0; i < banks.length; i++) {
    var agency = banks[i];

    //alert("Title : "+ agency[0]+" Lat : "+agency[1]+" Lng : "+agency[2] )

 /*   var marker = new google.maps.Marker({
      position: {lat: agency[1], lng: agency[2]},
      map: map,
      icon: image_type_marker,
      shape: shape,
      title: agency[0],
      zIndex: agency[3]
    });*/


      var myLatlng = new google.maps.LatLng(agency[1], agency[2]);


      var marker = new google.maps.Marker({
      position:  myLatlng,
      map: map,
      icon: image_type_marker,
      shape: shape,
      description: agency[0],
      title:agency[3],
      zIndex: agency[3]
      });


  /*  alert(i) */

      marker.addListener('click', function() {

      infowindow.setContent(this.description);
      infowindow.open(map, this);
                //map.setCenter(new google.maps.LatLng(33.590777, -7.636222));



    });

  markers.push(marker);
  /*marker.setAnimation(google.maps.Animation.BOUNCE);*/
  marker.setAnimation(google.maps.Animation.DROP);
  console.log("Nbr Markers : "+markers.length)
            
         

    //alert(i)

  }

  console.log(markers);
  /*markers[2].setVisible(false);*/

               /* var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});*/
               

    
              /*mc.addMarker(marker);*///add the marker to the MarkerClusterer


}         




   function scrollTo(currentBlock){
    var decalage = 0;
    if($(".menu-icon a").is(':visible')){ decalage = 70 }
    $('html, body').stop().animate({
    scrollTop: currentBlock - decalage
    }, 1500,"easeInOutQuart");
   }



function cleanTheMap(){
           
          for (var i = 0; i < markers.length; i++) {
            //alert(markers.length)
            markers[i].setMap(null, true); //Remove the marker from the map
          }

          markers = [];
         // markerCluster.clearMarkers();


}



function inithemap(){

   banks = [];


/*        $.ajax({
         type: 'GET',
         url:'js/agencies.json',
         dataType: "json",
         success: function(data){
           alert(data.agencies[0].adress);
         },
         error: function(jqXHR, textStatus, errorThrown) {
            // error_fn(jqXHR, textStatus, errorThrown);
            alert(errorThrown)
         }
      });  
*/


  $(".elemAgency").each(function(){
    

        markerInfosWindow = $(this).find(".infosWindows").html();
        markerLat = $(this).find(".agency-marker").attr("data-lat");
        markerLng = $(this).find(".agency-marker").attr("data-lng");
        
        markerTitle = $(this).find(".agencyName").html();
        //alert( markerLng +" "+markerLat )

        newElemPoints = [ markerInfosWindow ,  markerLng , markerLat , markerTitle ];
        

        if(markerLng != ""){
        banks.push(newElemPoints);
        }

  })

    cleanTheMap();

    //map.setCenter(new google.maps.LatLng(33.590777, -7.636222));
    setMarkers();
    map.setZoom(5);

}





   TemplateBox = "";
   SplitedTels = [];

  $.getJSON( srcJson , function (data, err) {
     if(data){
      setTimeout(function(){ 
        initialise(); 
        theCloser();
       }, 2000);
     }

        $.each(data.agencies, function (index, data) {
           //alert(JSON.stringify(data))
           //alert(data.tel.length)
           console.log("Hello json "+data);
          
           for(var TinJson = 0 ; TinJson < data.tel.length; TinJson++ ){
             SplitedTels.push("<a href='tel:"+data.tel[TinJson]+"'>"+data.tel[TinJson]+"</a>");
             //alert(SplitedTels);
           }


           var LinkRedirect = "https://food.jumia.ma/restaurant/m4tb/mcdonald-s-vendor?utm_medium=MAP_BT_"+data.ville+"&utm_source=mcdonalds_LP&utm_campaign=McDelivery";


           TemplateBox = ''+
           '<div class="elemAgency">'+
           '<div class="agencyName">'+data.agency+'</div>'+
           '<span><i class="fa fa-map-marker agency-marker" aria-hidden="true" data-lat="'+data.lat+'" data-lng="'+data.lang+'"></i>'+
           ''+data.adress+'</span>'+
           '<span><i class="fa fa-phone" aria-hidden="true"></i>'+data.tel.join(" / ")+'</span>'+
           '<span><i class="fa fa-fax" aria-hidden="true"></i>'+data.fax+'</span>'+

                   '<div class="infosWindows">'+
                    '<div class="bodyContent">'+
                        '<h1>'+data.agency+'</h1>'+
                        '<p>'+
                      '<b>Adresse : </b>'+data.adress+'<br/>'+
                      '<b>Téléphone : </b>'+SplitedTels.join(" / ")+'<br/>'+
                      '<b>Fax : </b>'+data.fax+
                      '<div class="commanderMap"><a target="_blank" href="'+LinkRedirect+'" class="commanderLink">Commander</a></div>'+
                        '</p>'+
                    '</div>'+
                  '</div>'+

           '</div>';
           //alert(TemplateBox)
           $("#cont_gencies").append(TemplateBox);

           //Let's free the array for the next ++
           TemplateBox = "";
           SplitedTels = [];

        });

        inithemap();

        if($(".elemAgency").length == 1){
           setTimeout(function(){            
           map.setCenter(new google.maps.LatLng($(".elemAgency .agency-marker").attr("data-lng"), $(".elemAgency .agency-marker").attr("data-lat") ));
           map.setZoom(14);
           },10)
        }

  });




  $(document).on("click", ".elemAgency" , function() {
   
   $MarkAgency = $(this).find(".agency-marker");
   directLat = $MarkAgency.attr("data-lat");
   directLng = $MarkAgency.attr("data-lng");
   TitleMarker = $MarkAgency.parent().find(".agencyName").html();
   contentInfo = $MarkAgency.parent().parent().find(".infosWindows").html();
   
   //ugly Client's Request // To delete for the forward projects
   if(directLat == ""){  return false; }
   if(directLng == ""){  return false; }

   cleanTheMap();

   //alert(contentInfo)

   banks = [];

   banks = [
      [contentInfo,  directLng ,  directLat , TitleMarker]
   ];
   

   /* alert(banks.length);*/

     setMarkers();

           map.setCenter(new google.maps.LatLng(directLng ,  directLat ));
           map.setZoom(14);

           scrollTo($("#theMap").offset().top); 

})





});