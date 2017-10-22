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