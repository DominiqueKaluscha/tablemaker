var li = document.getElementsByClassName('header-li'),
	data, filtered, headers, returnData;

var bucket_path = "http://ajc-producer-tools.s3-website-us-east-1.amazonaws.com/tablemaker/";

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
    	'<li><div class="header-li selected"><%= h %></div></li>'+
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

	sortHeaders: function(id) {
		var selected = _.filter(li, function(l) { return l.classList.contains('selected') }).map(function(s){ return s.innerHTML });

		var filteredData = _.map( data, function(d) {
			picked = _.pick(d, selected);

			return picked;
			// console.log(picked);
			// return picked.reverse();
		});

		filtered = filteredData;

		var main = document.getElementById('input'+id).children[0].children[0].children['main'];

		main.innerHTML = '<table><thead></thead></table>';
		var table = main.childNodes[0];
		table.style.width  = "100%";

		table.firstChild.innerHTML += '<tr/>';

		

		selected.forEach(function(s,i){
			table.firstChild.firstChild.innerHTML += '<th><select class="sort-headers" id ="column'+i+'"></select></th>';

			selected.forEach(function(_s){
				if (_s===s){
					document.getElementById('column'+i).innerHTML += '<option value="'+_s+'" selected>'+_s+'</option>';
				} else {
					document.getElementById('column'+i).innerHTML += '<option value="'+_s+'">'+_s+'</option>';
				}
				
			});

			// table.firstChild.firstChild.innerHTML += '<th class="header-name" id="header_'+s+'"><div class="header-view"><span>'+s+'</span> <i id="edit_'+s+'" class="fa fa-pencil"></i></div><div class="header-input"><div class="row collapse postfix-radius"><div class="small-11 columns"><input type="text"/></div><div class="small-1 columns"><span class="postfix save" id="save_'+s+'"><i class="fa fa-floppy-o"></i></span></div></div></div></th>';

		});


	},

	chooseData: function(id) {


		var header_arr = [];
		$(".sort-headers option:selected" ).each(function(){
			header_arr.push($(this).attr("value"));
		});

		headers = {};

		var main = document.getElementById('input'+id).children[0].children[0].children['main'];

		main.innerHTML = '<table><thead></thead><tbody></tbody></table>';
		var table = main.childNodes[0];
		table.style.width  = "100%";

		table.firstChild.innerHTML += '<tr/><tr/>';


		// var headerName, editName, saveName;

		header_arr.forEach(function(s,i){
			headers[i] = { "value": s, "label": "" };
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
	    filtered.forEach(function(fd){
	    	table.lastChild.innerHTML += '<tr/>'
	    	_.each(header_arr, function(d){
	    		table.lastChild.lastChild.innerHTML += '<td>'+fd[d]+'</td>'
	    	});
	    });
	    // filtered = filteredData;

	},

	previewTable: function(id){

		$('#nav-row').hide();
		$('#embed-row').show();

		var table = $('#input'+id+' #data-table'),
		    thead = $('<thead></thead>'),
		    tbody = $('<tbody></tbody>');

		var label, value;
		$('th.header-name').each(function(index){
			label = $(this).children('.header-view').children('span').text();
			value = $(this).attr('id').split('header_')[1];
			headers[index]['label'] = label;
		});


		var title = $('#table-title').val()
			chatter = $('#table-chatter').val(),
			slug = title.replace(/(\W+)/g,'-'),
			timestamp = new Date().getTime();


		var inputtedData = {
			"title": title,
			"timestamp": timestamp,
			"slug": slug+timestamp,
			"chatter": chatter,
			"headers": _.values(headers),
			"data": filtered
		};


		var table_data = _.values(inputtedData.data);

		$('#input'+id+' h1').empty().append(inputtedData.title);
		$('#input'+id+' p').empty().append(inputtedData.chatter);


		var th = '<tr>';
		// for (var k in inputtedData.headers) console.log(k);
		var head = inputtedData.headers;

		head.forEach(function(k,i){
			console.log(k);
	  		th += '<th>' + k.label + '</th>';
		});
	  	th += '</tr>';
	  	thead.append(th);
	  	table.append(thead);

	  	var TableRow;
		$.each(table_data, function (index, value) {
		    TableRow = "<tr>";
		    $.each(headers, function (index, h) {
		        TableRow += "<td>" + value[h.value] + "</td>";
		    });
		    TableRow += "</tr>";
		    tbody.append(TableRow);
		});


		table.append(tbody); 
  		table.DataTable({ responsive: true});



		returnData = inputtedData;

		console.log(JSON.stringify(inputtedData));

	}

}


var currentID = 0,
	func = _.keys(TableFunctions),
	nextBtn = document.getElementById('next'),
	backBtn = document.getElementById('back'),
	embedBtn = document.getElementById('embed'),
	backEmbedBtn = document.getElementById('back-embed');
  
nextBtn.addEventListener('click', function(){
	TableFunctions[func[currentID]](currentID+1);
	document.getElementById('input'+currentID).style.display='none';
	currentID++;
	document.getElementById('input'+currentID).style.display='block';
});

embedBtn.addEventListener('click', function(){

	$.post('/', {data: returnData}, function (data) {
        console.log(data);
    });

    $('#embed-overlay').show();

	$('#codebox').empty().append('<pre>&lt;iframe width="100%" height="1100px" src="'+bucket_path+'index.html?'+returnData.slug+'"&gt;&lt;/iframe&gt;</pre>');
	$('pre#direct-url').empty().append(bucket_path+'index.html?'+returnData.slug);
});

