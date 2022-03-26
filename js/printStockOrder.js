function printStockOrder(){
    localStorage.setItem("RestockOrder", "");
    document.getElementsByClassName("stock_order_display")[0].innerHTML = "";
}