$(document).ready(function() {
  clearTable();

  var tid = setInterval(mycode, 1000);
  function mycode() {
    $.getJSON("/exchange?status=open", function(data, status) {
      fillData(data);
    });
  }
});

function fillData(data) {
  clearTable();

  var table = $("#exchange").find("tbody");
  var response = data;
  $.each(data, function(index, exchange) {
    var cssClass = "";
    if (index % 2 == 0) {
      cssClass = "success";
    } else {
      cssClass = "danger";
    }
    var row = $("<tr id='exchange_row_'" + index + "></tr>");
    row.addClass(cssClass);
    row.click(function() {
      var url = "/exchange/" + exchange.stockId + "/" + exchange.productId;
      $(location).attr('href', url);
    });

    row.append($("<td></td>").text(exchange.datetime));
    row.append($("<td></td>").text(exchange.product));
    row.append($("<td></td>").text(exchange.buyPrice));
    row.append($("<td></td>").text(exchange.quantity));
    row.append($("<td></td>").text(
        exchange.quantity * exchange.buyPrice * 0.0025));
    row.append($("<td></td>").text(exchange.target1));
    row.append($("<td></td>").text(exchange.target2));
    row.append($("<td></td>").text(exchange.target3));
    row.append($("<td></td>").text(exchange.target4));
    row.append($("<td></td>").text(exchange.currentPrice));

    var currentPercentage = exchange.currentPrice / exchange.buyPrice;
    row.append($("<td></td>").text(isNaN(currentPercentage) ? '0%' : currentPercentage + '%'));

    table.append(row);
  });
}

function clearTable() {
  $("#exchange").find("tbody tr").remove();
}
