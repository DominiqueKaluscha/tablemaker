var li = document.getElementsByClassName('header-li'),
	data, filtered, headers;



var TableFunctions = {

	inputData: function(id) {
		$('#nav-row').show();
		$('#embed-row').hide();
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
		$('#nav-row').hide();
		$('#embed-row').show();

		var selected = _.filter(li, function(l) { return l.classList.contains('selected') }).map(function(s){ return s.innerHTML });


		var filteredData = _.map( data, function(d) {
			picked = _.pick(d, selected);

			return picked;
			// console.log(picked);
			// return picked.reverse();
		});

		var main = document.getElementById('input'+id).children[0].children[0].children['main'];

		main.innerHTML = '<table><thead></thead><tbody></tbody></table>';
		var table = main.childNodes[0];
		table.style.width  = "100%";

		table.firstChild.innerHTML += '<tr/><tr/>';

		var keys = _.keys(_.values(filteredData)[0]);

		// var headerName, editName, saveName;

		keys.forEach(function(s){
			table.firstChild.firstChild.innerHTML += '<th class="header-name" id="header_'+s+'"><div class="header-view"><span>'+s+'</span> <i id="edit_'+s+'" class="fa fa-pencil"></i></div><div class="header-input"><div class="row collapse postfix-radius"><div class="small-11 columns"><input type="text"/></div><div class="small-1 columns"><span class="postfix save" id="save_'+s+'"><i class="fa fa-floppy-o"></i></span></div></div></div></th>';

		});

		$('th.header-name .fa-pencil').click(function(){
			$id = $(this).attr('id').replace('edit_','');
			$th = $('#header_'+$id);
			$th.addClass('edit-input');
			$th.children('.header-view').hide();

			$header_val = $th.children('.header-view').children('span').text();
			$th.children('.header-input').show();
			$th.children('.header-input').children('.postfix-radius').children('.small-11').children('input').val($header_val);
		});

		$('th.header-name .postfix.save').click(function(){
			$id = $(this).attr('id').replace('save_','');
			$th = $('#header_'+$id);
			$th.removeClass('edit-input');

			$input_val = $th.children('.header-input').children('.postfix-radius').children('.small-11').children('input').val();
			$th.children('.header-view').children('span').empty().append($input_val);
			$th.children('.header-view').show();
			$th.children('.header-input').hide();
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

	callAjax: function(id){

		var title = $('#table-title').val(),
			chatter = $('#table-chatter').val(),
			slug = title.replace(/(\W+)/g,'-');


		var returnData = {
			"title": title,
			"slug": slug,
			"chatter": chatter,
			"data": filtered
		}


	    $.post('/', {data: returnData}, function (data) {
	        console.log(data);
	    });
	}

}


// $('#next').click(function(){
// 	TableFunctions.inputData();
// });

var currentID = 0,
	func = _.keys(TableFunctions),
	nextBtn = document.getElementById('next'),
	backBtn = document.getElementById('back'),
	embedBtn = document.getElementById('embed');
  
nextBtn.addEventListener('click', function(){
	document.getElementById('input'+currentID).style.display='none';
	TableFunctions[func[currentID]](currentID+1);

	// if (currentID<(func.length)){
		currentID++;
		document.getElementById('input'+currentID).style.display='block';
	// }

});

embedBtn.addEventListener('click', function(){
	TableFunctions[func[currentID]](currentID+1);
	alert('clicked!',currentID+1);
});

backBtn.addEventListener('click', function(){
	currentID--;
	TableFunctions[func[currentID]]();
});





// $.get( '/tables', params, function(data){
// 	console.log('sent!');
// });
