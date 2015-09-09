var li = document.getElementsByClassName('header-li'),
	data, filtered, headers;



var inputData = function(){
	var	input = document.getElementById('data-input').value;	
	var csv_array = input.split("\n");
	var header = csv_array.shift();
	headers = header.split("\t");
	var _data = [];

	_.each(csv_array, function(row){
		row = row.split("\t");
		var d = {};
		_.each(row, function(r,i){
			var this_header = headers[i];
			d[this_header] = r;
		});
		_data.push(d);
	});

	data = _data;

	var params = { search: _data };

	$.get( '/tables', params, function(data){
		console.log('sent!');
	});

	var main = document.getElementById('input1').children[0];
	main.innerHTML = '<table><thead></thead><tbody></tbody></table>';
	var table = main.childNodes[0];
	table.style.width  = "100%";

	table.firstChild.innerHTML = '<tr/>';


	headers.forEach(function(s){
		table.firstChild.firstChild.innerHTML += '<th>'+s+'</th>'
	});

	// var v;
    data.forEach(function(fd){
    	table.lastChild.innerHTML += '<tr/>'
    	_.each(fd, function(d){
    		table.lastChild.lastChild.innerHTML += '<td>'+d+'</td>'
    	});
    });
}
		
	
		


		// var tpl = _.template('<% _.each(header, function(h) { %> ' +
  //   	'<div class="header-li"><%= h %></div>'+
		// '<% }); %>');

		// var main = document.getElementById('input'+id).children[0];
		// console.log(main);

		// main.innerHTML = tpl({'header':header});

		// _.each(li, function(l){
			
		// 	l.addEventListener('click',function(){
		// 		if (!l.classList.contains('selected')){
		// 			l.classList.add('selected');
		// 		} else if (l.classList.contains('selected')){
		// 			l.classList.remove('selected');
		// 		}
		// 	});

		// });

	// chooseData: function(id) {

	// 	var selected = _.filter(li, function(l) { return l.classList.contains('selected') }).map(function(s){ return s.innerHTML });

	// 	var filteredData = _.map( data, function(d) {  return _.pick(d, selected) } );
	// 	var main = document.getElementById('input'+id).children[0];
	// 	console.log(main);

	// 	main.innerHTML = '<table><thead></thead><tbody></tbody></table>';
	// 	var table = main.childNodes[0];
	// 	table.style.width  = "100%";

	// 	table.firstChild.innerHTML = '<tr/>';
	// 	selected.forEach(function(s){
	// 		table.firstChild.firstChild.innerHTML += '<th>'+s+'</th>'
	// 	});

	// 	// var v;
	//     filteredData.forEach(function(fd){
	//     	table.lastChild.innerHTML += '<tr/>'
	//     	_.each(fd, function(d){
	//     		table.lastChild.lastChild.innerHTML += '<td>'+d+'</td>'
	//     	});
	//     });

	//     filtered = filteredData;


	// },

	// callAjax: function(){
	// 	// $('button').click(function () {
	//     $.post('/', {data: filtered}, function (data) {
	//         console.log(data);
	//     });
	//     // }, 'json');
	// }



var nextBtn = document.getElementById('next'),
	backBtn = document.getElementById('back');
  
nextBtn.addEventListener('click', function(){
	inputData();
	var params = data;
	$('#input0')
		.animate({'opacity':'0.4'})
		.delay(300)
		.slideUp(400, function(){
			$('#input1').fadeIn();
		});


});


