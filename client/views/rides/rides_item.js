Template.ridesItem.events({
    'click .ride-delete_btn': function(event, template) {
        event.preventDefault();
        Rides.remove(template.data._id);
        Images.remove({_id: template.data.image});
        Router.go('ridesList');
    }
});
Template.ridesItem.helpers({
    image: function(){
        return Images.findOne({_id: Template.instance().data.image});
    }
});