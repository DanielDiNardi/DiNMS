const stock_list = document.getElementById("stock_list");

getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                console.log(stock_item);
                // Appends the stock_items to the stock_list div.
                stock_list.innerHTML += `
                <div class="stock_item">${stock_item.name} - ${stock_item.current_stock}/${stock_item.restock_max}</div>
                `;
            });
        }
    );

// Gets the list of products.
async function getStock(url = '') {
    const response = await fetch(url);
    return response.json();
}