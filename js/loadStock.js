const stock_list = document.getElementById("stock_list");

getStock("/get-stock")
    .then(
        function(req, res){
            req.forEach(function(stock_item){
                console.log(stock_item);
                // Appends the stock_items to the stock_list div.
                stock_list.innerHTML += `
                <tr>
                    <td>${stock_item.name}</td>
                    <td>${parseFloat(stock_item.current_stock).toFixed(2)} / ${stock_item.restock_max}</td>
                    <td><button>Restock</button></td>
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