describe('Desafio 4', () => {

    const baseAPIUrl = 'https://pushing-it.onrender.com/api';
    let data;

    before(() => {

        cy.fixture('desafio4').then(datos => {
            data = datos;
        });

    })
    it('Registrarse en PushingIT atraves del API y validar', () => {

        cy.createUser(data.user)

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

    it('Login en PushingIT con el usuario creado y validar', () => {

        cy.loginUser(data.user)

    })

    it('Eliminar el usuario creado anteriormente y validar', () =>{

        Cypress.env().token = window.localStorage.getItem('token');
        cy.deleteUser(data.user)
    })
})