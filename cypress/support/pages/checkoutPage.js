export class CheckoutPage {
   

    escribirfirstname() {
        return cy.get('#FirstName');
    }

    escribirlastname() {
        return cy.get('#lastName')
    }

    escribircardnumber() {
        return cy.get('#cardNumber')
    }

    completepurchase() {
        return cy.get('[data-cy="purchase"]')
    }

    
}