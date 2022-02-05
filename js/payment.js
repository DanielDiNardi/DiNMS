function pay(){
    postOrder('/post-order', { order: order_array });
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
  return response.json();
}