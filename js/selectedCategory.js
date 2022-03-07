function select(id){
    var selected_category = document.getElementById(id);
    addSelectedStyle(selected_category.id);
    localStorage.setItem('selected_category_id', selected_category.id);
}

function addSelectedStyle(recent_selected_category_id){
    var selected_category_id = localStorage.getItem('selected_category_id');

    if(selected_category_id != recent_selected_category_id){
        var actively_selected = document.getElementById(recent_selected_category_id);
        actively_selected.classList.add('active_category');
        actively_selected.scrollIntoView();
        removeSelectedStyle(selected_category_id);
        changeMenu(recent_selected_category_id);
    }
    else{
        var actively_selected = document.getElementById(recent_selected_category_id);
        actively_selected.classList.add('active_category');
        actively_selected.scrollIntoView();
        changeMenu(recent_selected_category_id);
    }
}

function removeSelectedStyle(previous_selected_category_id){
    document.getElementById(previous_selected_category_id).classList.remove('active_category');
}

function changeMenu(id){
    menu.innerHTML = "";
    requestCategory('/post-category', {"category_id": id});
    
    getMenu('/get-category-items')
    .then(
        function(req, res){
            if(req){
                req.forEach(function(product){
                    // Appends the products to the menu div.
                    menu.innerHTML += `
                        <button class="ui_colour sales_products" onclick="addItemToSalesOrderList(this); UpdateTotal(); Bottom()" id="${product.id}" value="${product.price}">${product.name}</button>
                    `;
                });
            }
            else{
                console.log("Error");
            }
        }
    )
    .catch(function(err){
        console.log(err);
    });
}

async function requestCategory(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }