Template.ridesItem.events({
    'click .ride-delete_btn': function(e, t) {
        e.preventDefault();
        Rides.remove(t.data._id);
        Images.remove({_id: t.data.image});
        Router.go('ridesList');
    }
});
Template.ridesItem.helpers({
    image: function(){
        return Images.findOne({_id: Template.instance().data.image});
    }
});
Template.ridesItem.onRendered(function() {
    console.log(Template.instance());
})