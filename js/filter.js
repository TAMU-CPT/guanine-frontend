var moment = require('moment');

export default function(guanineApp) {
	guanineApp.filter('human_time_1', function(){
		return function(input) {
            return moment(input).format('MM/DD/YYYY');
		}
	});

	guanineApp.filter('human_time_2', function(){
		return function(input) {
            return moment(input).format('lll');
		}
	});
}
