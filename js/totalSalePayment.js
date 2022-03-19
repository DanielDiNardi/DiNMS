// Stores total price element.
const total_amount_element = document.getElementById("sale_total_amount");

// Sets the total price html element to the total price of the items in the order.
function UpdateTotal(){
    total_amount_element.innerHTML = parseFloat(Total()).toFixed(2);
}

// Calculates the total.
function Total(){
    var total = 0;

    order_array.forEach(function(item){
        total += parseFloat(item.price);
    });

    return total;
}