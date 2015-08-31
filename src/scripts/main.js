$input = $('#data-input');


var TableFunctions = {

	parseData: function(input) {
		var csv_array = input.split("\n");
		var header = csv_array.shift();
		header = header.split("\t");

		var data = [];

		_.each(csv_array, function(row){
			row = row.split("\t");
			var d = {};
			_.each(row, function(r,i){
				var this_header = header[i];
				d[this_header] = r;
			});
			data.push(d);
		});

		return data

	},

	checkData: function(data) {
		
	},

}










$('#next').click(function(){
	var results = parseData($input.val());

	console.log(results);
});

$('#clear').click(function(){
	$input.val('');
});