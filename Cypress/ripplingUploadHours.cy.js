describe('IS KPI Automation Results:', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  after(() => {
    cy.exec('cd cypress/downloads && rm *.csv');
  });
  it(' CSV Downloads Completed!', () => {
    cy.visit('https://app.rippling.com/login');
    cy.wait(7000);
    cy.get('[data-testid="input-email"]').type(Cypress.env('usrname'));
    cy.get('[data-testid="input-password"]').type(Cypress.env('rPasswrd'));
    cy.get('.css-1b5p2my-Content').click();
    cy.wait(10000);
    cy.get('.e13ghijt0').click();
    cy.wait(8000);
    cy.get(':nth-child(3) > .css-fr1ni3 > .css-tjafot').click();
    cy.wait(8000);
    cy.get('[href="/reports"] > .css-1p1d5di').click();
    cy.wait(8000);
    cy.get('.css-52o6d6').click();
    cy.wait(10000);
    cy.task('log', '\n' + 'Mark & Bob logged into Rippling Successfully.. Nice!' + '\n');
    cy.task(
      'log',
      'NOTE: There is a chance that dates entered into Rippling are NOT correct. Please read the following explanation to ensure that the data was input correctly!' +
        '\n'
    );
    cy.task(
      'log',
      'EXPLANATION: Date (From) & Date (To) are the values that are supposed to be entered into Rippling according to my date logic. However, there is a bug that causes this to occasionally be input incorrectly in Rippling. Month From/To, Day From/To, and Year From/To are the values that were actually entered into Rippling and submitted. If the values for Month From/To, Day From/To, or Year From/To do NOT match Date (From) or Date (To) AND there are NO notes that it was corrected, then the CSV for that date should be reuploaded manually.' +
        '\n'
    );
    // Start of Date Logic
    const timestoRun = 7;
    for (var i = 0; i < timestoRun; i++) {
      let d = new Date();
      let dayofweek = d.getDay() - 1;
      let day;
      if (dayofweek == 1) {
        day = d.getDate() - i - 1;
      } else {
        day = d.getDate() - i - 1;
      }
      let month = d.getMonth() + 1;
      var year = d.getFullYear();
      let months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      let days = ['0', '-1', '-2', '-3', '-4', '-5', '-6'];

      if (dayofweek == i || dayofweek == i - 1) {
      } else if (
        (month == months[0] && day == days[0]) ||
        (month == months[0] && day == days[1]) ||
        (month == months[0] && day == days[2]) ||
        (month == months[0] && day == days[3]) ||
        (month == months[0] && day == days[4]) ||
        (month == months[0] && day == days[5]) ||
        (month == months[0] && day == days[6])
      ) {
        month = 12;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year - 1;
        let rollbackJan = month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackJan + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJan, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJan, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJan, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJan, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackJan + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJan, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJan, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJan, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJan, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[1] && day == days[0]) ||
        (month == months[1] && day == days[1]) ||
        (month == months[1] && day == days[2]) ||
        (month == months[1] && day == days[3]) ||
        (month == months[1] && day == days[4]) ||
        (month == months[1] && day == days[5]) ||
        (month == months[1] && day == days[6])
      ) {
        month = 1;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackFeb = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackFeb + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackFeb, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackFeb, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackFeb, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackFeb, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackFeb + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackFeb, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackFeb, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackFeb, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackFeb, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[2] && day == days[0]) ||
        (month == months[2] && day == days[1]) ||
        (month == months[2] && day == days[2]) ||
        (month == months[2] && day == days[3]) ||
        (month == months[2] && day == days[4]) ||
        (month == months[2] && day == days[5]) ||
        (month == months[2] && day == days[6])
      ) {
        month = 2;
        if (year % 4 == 0) {
          if (day == days[0]) {
            day = 29;
          } else if (day == days[1]) {
            day = 28;
          } else if (day == days[2]) {
            day = 27;
          } else if (day == days[3]) {
            day = 26;
          } else if (day == days[4]) {
            day = 25;
          } else if (day == days[5]) {
            day = 24;
          } else if (day == days[6]) {
            day = 23;
          }
          year = year;
          let rollbackMarch = '0' + month.toString() + day.toString() + year.toString();
          cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
          cy.task('log', 'EXPECTED INPUT: ');
          cy.task('log', 'Date (From): ' + rollbackMarch + '\n');
          cy.task('log', 'ACTUAL INPUT:');
          cy.get(
            ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
          )
            .click()
            .type(rollbackMarch, {
              delay: 200,
            })
            .then(($input) => {
              const val = $input.val();
              cy.task('log', 'Month From : ' + val);
              if (val.toString() !== month.toString()) {
                cy.get(
                  '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
                )
                  .click()
                  .type(rollbackMarch, {
                    delay: 200,
                  })
                  .then(($inputFixed) => {
                    const valFixed = $inputFixed.val();
                    cy.task(
                      'log',
                      'Oops! There was an issue with the Month entered and we fixed it..'
                    );
                    cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                  });
              }
            });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
          ).then(($input2) => {
            const val2 = $input2.val();
            cy.task('log', 'Day From : ' + val2);
            cy.log(day);
            if (val2.toString() !== day.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input2Fixed) => {
                  const val2Fixed = $input2Fixed.val();
                  cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                  cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
                });
            }
          });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
          ).then(($input3) => {
            const val3 = $input3.val();
            cy.task('log', 'Year From : ' + val3 + '\n');
            cy.log(year);
            if (val3.toString() !== year.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input3Fixed) => {
                  const val3Fixed = $input3Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Year entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
                });
            }
          });
          cy.task('log', 'EXPECTED INPUT');
          cy.task('log', 'Date (To): ' + rollbackMarch + '\n');
          cy.task('log', 'ACTUAL INPUT:');
          cy.wait(3000);
          cy.get(
            ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
          )
            .click()
            .type(rollbackMarch, {
              delay: 200,
            })
            .then(($input4) => {
              const val4 = $input4.val();
              cy.task('log', 'Month To : ' + val4);
              if (val4.toString() !== month.toString()) {
                cy.get(
                  '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
                )
                  .click()
                  .type(rollbackMarch, {
                    delay: 200,
                  })
                  .then(($input4Fixed) => {
                    const val4Fixed = $input4Fixed.val();
                    cy.task(
                      'log',
                      'Oops! There was an issue with the Month entered and we fixed it..'
                    );
                    cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                  });
              }
            });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
          ).then(($input5) => {
            const val5 = $input5.val();
            cy.task('log', 'Day To : ' + val5);
            cy.log(day);
            if (val5.toString() !== day.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input5Fixed) => {
                  const val5Fixed = $input5Fixed.val();
                  cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                  cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
                });
            }
          });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
          ).then(($input6) => {
            const val6 = $input6.val();
            cy.task('log', 'Year To : ' + val6 + '\n');
            cy.log(year);
            if (val6.toString() !== year.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input6Fixed) => {
                  const val6Fixed = $input6Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Year entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
                });
            }
          });
          cy.wait(3000);
          cy.get('[data-testid="Apply"]').click();
          cy.get('[data-testid="Run Report"]').click();
          cy.wait(5000);
          cy.get('[data-testid="Download"]').click();
          cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
          cy.task('log', 'Downloading CSV...');
          cy.task('log', '...Done!' + '\n');
        } else {
          if (day == days[0]) {
            day = 28;
          } else if (day == days[1]) {
            day = 27;
          } else if (day == days[2]) {
            day = 26;
          } else if (day == days[3]) {
            day = 25;
          } else if (day == days[4]) {
            day = 24;
          } else if (day == days[5]) {
            day = 23;
          } else if (day == days[6]) {
            day = 22;
          }
          year = year;
          let rollbackMarch = '0' + month.toString() + day.toString() + year.toString();
          cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
          cy.task('log', 'EXPECTED INPUT: ');
          cy.task('log', 'Date (From): ' + rollbackMarch + '\n');
          cy.task('log', 'ACTUAL INPUT:');
          cy.get(
            ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
          )
            .click()
            .type(rollbackMarch, {
              delay: 200,
            })
            .then(($input) => {
              const val = $input.val();
              cy.task('log', 'Month From : ' + val);
              if (val.toString() !== month.toString()) {
                cy.get(
                  '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
                )
                  .click()
                  .type(rollbackMarch, {
                    delay: 200,
                  })
                  .then(($inputFixed) => {
                    const valFixed = $inputFixed.val();
                    cy.task(
                      'log',
                      'Oops! There was an issue with the Month entered and we fixed it..'
                    );
                    cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                  });
              }
            });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
          ).then(($input2) => {
            const val2 = $input2.val();
            cy.task('log', 'Day From : ' + val2);
            cy.log(day);
            if (val2.toString() !== day.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input2Fixed) => {
                  const val2Fixed = $input2Fixed.val();
                  cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                  cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
                });
            }
          });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
          ).then(($input3) => {
            const val3 = $input3.val();
            cy.task('log', 'Year From : ' + val3 + '\n');
            cy.log(year);
            if (val3.toString() !== year.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input3Fixed) => {
                  const val3Fixed = $input3Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Year entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
                });
            }
          });
          cy.task('log', 'EXPECTED INPUT');
          cy.task('log', 'Date (To): ' + rollbackMarch + '\n');
          cy.task('log', 'ACTUAL INPUT:');
          cy.wait(3000);
          cy.get(
            ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
          )
            .click()
            .type(rollbackMarch, {
              delay: 200,
            })
            .then(($input4) => {
              const val4 = $input4.val();
              cy.task('log', 'Month To : ' + val4);
              if (val4.toString() !== month.toString()) {
                cy.get(
                  '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
                )
                  .click()
                  .type(rollbackMarch, {
                    delay: 200,
                  })
                  .then(($input4Fixed) => {
                    const val4Fixed = $input4Fixed.val();
                    cy.task(
                      'log',
                      'Oops! There was an issue with the Month entered and we fixed it..'
                    );
                    cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                  });
              }
            });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
          ).then(($input5) => {
            const val5 = $input5.val();
            cy.task('log', 'Day To : ' + val5);
            cy.log(day);
            if (val5.toString() !== day.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input5Fixed) => {
                  const val5Fixed = $input5Fixed.val();
                  cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                  cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
                });
            }
          });
          cy.get(
            '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
          ).then(($input6) => {
            const val6 = $input6.val();
            cy.task('log', 'Year To : ' + val6 + '\n');
            cy.log(year);
            if (val6.toString() !== year.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMarch, {
                  delay: 200,
                })
                .then(($input6Fixed) => {
                  const val6Fixed = $input6Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Year entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
                });
            }
          });
          cy.wait(3000);
          cy.get('[data-testid="Apply"]').click();
          cy.get('[data-testid="Run Report"]').click();
          cy.wait(5000);
          cy.get('[data-testid="Download"]').click();
          cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
          cy.task('log', 'Downloading CSV...');
          cy.task('log', '...Done!' + '\n');
        }
      } else if (
        (month == months[3] && day == days[0]) ||
        (month == months[3] && day == days[1]) ||
        (month == months[3] && day == days[2]) ||
        (month == months[3] && day == days[3]) ||
        (month == months[3] && day == days[4]) ||
        (month == months[3] && day == days[5]) ||
        (month == months[3] && day == days[6])
      ) {
        month = 3;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackApril = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackApril + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackApril, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackApril, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackApril, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackApril, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackApril + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackApril, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackApril, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackApril, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackApril, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[4] && day == days[0]) ||
        (month == months[4] && day == days[1]) ||
        (month == months[4] && day == days[2]) ||
        (month == months[4] && day == days[3]) ||
        (month == months[4] && day == days[4]) ||
        (month == months[4] && day == days[5]) ||
        (month == months[4] && day == days[6])
      ) {
        month = 4;
        if (day == days[0]) {
          day = 30;
        } else if (day == days[1]) {
          day = 29;
        } else if (day == days[2]) {
          day = 28;
        } else if (day == days[3]) {
          day = 27;
        } else if (day == days[4]) {
          day = 26;
        } else if (day == days[5]) {
          day = 25;
        } else if (day == days[6]) {
          day = 24;
        }
        year = year;
        let rollbackMay = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackMay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackMay, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMay, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackMay, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackMay, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackMay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackMay, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackMay, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackMay, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackMay, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[5] && day == days[0]) ||
        (month == months[5] && day == days[1]) ||
        (month == months[5] && day == days[2]) ||
        (month == months[5] && day == days[3]) ||
        (month == months[5] && day == days[4]) ||
        (month == months[5] && day == days[5]) ||
        (month == months[5] && day == days[6])
      ) {
        month = 5;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackJune = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackJune + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJune, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJune, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJune, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJune, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackJune + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJune, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJune, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJune, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJune, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[6] && day == days[0]) ||
        (month == months[6] && day == days[1]) ||
        (month == months[6] && day == days[2]) ||
        (month == months[6] && day == days[3]) ||
        (month == months[6] && day == days[4]) ||
        (month == months[6] && day == days[5]) ||
        (month == months[6] && day == days[6])
      ) {
        month = 6;
        if (day == days[0]) {
          day = 30;
        } else if (day == days[1]) {
          day = 29;
        } else if (day == days[2]) {
          day = 28;
        } else if (day == days[3]) {
          day = 27;
        } else if (day == days[4]) {
          day = 26;
        } else if (day == days[5]) {
          day = 25;
        } else if (day == days[6]) {
          day = 24;
        }
        year = year;
        let rollbackJuly = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackJuly + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJuly, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJuly, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJuly, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJuly, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackJuly + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackJuly, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackJuly, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJuly, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackJuly, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[7] && day == days[0]) ||
        (month == months[7] && day == days[1]) ||
        (month == months[7] && day == days[2]) ||
        (month == months[7] && day == days[3]) ||
        (month == months[7] && day == days[4]) ||
        (month == months[7] && day == days[5]) ||
        (month == months[7] && day == days[6])
      ) {
        month = 7;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackAugust = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackAugust + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackAugust, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackAugust, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackAugust, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackAugust, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackAugust + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackAugust, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackAugust, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackAugust, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackAugust, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[8] && day == days[0]) ||
        (month == months[8] && day == days[1]) ||
        (month == months[8] && day == days[2]) ||
        (month == months[8] && day == days[3]) ||
        (month == months[8] && day == days[4]) ||
        (month == months[8] && day == days[5]) ||
        (month == months[8] && day == days[6])
      ) {
        month = 8;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackSeptember = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackSeptember + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackSeptember, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackSeptember, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackSeptember, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackSeptember, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackSeptember + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackSeptember, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackSeptember, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackSeptember, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackSeptember, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[9] && day == days[0]) ||
        (month == months[9] && day == days[1]) ||
        (month == months[9] && day == days[2]) ||
        (month == months[9] && day == days[3]) ||
        (month == months[9] && day == days[4]) ||
        (month == months[9] && day == days[5]) ||
        (month == months[9] && day == days[6])
      ) {
        month = 9;
        if (day == days[0]) {
          day = 30;
        } else if (day == days[1]) {
          day = 29;
        } else if (day == days[2]) {
          day = 28;
        } else if (day == days[3]) {
          day = 27;
        } else if (day == days[4]) {
          day = 26;
        } else if (day == days[5]) {
          day = 25;
        } else if (day == days[6]) {
          day = 24;
        }
        year = year;
        let rollbackOct = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackOct + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackOct, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackOct, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackOct, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackOct, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackOct + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackOct, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackOct, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackOct, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackOct, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.wait(3000);
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[10] && day == days[0]) ||
        (month == months[10] && day == days[1]) ||
        (month == months[10] && day == days[2]) ||
        (month == months[10] && day == days[3]) ||
        (month == months[10] && day == days[4]) ||
        (month == months[10] && day == days[5]) ||
        (month == months[10] && day == days[6])
      ) {
        month = 10;
        if (day == days[0]) {
          day = 31;
        } else if (day == days[1]) {
          day = 30;
        } else if (day == days[2]) {
          day = 29;
        } else if (day == days[3]) {
          day = 28;
        } else if (day == days[4]) {
          day = 27;
        } else if (day == days[5]) {
          day = 26;
        } else if (day == days[6]) {
          day = 25;
        }
        year = year;
        let rollbackNov = month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackNov + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackNov, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackNov, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackNov, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackNov, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackNov + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackNov, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackNov, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackNov, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackNov, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (
        (month == months[11] && day == days[0]) ||
        (month == months[11] && day == days[1]) ||
        (month == months[11] && day == days[2]) ||
        (month == months[11] && day == days[3]) ||
        (month == months[11] && day == days[4]) ||
        (month == months[11] && day == days[5]) ||
        (month == months[11] && day == days[6])
      ) {
        month = 11;
        if (day == days[0]) {
          day = 30;
        } else if (day == days[1]) {
          day = 29;
        } else if (day == days[2]) {
          day = 28;
        } else if (day == days[3]) {
          day = 27;
        } else if (day == days[4]) {
          day = 26;
        } else if (day == days[5]) {
          day = 25;
        } else if (day == days[6]) {
          day = 24;
        }
        year = year;
        let rollbackDec = month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + rollbackDec + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackDec, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackDec, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackDec, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackDec, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + rollbackDec + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(rollbackDec, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(rollbackDec, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackDec, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(rollbackDec, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (month < 10 && day < 10) {
        const monthAndDay = '0' + month.toString() + '0' + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + monthAndDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(monthAndDay, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(monthAndDay, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(monthAndDay, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(monthAndDay, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + monthAndDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(monthAndDay, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(monthAndDay, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(monthAndDay, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(monthAndDay, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (month > 9 && day < 10) {
        const justDay = month.toString() + '0' + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + justDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(justDay, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(justDay, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justDay, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justDay, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + justDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(justDay, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(justDay, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justDay, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justDay, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else if (month < 10 && day > 9) {
        const justMonth = '0' + month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + justMonth + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(justMonth, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(justMonth, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justMonth, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justMonth, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + justMonth + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(justMonth, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(justMonth, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justMonth, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(justMonth, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });
        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      } else {
        const noMonthOrDay = month.toString() + day.toString() + year.toString();
        cy.task('log', 'CSV File @ Array Index ' + i + '/6: --> ' + '\n');
        cy.task('log', 'EXPECTED INPUT: ');
        cy.task('log', 'Date (From): ' + noMonthOrDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.get(
          ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(noMonthOrDay, {
            delay: 200,
          })
          .then(($input) => {
            const val = $input.val();
            cy.task('log', 'Month From : ' + val);
            if (val.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(noMonthOrDay, {
                  delay: 200,
                })
                .then(($inputFixed) => {
                  const valFixed = $inputFixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + valFixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input2) => {
          const val2 = $input2.val();
          cy.task('log', 'Day From : ' + val2);
          cy.log(day);
          if (val2.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(noMonthOrDay, {
                delay: 200,
              })
              .then(($input2Fixed) => {
                const val2Fixed = $input2Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val2Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input3) => {
          const val3 = $input3.val();
          cy.task('log', 'Year From : ' + val3 + '\n');
          cy.log(year);
          if (val3.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(noMonthOrDay, {
                delay: 200,
              })
              .then(($input3Fixed) => {
                const val3Fixed = $input3Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val3Fixed + '\n');
              });
          }
        });
        cy.task('log', 'EXPECTED INPUT');
        cy.task('log', 'Date (To): ' + noMonthOrDay + '\n');
        cy.task('log', 'ACTUAL INPUT:');
        cy.wait(3000);
        cy.get(
          ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
        )
          .click()
          .type(noMonthOrDay, {
            delay: 200,
          })
          .then(($input4) => {
            const val4 = $input4.val();
            cy.task('log', 'Month To : ' + val4);
            if (val4.toString() !== month.toString()) {
              cy.get(
                '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
              )
                .click()
                .type(noMonthOrDay, {
                  delay: 200,
                })
                .then(($input4Fixed) => {
                  const val4Fixed = $input4Fixed.val();
                  cy.task(
                    'log',
                    'Oops! There was an issue with the Month entered and we fixed it..'
                  );
                  cy.task('log', '(CORRECTED Month) : ' + val4Fixed + '\n');
                });
            }
          });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="day"] > [data-testid="input-day"]'
        ).then(($input5) => {
          const val5 = $input5.val();
          cy.task('log', 'Day To : ' + val5);
          cy.log(day);
          if (val5.toString() !== day.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(noMonthOrDay, {
                delay: 200,
              })
              .then(($input5Fixed) => {
                const val5Fixed = $input5Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Day entered and we fixed it..');
                cy.task('log', '(CORRECTED Day) : ' + val5Fixed + '\n');
              });
          }
        });
        cy.get(
          '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="year"] > [data-testid="input-year"]'
        ).then(($input6) => {
          const val6 = $input6.val();
          cy.task('log', 'Year To : ' + val6 + '\n');
          cy.log(year);
          if (val6.toString() !== year.toString()) {
            cy.get(
              '.css-tbn538-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]'
            )
              .click()
              .type(noMonthOrDay, {
                delay: 200,
              })
              .then(($input6Fixed) => {
                const val6Fixed = $input6Fixed.val();
                cy.task('log', 'Oops! There was an issue with the Year entered and we fixed it..');
                cy.task('log', '(CORRECTED Year) : ' + val6Fixed + '\n');
              });
          }
        });

        cy.wait(3000);
        cy.get('[data-testid="Apply"]').click();
        cy.get('[data-testid="Run Report"]').click();
        cy.wait(5000);
        cy.get('[data-testid="Download"]').click();
        cy.get('[data-testid="Download CSV"] > .css-1b5p2my-Content > span').click();
        cy.task('log', 'Downloading CSV...');
        cy.task('log', '...Done!' + '\n');
      }
    }
    // End Of Date Logic
  });
  it('CSV Uploads Completed!', () => {
    cy.visit('https://integration.buildingstars.com/login');
    cy.get('#email').type(Cypress.env('usrname'));
    cy.get('#password').type(Cypress.env('googlePasswrd'));
    cy.get('.btn').click();
    cy.wait(1000);
    cy.visit('https://integration.buildingstars.com/upload-hours');
    cy.wait(1000);
    cy.task(
      'log',
      '\n' +
        "Mark & Bob logged into Buildingstars' Integration Successfully! Beginning Upload..." +
        '\n'
    );
    //start of date logic
    cy.exec('cd cypress/downloads && ls').then((result) => {
      let files = JSON.stringify(result)
        .split(/[\s"":{} 0\\,][\b($stdouterrcode:0n,"' '})\b]+/)
        .splice(1)
        .sort()
        .reverse();
      let fileList = [
        'Hours Per Day By Employee.csv',
        'Hours Per Day By Employee(1).csv',
        'Hours Per Day By Employee(2).csv',
        'Hours Per Day By Employee(3).csv',
        'Hours Per Day By Employee(4).csv',
        'Hours Per Day By Employee(5).csv',
        'Hours Per Day By Employee(6).csv',
      ];
      const timestoRun = 7;
      for (var i = 0; i < timestoRun && i <= files.length; i++) {
        let d = new Date();
        let dayofweek = d.getDay() - 1;
        let day;
        if (dayofweek == 1) {
          day = d.getDate() - i - 1;
        } else {
          day = d.getDate() - i - 1;
        }
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        let days = ['0', '-1', '-2', '-3', '-4', '-5'];

        if (dayofweek == i - 1 && dayofweek != i + 1) {
          fileList.splice(i, 0, 'Hours Per Day By Employee.csv');
        } else if (dayofweek == i) {
          fileList.splice(i, 0, 'Hours Per Day By Employee.csv');
        } else if (
          (month == months[0] && day == days[0]) ||
          (month == months[0] && day == days[1]) ||
          (month == months[0] && day == days[2]) ||
          (month == months[0] && day == days[3]) ||
          (month == months[0] && day == days[4]) ||
          (month == months[0] && day == days[5]) ||
          (month == months[0] && day == days[6])
        ) {
          month = 12;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year - 1;
          let rollbackJan = year.toString() + '-' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackJan);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackJan);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[1] && day == days[0]) ||
          (month == months[1] && day == days[1]) ||
          (month == months[1] && day == days[2]) ||
          (month == months[1] && day == days[3]) ||
          (month == months[1] && day == days[4]) ||
          (month == months[1] && day == days[5]) ||
          (month == months[1] && day == days[6])
        ) {
          month = 1;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackFeb = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackFeb);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackFeb);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[2] && day == days[0]) ||
          (month == months[2] && day == days[1]) ||
          (month == months[2] && day == days[2]) ||
          (month == months[2] && day == days[3]) ||
          (month == months[2] && day == days[4]) ||
          (month == months[2] && day == days[5]) ||
          (month == months[2] && day == days[6])
        ) {
          month = 2;
          if (year % 4 == 0) {
            if (day == days[0]) {
              day = 29;
            } else if (day == days[1]) {
              day = 28;
            } else if (day == days[2]) {
              day = 27;
            } else if (day == days[3]) {
              day = 26;
            } else if (day == days[4]) {
              day = 25;
            } else if (day == days[5]) {
              day = 24;
            } else if (day == days[6]) {
              day = 23;
            }
            year = year;
            let rollbackMarch =
              year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
            cy.get('.space-y-1.text-center')
              .find('#csv')
              .invoke('show')
              .should('be.visible')
              .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
            cy.get('#date').type(rollbackMarch);
            cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackMarch);
            cy.wait(2000);
            cy.get('.ml-3').click();
            cy.task('log', 'Uploading CSV...');
            cy.task('log', '...Done!' + '\n');
            cy.wait(2000);
            cy.reload();
          } else {
            if (day == days[0]) {
              day = 28;
            } else if (day == days[1]) {
              day = 27;
            } else if (day == days[2]) {
              day = 26;
            } else if (day == days[3]) {
              day = 25;
            } else if (day == days[4]) {
              day = 24;
            } else if (day == days[5]) {
              day = 23;
            } else if (day == days[6]) {
              day = 22;
            }
            year = year;
            let rollbackMarch =
              year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
            cy.get('.space-y-1.text-center')
              .find('#csv')
              .invoke('show')
              .should('be.visible')
              .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
            cy.get('#date').type(rollbackMarch);
            cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackMarch);
            cy.wait(2000);
            cy.get('.ml-3').click();
            cy.task('log', 'Uploading CSV...');
            cy.task('log', '...Done!' + '\n');
            cy.wait(2000);
            cy.reload();
          }
        } else if (
          (month == months[3] && day == days[0]) ||
          (month == months[3] && day == days[1]) ||
          (month == months[3] && day == days[2]) ||
          (month == months[3] && day == days[3]) ||
          (month == months[3] && day == days[4]) ||
          (month == months[3] && day == days[5]) ||
          (month == months[3] && day == days[6])
        ) {
          month = 3;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackApril = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();

          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackApril);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackApril);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[4] && day == days[0]) ||
          (month == months[4] && day == days[1]) ||
          (month == months[4] && day == days[2]) ||
          (month == months[4] && day == days[3]) ||
          (month == months[4] && day == days[4]) ||
          (month == months[4] && day == days[5]) ||
          (month == months[4] && day == days[6])
        ) {
          month = 4;
          if (day == days[0]) {
            day = 30;
          } else if (day == days[1]) {
            day = 29;
          } else if (day == days[2]) {
            day = 28;
          } else if (day == days[3]) {
            day = 27;
          } else if (day == days[4]) {
            day = 26;
          } else if (day == days[5]) {
            day = 25;
          } else if (day == days[6]) {
            day = 24;
          }
          year = year;
          let rollbackMay = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackMay);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackMay);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[5] && day == days[0]) ||
          (month == months[5] && day == days[1]) ||
          (month == months[5] && day == days[2]) ||
          (month == months[5] && day == days[3]) ||
          (month == months[5] && day == days[4]) ||
          (month == months[5] && day == days[5]) ||
          (month == months[5] && day == days[6])
        ) {
          month = 5;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackJune = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackJune);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackJune);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[6] && day == days[0]) ||
          (month == months[6] && day == days[1]) ||
          (month == months[6] && day == days[2]) ||
          (month == months[6] && day == days[3]) ||
          (month == months[6] && day == days[4]) ||
          (month == months[6] && day == days[5]) ||
          (month == months[6] && day == days[6])
        ) {
          month = 6;
          if (day == days[0]) {
            day = 30;
          } else if (day == days[1]) {
            day = 29;
          } else if (day == days[2]) {
            day = 28;
          } else if (day == days[3]) {
            day = 27;
          } else if (day == days[4]) {
            day = 26;
          } else if (day == days[5]) {
            day = 25;
          } else if (day == days[6]) {
            day = 24;
          }
          year = year;
          let rollbackJuly = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackJuly);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackJuly);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[7] && day == days[0]) ||
          (month == months[7] && day == days[1]) ||
          (month == months[7] && day == days[2]) ||
          (month == months[7] && day == days[3]) ||
          (month == months[7] && day == days[4]) ||
          (month == months[7] && day == days[5]) ||
          (month == months[7] && day == days[6])
        ) {
          month = 7;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackAugust =
            year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackAugust);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackAugust);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[8] && day == days[0]) ||
          (month == months[8] && day == days[1]) ||
          (month == months[8] && day == days[2]) ||
          (month == months[8] && day == days[3]) ||
          (month == months[8] && day == days[4]) ||
          (month == months[8] && day == days[5]) ||
          (month == months[8] && day == days[6])
        ) {
          month = 8;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackSeptember =
            year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackSeptember);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackSeptember);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[9] && day == days[0]) ||
          (month == months[9] && day == days[1]) ||
          (month == months[9] && day == days[2]) ||
          (month == months[9] && day == days[3]) ||
          (month == months[9] && day == days[4]) ||
          (month == months[9] && day == days[5]) ||
          (month == months[9] && day == days[6])
        ) {
          month = 9;
          if (day == days[0]) {
            day = 30;
          } else if (day == days[1]) {
            day = 29;
          } else if (day == days[2]) {
            day = 28;
          } else if (day == days[3]) {
            day = 27;
          } else if (day == days[4]) {
            day = 26;
          } else if (day == days[5]) {
            day = 25;
          } else if (day == days[6]) {
            day = 24;
          }
          year = year;
          let rollbackOct = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackOct);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackOct);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[10] && day == days[0]) ||
          (month == months[10] && day == days[1]) ||
          (month == months[10] && day == days[2]) ||
          (month == months[10] && day == days[3]) ||
          (month == months[10] && day == days[4]) ||
          (month == months[10] && day == days[5]) ||
          (month == months[10] && day == days[6])
        ) {
          month = 10;
          if (day == days[0]) {
            day = 31;
          } else if (day == days[1]) {
            day = 30;
          } else if (day == days[2]) {
            day = 29;
          } else if (day == days[3]) {
            day = 28;
          } else if (day == days[4]) {
            day = 27;
          } else if (day == days[5]) {
            day = 26;
          } else if (day == days[6]) {
            day = 25;
          }
          year = year;
          let rollbackNov = year.toString() + '-' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackNov);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackNov);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (
          (month == months[11] && day == days[0]) ||
          (month == months[11] && day == days[1]) ||
          (month == months[11] && day == days[2]) ||
          (month == months[11] && day == days[3]) ||
          (month == months[11] && day == days[4]) ||
          (month == months[11] && day == days[5]) ||
          (month == months[11] && day == days[6])
        ) {
          month = 11;
          if (day == days[0]) {
            day = 30;
          } else if (day == days[1]) {
            day = 29;
          } else if (day == days[2]) {
            day = 28;
          } else if (day == days[3]) {
            day = 27;
          } else if (day == days[4]) {
            day = 26;
          } else if (day == days[5]) {
            day = 25;
          } else if (day == days[6]) {
            day = 24;
          }
          year = year;
          let rollbackDec = year.toString() + '-' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(rollbackDec);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + rollbackDec);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (month <= 9 && day <= 9) {
          const monthAndDay =
            year.toString() + '-' + '0' + month.toString() + '-' + '0' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(monthAndDay);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + monthAndDay);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (month > 9 && day <= 9) {
          const justDay = year.toString() + '-' + month.toString() + '-' + '0' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(justDay);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + justDay);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else if (month <= 9 && day > 9) {
          const justMonth = year.toString() + '-' + '0' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(justMonth);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + justMonth);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        } else {
          const noMonthOrDay = year.toString() + '-' + month.toString() + '-' + day.toString();
          cy.get('.space-y-1.text-center')
            .find('#csv')
            .invoke('show')
            .should('be.visible')
            .selectFile(Cypress.env('fileFolder') + fileList[i], { force: true });
          cy.get('#date').type(noMonthOrDay);
          cy.task('log', 'Uploading ' + fileList[i] + ' for date: ' + noMonthOrDay);
          cy.wait(2000);
          cy.get('.ml-3').click();
          cy.task('log', 'Uploading CSV...');
          cy.task('log', '...Done!' + '\n');
          cy.wait(2000);
          cy.reload();
        }
      }
      //end of date  logic
    });
  });
});
