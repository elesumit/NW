class productsPage {
   // for vehicle products  
  vehicleProductPathIndex1(liIndex) {     
      return cy.xpath(`(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 1}]`);
    }
    vehicleProductPathIndex2(liIndex) {
      return cy.xpath(`(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 2}]`);
    }
    elementVehiclebutton() {
      return cy.xpath('//button[text()="Vehicle"]');
    }
    elementVehiclelink() {
      return cy.xpath('//ul[@class="bolt-text-columns-3"]/li');
    }


    // for property products 
    propertyProductPathIndex1(liIndex) {     
      return cy.xpath(`((//ul[@class="bolt-text-columns-"])[2]/li/a)[${liIndex + 1}]`);
      
    }

    propertyProductPathIndex2(liIndex) {
      return cy.xpath(`((//ul[@class="bolt-text-columns-"])[2]/li/a)[${liIndex + 2}]`);
    }
    
    elementpropertybutton() {
      return cy.xpath('//button[contains(text(), "Property")]');
    }

    elementpropertylink() {
      return cy.xpath('(//ul[@class="bolt-text-columns-"])[2]/li/a');
    }

    // for personal products 
    personalProductPathIndex1(liIndex) {     
      return cy.xpath(`(//ul[@class="bolt-text-columns-2"])[1]/li/a[${liIndex + 1}]`);
    }

    personalProductPathIndex2(liIndex) {
      return cy.xpath(`(//ul[@class="bolt-text-columns-2"])[1]/li/a[${liIndex + 2}]`);
    }
    
    elementpersonallink() {
      return cy.xpath('//button[text()="Personal"]');
    }

    
    elementLoginButton() {
      return cy.xpath(`//button[@id="loginButton"]`); // Login button locator remains static
    }
  
    // Additional methods for interactions with login page elements can be defined here
  }
  
 // export default allProductsPage;

 module.exports = new productsPage();

 