describe( 'IS KPI Automation Results:', () =>
{
  Cypress.on( 'uncaught:exception', ( err, runnable ) =>
  {
    return false;
  } );
  after( () =>
  {
    cy.exec( 'cd cypress/downloads && rm *.csv' );
  } );
  it( ' CSV Downloads Completed!', () =>
  {
    cy.visit( 'https://app.rippling.com/login' );
    cy.wait( 7000 );
    cy.get( '[data-testid="input-email"]' ).type( Cypress.env( 'usrname' ) );
    cy.get( '[data-testid="input-password"]' ).type( Cypress.env( 'rPasswrd' ) );
    cy.get( '.css-1b5p2my-Content' ).click();
    cy.wait( 10000 );
    cy.get( '.e13ghijt0' ).click();
    cy.wait( 8000 );
    cy.get( ':nth-child(3) > .css-fr1ni3 > .css-tjafot' ).click();
    cy.wait( 8000 );
    cy.get( '[href="/reports"] > .css-1p1d5di' ).click();
    cy.wait( 8000 );
    cy.get( '.css-52o6d6' ).click();
    cy.wait( 10000 );
    cy.task( 'log', '\n' + 'Mark & Bob logged into Rippling Successfully.. Nice!' + '\n' );

    var getDaysArray = function ( s, e ) { for ( var a = [], d = new Date( s ); d <= new Date( e ); d.setDate( d.getDate() + 1 ) ) { a.push( new Date( d ) ); } return a; };

    let firstDate = new Date();
    firstDate.setDate( firstDate.getDate() - 7 );
    let lastDate = new Date();
    lastDate.setDate( lastDate.getDate() - 1 );
    let dateMap = getDaysArray( firstDate, lastDate ).map( x => x.toLocaleDateString() );
    let checkForWeekends = lastDate.getDay();
    let ripplingDate = [];
    let months = "";
    let days = '';


    for ( let i = 0; i < 7; i++ )
    {

      let dates = dateMap[ i ].split( '/' );

      if ( dates[ 0 ] < 10 )
      {
        months = "0" + dates[ 0 ];
      } else if ( dates[ 0 ] >= 10 )
      {
        months = dates[ 0 ];
      }

      if ( dates[ 1 ] < 10 )
      {
        days = "0" + dates[ 1 ];
      } else if ( dates[ 1 ] >= 10 )
      {
        days = dates[ 1 ];
      }
      checkForWeekends++;
      let weekends = '';

      if ( checkForWeekends <= 6 && checkForWeekends >= 0 )
      {
        weekends = checkForWeekends;

      } else if ( checkForWeekends > 6 )
      {
        weekends = checkForWeekends - 7;

      } else if ( checkForWeekends <= 0 )
      {
        weekends = checkForWeekends + 7;
      }

      if ( weekends == 0 || weekends == 6 )
      {


      } else
      {
        ripplingDate = {
          months: months,
          days: days,
          years: dates[ 2 ]
        };
        let results = ripplingDate.months + ripplingDate.days + ripplingDate.years;
        console.log( results );


        cy.get( ':nth-child(2) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]' ).click().type( results, { delay: 200 } );


        cy.task( 'log', 'CSV File @ Array Index ' + i + '/6: --> ' );
        cy.task( 'log', 'Date (From): ' + JSON.stringify( ripplingDate ) );
        cy.wait( 3000 );
        cy.get( ':nth-child(4) > :nth-child(1) > .css-1924hdc-StyledBaseInputContainer-DateInputContainer > .css-iyuz3-LeftSection > [data-testid="month"] > [data-testid="input-month"]' )
          .click()
          .type( results, {
            delay: 200,
          } );

        cy.task( 'log', 'Date (To): ' + JSON.stringify( ripplingDate ) );
        cy.wait( 3000 );
        cy.get( '[data-testid="Apply"]' ).click();
        cy.get( '[data-testid="Run Report"]' ).click();
        cy.wait( 5000 );
        cy.get( '[data-testid="Download"]' ).click();
        cy.get( '[data-testid="Download CSV"] > .css-1b5p2my-Content > span' ).click();
        cy.exec( "cd cypress/downloads && mv 'Hours Per Day By Employee'.csv " + results + ".csv" + " " );
        cy.task( 'log', 'Downloading CSV...' );
        cy.task( 'log', '...Done!' + '\n' );
      }

    }

  } );

  it( 'CSV Uploads Completed!', () =>
  {
    cy.visit( 'https://integration.buildingstars.com/login' );
    cy.get( '#email' ).type( Cypress.env( 'usrname' ) );
    cy.get( '#password' ).type( Cypress.env( 'googlePasswrd' ) );
    cy.get( '.btn' ).click();
    cy.wait( 1000 );
    cy.visit( 'https://integration.buildingstars.com/upload-hours' );
    cy.wait( 1000 );
    cy.task( 'log', '\n' + "Mark & Bob logged into Buildingstars' Integration Successfully! Beginning Upload..." + '\n' );

    var getDaysArray = function ( s, e ) { for ( var a = [], d = new Date( s ); d <= new Date( e ); d.setDate( d.getDate() + 1 ) ) { a.push( new Date( d ) ); } return a; };

    let firstDate = new Date();
    firstDate.setDate( firstDate.getDate() - 7 );
    let lastDate = new Date();
    lastDate.setDate( lastDate.getDate() - 1 );
    let dateMap = getDaysArray( firstDate, lastDate ).map( x => x.toLocaleDateString() );
    let checkForWeekends = lastDate.getDay();
    let ripplingDate = [];
    let months = "";
    let days = '';

    for ( let i = 0; i < 7; i++ )
    {

      let dates = dateMap[ i ].split( '/' );

      if ( dates[ 0 ] < 10 )
      {
        months = "0" + dates[ 0 ];
      } else if ( dates[ 0 ] >= 10 )
      {
        months = dates[ 0 ];
      }

      if ( dates[ 1 ] < 10 )
      {
        days = "0" + dates[ 1 ];
      } else if ( dates[ 1 ] >= 10 )
      {
        days = dates[ 1 ];
      }
      checkForWeekends++;
      let weekends = '';

      if ( checkForWeekends <= 6 && checkForWeekends >= 0 )
      {
        weekends = checkForWeekends;

      } else if ( checkForWeekends > 6 )
      {
        weekends = checkForWeekends - 7;

      } else if ( checkForWeekends <= 0 )
      {
        weekends = checkForWeekends + 7;
      }

      if ( weekends == 0 || weekends == 6 )
      {


      } else
      {
        ripplingDate = {
          months: months,
          days: days,
          years: dates[ 2 ]
        };
        let results = ripplingDate.years + "-" + ripplingDate.months + "-" + ripplingDate.days;
        let fileList = ripplingDate.months + ripplingDate.days + ripplingDate.years;
        console.log( results );

        cy.get( '.space-y-1.text-center' )
          .find( '#csv' )
          .invoke( 'show' )
          .should( 'be.visible' )
          .selectFile( Cypress.env( 'fileFolder' ) + fileList + ".csv", { force: true } );
        cy.get( '#date' ).type( results );
        cy.task( 'log', 'Uploading ' + fileList + ' for date: ' + results );
        cy.wait( 2000 );
        cy.get( '.ml-3' ).click();
        cy.task( 'log', 'Uploading CSV...' );
        cy.task( 'log', '...Done!' + '\n' );
        cy.wait( 2000 );
        cy.reload();
      }
    }
  } );
} );
