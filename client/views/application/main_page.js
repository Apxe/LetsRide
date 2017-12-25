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
            var markerImg = {
                url: '/markers/ride_marker.png',
                scaledSize: new google.maps.Size(27, 41)  
            }
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                map: map.instance,
                icon: markerImg
            });
            marker.addListener('click', function() {
                var image = Images.findOne({_id: element.image}),
                    modalContent;
                if (image) {
                    modalContent = '<div class="row"><div class="col-md-4"><img class="ride_modal-img" src="' + image.link() + '" alt="' + element.title + '"></div><div class="col-md-8"><h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div></div></div>';
                }
                else {
                    modalContent = '<h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div>';
                }
                modalContent += '<div class="ride_modal-route"><strong>Маршрут&nbsp;(<a href="#">смотреть на карте</a>):</strong><br>' + element.route + '</div>';
                if (element.requirements) {
                    modalContent += '<div class="ride_modal-requirements"><strong>Требования к участникам:</strong><br>' + nl2br(element.requirements, false) + '</div>';
                }
                $('#rideQViewModal .modal-title').html(element.title);
                $('#rideQViewModal .modal-content').html(modalContent);
                $('#rideQViewModal .ride_modal-start').html('<strong>Дата и время сбора:</strong>&nbsp;' + element.start);
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
        var user = Meteor.user(),
            latlng = user.profile.latlng.split(',');
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                zoom: 13
            };
        }
    }
})
