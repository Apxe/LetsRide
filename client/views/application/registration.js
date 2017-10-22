Template.registration.events({
    'submit #registration_form': function(e) {
        e.preventDefault();
    }
});
Template.registration.onRendered(function() {
//    var cities_latlng = {
//        "Хмельницкий": '49.4166667,27.0',
//        "Киев": '49.7988889,30.1152778',
//        "Винница": '49.2333333,28.4833333',
//        "Ивано-Франковск": '48.9166667,24.7166667',
//        "Львов": '49.85,24.0166667',
//        "Харьков": '49.98967,36.208309',
//        "Кривой Рог": '47.899726,33.379534',
//        "Днепр": '48.45,34.9833333',
//        "Одесса": '46.4666667,30.7333333'
//    };
    this.$('[name="birthdate"]').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 100,
        today: false,
        clear: false,
        close: false,
        max: new Date(2010, 12, 31),
        closeOnSelect: true
    });
    this.$('[name="city"]').autocomplete({
        data: {
            "Хмельницкий": null,
            "Киев": null,
            "Винница": null,
            "Ивано-Франковск": null,
            "Львов": null,
            "Харьков": null,
            "Кривой Рог": null,
            "Днепр": null,
            "Одесса": null
        },
        limit: 2,
        minLength: 1
    });
    this.$('#registration_form').validate({
        errorElement: 'span',
        errorClass: 'input-field_error',
        rules: {
            name: {
                required: true
            },
            birthdate: {
                required: true
            },
            city: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
            repassword: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            name: {
                required: "Введите свое имя."
            },
            birthdate: {
                required: "Введите год рождения."
            },
            city: {
                required: "Введите свой город."
            },
            email: {
                required: "Введите свой email.",
                email: "Введите корректный email."
            },
            password: {
                required: "Придумайте пароль."
            },
            repassword: {
                required: "Повторите свой пароль.",
                equalTo: "Паролт должны совпадать."
            }
        },
        submitHandler: function(form) {
            var email = $('#email').value,
                username = $('#username').value,
                password = $('#password').value,
                city = $('#city').value,
                birthdate = $('#birthdate').value;
            Accounts.createUser({
                username: username,
                password: password,
                email: email,
                profile: {
                    name: username,
                    city: city,
                    birthdate: birthdate
                }
            }, function(err) {
                console.log(err);
            });
        }
    })
})