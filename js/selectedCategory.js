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
    }
}

function removeSelectedStyle(previous_selected_category_id){
    document.getElementById(previous_selected_category_id).classList.remove('active_category');
}