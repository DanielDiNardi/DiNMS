// When button is clicked, the delete button appears.
function deleteButton(event){
    event.classList.toggle("sales_order_item_active");
    event.children[2].classList.toggle("showBlock");
}