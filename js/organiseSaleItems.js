// Searches the sale order and increases the amount by 1 if an item
// repeats.
function organiseSaleItems(order = []){

    var orderWithAmount = [];

    // Cycles through each item and checks if item is in the array or not.
    order.forEach(function(item){

        item.amount = 1;

        // Goes through each item id and checks if it matches with the 
        // order's item id.
        if(orderWithAmount.map(item => item.id).indexOf(item.id)){
            // Push the item to the order with amount array.
            orderWithAmount.push(item);
        }
        else{
            // Otherwise finds the index of the item and increases its
            // amount by 1.
            orderWithAmount[orderWithAmount.map(item => item.id).indexOf(item.id)].amount++;
        }
    });
    return orderWithAmount;
}