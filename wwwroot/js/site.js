$(() => {
    LoadProdData();
    var connection = new signalR.HubConnectionBuilder().withUrl("/signalrServer").build();

    connection.start().then(function () {
        console.log("SignalR connection established.");
    }).catch(function (error) {
        console.error("SignalR connection error: " + error);
    });

    connection.on("LoadProducts", function () {
        LoadProdData();
    });

    function LoadProdData() {
        var tr = '';
        $.ajax({
            url: '/Products/GetProducts',
            method: 'GET',
            success: function (result) {
                $.each(result, function (k, v) {
                    tr += `<tr>
                        <td> ${v.prodName}</td> 
                        <td> ${v.category}</td>
                        <td> ${v.unitPrice}</td>
                        <td> ${v.stockQty}</td>
                        <td>
                            <a href='../Products/Edit?id=${v.prodId}'>Edit </a> | 
                            <a href='../Products/Details?id=${v.prodId}'>Details</a> | 
                            <a href='../Products/Delete?id=${v.prodId}'>Delete</a>
                        </td> 
                        </tr>`;
                });
                $("#tableBody").html(tr);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});
