Template.mainPage.onRendered(function() {
    GoogleMaps.load();
    this.$('.modal').modal();
});
Template.mainPage.onCreated(function() {
    function nl2br(str, is_xhtml) { // converting linebreacks to <br> tags
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    }
    GoogleMaps.ready('mainMap', function(map) {
        function setMarkers(element, index, array) {
            // Check if current user registered to element
            var registered = false;
            element.members.forEach(function(member) {
                if (member.id == Meteor.userId() && member.status == 1) {
                    registered = true;
                }
            });
            // -
            // Set color to marker
            if (element.owner == Meteor.userId()) {
                var markerImgUrl = '/markers/ride_marker-blue.png';
            } else if (registered) {
                var markerImgUrl = '/markers/ride_marker-green.png';
            } else {
                var markerImgUrl = '/markers/ride_marker-red.png';
            }
            // -
            // Set marker image
            var markerImg = {
                url: markerImgUrl,
                scaledSize: new google.maps.Size(27, 41)  
            }
            // -
            // Set marker position
            var latlng = element.coordinates.split(','); // in our DB we have string variable with lat nd lng
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                map: map.instance,
                icon: markerImg
            });
            //  -
            // Add specific listener to each marker
            marker.addListener('click', function() {
                if (registered) {
                    Router.go('/rides/view/' + element._id);
                } else {
                    var image = Images.findOne({_id: element.image}),
                        modalContent;
                    if (image) {
                        modalContent = '<div class="row"><div class="col-md-4"><img class="ride_modal-img" src="' + image.link() + '" alt="' + element.title + '"></div><div class="col-md-8"><h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div></div></div>';
                    }
                    else {
                        modalContent = '<h5 class="ride_modal-sub_title">Описание:</h5><div class="ride_modal-desc">' +  nl2br(element.description, false) + '</div>';
                    }
                    modalContent += '<div class="ride_modal-date"><strong>Дата и время сбора:</strong><br>' + element.start + '</div>';
                    modalContent += '<div class="ride_modal-route"><strong>Маршрут&nbsp;(<a href="#">смотреть на карте</a>):</strong><br>' + element.route + '</div>';
                    if (element.requirements) {
                        modalContent += '<div class="ride_modal-requirements"><strong>Требования к участникам:</strong><br>' + nl2br(element.requirements, false) + '</div>';
                    }
                    $('#rideQViewModal .modal-title').html(element.title);
                    $('#rideQViewModal .modal-content').html(modalContent);
                    $('#rideQViewModal #applyRideBtn').attr('data-id', element._id);
                    $('#rideQViewModal').modal('open');
                }
            });
            // -
        }
        var rides = Rides.find();
        rides.observeChanges({
            added(id, user) {
                rides.forEach(setMarkers);
            },
            removed() {
                rides.forEach(setMarkers);
            }
        });
        rides.forEach(setMarkers);
        // Route example
        // var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
        // var kmlLayer = new google.maps.KmlLayer(src, {
        //     suppressInfoWindows: true,
        //     preserveViewport: false,
        //     map: map.instance
        // });
        // -
    });
});
Template.mainPage.helpers({
    mainMapOptions: function() {
        var user = Meteor.user(),
            latlng = user.profile.latlng.split(',');
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                zoom: 13,
                mapTypeId: 'terrain'
            };
        }
    }
});
Template.mainPage.events({
    'click #applyRideBtn': function(event) {
        var rideId = $(event.target).attr('data-id'),
            ride = Rides.findOne(rideId, {fields: {
                members: true
            }});
        ride.members.push({
            'id': Meteor.userId(),
            'username': Meteor.user().username,
            'status': 1
        });
        Rides.update(rideId, {
            $set: {
                members: ride.members
            }
        });
    }
})
