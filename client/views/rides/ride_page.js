Template.ridePage.helpers({
    image: function() {
        return Images.findOne({_id: Template.instance().data.image});
    }
});