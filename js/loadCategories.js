const category_bar = document.getElementById("category_bar");

getMenu("/get-category")
    .then(
        function(req, res){
            req.forEach(function(category){
                category_bar.innerHTML += `<div class="category_button" id="${category.id}" onclick="select('${category.id}')"><p>${category.name}</p></div>`;
            });
        }
    );

async function getMenu(url = '') {
    const response = await fetch(url);
    return response.json();
}