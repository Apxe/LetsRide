Rides = new Mongo.Collection('rides');
Rides.allow({
    insert(userID, doc) {
        return !! userID;
    },
    remove(userId, doc) {
        return true;
    }
})