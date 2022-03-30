// When button is clicked, the delete button appears.
function deleteButton(event){
    event.classList.toggle("sales_order_item_active");
    event.children[2].classList.toggle("showBlock");
}

function deleteItem(event){
    var product_name = event.parentNode.children[0].innerHTML;
    // Searches and removes product clicked.
    order_array.every(function(item, index, object){
        if(product_name == item.name){
            object.splice(index, 1);
            UpdateTotal();
        }
        return !(product_name == item.name)
    });
    event.parentNode.remove();
}