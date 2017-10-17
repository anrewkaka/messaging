var stompClient = null;

function connect() {
    var socket = new SockJS('/bittrex-websocket');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/market', function (account) {
            showAccount(JSON.parse(account.body).body);
        });
    });
}

function showAccount(message) {
    $("#timestamp").html(message);
}

$(function () {
    connect();
    setInterval(send, 1000);
});

function send() {
  stompClient.send("/app/timestamp", {}, "");
}

