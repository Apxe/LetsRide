ChatMessages = new Mongo.Collection('chat_messages');
ChatMessages.allow({
    insert(userID, doc) {
        return !! userID;
    }
})