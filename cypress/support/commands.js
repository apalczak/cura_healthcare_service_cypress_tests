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

Cypress.Commands.add("selectToggledMenuOption", (option) => {
    cy.get("#menu-toggle").scrollIntoView().click();
    cy.get("#sidebar-wrapper")
        .find("a")
        .each(($el, index, $list) => {
            if ($el.text() === option) {
                cy.wrap($el).click({ force: true });
            }
        });
});

Cypress.Commands.add("typeProperLoginData", (dataOrigin, dataDestination) => {
    cy.get(dataOrigin)
        .next()
        .invoke("val")
        .then((value) => {
            cy.get(dataDestination).type(value);
        });
});

Cypress.Commands.add("curaHistoryElement", (divSelector, appointmentDetail) => {
    cy.get("#history .container .row")
        .eq(1)
        .find(divSelector)
        .last()
        .find(appointmentDetail);
});

Cypress.Commands.add("datepickerHandler", (date) => {
    cy.get("#txt_visit_date").should("have.attr", "required");
    cy.get("#txt_visit_date").click();

    cy.get("#txt_visit_date").type(
        `${date.day}/${date.month + 1}/${date.year}`
    );
});
