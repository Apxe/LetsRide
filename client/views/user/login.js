Template.login.onCreated(function() {
    this.loginError = new ReactiveVar(false);
});
Template.login.events({
    'submit #login_form': function(e) {
        e.preventDefault();
    }
});
Template.login.onRendered(function() {
    const instance = this;
    this.$('#login_form').validate({
        errorElement: 'span',
        errorClass: 'input-field_error',
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        submitHandler: function(form) {
            var email = $(form).find('#login-email').val(),
                password = $(form).find('#login-password').val();
            Meteor.loginWithPassword(email, password, function(error) {
                if (error){
                    instance.loginError.set(true);
                    var errorText = 'Произошла ошибка';
                    if (error.reason == 'Match failed')
                        errorText = 'Проверьте правильность введенных даных';
                    else 
                        if (error.reason == 'User not found')
                            errorText = 'Пользователя с таким именем не существует';
                        else 
                            if (error.reason == 'Incorrect password')
                                errorText = 'Неверный пароль';
                    Materialize.toast('<i class="material-icons">error_outline</i>&nbsp;&nbsp;' + errorText, 5000, 'red darken-1');
                }
            });
        }
    });
});
Template.login.helpers({
    loginError: function() {
        return Template.instance().loginError.get();
    }
});