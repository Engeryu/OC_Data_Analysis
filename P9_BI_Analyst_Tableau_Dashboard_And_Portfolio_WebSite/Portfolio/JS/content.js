function displayItems(article) {
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.setAttribute("value", colors)
        productColors.innerHTML = colors;
    }
    addToCart(article)
}