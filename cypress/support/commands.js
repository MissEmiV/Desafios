// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().base_url_api}/login`,
        //url: `https://pushing-it-3.onrender.com/api/login`,
        //url: `${Cypress.env().base_url_api}/login`,
        body: {
            username: username,
            password: password,
        },
    }).then(response => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('user', response.body.user.username);
        window.localStorage.setItem('userId', response.body.user._id);
        Cypress.env().token = response.body.token;
    });
});

Cypress.Commands.add('getProductById', (id) => {
    return cy.request({
        method: "GET",
        url: `${Cypress.env().base_url_api}/products?id=${id}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        },
    })
})

Cypress.Commands.add('deleteProduct', (_id) => {
    cy.request({
        method: "DELETE",
        url: `${Cypress.env().base_url_api}/product/${_id}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        },
    });
})

Cypress.Commands.add('createProduct', (product) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env().base_url_api}/create-product`,
        body: product,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        },
    });
});

Cypress.Commands.add('editProduct', (_id, productNew) => {
    cy.request({
        method: "PUT",
        url: `${Cypress.env().base_url_api}/product/${_id}`,
        body: productNew,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        },
    });
})    

Cypress.Commands.add('connectSQL', (query) => {
    cy.task('connectDB', query) 
})

Cypress.Commands.add('loginSession', (username, password, sessionName) => {
    cy.session(sessionName, () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env().base_url_api}/login`,
            body: {
                username: username,
                password: password
            },
        }).then(respuesta => {
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username);
            window.localStorage.setItem('userId', respuesta.body.user._id);
            Cypress.env().token = respuesta.body.token
        });
    },
        {
            cacheAcrossSpecs: true
        })
});