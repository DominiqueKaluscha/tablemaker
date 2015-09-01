var main = document.getElementById('main');
var li = document.getElementsByClassName('header-li');


var TableFunctions = {

	inputData: function() {
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

		this.data = data;

		var tpl = _.template('<h3>Choose which columns you want to keep</h3>'+
		'<ul class="headers medium-block-grid-4">'+
			'<% _.each(header, function(h) { %> ' +
    			'<li><div class="header-li" id="<%= h %>"><%= h %></div></li>'+
			'<% }); %>' +
		'</ul>');

		main.innerHTML = tpl({'header':header});


		

		_.each(li, function(l){
			
			l.addEventListener('click',function(){
				if (!l.classList.contains('selected')){
					l.classList.add('selected');
				} else if (l.classList.contains('selected')){
					l.classList.remove('selected');
				}
			});

		});

	},

	chooseData: function() {

		var selected = _.filter(li, function(l) { return l.classList.contains('selected') }).map(function(s){ return s.id });

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
	currentID--;
	TableFunctions[func[currentID]]();
});

