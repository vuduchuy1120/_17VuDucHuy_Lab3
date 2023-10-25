$(() => {
    LoadProdData();
    var connection = new signalR.HubConnectionBuilder().withUrl("/signalrServer").build();

    connection.start().then(function () {
        console.log("SignalR connection established.");
    }).catch(function (error) {
        console.error("SignalR connection error: " + error);
    });

    connection.on("LoadProducts", function () {
        console.log("LoadProducts event received.");
        LoadProdData();
    });

    function LoadProdData() {
        var tr = '';
        $.ajax({
            url: '/Products/Index?handler=OnGetAsync',
            method: 'GET',
            success: function (result) {
                console.log("Check"+result);
                $.each(result, function (k, v) {
                    tr += '<tr>' +
                        '<td>' + v.productName + '</td>' +
                        '<td>' + v.category + '</td>' +
                        '<td>' + v.unitPrice + '</td>' +
                        '<td>' + v.stockQty + '</td>' +
                        '<td>' +
                        '<a href="/Products/Edit?id=' + v.productID + '">Edit</a> | ' +
                        '<a href="/Products/Details?id=' + v.productID + '">Details</a> | ' +
                        '<a href="/Products/Delete?id=' + v.productID + '">Delete</a>' +
                        '</td>' +
                        '</tr>';
                });
                $("#tableBody").html(tr);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});
