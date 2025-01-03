export class RegisterPage {

    redirectLogin() {
        cy.get('#registertoggle').dblclick();
    };

    escribirUsuario(usuario) {
        cy.get('#user').type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get('#pass').type(contraseña);
    };

    seleccionarGender(gender) {
        cy.get('[value="Female"]').check({ force: true });
    } 
  
    seleccionarDiaNacimiento(dianacimiento) {
       return cy.get('[data-cy="day"]').select(23);
    }

    seleccionarMesNacimiento(mesnacimiento) {
        cy.get('[data-cy="month"]').select("September");
    }

    seleccionarAnoNacimiento(anonacimiento) {
        cy.get('[data-cy="year"]').select("1988");
    }

    clickSubmitFormButton() {
        cy.get('[data-cy="submitForm"]').click();
    }
    
 
    
    //cy.wait (1500)
   // cy.get('[data-cy="todolistlink"]').click();
    //cy.get('[data-cy="task"]').type('Alimentar el gato');
   // cy.get('[data-cy="sendTask"]').click();
    //cy.get("p").contains('Alimentar el gato').click();

};