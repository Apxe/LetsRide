Template.mainPage.onRendered(function() {
    GoogleMaps.load();
    this.$('.modal').modal();
});
Template.mainPage.onCreated(function() {
    function nl2br(str, is_xhtml) {   
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    }
    GoogleMaps.ready('mainMap', function(map) {
        function setMarkers(element, index, array) {
            var latlng = element.coordinates.split(','); 
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                map: map.instance
            });
            marker.addListener('click', function() {
                var image = Images.findOne({_id: element.image});
                $('#rideQViewModal .modal-title').html(element.title);
                if (image) {
                    $('#rideQViewModal .modal-content').html('<div class="row"><div class="col-md-6"><img class="ride_modal-img" src="' + image.link() + '" alt="' + element.title + '"></div><div class="col-md-6"><h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div></div></div><h5 class="ride_modal-sub_title">Требования к участникам:</h5><div class="ride_modal-requirements">' + nl2br(element.requirements, false) + '</div>');
                }
                else {
                    $('#rideQViewModal .modal-content').html('<h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div><h5 class="ride_modal-sub_title">Требования к участникам:</h5><div class="ride_modal-requirements">' + nl2br(element.requirements, false) + '</div>');
                }
                $('#rideQViewModal .ride_modal-start').html(element.start);
                $('#rideQViewModal').modal('open');
            });
        }
        var rides = Rides.find();
        rides.forEach(setMarkers);
        
//        var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
//        var kmlLayer = new google.maps.KmlLayer(src, {
//            suppressInfoWindows: true,
//            preserveViewport: false,
//            map: map.instance
//        });
        
    });
});
Template.mainPage.helpers({
    mainMapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(49.42633905099989, 26.98516845703125),
                zoom: 13
            };
        }
    }
})
