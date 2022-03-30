function organiseSaleItems(order = []){

    var orderWithAmount = [];

    order.forEach(function(item){

        item.amount = 1;

        if(orderWithAmount.map(item => item.id).indexOf(item.id)){
            orderWithAmount.push(item);
        }
        else{
            orderWithAmount[orderWithAmount.map(item => item.id).indexOf(item.id)].amount++;
        }
    });
    return orderWithAmount;
}