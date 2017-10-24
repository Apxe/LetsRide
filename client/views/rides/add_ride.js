Template.addRide.onRendered(function() {
    const instance = this;
    GoogleMaps.load({key: 'AIzaSyAkcPyUg8x2cvQGu5So3pb2EMsQaXuDWdc'});
    this.$('.modal').modal({
        ready: function(modal, trigger) {
            google.maps.event.trigger(GoogleMaps.maps.rideCoordinates.instance, 'resize')
        },
    });
    this.$('select').material_select();
    this.$('#ride_form').validate({
        errorElement: 'span',
        errorClass: 'input-field_error',
        rules: {
            title: {
                required: true
            },
            route: {
                required: true
            },
            description: {
                required: true
            },
            start: {
                required: true
            },
            coordinates: {
                required: true
            }
        },
        submitHandler: function(form) {
            if ($(form).find("#ride_img")[0].files && $(form).find("#ride_img")[0].files[0]) {
                const upload = Images.insert({
                    file: $(event.target).find("#ride_img")[0].files[0],
                    streams: 'dynamic',
                    chunkSize: 'dynamic'
                }, false);
                upload.on('start', function () {
                    instance.currentUpload.set(this);
                });
                upload.on('end', function (error, imageFile) {
                    if (error) {
                        alert('Error during upload: ' + error);
                    } else {
                        console.log('File "' + imageFile._id + '" successfully uploaded');
                        var ride = {
                            title: $(form).find("[name='title']").val(),
                            image: imageFile._id,
                            route: $(form).find("[name='route']").val(),
                            description: $(form).find("[name='description']").val(),
                            start: $(form).find("[name='start']").val(),
                            requirements: $(form).find("[name='requirements']").val(),
                            coordinates: $(form).find("[name='coordinates']").val()    
                        } 
                        ride._id = Rides.insert(ride);
                        $('#addRideModal').modal('close');
                        Router.go('ridePage', ride);
                    }
                    instance.currentUpload.set(false);
                });
                upload.start();
            }
        }
    })
});
Template.addRide.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
    GoogleMaps.ready('rideCoordinates', function(map) {
        map.instance.addListener('click', function(e){
            setTimeout(function () {
                $('#ride-coordinates').val(e.latLng.lat() + ', ' + e.latLng.lng());
            }, 250);
            $('label[for="ride-coordinates"]').addClass('active');
        });
    });
});
Template.addRide.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    },
    rideCoordinatesOptions: function() {
        var user = Meteor.user(),
            latlng = user.profile.latlng.split(',');
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
                zoom: 8
            };
        }
    }
});
Template.addRide.events({
    'submit #ride_form': function(event, template) {
        event.preventDefault();
        
    }
})