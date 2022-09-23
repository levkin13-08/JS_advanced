class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
        this.getSum();

        
    }
    _fetchProducts(){
        this.goods = [
                {id: 1, title: 'Notebook', price: 2000 , image: "img/notebook.jpg"},
                {id: 2, title: 'Mouse', price: 20, image: "img/mouse.jpg"},
                {id: 3, title: 'Keyboard', price: 200, image: "img/keyboard.jpg"},
                {id: 4, title: 'Gamepad', price: 50, image: "img/gamepad.jpg"},
            ];
    }
    
   getSum () {
    let sum = 0 ;
    for (let item of this.goods) {
        sum += item.price;
        }
        console.log(sum);
   }
    


    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
             const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//              block.innerHTML += item.render();
        }
    }
    
}

class ProductItem{
    constructor(product){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.image;
    }
    render(){
           return   `<div class="product-item">
                        <h3 class="product-item__text">${this.title}</h3>
                        <img class="product-img" src='${this.img}'</img>
                        <p class="product-item__price">${this.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div>`
    }
}

class Cart {
    constructor (product) {
        this.title = product.title;
        this.price = product.price;
        this.img = product.image;
    }

    addToCart () {

    }

    removeToCart () {
        
    }

    totalCartPrice () {

    }

    renderCart () {
        
    }
}

let list = new ProductList();







// const products = [
//     {id: 1, title: 'Notebook', price: 2000 , image: "img/notebook.jpg"},
//     {id: 2, title: 'Mouse', price: 20, image: "img/mouse.jpg"},
//     {id: 3, title: 'Keyboard', price: 200, image: "img/keyboard.jpg"},
//     {id: 4, title: 'Gamepad', price: 50, image: "img/gamepad.jpg"},
// ];

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
// const renderProduct = (title, image, price) => {
//     return `<div class="product-item">
//                 <h3 class="product-item__text">${title}</h3>
//                 <img class="product-img" src='${image}'</img>
//                 <p class="product-item__price">${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title, item.image, item.price)).join('');
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);
