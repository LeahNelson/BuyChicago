$(window).load(function() {
  console.log('window loaded')
// Initialize google map for search
  var map;
  var center = new google.maps.LatLng(41.8781, -87.6298);
  var mapOptions = {
    zoom: 10,
    center: center
  }

  
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // var url = 'https://data.cityofchicago.org/resource/fy8g-989r.json?&$$app_token=GNFVEMsixrxPFyJHss2tVnZc9'
 
 //Retrieve property data and plot on map
$.ajax({
  url: "https://data.cityofchicago.org/resource/fy8g-989r.json",
  type: "GET",
  data: {
    "$limit" : 100,
    "$$app_token" : "GNFVEMsixrxPFyJHss2tVnZc9"
    
  },
  success: function(response) {
    for(var i = 59; i < response.length; i++) {
      console.log(response[i].location.coordinates[0], response[i].location.coordinates[1]);
    }
  },  
  error: function(error) {
    console.log("error" + error);
  }   
    
  
  });
    
  
  // }); 
});



// $.getJSON(url, function(data, textstatus)    
//       $.each(data, function(i, entry) {
        
//           var marker = new google.maps.Marker({
//             position: new google.maps.LatLng(entry.location.coordinates[1], entry.location.coordinates[0]),
//             map: map,
//             title: location_address
//           });
//       });
