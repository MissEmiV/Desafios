import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
const constants = require('../support/constants')
describe(`Desafio2`, () => {
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    let sellId

    beforeEach(() => {
        cy.intercept('POST', 'api/purchase').as('sellId');
        cy.loginSession(Cypress.env().users.admin.username, Cypress.env().users.admin.password, constants.SESSIONS.ADMIN);
        cy.visit('');

    });

    it('Deberia permitir al usuario editar un producto', () => {

        cy.fixture('desafioAvanzado4').then(data => {

            cy.getProductById(data.product1.id).its('body.products.docs').each((product) => {
                cy.deleteProduct(product._id);
            });
            cy.getProductById(data.product2.id).its('body.products.docs').each((product) => {
                cy.deleteProduct(product._id);
            });
            cy.createProduct(data.product1);
            cy.createProduct(data.product2);

            homePage.clickOnlineShopButton();
            onlineShopPage.searchProductType().select("ID");
            onlineShopPage.searchProduct(`${data.product1.id}{enter}`);
            onlineShopPage.addToCart(data.product1.name).click();
            onlineShopPage.clearMessageAlert().click();
            onlineShopPage.addToCart(data.product1.name).click();
            onlineShopPage.clearMessageAlert().click();
            cy.wait(1000);
            onlineShopPage.searchProductType().select("ID");
            onlineShopPage.searchProduct(`${data.product2.id}{enter}`);
            onlineShopPage.addToCart(data.product2.name).click();
            onlineShopPage.clearMessageAlert().click();
            onlineShopPage.addToCart(data.product2.name).click();
            onlineShopPage.clearMessageAlert().click();
            onlineShopPage.goToShoppingCart().click();
            shoppingCartPage.verifyProductName(data.product1.name);
            shoppingCartPage.verifyProductQuantity(data.product1.name).should('have.text', data.quantity.product1);
            shoppingCartPage.verifyProductsPrice(data.product1.name).should('have.text', `$${(data.product1.price)}`);
            shoppingCartPage.verifyTotalProductPrice(data.product1.name).should('have.text', `$${(data.quantity.product1 * data.product1.price)}`);
            shoppingCartPage.verifyProductName(data.product2.name);
            shoppingCartPage.verifyProductQuantity(data.product2.name).should('have.text', data.quantity.product2);
            shoppingCartPage.verifyProductsPrice(data.product2.name).should('have.text', `$${(data.product2.price)}`);
            shoppingCartPage.showTotalPrice().click();
            shoppingCartPage.verifyTotalPrice().should('have.text', `${(data.quantity.product1 * data.product1.price + data.quantity.product2 * data.product2.price).toFixed(2)}`);
            shoppingCartPage.goToBillingSummary().click();
            shoppingCartPage.goToCheckout().click();
            cy.wait(1000)
            checkoutPage.escribirfirstname().type(data.payment.paymentname);
            checkoutPage.escribirlastname().type(data.payment.paymentlastname);
            checkoutPage.escribircardnumber().type(data.payment.CCnumber);
            checkoutPage.completepurchase().click();
            cy.wait('@sellId').then((intercept) => {
                data.sellId = intercept.response.body.product.sellid;
                let query = `SELECT * FROM public."purchaseProducts" LEFT JOIN public."sells" ON public."purchaseProducts".sell_id = sells.id where public."purchaseProducts".sell_id = ${data.sellId}`;
                cy.task('connectDB', query).then(response => {
                    cy.log(response);
                    expect(response).to.have.length(2);
                    expect(response[0].product).to.be.equal(data.product1.name);
                    expect(response[0]).to.be.deep.equal(
                        {
                            "id": data.sellId,
                            "product": data.product1.name,
                            "quantity": data.quantity.product1,
                            "total_price": (data.product1.price * data.quantity.product1).toString(),
                            "price": (data.product1.price).toString(),
                            "sell_id": data.sellId,
                            "firstName": data.payment.paymentname,
                            "lastName": data.payment.paymentlastname,
                            "cardNumber": data.payment.CCnumber
                        });
                    expect(response[1].product).to.be.equal(data.product2.name);
                    expect(response[1]).to.be.deep.equal(
                        {
                            "id": data.sellId,
                            "product": data.product2.name,
                            "quantity": data.quantity.product2,
                            "total_price": (data.product2.price * data.quantity.product2).toString(),
                            "price": (data.product2.price).toString(),
                            "sell_id": data.sellId,
                            "firstName": data.payment.paymentname,
                            "lastName": data.payment.paymentlastname,
                            "cardNumber": data.payment.CCnumber
                        });
                });
            });
        });
    })
})
