Template.addRide.onRendered(function() {
    GoogleMaps.load({key: 'AIzaSyAkcPyUg8x2cvQGu5So3pb2EMsQaXuDWdc'});
    this.$('.modal').modal({
        ready: function(modal, trigger) {
            google.maps.event.trigger(GoogleMaps.maps.rideCoordinates.instance, 'resize')
        },
    });
    this.$('select').material_select();
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
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    }
});
Template.addRide.events({
    'submit #ride_form': function(event, template) {
        event.preventDefault();
        if ($(event.target).find("#ride_img")[0].files && $(event.target).find("#ride_img")[0].files[0]) {
            const upload = Images.insert({
                file: $(event.target).find("#ride_img")[0].files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            upload.on('start', function () {
                template.currentUpload.set(this);
            });
            upload.on('end', function (error, imageFile) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    console.log('File "' + imageFile._id + '" successfully uploaded');
                    var ride = {
                        title: $(event.target).find("[name='title']").val(),
                        image: imageFile._id,
                        route: $(event.target).find("[name='route']").val(),
                        description: $(event.target).find("[name='description']").val(),
                        start: $(event.target).find("[name='start']").val(),
                        requirements: $(event.target).find("[name='requirements']").val(),
                        coordinates: $(event.target).find("[name='coordinates']").val()    
                    } 
                    ride._id = Rides.insert(ride);
                    $('#addRideModal').modal('close');
                    Router.go('ridePage', ride);
                }
                template.currentUpload.set(false);
            });
            upload.start();
        }
    }
})