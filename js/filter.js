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

	guanineApp.filter('checkbox_filter', function(){
		return function(input) {
            if(input==true) {return 'allowed';}
            else {return 'not allowed';}
		}
	});

	guanineApp.filter('notes_filter', function(){
		return function(input) {
            var tmp = JSON.parse(input)['graded'];
            var answers = {"0": "A", "1": "B", "2": "C", "3": "D", "4": "E"};
            var notes = [];
            for (var i in tmp) {
                if (tmp[i]["q"]) {
                    notes.push("Q" + tmp[i]["q"] + " (Chose " + answers[tmp[i]["a"]] + ")");
                }
            }
            if (notes.length) {
                //return notes.sort().join(', ');
            //} else { return "None"; }
                return notes.sort();
            } else { return ["None"]; }
		}
	});
}
