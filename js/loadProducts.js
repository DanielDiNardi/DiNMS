// Gets div that stores products sold.
const menu = document.getElementById("menu");

getMenu("/get-products")
    .then(
        function(req, res){
            req.forEach(function(product){
                // Appends the products to the menu div.
                menu.innerHTML += `
                    <button class="white_button sales_products" onclick="addItemToSalesOrderList(this)">${product.name}</button>
                `;
            });
        }
    );

    // Gets the list of products.
async function getMenu(url = '') {
    const response = await fetch(url);
    return response.json();
}