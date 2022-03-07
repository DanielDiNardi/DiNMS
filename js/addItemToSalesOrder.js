// Gets order display.
const order_list = document.getElementById("sales_order_list");
var order_array = [];

function addItemToSalesOrderList(event){
    // Creates list item.
    let list_item = document.createElement("div");
    console.log(event.value);
    // Adds product name to list item.
    list_item.innerHTML += `<div>${event.textContent}</div>`
    list_item.innerHTML += `<div class="price">${parseFloat(event.value).toFixed(2)}</div>`
    list_item.setAttribute("class", "sales_order_item");
    // Adds product to display.
    order_list.appendChild(list_item);
    // Adds product to order array used in the payment js file.
    order_array.push({
        "id": event.id,
        "name": event.textContent,
        "price": parseFloat(event.value).toFixed(2)
    });
}