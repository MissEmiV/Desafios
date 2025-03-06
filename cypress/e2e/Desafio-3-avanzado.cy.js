import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";

describe(`Desafio2`, () => {
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    let sellId

    // before('Acceder al fixture y obtener los datos', () => {
    //     cy.fixture('datosPago').then(datos => {
    //         data = datos;
    //     });
    // })

    beforeEach(() => {
        cy.login(Cypress.env().user.username, Cypress.env().user.password);
        cy.visit('');

    });

    it('Deberia permitir al usuario editar un producto', () => {

        cy.fixture('desafioAvanzado3').then(data => {
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
            shoppingCartPage.goToBillingSummary().click();
            shoppingCartPage.goToCheckout().click();
            cy.wait(1000)
            checkoutPage.escribirfirstname().type(data.payment.paymentname);
            checkoutPage.escribirlastname().type(data.payment.paymentlastname);
            checkoutPage.escribircardnumber().type(data.payment.CCnumber);
            checkoutPage.completepurchase().click();

            cy.get('#sellId').invoke('text').then((text) => {
                sellId = text
                cy.then(() => {
                    cy.log(sellId);
                    let query = `SELECT * FROM public."purchaseProducts" LEFT JOIN public."sells" ON public."purchaseProducts".sell_id = sells.id where public."purchaseProducts".sell_id = ${sellId}`;
                    cy.task('connectDB', query).then(response => {
                        cy.log(response);
                        // expect(response).to.have.length(2);
                        // expect(response[0].product).to.be.equal(data.product1.name);
                        // expect(response[0]).to.be.deep.equal(
                        //     {
                        //         "product": "Reloj Negro",
                        //         "price": 30.86,
                        //         "quantity": 2,
                        //         "total_price": 61.72
                        //     });
                        // expect(response[1].product).to.be.equal(data.product2.name);
                        // expect(response[1]).to.be.deep.equal(
                        //     {
                        //         "product": "Reloj Rojo",
                        //         "price": 35.43,
                        //         "quantity": 2,
                        //         "total_price": 70.86
                        //     });

                    });

                });

            });

        });
    })
})
