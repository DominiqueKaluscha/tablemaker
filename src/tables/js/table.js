var table = $('#data-table'),
    thead = $('<thead></thead>'),
    tbody = $('<tbody></tbody>'),
    headline = $('.container h1'),
    chatter = $('.container p'),
    headers, table_data;


var QueryString = function () {
  var queryString = window.location.search.substring(1);

  // var docName = 'data/'+queryString+'.json'
  return 'data/'+queryString+'.json';
}();

$.getJSON(QueryString, function( data ) {

  headline.empty().append(data.title);
  chatter.empty().append(data.chatter);
  
  headers = data.data[0];
  table_data = _.values(data.data);
  // headers = data.headers;
  var th = '<tr>';
  for (var k in headers) th += "<th>" + k + "</th>";
  th += '</tr>';
  thead.append(th);
  table.append(thead);

  var TableRow;
  $.each(table_data, function (index, value) {
    TableRow = "<tr>";
    $.each(value, function (key, val) {
        TableRow += "<td>" + val + "</td>";
    });
    TableRow += "</tr>";
    tbody.append(TableRow);
  });

  table.append(tbody); 
  table.DataTable({ responsive: true});

});