Template.editProfile.onRendered(function() {
    console.log(Meteor.user());
    this.$('select').material_select();
})