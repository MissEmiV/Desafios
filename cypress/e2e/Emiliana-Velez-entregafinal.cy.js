import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { LoginPage } from "../support/pages/loginPage";
import { ReceiptPage } from "../support/pages/receiptPage";

describe('Desafio final', () => {
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const receiptPage = new ReceiptPage();
    const username = 'usuario' + Math.floor(Math.random() * 1000);
    const password = '123456!';
    const gender = "Female";
    const day = '23';
    const month = 'September';
    const year = "1988";

    const numeroRandom = Math.ceil(Math.random() * 10000);
    let data;
    const baseAPIUrl = 'https://pushing-it.onrender.com/api';

    before('Acceder al fixture y obtener los datos', () => {
        cy.fixture('desafiofinal').then(datos => {
            data = datos;
        });
    })

    before(() => {

        cy.request({

            method: 'POST',
            url: `${baseAPIUrl}/register`,
            body: {
                "username": username,
                "password": password,
                "gender": gender,
                "day": day,
                "month": month,
                "year": year,
            },

        }).then(response => {

            cy.log(response)
            const newPassword = response.body.newUser.password
            expect(response.status).to.be.equal(201);
            expect(response.body.newUser.username).to.be.equal(username)
            expect(response.body.newUser.password).to.be.equal(newPassword)
            expect(response.body.newUser.gender).to.be.equal(gender)
            expect(response.body.newUser.day).to.be.equal(day)
            expect(response.body.newUser.month).to.be.equal(month)
            expect(response.body.newUser.year).to.be.equal(year)

        })

        cy.request({
            method: 'POST',
            url: `${baseAPIUrl}/login`,
            body: {
                "username": username,
                "password": password,
            }

        }).then(response => {

            cy.log(response)
            expect(response.status).to.be.equal(201);
            expect(response.body.user.username).to.be.equal(username)
            //expect(response.body.user.password).to.be.equal(password)
            
        })

    })

    it("Agregar 2 productos al carrito", () => {
        cy.visit('');
        loginPage.redirectLogin();
        loginPage.escribirUsuario().type(username);
        loginPage.escribirContraseña().type(password);
        loginPage.clickLogIn();
        homePage.clickOnlineShopButton();
        cy.wait(1000)
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
        shoppingCartPage.verifyTotalProductPrice(data.products.product1name).should('have.text', `$${(data.products.product1quantity * data.products.product1price)}`);
        shoppingCartPage.verifyProductName(data.products.product2name);
        shoppingCartPage.verifyProductQuantity(data.products.product2name).should('have.text', data.products.product2quantity);
        shoppingCartPage.verifyProductsPrice(data.products.product2name).should('have.text', `$${(data.products.product2price)}`);
        shoppingCartPage.verifyTotalProductPrice(data.products.product2name).should('have.text', `$${(data.products.product2quantity * data.products.product2price)}`);
        shoppingCartPage.verifyTotalPrice().should('have.text', (data.products.product1quantity * data.products.product1price + data.products.product2quantity * data.products.product2price));
        shoppingCartPage.goToBillingSummary().click();
        shoppingCartPage.goToCheckout().click();
        cy.wait(1000)
        checkoutPage.escribirfirstname().type(data.payment.paymentname);
        checkoutPage.escribirlastname().type(data.payment.paymentlastname);
        checkoutPage.escribircardnumber().type(data.payment.CCnumber)
        checkoutPage.completepurchase().click();
        receiptPage.verificarname().should('include.text', data.payment.paymentname);
        receiptPage.verificarlastname().should('include.text', data.payment.paymentlastname);
        receiptPage.verificarCCnumber().should('have.text', data.payment.CCnumber);
        receiptPage.verificarProductName().should('include.text', data.products.product1name);
        receiptPage.verificarProductquantity().should('include.text', data.products.product1quantity);
        receiptPage.verificarProductName().should('include.text', data.products.product2name);
        receiptPage.verificarProductquantity().should('include.text', data.products.product2quantity);
        receiptPage.verificarcostoTotal().should('include.text', (data.products.product1quantity * data.products.product1price + data.products.product2quantity * data.products.product2price))
    })

    after(() => {

        cy.request({
            method: 'DELETE',
            url: `${baseAPIUrl}/deleteuser/${username}`,
            headers: {
                "authorization": `Bearer ${Cypress.env().token}`
            },

        }).then(response => {

            cy.log(response)
            expect(response.status).to.be.equal(202)

        });

        cy.request({
            method: 'GET',
            url: `${baseAPIUrl}/${username}`,
            failOnStatusCode: false,
            headers: {
                "authorization": `Bearer ${Cypress.env().token}`
            },
        }).then(response => {
            cy.log(response)
            expect(response.status).to.be.equal(404);

        })

    })
})




