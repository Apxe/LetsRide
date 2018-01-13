Meteor.publish('users', function() {
    return Meteor.users.find({}, {
        fields: {
            username: true, 
            profile: true
        }
    });
});
Meteor.publish('rides', function() {
    return Rides.find();
});
Meteor.publish('events', function() {
    return Events.find();
});
Meteor.publish('chat_messages', function() {
    return ChatMessages.find();
});
Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});