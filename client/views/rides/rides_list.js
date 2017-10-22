Template.ridesList.helpers({
    rides: function() {
        return Rides.find();
    }
});