const category_bar = document.getElementById("category_bar");

getCategories("/get-category")
    .then(
        function(req, res){
            req.forEach(function(category){
                // Adds a div with a category name to the 
                // side-scrolling category navbar.
                category_bar.innerHTML += `<div class="category_button" id="${category.id}" onclick="select('${category.id}')"><p>${category.name}</p></div>`;
            });
        }
    );

async function getCategories(url = '') {
    const response = await fetch(url);
    return response.json();
}