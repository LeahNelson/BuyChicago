$(window).load(function() {
    var map;
    var options = {
        center: new google.maps.LatLng(41.8781, -87.6298),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    var map = new google.maps.Map($("#map")[0], options);

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
                "address": search,
                "key": "AIzaSyDSJIElJ-J2CHa4B_Z9PpX_kWyqgHqQ-nc"

            },
            success: function(response) {
                var lat = response.results[0].geometry.location.lat;
                var lng = response.results[0].geometry.location.lng;
                // console.log(response.results);
                console.log(lat, lng);
            },

        }).done(function(properties) {
            $.each(properties, function(idx, property) {
                // // Find the closest property to search address
                //   $.ajax({
                //     url:
                //   })
            })
        })
    });
});