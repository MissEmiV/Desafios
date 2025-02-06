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

// const baseAPIUrl = 'https://pushing-it.onrender.com/api';

// Cypress.Commands.add('createUser', (user,password,gender,day,month,year) => {
//     cy.request({
//         method: 'POST',
//         url: `${baseAPIUrl}/register`,
//         body: {
//             username : user,
//             password : password,
//             gender : gender,
//             day : day,
//             month : month,
//             year : year,
//         }
        
//     }).then(response => {

//         cy.log(response)
//         const newPassword = response.body.newUser.password
//         expect(response.status).to.be.equal(201);
//         expect(response.body.newUser.username).to.be.equal(username)
//         expect(response.body.newUser.password).to.be.equal(newPassword)
//         expect(response.body.newUser.gender).to.be.equal(gender)
//         expect(response.body.newUser.day).to.be.equal(day)
//         expect(response.body.newUser.month).to.be.equal(month)
//         expect(response.body.newUser.year).to.be.equal(year)
//     })
// })

// Cypress.Commands.add('loginUser', (user) =>{
// cy.request({
//     method: 'POST',
//     url: `${baseAPIUrl}/login`,
//     body: user,
// })
// })


// Cypress.Commands.add('deleteUser', (user) =>{
//     cy.request({
//         method: 'DELETE',
//         url: `${baseAPIUrl}/deleteuser/{usuario}`,
//         headers: {
//             "authorization": `Bearer ${Cypress.env().token}`
//         }
//     })
// })

 