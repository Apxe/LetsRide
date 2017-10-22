Template.community.helpers({
    community: function(){
        return Meteor.users.find();
    }
})