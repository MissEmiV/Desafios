export class LoginPage {

    constructor() {
        this.userInput = '#user';
        this.userLabel = '[for="user"]';
        this.passInput = '#pass';
        this.loginButton = '#submitForm';
    }

    redirectLogin() {
        cy.get('#registertoggle').dblclick();
    };

    escribirUsuario(usuario) {
        cy.get(this.userInput).type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get(this.passInput).type(contraseña);
    };

    clickLogIn() {
        cy.get(this.loginButton).click();
    };
};