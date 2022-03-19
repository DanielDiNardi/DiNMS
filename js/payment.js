// Executes a post request to the server with the order list and order total if the order is not empty.
function pay(){
  if(order_array.length){
    postOrder('/post-order', {"order": order_array, "total": parseFloat(Total()).toFixed(2)});

    // Resets UI, order list and total displayed.
    order_list.innerHTML = "";
    order_array = [];
    total_amount_element.innerHTML = "0.00";
  }
}

async function postOrder(url = '', data = {}) {
  // Sends order list to the server via POST request.
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}