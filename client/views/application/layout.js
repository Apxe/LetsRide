Template.layout.events({
    'click #logout-btn': function(e, t){
        Meteor.logout();
    }
});