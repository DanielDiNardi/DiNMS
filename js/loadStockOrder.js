function addStockOrderToDisplay(){
    
    var rows = [];

    getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                // Retrieves localStorage item and cycles through split list.
                localStorage.getItem("RestockOrder").split(",").forEach(function(id){

                    // Checks if current item ID is the same as the stock item from
                    // the GET request.
                    if(stock_item.id === id){

                        // Adds the stock item name, rounded difference between the
                        // current stock quantity and maximum stock quantity, and
                        // unit of measurement to the rows array.
                        rows.push([
                            stock_item.name, 
                            Math.round(parseFloat(parseFloat(stock_item.restock_max).toFixed(2) - parseFloat(stock_item.current_stock).toFixed(2)).toFixed(2)),
                            stock_item.unit
                        ]);
                        
                        // Adds same information to restock order display.
                        document.getElementsByClassName("stock_order_display")[0].innerHTML += `
                            <div class="stock_order_item">
                            ${stock_item.name} 
                            ${Math.round(parseFloat(parseFloat(stock_item.restock_max).toFixed(2) - parseFloat(stock_item.current_stock).toFixed(2)))}
                            ${stock_item.unit}
                            </div>
                        `;
                    }
                });
            });

            // Pushes rows array to localStorage.
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