$(window).load(function() {
  console.log('window loaded')
// Initialize google map for search
  var map;
  var center = new google.maps.LatLng(41.8781, -87.6298);
  var mapOptions = {
    zoom: 12,
    center: center
  }

  
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // var url = 'https://data.cityofchicago.org/resource/fy8g-989r.json?&$$app_token=GNFVEMsixrxPFyJHss2tVnZc9'
 
 //Retrieve property data and plot on map
$.ajax({
  url: "https://data.cityofchicago.org/resource/fy8g-989r.json",
  type: "GET",
  data: '$where=location+IS+NOT+NULL&$limit=1500&$$app_token=GNFVEMsixrxPFyJHss2tVnZc9',
      
  success: function(response) {
      

    for(var i = 59; i < response.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(response[i].location.coordinates[1], response[i].location.coordinates[0]),
        map: map,
        optimized: false
      })

     var content ='<div class="info-window">'
                + '<h4>' + response[i].location_address + '</h4>'
                + '<p>' + 'Ward: ' + response[i].ward + '</p>'
                + '<p>' + 'Zoning Classification: ' + response[i].zoning_classification + '</p>'
                + '<p id="property-pin">' + '"idNum": "' + response[i].digit_pin +'"'+ '</p>'
                + '<button id="property-detail">' + 'Property Detail' + '</button>'
                + '</div>'  
        
      var infowindow = new google.maps.InfoWindow({});
            // google.maps.event.addListener(marker, 'click', function() {
            //   info_window.open(map, marker);
          google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
                return function() {
                infowindow.setContent(content);
                infowindow.open(map,marker);
                };
             })(marker,content,infowindow)); 

      google.maps.event.addListener(infowindow, 'domready', function() {
        $("#property-detail").click(function(e) {
          var pin = $("#property-pin").contents();
          var match = pin[0].data;

        $.ajax({
          url: "https://api.mlab.com/api/1/databases/buychicago/collections/properties?q={"+match+"}&apiKey=2G-Mwdr0aKoUjXV_TdMaMJl7I5vREo8x",
          type: "GET",
          // data:  'apiKey=2G-Mwdr0aKoUjXV_TdMaMJl7I5vREo8x',
            
            // "apiKey"     : "2G-Mwdr0aKoUjXV_TdMaMJl7I5vREo8x"

          
          success: function (response){
            var html = '<div id="propdetail-window">'
                  // + '<div class="row">'
                  // +  '<div class="col-sm-6 col-md-4">'
                  +    '<div class="thumbnail">'
                  +      '<img src="http://cookviewer1.cookcountyil.gov/jsviewer/PhotoProxy.aspx?'+response[0].pin+'=" a>'
                  +      '<div class="caption">'
                  +        '<h3>' + 'Property Detail' + '</h3>'
                  +        '<h4>' + response[0].location + '</h4>'
                  +        '<p>' + 'Zoning Classification: ' + response[0].zoningClassification + '</p>'
                  +        '<p>' + 'Ward: ' + response[0].ward + '</p>'
                  +        '<p>'+'TIF District: ' +response[0].tifdistrict+'</p>'
                  // +        '<p id="property-close" class="btn btn-primary" role="submit">Close</p>'
                  +      '</div>'
                  +    '</div>'
                  // +  '</div>'
                  // +'</div>'
                  // + '<button id="property-close">' + 'Close' + '</button>'
                  + '</div>'  
                
       $("#property-info").append(html);
       console.log("button clicked");
       console.log(match);
       console.log(response)
        
    
            
            
          },
          error: function(error) {
            console.log("error" + error);
          }   
        });

          
      });     


    });  
      console.log('markers done');
      // console.log(response);
  }    
    
  },
  error: function(error) {
    console.log("error" + error);
  }   
  
});


  $("#search").submit(function(event) {
      event.preventDefault();
      var search = $("#search-input").val();
      console.log(search);
  
      var lat;
      var lng;
    
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "GET",
        data: {
          "address" : search,
          "key"     : "AIzaSyDSJIElJ-J2CHa4B_Z9PpX_kWyqgHqQ-nc"

        },
        success: function (response){
          var center = response.results[0].geometry.location;
          console.log(response.results);
          map.setCenter(center);
          map.setZoom(14);
        },
        error: function(error) {
          console.log("error" + error);
        }   
      });

  });  


  

  // $("#property-detail").click(function(event) {
  //     var html = '<div id="propdetail-window">'
  //               + '<h4>' + response[i].location_address + '</h4>'
  //               + '<p>' + 'Ward: ' + response[i].ward + '</p>'
  //               + '<p>' + 'Zoning Classification: ' + response[i].zoning_classification + '</p>'
  //               + '<button class="property-detail">' + 'Property Detail' + '</button>'
  //               + '</div>'  
  //      $("#property-info").append(html);
  //      console.log("button clicked")
       
  // })

});

// $("#property-close").click(function(e) {
//           event.preventDefault();
//           $("#propdetail-window").hide()
//           }); 
