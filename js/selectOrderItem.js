// When button is clicked, the delete button appears.
function deleteButton(event){
    event.classList.toggle("sales_order_item_active");
    event.children[2].classList.toggle("showBlock");
}

function deleteItem(event){
    var product_name = event.parentNode.children[0].innerHTML;
    console.log(product_name);
    console.log(order_array);
    // Searches and removes product clicked.
    order_array.every(function(item, index, object){
        console.log(product_name == item.name);
        if(product_name == item.name){
            object.splice(index, 1);
            UpdateTotal();
        }
        return !(product_name == item.name)
    });
    console.log(order_array);
    event.parentNode.remove();
}