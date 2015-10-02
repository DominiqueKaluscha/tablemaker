var table = $('#data-table'),
    thead = $('<thead></thead>'),
    tbody = $('<tbody></tbody>'),
    headline = $('.container h1'),
    chatter = $('.container p'),
    headers, table_data, d = new Date();

var month = d.getMonth(), year = d.getFullYear();

var QueryString = function () {
  var queryString = window.location.search.substring(1);

  // var docName = 'data/'+queryString+'.json'
  return 'data/'+year+'/'+month+'/'+queryString+'.json';

}();

$.getJSON(QueryString, function( data ) {

  headline.empty().append(data.title);
  chatter.empty().append(data.chatter);
  
  head = data.headers;
  table_data = _.values(data.data);
  var th = '<tr>';

  head.forEach(function(k,i){
      th += '<th>' + k.label + '</th>';
  });
  th += '</tr>';
  thead.append(th);
  table.append(thead);

  var TableRow;
  $.each(table_data, function (index, value) {
      TableRow = "<tr>";
      $.each(head, function (index, h) {
          TableRow += "<td>" + value[h.value] + "</td>";
      });
      TableRow += "</tr>";
      tbody.append(TableRow);
  });


  table.append(tbody); 
  table.DataTable({ responsive: true});

});
