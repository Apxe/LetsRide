import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Handlebars.registerHelper('ifNotEmpty', function(item, options) {
    if (item){
		if (item instanceof Array) {
			if (item.length > 0){
				return options.fn(this);
			} else{
				return options.inverse(this);
			}
		} else {
			if (item.fetch().length > 0) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		}
	} else {
		return options.inverse(this);
	}
});

jQuery.extend(jQuery.validator.messages, {
    required: 'Не оставляйте это поле пустым.',
    remote: "Please fix this field.",
    email: 'Проверьте корректность e-mail.',
    url: 'Проверьте корректность URL.',
    date: 'Проверьте корректность даты.',
    dateISO: "Please enter a valid date (ISO).",
    number: 'Проверьте корректность номера.',
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});