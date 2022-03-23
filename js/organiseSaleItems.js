function organiseSaleItems(order = []){

    var orderWithAmount = [];

    order.forEach(function(item){

        item.amount = 1;

        if(orderWithAmount.map(item => item.id).indexOf(item.id)){
            console.log(orderWithAmount.indexOf(item));
            orderWithAmount.push(item);
        }
        else{
            console.log(orderWithAmount.map(item => item.id).indexOf(item.id));
            orderWithAmount[orderWithAmount.map(item => item.id).indexOf(item.id)].amount++;
        }

        console.log(orderWithAmount);
    });

    console.log(orderWithAmount);
    return orderWithAmount;
}