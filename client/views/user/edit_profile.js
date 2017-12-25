Template.editProfile.onRendered(function() {
    this.$('select').material_select();
    this.$('#newPhotoModal').modal({
        ready: function(modal, trigger) {
            $('#newPhotoArea').imgAreaSelect({
                maxWidth: 150,
                maxHeight: 150,
                x1: 50,
                y1: 50,
                x2: 150,
                y2: 150
            });
        }
    })
});
Template.editProfile.onCreated(function() {
    this.userNewPhoto = new ReactiveVar(false);
})
Template.editProfile.events({
    'change #newPhoto': function(event, template) {
        if ($("#newPhoto")[0].files && $("#newPhoto")[0].files[0]) {
            const upload = Images.insert({
                file: $("#newPhoto")[0].files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            upload.on('end', function (error, imageFile) {
                if (error) {
                    alert('Произошла ошибкам при загрузке: ' + error);
                } else {
                    template.userNewPhoto.set(imageFile._id);
                    $('#newPhotoModal').modal('open');
                }
            });
            upload.start();
        }
    },
    'submit .edit_profile': function(event, template) {
        event.preventDefault();
        Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
                'profile.name': $(event.target).find('input[name="name"]').val()
            }
        }, function(error) {
            if (error){
                var errorText = 'Произошла ошибка';
                Materialize.toast('<i class="material-icons">error_outline</i>&nbsp;&nbsp;' + errorText, 5000, 'red darken-1');
            } else {
                var successText = 'Данные успешно обновлены';
                Materialize.toast('<i class="material-icons">info_outline</i>&nbsp;&nbsp;' + successText, 5000, 'light-green darken-1');
            }
        });
    }
});
Template.editProfile.helpers({
    newUserPhoto: function(){
        if (Template.instance().userNewPhoto.get())
            return Images.findOne({_id: Template.instance().userNewPhoto.get()});
        else
            return false;
    }
})