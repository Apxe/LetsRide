Rides = new Mongo.Collection('rides');
Rides.allow({
    insert(userID, doc) {
        return !! userID;
    },
    remove(userId, doc) {
        return true;
    },
    update: function(userId, user) {
	    return true; 
	    /*
	     * Don't use `return true` in production!
	     * You probably need something like this:
	     * return Meteor.users.findOne(userId).profile.isAdmin;
	     */
	}
})