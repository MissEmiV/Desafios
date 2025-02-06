export class AddProductPage {
    addProductName() {
        return cy.get('#productName');
    }

    addProductPrice() {
       return cy.get('#productPrice');
    }

    addProductImage() {
      return cy.get('#productCard');
    }

    addProductID() {
        return cy.get('#productID');
    }

    createProductButton() {
        return cy.get('#createProduct');
    }

    messageAlert() {
        return cy.get('[data-cy=closeModal');
    }
}