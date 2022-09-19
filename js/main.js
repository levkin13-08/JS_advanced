const products = [
    {id: 1, title: 'Notebook', price: 2000 , image: "img/notebook.jpg"},
    {id: 2, title: 'Mouse', price: 20, image: "img/mouse.jpg"},
    {id: 3, title: 'Keyboard', price: 200, image: "img/keyboard.jpg"},
    {id: 4, title: 'Gamepad', price: 50, image: "img/gamepad.jpg"},
];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title, image, price) => {
    return `<div class="product-item">
                <h3 class="product-item__text">${title}</h3>
                <img class="product-img" src='${image}'</img>
                <p class="product-item__price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.image, item.price)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);
