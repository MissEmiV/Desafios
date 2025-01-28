export class ReceiptPage {
    
    constructor() {
        this.purchaseName = '[data-cy="name"]';
        this.product = '[class^="chakra-text css-0"]';
    }

    verificarname() {
        return cy.get(this.purchaseName)
    }

    verificarlastname() {
        return cy.get(this.purchaseName)

    }

    verificarCCnumber() {
        return cy.get('[data-cy="creditCard"]')
    }

    verificarProductquantity() {
        return cy.get(this.product);
    }

    verificarProductName() {
        return cy.get(this.product);
    }

    verificarcostoTotal() {
        return cy.get('[data-cy="totalPrice"]')
    }

}