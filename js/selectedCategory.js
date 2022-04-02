// Gets element by the ID, uses addSelectedStyle function to add
// selected style, and stores ID in localStorage.
function select(id){
    var selected_category = document.getElementById(id);
    addSelectedStyle(selected_category.id);
    localStorage.setItem('selected_category_id', selected_category.id);
}

// Applies the selected style, scrolls to the category,
// removes selected style from previous selected category,
// and makes POST request to get relevant products to the category.
function addSelectedStyle(recent_selected_category_id){
    // Gets category ID from localStorage.
    var selected_category_id = localStorage.getItem('selected_category_id');

    if(selected_category_id != recent_selected_category_id){
        // Gets item clicked.
        var actively_selected = document.getElementById(recent_selected_category_id);
        // Adds activated style.
        actively_selected.classList.add('active_category');
        // Scrolls to element.
        actively_selected.scrollIntoView();
        // Removes style from previously selected category.
        removeSelectedStyle(selected_category_id);
        // Passes category ID to the server.
        changeMenu(recent_selected_category_id);
    }
    else{
        var actively_selected = document.getElementById(recent_selected_category_id);
        actively_selected.classList.add('active_category');
        actively_selected.scrollIntoView();
        changeMenu(recent_selected_category_id);
    }
}

// Removes style.
function removeSelectedStyle(previous_selected_category_id){
    if(previous_selected_category_id){
        document.getElementById(previous_selected_category_id).classList.remove('active_category');
    }
}

// Make POST request to pass the category ID to the server,
// and appends the items relevant to the category to the menu.
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

// Makes POST request to the server.
async function requestCategory(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}