export class ShoppingCartPage {

    constructor() {
        this.productname = "#productName";
        this.productquantity = "#productAmount";
        this.productprice = "#unitPrice";
        this.totalproductprice = "#totalPrice";
    }

    GoToProducts() {
        return cy.contains('Go to products');

    }

    showTotalPrice() {
        return cy.contains('Show total price');
    }

    verifyProductName() {
        return cy.get(this.productname);
    }

    verifyProductQuantity(products) {
        return cy.contains(products).siblings(this.productquantity);
    }

    verifyProductsPrice(products) {
        return cy.contains(products).siblings(this.productprice);
    }

    verifyTotalProductPrice(products) {
        return cy.contains(products).siblings(this.totalproductprice);
    }

    verifyTotalPrice() {
        return cy.get('#price');
    }

}
