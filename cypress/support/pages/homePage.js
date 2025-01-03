export class HomePage {

    constructor() {
        this.toDoListLink = '#todolistlink';
        this.onlineShopLink = '#onlineshoplink'; 
    };

    clickToDoListButton() {
        cy.get(this.toDoListLink, { timeout: 30000 }).click();
    };

    returnUser(user) {
        return cy.contains('p', user, { timeout: 30000 });
        //cy.xpath(`//h2[starts-with(@id,'user_pushingit')]`).should('exist', { timeout: 25000 });
    };

    clickOnlineShopButton() {
        cy.get(this.onlineShopLink, {timeout: 30000}).click();
    };

};