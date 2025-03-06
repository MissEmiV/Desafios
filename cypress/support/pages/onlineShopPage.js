export class OnlineShopPage {

    constructor() {
        this.searchproduct = "#search-bar";
        this.gotoshoppingcart = '#goShoppingCart';
        this.clearmessagealert = '[data-cy="closeModal"]'
    }

    searchProduct(product) {
        return cy.get(this.searchproduct).clear().type(product);
    }

    searchProductType() {
        return cy.get('[data-cy="search-type"]');
    }

    addToCart(products) {
        return cy.contains(products).siblings('div').children('button[aria-label="Add to cart"]');
    }

    deleteProduct(product) {
        return cy.contains(product).siblings('div').children('button[aria-label="Delete"]');
    }

    confirmDeleteProduct() {
        return cy.get('#saveEdit');
    }

    clearMessageAlert() {
        return cy.get(this.clearmessagealert);
    }

    goToShoppingCart() {
        return cy.get(this.gotoshoppingcart);

    }

    goToAddProduct() {
        return cy.get('#add-product');
    }

    verifyProductName(product) {
        return cy.contains(product);
    };

    verifyProductPrice() {
        return cy.get('#price');
    };
   
}
