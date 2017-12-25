Template.layout.onRendered(function() {
    this.$('.modal').modal();
});
Template.layout.helpers({
    isActiveMenuItem: function(route) {
        return (route == Router.current().route.getName());
    }
});
Template.layout.events({
    'click #logout-btn': function(event, template) {
        Meteor.logout();
    },
    'click .sidebar-trigger': function(event, template) {
        event.preventDefault();
        $('#side_content').addClass('open');
        $('#page_content, #page_footer').addClass('hidden');
    },
    'click .sc-hide_btn': function(event, template) {
        event.preventDefault();
        $('#side_content').removeClass('open');
        $('#page_content, #page_footer').removeClass('hidden');
    }
});