function addStockOrderToDisplay(){
    
    var rows = [];

    getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                localStorage.getItem("RestockOrder").split(",").forEach(function(id){

                    if(stock_item.id === id){

                        rows.push([
                            stock_item.name, 
                            parseFloat(parseFloat(stock_item.restock_max).toFixed(2) - parseFloat(stock_item.current_stock).toFixed(2)).toFixed(2),
                            stock_item.unit
                        ]);
                        
                        document.getElementsByClassName("stock_order_display")[0].innerHTML += `
                            <div class="stock_order_item">
                            ${stock_item.name} 
                            ${parseFloat(parseFloat(stock_item.restock_max).toFixed(2) - parseFloat(stock_item.current_stock).toFixed(2)).toFixed(2)} 
                            ${stock_item.unit}
                            </div>
                        `;
                    }
                });
            });

            localStorage.setItem("Rows", rows.toString());
        }
    );
}

// Gets the list of products.
async function getStock(url = '') {
    const response = await fetch(url);
    return response.json();
}

addStockOrderToDisplay();