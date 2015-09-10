var li = document.getElementsByClassName('header-li'),
	data, filtered, headers;



var TableFunctions = {

	inputData: function(id) {
		var	input = document.getElementById('data-input').value;	
		var csv_array = input.split("\n");
		var header = csv_array.shift();
		header = header.split("\t");

		var _data = [];

		_.each(csv_array, function(row){
			row = row.split("\t");
			var d = {};
			_.each(row, function(r,i){
				var this_header = header[i];
				d[this_header] = r;
			});
			_data.push(d);
		});

		data = _data;



		var tpl = _.template('<ul class="small-block-grid-3"><% _.each(header, function(h) { %> ' +
    	'<li><div class="header-li"><%= h %></div></li>'+
		'<% }); %></ul>');

		var main = document.getElementById('input'+id).children[0].children[0].children['main'];
		console.log(main);

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

	chooseData: function(id) {

		var selected = _.filter(li, function(l) { return l.classList.contains('selected') }).map(function(s){ return s.innerHTML });

		var filteredData = _.map( data, function(d) {  return _.pick(d, selected) } );
		var main = document.getElementById('input'+id).children[0].children[0].children['main'];
		console.log(main);

		main.innerHTML = '<table><thead></thead><tbody></tbody></table>';
		var table = main.childNodes[0];
		table.style.width  = "100%";

		console.log(table.firstChild);

		table.firstChild.innerHTML += '<tr/><tr/><tr/>';
		selected.forEach(function(s){
			table.firstChild.firstChild.innerHTML += '<th class="header-name" id="header_'+s+'"><div class="header-view"><span>'+s+'</span> <i id="edit_'+s+'" class="fa fa-pencil"></i></div><div class="header-input"><input type="text"/> <i id="save_'+s+'" class="fa fa-floppy-o"></i></div></th>';
			table.firstChild.children[1].innerHTML += '<th id="type_'+s+'"><select><option value="text">Text</option><option value="number">Number</option></select></th>';

		});

		$('th.header-name .fa-pencil').click(function(){
			$id = $(this).attr('id').replace('edit_','');
			$th = $('#header_'+$id);
			$th.addClass('edit-input');
			$th.children('.header-view').hide();

			$header_val = $th.children('.header-view').children('span').text();
			$th.children('.header-input').children('input').val($header_val);
			$th.children('.header-input').fadeIn();
		})
		$('th.header-name .fa-floppy-o').click(function(){
			$id = $(this).attr('id').replace('save_','');
			$th = $('#header_'+$id);
			$th.removeClass('edit-input');

			$input_val = $th.children('.header-input').children('input').val();
			$th.children('.header-view').children('span').empty().append($input_val);
			$th.children('.header-view').show();
			$th.children('.header-input').fadeOut();
		});

		// var v;
	    filteredData.forEach(function(fd){
	    	table.lastChild.innerHTML += '<tr/>'
	    	_.each(fd, function(d){
	    		table.lastChild.lastChild.innerHTML += '<td>'+d+'</td>'
	    	});
	    });

	    filtered = filteredData;


	},

	// callAjax: function(){
	// 	// $('button').click(function () {
	//     $.post('/', {data: filtered}, function (data) {
	//         console.log(data);
	//     });
	//     // }, 'json');
	// }

}


// $('#next').click(function(){
// 	TableFunctions.inputData();
// });

var currentID = 0,
	func = _.keys(TableFunctions),
	nextBtn = document.getElementById('next'),
	backBtn = document.getElementById('back');
  
nextBtn.addEventListener('click', function(){
	$('#input'+currentID)
		.animate({'opacity':'0.4'})
		.delay(400)
		.slideUp(400, TableFunctions[func[currentID]](currentID+1));

	console.log(func[currentID]);

	if (currentID<(func.length)){
		currentID++;
		$('#input'+currentID).fadeIn();
	}

});

backBtn.addEventListener('click', function(){
	currentID--;
	TableFunctions[func[currentID]]();
});


// $.get( '/tables', params, function(data){
// 	console.log('sent!');
// });
