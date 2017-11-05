Events = new Mongo.Collection('events');
Events.allow({
    insert(userID, doc) {
        return !! userID;
    },
    remove(userId, doc) {
        return true;
    }
})