
var TableFunctions = {

	parseData: function() {
		var input = document.getElementById('data-input').value;
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

		console.log(data);

	},

	checkData: function(data) {
		
	},

}






var currentID = 0,
	func = _.keys(TableFunctions),
	nextBtn = document.getElementById('next'),
	backBtn = document.getElementById('back');
  
nextBtn.addEventListener('click', function(){
  
	TableFunctions[func[currentID]]();

	currentID++;

});
backBtn.addEventListener('click', function(){
  

  TableFunctions[func[currentID]]();

  currentID--;
});

