describe('Desafio 4', () => {

    const baseAPIUrl = 'https://pushing-it.onrender.com/api';

    it('Deberia registrarse en PushingIT de forma satisfactoria, logearse, borrar y Validar', () => {
        const username = 'usuario' + Math.floor(Math.random() * 1000)
        const password = '123456!'
        const gender = "Female"
        const day = '23'
        const month = 'September'
        const year = "1988"

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


