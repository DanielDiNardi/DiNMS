const inner_table = document.getElementById("inner_table");

getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                // Appends the stock_items to the stock_list div.
                inner_table.innerHTML += `
                <tr>
                    <td>${stock_item.name}</td>
                    <td>${stock_item.restock_min}</td>
                    <td>${Math.round(parseFloat(stock_item.current_stock))}</td>
                    <td>${stock_item.restock_max}</td>
                    <td>${stock_item.unit}</td>
                </tr>
                `;
            });
        }
    );

// Gets the list of products.
async function getStock(url = '') {
    const response = await fetch(url);
    return response.json();
}