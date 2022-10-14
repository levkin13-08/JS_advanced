const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor (url, container, list = list2) {
        this.container = container;
        this.url = url;
        this.list = list;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this.init();
    }

    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData (data) {
        this.goods = [...data];
        console.log(this.goods);
        this.render();
    }

    filter (value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('hidden');
            } else {
                block.classList.remove('hidden');
            }
        })
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new this.list[this.constructor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    init () {
        return false;
    }

}

class Item {
    constructor(el, img = 'https://placehold.it/200x150'){
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }

    render(){
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

class ProductList extends List {
    constructor (cart, url = "/catalogData.json" , container = '.products' ) {
        super (url, container);
        this.cart = cart;
        this.getJson().then(data => this.handleData(data));    
    }

    init () {
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}

class ProductItem extends Item {}

class Cart extends List {
    constructor (container = '.basket' , url = "/getBasket.json") {
        super (url, container);
        this.getJson().then(data => this.handleData(data.contents));
    }

    init () {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

    addProduct (element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let idProduct = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === idProduct);
                    if(find) {
                        find.quantity++;
                        this.overwrite(find);
                    } else {
                        let product = {
                            id_product: idProduct,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    console.log('error');
                }
            });
    }

    removeProduct (element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let idProduct = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === idProduct);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this.overwrite(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id = "${idProduct}"]`).remove();
                    }
                }
            });
        }
    
    overwrite (product) {
        const block = document.querySelector(`.cart-item[data-id = "${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity*product.price}$`;
    }
}

class CartItem extends Item {
    constructor (el, img = 'https://placehold.it/50x100') {
        super (el, img);
        this.quantity = el.quantity;
    }

    render () {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity*this.price}</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

const list2 = {
    ProductList: ProductItem,
    Cart: CartItem
};

const cart = new Cart ();
const products = new ProductList (cart); 

