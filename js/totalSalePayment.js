const total_amount_element = document.getElementById("sale_total_amount");

function UpdateTotal(){
    total_amount_element.innerHTML = parseFloat(Total()).toFixed(2);
}

function Total(){
    var total = 0;

    order_array.forEach(function(item){
        total += parseFloat(item.price);
    });

    console.log(total);

    return total;
}