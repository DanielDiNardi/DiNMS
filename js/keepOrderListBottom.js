const list_display = document.getElementById("sales_order_list");

// When a new item is added to the sales order list the scrollbar
// stays at the bottom of the list.
function Bottom(){
    list_display.scrollTop = list_display.scrollHeight;
}