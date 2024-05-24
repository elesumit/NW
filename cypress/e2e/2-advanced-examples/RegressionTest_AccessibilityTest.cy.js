/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
  
  describe('Accessibility', () => {
    
   
it('Run accessibility', () => {
        cy.viewport(1280, 1000)
        cy.visit('https://uat.nationwide.com/account-login')
      
        try {
            cy.injectAxe();
            // cy.checkA11y()
            cy.checkA11y(null, {
                includedImpacts: ['critical', 'serious']
            });
        } catch (error) {
            // Log the Axe scan error but continue test execution
            cy.log(`Axe scan error occurred: ${error}`);
        }
  })

it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)
   
    
   
    cy.visit('https://uat.nationwide.com/personal/contact/')
   

    try {
        cy.injectAxe();
        // cy.checkA11y()
        cy.checkA11y(null, {
            includedImpacts: ['critical', 'serious']
        });
    } catch (error) {
        // Log the Axe scan error but continue test execution
        cy.log(`Axe scan error occurred: ${error}`);
    }

})

it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)
cy.visit('https://uat.nationwide.com/personal/insurance/auto/')

try {
    cy.injectAxe();
    // cy.checkA11y()
    cy.checkA11y(null, {
        includedImpacts: ['critical', 'serious']
    });
} catch (error) {
    // Log the Axe scan error but continue test execution
    cy.log(`Axe scan error occurred: ${error}`);
}

})

it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)  
cy.visit('uat.nationwide.com/business/insurance/quote/retrieve')
try {
    cy.injectAxe();
    // cy.checkA11y()
    cy.checkA11y(null, {
        includedImpacts: ['critical', 'serious']
    });
} catch (error) {
    // Log the Axe scan error but continue test execution
    cy.log(`Axe scan error occurred: ${error}`);
}


})


it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)
cy.visit('https://uat.nationwide.com/personal/investing/annuities/')
try {
    cy.injectAxe();
    // cy.checkA11y()
    cy.checkA11y(null, {
        includedImpacts: ['critical', 'serious']
    });
} catch (error) {
    // Log the Axe scan error but continue test execution
    cy.log(`Axe scan error occurred: ${error}`);
}


})


it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)
cy.visit('https://uat.nationwide.com/lc/resources/')
try {
    cy.injectAxe();
    // cy.checkA11y()
    cy.checkA11y(null, {
        includedImpacts: ['critical', 'serious']
    });
} catch (error) {
    // Log the Axe scan error but continue test execution
    cy.log(`Axe scan error occurred: ${error}`);
}
})

it('Run accessibility', () => {
  
    cy.viewport(1280, 1000)
cy.visit('https://uat.nationwide.com/sem/brand-a3-pey.html')
try {
    cy.injectAxe();
    // cy.checkA11y()
    cy.checkA11y(null, {
        includedImpacts: ['critical', 'serious']
    });
} catch (error) {
    // Log the Axe scan error but continue test execution
    cy.log(`Axe scan error occurred: ${error}`);
}

})
  
  })
  