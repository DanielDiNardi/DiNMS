function pay(){
  if(order_array.length){
    postOrder('/post-order', {"order": order_array, "total": parseFloat(Total()).toFixed(2)});
    order_list.innerHTML = "";
    order_array = [];
    total_amount_element.innerHTML = "0.00";
    console.log(order_array);
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
  // return response.json();
}