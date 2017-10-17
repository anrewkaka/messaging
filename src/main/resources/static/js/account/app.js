var stompClient = null;

function connect() {
  var socket = new SockJS('/bittrex-websocket');
  stompClient = Stomp.over(socket);
  stompClient.debug = null;
  stompClient.connect({}, function(frame) {
    stompClient.subscribe('/topic/account_profit', function(account) {
      showAccount(JSON.parse(account.body).body);
    });
    stompClient.subscribe('/topic/sell', function(account) {
      showStatus(JSON.parse(account.body));
    });
  });
}

function showAccount(message) {
  var tbody = $("#profit").find("tbody");
  tbody.find("tr").remove();
  var profit = JSON.parse(message);
  $(profit).each(
      function(index, data) {
        var row = $("<tr></tr>");
        row.attr("id", "profit_row_" + index);
        row.attr("data-toggle", "modal");
        row.attr("data-target", "#myModal");
        row.addClass(getCssClass(data.profit_in_percentage));
        row.addClass("profit_row");
        row.append($("<td></td>").addClass("profit_name").text(data.name));
        row.append($("<td></td>").addClass("hidden-xs").text(data.amount));
        row.append($("<td></td>").addClass("hidden-xs").text(data.buy_price));
        row.append($("<td></td>").addClass("price").text(data.current_price));
        row.append($("<td></td>").text(data.profit));
        row.append($("<td></td>").addClass("profit_percentage").text(
            $.number(data.profit_in_percentage, 2) + " %"));
        tbody.append(row);
      });
}

$(function() {
  connect();
  setInterval(send, 500);

  $("#profit").find("tbody").on("click", "tr", function() {
    showModal(this);
  });

  $("#btn_sell").on("click", function() {
    sell();
  });

  $(".alert").hide();
});

function send() {
  stompClient.send("/app/account_profit", {}, "BTC");
}

function getCssClass(profitInPercentage) {
  var profit = parseFloat(profitInPercentage);
  var cssClass = "";
  if (profit < -4) {
    cssClass = "danger";
  } else if (-4 <= profit && profit <= 4) {
    cssClass = "warning";
  } else if (profit > 4) {
    cssClass = "success";
  }
  return cssClass;
}

function showModal(element) {
  var name = $(element).find(".profit_name").html();
  var profitInPercentage = $(element).find(".profit_percentage").html();
  var price = $(element).find(".price").html();
  $("#myModal").find("#model-title").html(name);
  $("#myModal").find("#model-body").find(".price").text(price);
  $("#myModal").find("#model-body").find(".profit").text(profitInPercentage);
}

function sell() {
  $("#myModal").modal("toggle");
  var name = $("#myModal").find("#model-title").html();
  var price = $("#myModal").find("#model-body").find(".price").text();
  alertSelling(name, price);
  stompClient.send("/app/sell", {}, JSON.stringify({ "name": name, "price": price }));
}

function alertSelling(name, price) {
  $(".alert").hide();
  $(".alert").removeClass("alert-error");
  $(".alert").removeClass("alert-success");
  $(".alert").addClass("alert-info");
  $(".alert").find("strong").text("Info!");
  $(".alert").find("p").text(name + " is selling at " + price);
  $(".alert").fadeIn(2000);
}

function showStatus(response) {
  $(".alert").hide();
  if(response.statusCode == "OK") {
    alertSuccess("LCT", "0.0002");
  } else {
    alertError()
  }
}

function alertSuccess(name, price) {
  $(".alert").hide();
  $(".alert").removeClass("alert-info");
  $(".alert").removeClass("alert-error");
  $(".alert").addClass("alert-success");
  $(".alert").find("strong").text("Success!");
  $(".alert").find("p").text(name + " is sold at " + price);
  $(".alert").fadeIn(2000);
  $(".alert").fadeOut(800);
}

function alertError() {
  $(".alert").hide();
  $(".alert").removeClass("alert-info");
  $(".alert").removeClass("alert-success");
  $(".alert").addClass("alert-error");
  $(".alert").find("strong").text("Error!");
  $(".alert").find("p").text(name + " cannot be sell");
  $(".alert").fadeIn(2000);
  $(".alert").fadeOut(800);
}
