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
        });
     
      var info_window = new google.maps.InfoWindow({
        content: '<div class="info-window">'
                + '<h4>' + response[i].location_address + '</h4>'
                + '<p>' + 'Ward: ' + response[i].ward + '</p>'
                + '<p>' + 'Zoning Classification: ' + response[i].zoning_classification + '</p>'
                + '<button class="property-detail">' + 'Property Detail' + '</button>'
                + '</div>'
            });
            google.maps.event.addListener(marker, 'click', function() {
              info_window.open(map, marker);
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

    // $.ajax({
    //   url: "https://data.cityofchicago.org/resource/fy8g-989r.json",
    //   type: "GET",
    //   data: '$where=location+IS+NOT+NULL&$limit=1500&$$app_token=GNFVEMsixrxPFyJHss2tVnZc9',
      
    //   success: function(response) {
    //     for(var i = 59; i < response.length; i++) {
    //     var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(response[i].location.coordinates[1], response[i].location.coordinates[0]),
    //     map: map,
    //     optimized: false
    //     });
     
    //     var info_window = new google.maps.InfoWindow({
    //     content: '<div class="info-window">'
    //             + '<h4>' + response[i].location_address + '</h4>'
    //             + '<p>' + 'Ward: ' + response[i].ward + '</p>'
    //             + '<p>' + 'Zoning Classification: ' + response[i].zoning_classification + '</p>'
    //             + '<button class="property-detail">' + 'Property Detail' + '</button>'
    //             + '</div>'
    //         });
    //         google.maps.event.addListener(marker, 'click', function() {
    //           info_window.open(map, marker);
    //         });    
      
      //       console.log('markers done');
      //     // console.log(response);
      //       }
      //     },  
      //     error: function(error) {
      //     console.log("error" + error);
      //     }   
      // });
  });      
});

