const order_list = document.getElementById("sales_order_list");

function addItemToSalesOrderList(event){
    let list_item = document.createElement("li");
    list_item.appendChild(
        document.createTextNode(event.textContent)
    );
    list_item.setAttribute("class", "sales_order_item");
    order_list.appendChild(list_item);
}