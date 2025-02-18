
describe('Desafio-2-avanzado', () => {
    let data;
    const baseAPIUrl = 'https://pushing-it-3.onrender.com/api';

    before('Acceder al fixture y obtener los datos', () => {
        cy.fixture('product-1099').then(datos => {
            data = datos;
        });
    })

    beforeEach('Login por API', () => {

        cy.request({
            method: 'POST',
            url: `${baseAPIUrl}/login`,
            body: {
                username: (Cypress.env().usuario),
                password: (Cypress.env().contraseña),
            }

        }).then((response) => {

            cy.log(response)
            // expect(response.status).to.be.equal(201);
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('username', response.body.user.username);
            window.localStorage.setItem('_id', response.body.user._id);
            Cypress.env().token = window.localStorage.getItem('token');
            //Cypress.env().token = response.body.token;

        })
    })
    //  cy.log(Cypress.env().token);
    //  cy.visit('');

    it('test', () => {

        cy.request({
            method: "GET",
            url: `${baseAPIUrl}/products?id=${data.product.productID}`,
            failsOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }

        }).then((response) => {
            cy.request({
                method: "DELETE",
                url: `${baseAPIUrl}/product/${response.body.products.docs[0]._id}`,
                failsOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`,
                },
                //cy.log(response)
            })

        });



    })
})
