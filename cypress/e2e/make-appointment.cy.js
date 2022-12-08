describe("Make an appointment at CURA Healthcare page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.selectToggledMenuOption("Login");
        cy.typeProperLoginData("#demo_username_label", "#txt-username");
        cy.typeProperLoginData("#demo_password_label", "#txt-password");
        cy.get("#btn-login").scrollIntoView().click({ force: true });
    });

    it("Make appointment with the proper data", () => {
        cy.fixture("appointment-data").then((data) => {
            const propperAppointments = data.propperAppointments;
            propperAppointments.forEach((appointment) => {
                cy.get("#btn-make-appointment").click();
                cy.get("#appointment h2").should(
                    "have.text",
                    "Make Appointment"
                );
                cy.get("#combo_facility").select(appointment.facility);
                cy.get(
                    `#radio_program_${appointment.healthcareProgram.toLowerCase()}`
                ).check();
                if (appointment.hospitalReadmission) {
                    cy.get("#chk_hospotal_readmission").check();
                }

                //TODO: change the datepicker handling
                cy.get("#txt_visit_date").clear().type("15/12/2022");

                cy.get("#txt_comment")
                    .click({ force: true })
                    .type(appointment.comment);
                cy.get("#btn-book-appointment").click();
                cy.get("#summary h2").should(
                    "have.text",
                    "Appointment Confirmation"
                );
                cy.get("#facility").should("have.text", appointment.facility);
                cy.get("#hospital_readmission").should(
                    "have.text",
                    appointment.hospitalReadmission ? "Yes" : "No"
                );
                cy.get("#program").should(
                    "have.text",
                    appointment.healthcareProgram
                );
                cy.get("#comment").should("have.text", appointment.comment);
                cy.selectToggledMenuOption("History");
                cy.get("#history .container .row")
                    .eq(0)
                    .find("h2")
                    .should("have.text", "History");
                cy.curaHistoryElement(".panel-info", ".panel-heading").should(
                    "have.text",
                    "15/12/2022"
                );
                cy.curaHistoryElement(".panel-info", "#facility").should(
                    "have.text",
                    appointment.facility
                );
                cy.curaHistoryElement(".panel-info", "#facility").should(
                    "have.text",
                    appointment.facility
                );
                cy.curaHistoryElement(
                    ".panel-info",
                    "#hospital_readmission"
                ).should(
                    "have.text",
                    appointment.hospitalReadmission ? "Yes" : "No"
                );
                cy.curaHistoryElement(".panel-info", "#program").should(
                    "have.text",
                    appointment.healthcareProgram
                );
                cy.curaHistoryElement(".panel-info", "#comment").should(
                    "have.text",
                    appointment.comment
                );
            });
        });
    });
});
