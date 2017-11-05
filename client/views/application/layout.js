Template.layout.events({
    'click #logout-btn': function(event, template) {
        Meteor.logout();
    },
    'click .t_menu-item_content': function(event, template) {
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