var restock_array = [];

function addToRestockOrder(){
    getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){

                // Checks if stock items' current quantity is higher than the restock minimum quantity and
                // that the stock item is not already in the restock order.
                if(stock_item.current_stock <= stock_item.restock_min && localStorage.getItem("RestockOrder").split(",").indexOf(stock_item.id) == -1){
                    restock_array.push(stock_item.id);
                    localStorage.setItem("RestockOrder", restock_array.toString());
                }
            });
        }
    );
}

// Gets the list of products.
async function getStock(url = '') {
    const response = await fetch(url);
    return response.json();
}