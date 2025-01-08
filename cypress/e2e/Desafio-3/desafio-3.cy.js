import { LoginPage } from "../../support/pages/loginPage";
import { RegisterPage } from "../../support/pages/registerPage";
import { HomePage } from "../../support/pages/homePage";
import { OnlineShopPage } from "../../support/pages/onlineShopPage";
import { ShoppingCartPage } from "../../support/pages/shoppingCartPage";

describe('Desafio-3', () => {
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const shoppingCartPage = new ShoppingCartPage();
    const numeroRandom = Math.ceil(Math.random() * 10000);
    let data;

    before('Acceder al fixture y obtener los datos', () => {
        cy.fixture('desafio3').then(datos => {
            data = datos;
        });
    })

    beforeEach("Desafio #3 con Page Object Model", () => {
        cy.visit('');
        registerPage.redirectLogin();
        loginPage.escribirUsuario(Cypress.env().usuario);
        loginPage.escribirContraseña(Cypress.env().contraseña);
        loginPage.clickLogIn();
        homePage.returnUser();
        cy.wait(5000);
        homePage.clickOnlineShopButton();

    })

    it("Agregar 1 producto al carrito 2 veces y luego agregar otro producto", () => {
        cy.wait(1000)
        onlineShopPage.searchProduct().type(`${data.products.product1name}{enter}`);
        onlineShopPage.addToCart(data.products.product1name).click();
        onlineShopPage.clearMessageAlert().click();
        //onlineShopPage.addtocart().should('have.attr, "aria-label', data.products.product1name);
        //onlineShopPage.addToCart(data.products.product1name).click(); //.should('have.attr', 'aria-label= Add to cart;').click();
        onlineShopPage.searchProduct().clear();
        onlineShopPage.searchProduct().type(`${data.products.product1name}{enter}`);
        onlineShopPage.addToCart(data.products.product1name).click();
        onlineShopPage.clearMessageAlert().click();
        onlineShopPage.searchProduct().clear();
        onlineShopPage.searchProduct().type(`${data.products.product2name}{enter}`);
        onlineShopPage.addToCart(data.products.product2name).click();
        onlineShopPage.clearMessageAlert().click();
        onlineShopPage.goToShoppingCart().click();
        shoppingCartPage.showTotalPrice().click();
        shoppingCartPage.verifyProductName(data.products.product1name);
        shoppingCartPage.verifyProductQuantity(data.products.product1name).should('have.text', data.products.product1quantity);
        shoppingCartPage.verifyProductsPrice(data.products.product1name).should('have.text', `$${(data.products.product1price)}`);
        shoppingCartPage.verifyTotalProductPrice(data.products.product1name).should('have.text', `$${(data.products.product1quantity*data.products.product1price)}`);
        shoppingCartPage.verifyProductName(data.products.product2name);
        shoppingCartPage.verifyProductQuantity(data.products.product2name).should('have.text', data.products.product2quantity);
        shoppingCartPage.verifyProductsPrice(data.products.product2name).should('have.text', `$${(data.products.product2price)}`);
        shoppingCartPage.verifyTotalProductPrice(data.products.product2name).should('have.text', `$${(data.products.product2quantity*data.products.product2price)}`);
        shoppingCartPage.verifyTotalPrice().should('have.text', (data.products.product1quantity*data.products.product1price+data.products.product2quantity*data.products.product2price));

    });



})



