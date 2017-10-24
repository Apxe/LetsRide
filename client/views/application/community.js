Template.community.helpers({
    community: function() {
        return Meteor.users.find();
    },
    needClearfix: function(index) {
        if ((index + 1) % 4 == 0)
            return true;
        else
            return false;
    }
})