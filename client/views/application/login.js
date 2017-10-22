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
        messages: {
            email: {
                required: "Не оставляйте это поле пустым.",
                email: "Проверьте корректность e-mail."
            },
            password: {
                required: "Не оставляйте это поле пустым."
            }
        },
        submitHandler: function(form) {
            var email = $('#login-email').val(),
                password = $('#login-password').val();
            Meteor.loginWithPassword(email, password, function(error) {
                if (error){
                    instance.loginError.set(true);
                    var errorText;
                    if (error.reason == 'Match failed')
                        errorText = 'Проверьте правильность введенных даных';
                    else 
                        if (error.reason == 'User not found')
                            errorText = 'Пользователя с таким именем не существует';
                        else 
                            if (error.reason == 'Incorrect password')
                                errorText = 'Неверный пароль';
                    Materialize.toast(errorText, 5000, 'red darken-1');
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