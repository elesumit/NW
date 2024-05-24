class environment{
    
    URL={

        prodUrl : () => cy.visit("https://www.nationwide.com/")
        
               
    }
}

module.exports = new environment();
