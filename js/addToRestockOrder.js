function addToRestockOrder(){
    getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                console.log(
                    "Curr: " + stock_item.current_stock + "\n" +
                    "Min: " + stock_item.restock_min
                );
                if(stock_item.current_stock < stock_item.restock_min){
                    console.log(stock_item);
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