const { getSecondColumnValue } = require('../../support/utils.js');

import landingPage from '../../pages/landingPage-obselete.js'
import environment from '../../pages/environment.js';

import allProductsPage from '../../pages/allProductsPage.js';




Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

     describe('Broken link and title validation', () => {

        
          //  TC1 - validate Vehicle Products

          it('Vehicle products broken link and title of the displayed page validation', () => {
            // Visit the initial page with the list
            environment.URL.prodUrl();
            
            if (cy.xpath('//*[text()="Accept"]').should('exist')) {
                cy.xpath('//*[text()="Accept"]').click();
          }

            landingPage.elements.vehicleProductsBtn().click();
        
            landingPage.elements.vehicleProductsLink().then(($lis) => {
                const liCount = $lis.length;
                cy.log(`Number of li elements: ${liCount}`);
        
                $lis.each((liIndex) => {
                    allProductsPage.vehicleProdPathIndex1(liIndex).click({ force: true });         
                    cy.url().then((url) => {
                        cy.title().then((title) => {
                            // Get the second column value from getSecondColumnValue
                            getSecondColumnValue(url, 'title').then((secondColumnValue) => {
                                // Assert the title with the second column value
                                cy.log(secondColumnValue);
                                cy.title().should('eq', secondColumnValue);
                            });
                        });
        
                        cy.go('back');
                    });
        
                   allProductsPage.getVehiclelink().click();
                    
        
                    if (liIndex < liCount - 1) {
                       allProductsPage.vehicleProdPathIndex2(liIndex).click();
                        
      
                    }
                });
            }).then(() => {
                // Run Axe dev scan after the test actions
                try {
                    cy.injectAxe();
                    cy.checkA11y(null, {
                        includedImpacts: ['critical', 'serious']
                    });
                } catch (error) {
                    // Log the Axe scan error but continue test execution
                    cy.log(`Axe scan error occurred: ${error}`);
                }
            });
        });
        



  //     it('Vehicle products broken link and title of the displayed page validation', () => {
  //       // Visit the initial page with the list

  //       try{
  //       environment.URL.prodUrl();

        
  //     //  cy.viewport('ipad-mini')  // open the application in ipad mini
      
  //     cy.xpath('//*[text()="Accept"]').click();
  //       landingPage.elements.vehicleProductsBtn().click();
        
            
  //       // Use XPath to select all li elements under the specified ul

  //       landingPage.elements.vehicleProductsLink().then(($lis) => {
  //         const liCount = $lis.length;
  //         cy.log(`Number of li elements: ${liCount}`);
      
  //       $lis.each((liIndex) => {
  //         const dynamicXPath = `(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 1}]`;
  //         cy.xpath(dynamicXPath).click({force: true});
              
  //        // cy.xpath('//*[text()="Accept"]').click();
        
  //           cy.url().then((url) => {
  //             cy.title().then((title) => {
  //               // Get the second column value from getSecondColumnValue
  //               getSecondColumnValue(url, 'title').then((secondColumnValue) => {
  //                 // Assert the title with the second column value
  //                 cy.log(secondColumnValue);
  //                 cy.title().should('eq', secondColumnValue);
                  
  //                 //Axe dev scan 
  //                 cy.injectAxe()
  //                // cy.checkA11y()

  //                cy.checkA11y(null, {
  //                 includedImpacts: ['critical', 'serious']
  //               })
                 

    
  //               });
  //             });
            
  //           cy.go('back');
  //         });
        
  //         cy.xpath('//button[text()="Vehicle"]').click();
      
  //         if (liIndex < liCount - 1) {
  //           const nextLiXPath = `(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 2}]`;
  //           cy.xpath(nextLiXPath).click();
  //         }
  //       });
  //     });
    
  //   }catch (error) {
  //     // Log the error but continue execution
  //     cy.log(`Error occurred: ${error}`);
  // }

  //   });

    
    //TC-2  - validate Property Products
  // it('Property products broken link and title of the displayed page validation', () => {
  //     // Visit the initial page with the list

  //     environment.URL.prodUrl();
  //     landingPage.elements.propertyProductsBtn().click();
          
  //     // Use XPath to select all li elements under the specified ul

  //     landingPage.elements.propertyProductsLinks().then(($lis) => {
  //       const liCount = $lis.length;
  //       cy.log(`Number of li elements: ${liCount}`);
    
  //     $lis.each((liIndex) => {
  //       const dynamicXPath = `((//ul[@class="bolt-text-columns-"])[2]/li/a)[${liIndex + 1}]`;
  //       cy.xpath(dynamicXPath).click({force: true});
            
   
  //         cy.url().then((url) => {
  //           cy.title().then((title) => {
  //             // Get the second column value from getSecondColumnValue
  //             getSecondColumnValue(url, 'title').then((secondColumnValue) => {
  //               // Assert the title with the second column value
  //               cy.log(secondColumnValue);
  //               cy.title().should('eq', secondColumnValue);
                
  
  //             });
  //           });

  //         cy.go('back');
  //       });

  //       cy.xpath('//button[text()="Property"]').click();
    
  //       if (liIndex < liCount - 1) {
  //         const nextLiXPath = `((//ul[@class="bolt-text-columns-"])[2]/li/a)[${liIndex + 2}]`;
  //         cy.xpath(nextLiXPath).click();
  //       }
  //     });
  //   });
  // });

  // //TC3 - validate Personal Products
  // it('Personal products broken link and title of the displayed page validation', () => {
  //   // Visit the initial page with the list

  //   environment.URL.prodUrl();
  //   landingPage.elements.personalProductsBtn().click();
        
  //   // Use XPath to select all li elements under the specified ul

  //   landingPage.elements.personalProductsLinks().then(($lis) => {
  //     const liCount = $lis.length;
  //     cy.log(`Number of li elements: ${liCount}`);
  
  //   $lis.each((liIndex) => {

      

  //     const dynamicXPath = `((//ul[@class="bolt-text-columns-2"])[1]/li/a)[${liIndex + 1}]`;
  //     cy.xpath(dynamicXPath).click({force: true});
          
 
  //       cy.url().then((url) => {
  //         cy.title().then((title) => {
  //           // Get the second column value from getSecondColumnValue
  //           getSecondColumnValue(url, 'title').then((secondColumnValue) => {
  //             // Assert the title with the second column value
  //             cy.log(secondColumnValue);
  //             cy.title().should('eq', secondColumnValue);
              

  //           });
  //         });

  //       cy.go('back');
  //     });

  //     cy.xpath('//button[text()="Personal"]').click();
  
  //     if (liIndex < liCount - 1) {

        
  //       const nextLiXPath = `((//ul[@class="bolt-text-columns-2"])[1]/li/a)[${liIndex + 2}]`;
  //       cy.xpath(nextLiXPath).click();
  //     }
  //   });
  // });
  // });

});
    
  