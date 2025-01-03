export class OnlineShopPage {

    constructor() {
        this.searchproduct = "#search-bar";
        this.gotoshoppingcart = '#goShoppingCart';
        this.clearmessagealert = '[data-cy="closeModal"]'
    }

    searchProduct(products) {
        return cy.get(this.searchproduct);
    }

    addToCart(products) {
        //return cy.contains(products).have('Add to cart');
        //return cy.contains('p', products ).siblings("Add to cart").click();
        //return cy.contains('products').should('have.attr', 'button','aria-label: Add to cart;')
        //return cy.contains('Add  to cart').siblings('button').should('have.class', 'chakra-button css-1uvxyz6', products);
        //return cy.get('button',).contains('Add to cart');
        //return cy.contains('Add to cart').siblings(products);
        //cy.get('[class^="chakra-input password"]')
        return cy.contains(products).siblings('div').children('button[aria-label="Add to cart"]');
        //return cy.get('p').contains(products).siblings('div').children('button[aria-label="Add to cart"]');
        //return cy.get('button.class-chakra-button css-1uvxyz6[aria-label="Add to cart"]', name=[products]);
    }

    clearMessageAlert() {
        return cy.get(this.clearmessagealert);
    }

    goToShoppingCart() {
        return cy.get(this.gotoshoppingcart);

    }
}
