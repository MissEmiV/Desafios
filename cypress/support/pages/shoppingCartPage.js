export class ShoppingCartPage {

    constructor() {
        this.productname = "#productName";
        this.productquantity = "#productAmount";
        this.productprice = "#unitPrice";
        this.totalproductprice = "#totalPrice";
        this.totalcart = "#price"
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

    verifyProductsPrice(product) {
        return cy.contains(product).siblings(this.productprice);
    }

    verifyTotalProductPrice(product) {
        return cy.contains(product).siblings(this.totalproductprice);
    }

    verifyTotalPrice() {
        return cy.get(this.totalcart);
    }

    goToBillingSummary() {
        return cy.contains('Go to Billing Summary');
    }

    goToCheckout() {
        return cy.get('#goCheckout');
    }


}
