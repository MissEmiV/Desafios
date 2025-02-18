import { LoginPage } from "../support/pages/loginPage";
import { RegisterPage } from "../support/pages/registerPage";
import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { AddProductPage } from "../support/pages/addProductPage";

describe('Desafio-1-avanzado', () => {
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const addProductPage = new AddProductPage();
    const numeroRandom = Math.ceil(Math.random() * 10000);
    let data;

    before('Acceder al fixture y obtener los datos', () => {
        cy.fixture('product-1099').then(datos => {
            data = datos;
        });
    })

    before("Visitar el website y hacer login", () => {
        cy.visit('');
        registerPage.redirectLogin();
        loginPage.escribirUsuario().type(Cypress.env().user.username);
        loginPage.escribirContraseña().type(Cypress.env().user.password);
        loginPage.clickLogIn();
        homePage.returnUser();
        cy.wait(3000);
        homePage.clickOnlineShopButton();

    })

    it('Agregar un producto nuevo, buscarlo por iD en el search, eliminarlo, volverlo a buscar y verificar que no exista', () => {
        onlineShopPage.goToAddProduct().click();
        addProductPage.addProductName().type(`${data.product.productname}`);
        addProductPage.addProductPrice().type(`${data.product.productprice}`);
        addProductPage.addProductImage().type(`${data.product.productImageURL}`);
        addProductPage.addProductID().type(`${data.product.productID}`);
        addProductPage.createProductButton().click();
        onlineShopPage.clearMessageAlert().click();
        onlineShopPage.searchProductType().select("ID");
        onlineShopPage.searchProduct(`${data.product.productID}{enter}`);
        onlineShopPage.verifyProductName(data.product.productname);
        onlineShopPage.verifyProductPrice().should('have.text', data.product.productprice);
        onlineShopPage.deleteProduct(`${data.product.productname}`).click();
        onlineShopPage.confirmDeleteProduct().click();
        onlineShopPage.clearMessageAlert().click();
        onlineShopPage.searchProductType().select("ID");
        onlineShopPage.searchProduct(`{enter}`);
        onlineShopPage.verifyProductName(data.product.productname).should('not.exist');
    })
})