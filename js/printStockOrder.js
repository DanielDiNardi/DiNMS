function printStockOrder(){

    var csvContent = "data:text/csv;charset=utf-8,";

    reconstructStockOrder().forEach(function(rowArray) {

        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var now = new Date();


    var hiddenElement = document.createElement('a');  
    hiddenElement.href = encodedUri;  
    hiddenElement.target = '_blank';  
      
    hiddenElement.download = 'StockOrder-' + now +'.csv';  
    hiddenElement.click();  


    localStorage.setItem("Rows", "");
    localStorage.setItem("RestockOrder", "");
    document.getElementsByClassName("stock_order_display")[0].innerHTML = "";
}

function reconstructStockOrder(){
    var protoStockOrder = localStorage.getItem("Rows").split(",");
    var csv = [];
    var row = [];

    protoStockOrder.push("filler");

    protoStockOrder.forEach(function(item, i){

        if(i % 3 == 0 && i !== 0){
            csv.push(row);
            row = [];
        }
        row.push(item);
    });

    return csv;
}