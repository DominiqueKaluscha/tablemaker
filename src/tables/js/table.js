var table = $('#data-table'),
    thead = $('<thead></thead>'),
    tbody = $('<tbody></tbody>');


function buildTable(data){

  console.log(data);

  // var temp = _.template('<tr><td><%= state_rank %></td><td><%= national_rank %></td><td><%= school %></td><td><%= school_type %></td><td><%= net_roi %></td><td><%= annualized_roi %></td></tr>');
  //   _.each(data, function(d){
  //       var row = temp(d);
  //       tbody.append(row);
  //   });
  // });

  // var datainit = false;

  // if (!datainit){
  //    table.DataTable({ responsive: true});
  //    datainit = true;
  // }

  // table.append(tbody);

};


var headers, table_data;

$.getJSON('data/asdfsdf.json', function( data ) {
  
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