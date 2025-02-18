import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";

describe(`Desafio2`, () => {
    
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();

    // before('Acceder al fixture y obtener los datos', () => {
    //     cy.fixture('product-1099').then(datos => {
    //         data = datos;
    //     });
    // })

    beforeEach(() => {
        cy.login(Cypress.env().user.username, Cypress.env().user.password);
        cy.visit('');
    });

    it('Deberia permitir al usuario editar un producto', () => {
        cy.fixture('product-1099').then(data => {
            cy.getProductById(data.product.id).its('body.products.docs').each((product) => {
                cy.deleteProduct(product._id);
            });
            cy.createProduct(data.product).then(product => {
                cy.log(product)
                cy.editProduct(product.body.product._id, data.productNew);
            });
            homePage.clickOnlineShopButton();
            onlineShopPage.searchProductType().select("ID");
            onlineShopPage.searchProduct(`${data.product.id}{enter}`);
            onlineShopPage.verifyProductName(data.productNew.name);
            onlineShopPage.verifyProductPrice().should('have.text', data.productNew.price);
        });
    });
})

