describe("Sign in to the CURA Healthcare page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.selectToggledMenuOption("Login");
    });

    it("Signs in with proper username and password and then signs out", () => {
        cy.typeProperLoginData("#demo_username_label", "#txt-username");
        cy.typeProperLoginData("#demo_password_label", "#txt-password");
        cy.get("#btn-login").scrollIntoView().click({ force: true });
        cy.get("#menu-toggle").scrollIntoView().click();
        cy.get("#sidebar-wrapper").find("li").should("contain", "Logout");
        cy.selectToggledMenuOption("Logout");
        cy.get("#sidebar-wrapper").find("li").should("contain", "Login");
    });

    it("Signs in with improper password", () => {
        cy.typeProperLoginData("#demo_username_label", "#txt-username");
        cy.get("#txt-password").type("ThisIsImproperPassword");
        cy.get("#btn-login").scrollIntoView().click({ force: true });
        cy.get("#login").should(
            "contain",
            "Login failed! Please ensure the username and password are valid."
        );
    });

    it("Signs in without any username", () => {
        cy.typeProperLoginData("#demo_password_label", "#txt-password");
        cy.get("#btn-login").scrollIntoView().click({ force: true });
        cy.get("#login").should(
            "contain",
            "Login failed! Please ensure the username and password are valid."
        );
    });

    it("Signs in without any password", () => {
        cy.typeProperLoginData("#demo_username_label", "#txt-username");
        cy.get("#btn-login").scrollIntoView().click({ force: true });
        cy.get("#login").should(
            "contain",
            "Login failed! Please ensure the username and password are valid."
        );
    });
});
