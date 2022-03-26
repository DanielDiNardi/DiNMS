function addStockOrderToDisplay(){
    getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                localStorage.getItem("RestockOrder").split(",").forEach(function(id){

                    if(stock_item.id === id){
                        document.getElementsByClassName("stock_order_display")[0].innerHTML += `
                            <div>${stock_item.name}</div>
                            <div>${parseFloat(stock_item.restock_max).toFixed(2) - parseFloat(stock_item.current_stock).toFixed(2)}</div>
                        `
                    }
                });
            });
        }
    );
}

// Gets the list of products.
async function getStock(url = '') {
    const response = await fetch(url);
    return response.json();
}

addStockOrderToDisplay();