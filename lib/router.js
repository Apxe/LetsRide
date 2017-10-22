Router.configure({
    layoutTemplate: 'layout',
    loadingTemplete: 'loading',
    waitOn: function() { 
        return [Meteor.subscribe('rides'), Meteor.subscribe('files.images.all')];
    },
    onBeforeAction: function () {
        if (!Meteor.userId()) {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else {
                if (Router.current().route.options.path == '/registration') {
                    this.render('registration');
                } else {
                    this.render('login');
                }
            }
        } else {
            this.next();
        }
    }
});

Router.map(function() {
    this.route('mainPage', {
        path: '/' 
    });
    this.route('eventsList', {
        path: '/events'
    })
    this.route('ridesList', {
        path: '/rides'
    });
    this.route('community', {
        path: 'community',
        waitOn: function() {
            return Meteor.subscribe('users'); 
        }
    });
    this.route('registration', {
        path: '/registration'
    });
    this.route('ridePage', {
        path: '/rides/view/:_id',
        data: function() {
            return Rides.findOne(this.params._id);
        },
        onBeforeAction: function () {
            if (Rides.findOne(this.params._id)) {
                this.next();
            }
        }
    });
    this.route('editRide', {
        path: '/rides/edit/:_id',
        data: function() {
            return Rides.findOne(this.params._id);
        }
    });
    this.route('editProfile', {
        path: '/profile'
    });
});

//Router.onBeforeAction(function (pause) {
//  if (!this.ready()) {
//    //this.render('loading');
//    //pause(); // otherwise the action will just render the main template.
//  }
//});