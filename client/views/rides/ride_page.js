Template.ridePage.onRendered(function() {
    GoogleMaps.load();
});
Template.ridePage.onCreated(function() {
    GoogleMaps.ready('rideRoute', function(map) {
        $('#rideRouteWrapp').css('height', ($('#rideImg').innerHeight() - $('#rideTitle').innerHeight() - $('#rideRoute').innerHeight() - 16) + 'px');
        google.maps.event.trigger(GoogleMaps.maps.rideRoute.instance, 'resize')
    });
    
});
Template.ridePage.events({
    'click #sendMessBtn': function(event, template) {
        ChatMessages.insert({
            room_id: template.data._id,
            user_id: Meteor.userId(),
            username: Meteor.user().username,
            time: new Date,
            message: template.$('#mess').val(),
        });
        template.$('#mess').val('');
    }
})
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
    },
    chatMessages: function() {
        return ChatMessages.find({
            'room_id': this._id
        });
    }
});