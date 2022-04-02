// Takes the restock order array from the localStorage
// converts it to a CSV format and downloads it.
function printStockOrder(){

    // Set content header of the CSV string.
    var csvContent = "data:text/csv;charset=utf-8,";

    reconstructStockOrder().forEach(function(rowArray) {
        // Each item in the row is separated by a comma, and added to 
        // the csvContent.
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    // Creates a link to download the CSV and the current DateTime.
    var encodedUri = encodeURI(csvContent);
    var now = new Date();

    // Creates a link element with the URL created and opens a new tab
    // in the browser.
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = encodedUri;  
    hiddenElement.target = '_blank';  
      
    // The filename is created and the file downloaded in the browser.
    hiddenElement.download = 'StockOrder-' + now +'.csv';  
    hiddenElement.click();  

    // localStorage is reset and so is the stock order display.
    localStorage.setItem("Rows", "");
    localStorage.setItem("RestockOrder", "");
    document.getElementsByClassName("stock_order_display")[0].innerHTML = "";
}

// Splits the rows item in localStorage, adds a filler item at the end of
// the array and uses modulus 3 to make a 2D array.
function reconstructStockOrder(){
    // Makes an array out of the rows string.
    var protoStockOrder = localStorage.getItem("Rows").split(",");
    var csv = [];
    var row = [];

    // Adds a filler item so that all items are inserted into the 2D array.
    protoStockOrder.push("filler");

    // Cycles through every item and pushes the item into the rows array.
    protoStockOrder.forEach(function(item, i){
        // Every 3rd item, the now populated rows array is pushed to the 
        // CSV array and the rows array is cleared.
        if(i % 3 == 0 && i !== 0){
            csv.push(row);
            row = [];
        }
        row.push(item);
    });

    return csv;
}