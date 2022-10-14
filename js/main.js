const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const basketEl = document.querySelector(".basket");
document.querySelector(".btn-cart").addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
    });

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render()
            });
        this.render();
    }

    _getProducts () {
        return fetch (`${API}/catalogData.json`)
            .then (result => result.json())
            .catch (error => console.log(error));
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
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
     
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
    constructor (container = '.basket') {
        this.container = container;
        this.goods = [];
        this._getBasket()
            .then (data => {
                this.goods = data.contents;
                this.render()
            });
        }

    _getBasket () {
        return fetch (`${API}/getBasket.json`)
            .then (result => result.json())
            .catch (error => console.log (error));
      }

    addToCart () {

    }

    removeToCart () {
        
    }

    totalCartPrice () {

    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
             const item = new CartItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
        }
    }
}

class CartItem {

    constructor(product, img = 'https://via.placeholder.com/50x50'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
        this.quantity = product.quantity
    }

    render(){
           return   `<div class="basket-item" >
                        <img class="basket-img" src='${this.img}'</img>
                        <h3 class="basket-item__text">${this.title}</h3>
                        <p class="basket-item__price">${this.price}</p>
                        <p class="basket-item__price">Количество: ${this.quantity}</p>
                    </div>`
    }
}
    
let list = new ProductList();
new Cart();

