Template.ridePage.onRendered(function() {
    GoogleMaps.load();
    $('#ridePageChat').css('min-height', ($('.rp-desc').innerHeight() - $('.rp-chat .rp-sub_title').innerHeight() - 77) + 'px');
});
Template.ridePage.onCreated(function() {
    GoogleMaps.ready('rideRoute', function(map) {
        $('#rideRouteWrapp').css('height', ($('#rideImg').innerHeight() - $('#rideTitle').innerHeight() - $('#rideRoute').innerHeight() - 16) + 'px');
        google.maps.event.trigger(GoogleMaps.maps.rideRoute.instance, 'resize')
    });
    
});
Template.ridePage.helpers({
    image: function() {
        return Images.findOne({_id: Template.instance().data.image});
    },
    rideRouteOptions: function() {
        var user = Meteor.user(),
            latlng = user.profile.latlng.split(',');
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                zoom: 8
            };
        }
    }
});