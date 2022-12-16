describe( "Concur Expense Report Generator", () =>
{
  it( "Generates CSV Files For Expense Reports", () =>
  {

    let getJSONVendorIDs = []
    let resultsJSONVendorIDs = []
    let results = []
    let csvDataForVendorRecord = []
    let data = []
    let access_token = ""
    let BstarsMGMTOrINT = ""
    let accountingApproval = ""
    let memo = ""
    let GL = ""

    cy.exec( "curl --location --request POST " + Cypress.env( 'suiteTalkAPI' ) + " \
--header " + Cypress.env( 'Authorization' ) + " \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: NS_ROUTING_VERSION=LAGGING' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode " + Cypress.env( 'refresh_token' ) ).then( ( response ) =>
    {
      access_token = JSON.parse( response.stdout )

      cy.exec( "curl --location --request GET " + Cypress.env( 'restletURL' ) + " \
--header 'Authorization:" + " Bearer " + access_token.access_token + "' " + "\
--header 'Cookie: NS_ROUTING_VERSION=LAGGING'").then( ( res ) =>
      {
        getJSONVendorIDs.push( JSON.parse( res.stdout ) )

        function getEmployeeName ( name )
        {
          for ( var i = 0; i < getJSONVendorIDs.length; i++ )
          {

            for ( var val in getJSONVendorIDs[ i ].results )
            {
              resultsJSONVendorIDs.push( getJSONVendorIDs[ i ].results[ val ].values[ 1 ] )
              results = resultsJSONVendorIDs[ val ]
              if ( results.includes( name ) )
              {
                name = results
              } else
              {
                name = name
              }
            }
            return name
          }
        }

        const getJSON = [];

        const logGetJSON = ( request ) =>
        {
          request.continue( ( res ) =>
          {
            getJSON.push( { res: JSON.parse( res.body ) } )
          } )
        }

        cy.intercept( Cypress.env( 'interceptURL1' ), logGetJSON )
        cy.intercept( Cypress.env( 'interceptURL2' ), logGetJSON )
        cy.intercept( Cypress.env( 'interceptURL3' ), logGetJSON )
        cy.visit( "https://us2.concursolutions.com/Expense/Client/processor.asp" );
        cy.get( '#username-input' ).type( Cypress.env( 'concurUname' ) )
        cy.get( '#btnSubmit' ).click()
        cy.get( '#password' ).type( Cypress.env( 'concurPass' ) )
        cy.get( '#btnSubmit' ).click()
        cy.wait( 6000 )
        cy.get( '[data-test="menu__anchor-expense"]' ).click()
        cy.wait( 3000 )
        cy.get( '[data-test="menu__anchor-expense_1"]' ).click()
        cy.get( '#ext-gen201' ).find( '.x-grid3-td-5 > .x-grid3-cell-inner' ).each( ( $el, index, $list ) =>
        {
          cy.wrap( $el ).click()
          cy.wait( 8000 )
          cy.get( '[data-test="menu__anchor-expense_1"]' ).click()
        } )

        cy.writeFile( Cypress.env( 'fileFolder' ) + 'concurReports.json', getJSON, 'binary' )

        cy.readFile( Cypress.env( 'fileFolder' ) + "concurReports.json" ).then( ( result ) =>
        {
          data = result

          let csvColumnNames = [ "Vendor", " Reference NO", " Date", " Account", " Due Date", " Posting Period", " Memo", " Approval Status", " Subsidary", " Amount", " Location" ]

          csvDataForVendorRecord.push( csvColumnNames )

          for ( var i = 0; i < data.length; i++ )
          {

            for ( var value in data[ i ].res.ExpenseReport_GetReportHeader )
            {

              let dateForVendorRecordPostingPeriod = new Date( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.UserDefinedDate }` )

              let monthForVendorRecordPostingPeriod = dateForVendorRecordPostingPeriod.getMonth()

              let yearForVendorRecordPostingPeriod = dateForVendorRecordPostingPeriod.getFullYear()

              let employeeID = getEmployeeName( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.LastName }` )

              if ( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Custom1Name }` == "Buildingstars Management, Inc." )
              {
                BstarsMGMTOrINT = "New Parent Company : Facility Brands, Inc. : Buildingstars International, Inc. : " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Custom1Name }`

              } else if ( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Custom1Name }` == "Buildingstars International, Inc." )
              {
                BstarsMGMTOrINT = "New Parent Company : Facility Brands, Inc. : " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Custom1Name }`
              }

              if ( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.ApvStatusName }` === "Approved & In Accounting Review" )
              {
                accountingApproval = "Pending Approval"

              } else if ( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.ApvStatusName }` !== "Approved & In Accounting Review" )
              {
                accountingApproval = `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.ApvStatusName }`
              }

              switch ( dateForVendorRecordPostingPeriod.getMonth() )
              {
                case 0:
                  monthForVendorRecordPostingPeriod = "Jan";
                  break;
                case 1:
                  monthForVendorRecordPostingPeriod = "Feb";
                  break;
                case 2:
                  monthForVendorRecordPostingPeriod = "Mar";
                  break;
                case 3:
                  monthForVendorRecordPostingPeriod = "Apr";
                  break;
                case 4:
                  monthForVendorRecordPostingPeriod = "May";
                  break;
                case 5:
                  monthForVendorRecordPostingPeriod = "Jun"
                  break;
                case 6:
                  monthForVendorRecordPostingPeriod = "Jul"
                  break;
                case 7:
                  monthForVendorRecordPostingPeriod = "Aug";
                  break;
                case 8:
                  monthForVendorRecordPostingPeriod = "Sep"
                  break;
                case 9:
                  monthForVendorRecordPostingPeriod = "Oct"
                  break;
                case 10:
                  monthForVendorRecordPostingPeriod = "Nov"
                  break;
                case 11:
                  monthForVendorRecordPostingPeriod = "Dec"
                  break;
                default:
                  dateForVendorRecordPostingPeriod.getMonth()
              }

              csvDataForVendorRecord.push( [ employeeID, " " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.ReportId }`, " " + new Date( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.UserDefinedDate }` ).toLocaleDateString(), " 3000 Accounts Payable", " " + new Date( `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.UserDefinedDate }` ).toLocaleDateString(), " " + monthForVendorRecordPostingPeriod + " " + yearForVendorRecordPostingPeriod, " " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Name }`, " " + accountingApproval, " " + BstarsMGMTOrINT, " " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.AmountApproved }`, " " + `${ data[ i ].res.ExpenseReport_GetReportHeader.Body.ReportForm.Custom2Name }` ] )
            }
          }

          let csv = csvDataForVendorRecord.map( ( item ) =>
          {
            var row = item
            return '"' + row.join( '","' ) + '"';
          } ).join( "\n" )

          cy.writeFile( Cypress.env( 'fileFolder' ) + 'ExpenseOverview.csv', csv, 'binary' )

          let csvColumnNamesDetailed = [ " Expense Account", " Amount", " Memo", " Location", " Bill ID" ]

          let csvDataForDetailedRecord = []

          csvDataForDetailedRecord.push( csvColumnNamesDetailed )

          for ( var i = 1; i < data.length; i++ )
          {

            for ( var value in data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records )
            {

              switch ( `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].ExpName }` )
              {
                case "Airfare":
                  GL = "41080 Travel & Entertainment : Airfare";
                  break;
                case "Hotel":
                  GL = "41120 Travel & Entertainment : Lodging"
                  break;
                case "Car Rental":
                  GL = "41090 Travel & Entertainment : Transportation Expense";
                  break;
                case "Auto Allowance":
                  GL = "40130 Automobile Expense : Mileage Reimbursement";
                  break;
                case "Car wash":
                  GL = "40090 Automobile Expense : EFleet Leases : Lease Maintenance";
                  break;
                case "Fuel":
                  GL = "40120 Automobile Expense : Auto Fuel";
                  break;
                case "Lease Maintenance":
                  GL = "40090 Automobile Expense : EFleet Leases : Lease Maintenance"
                  break;
                case "Lease Repairs ":
                  GL = "40100 Automobile Expense : EFleet Leases : Lease Repairs"
                  break;
                case "Parking & Tolls":
                  GL = "40140 Automobile Expense : Parking & Tolls";
                  break;
                case "Taxi / Uber":
                  GL = "41090 Travel & Entertainment : Transportation Expense";
                  break;
                case "Breakfast":
                  GL = "41130 Travel & Entertainment : Meals";
                  break;
                case "Lunch":
                  GL = "41130 Travel & Entertainment : Meals";
                  break;
                case "Dinner":
                  GL = "41130 Travel & Entertainment : Meals";
                  break;
                case "Business Meals (Attendees)":
                  GL = "41130 Travel & Entertainment : Meals";
                  break;
                case "Entertainment - Client":
                  GL = "40190 Marketing Materials Expense";
                  break;
                case "Entertainment - Staff":
                  GL = "41110 Travel & Entertainment : Entertainment";
                  break;
                case "Break Room Supplies":
                  GL = "40940 Supplies : Office Supplies";
                  break;
                case "Office Supplies/Software":
                  GL = "40940 Supplies : Office Supplies";
                  break;
                case "Postage":
                  GL = "40780 Postage & Delivery";
                  break;
                case "Printing/Photocopying/Stationery":
                  GL = "40790 Printing & Reproduction";
                  break;
                case "Internet/Online Fees":
                  GL = "41020 Telephone & Internet Expense : Internet Expense";
                  break;
                case "Mobile/Cellular Phone":
                  GL = "41010 Telephone & Internet Expense : Cell Phone Expense";
                  break;
                case "Professional Subscriptions/Dues":
                  GL = "40220 Dues, Registration Fees, & Subscriptions";
                  break;
                case "Damages":
                  GL = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].ExpName }`
                  break;
                case "Flowers & Gifts":
                  GL = "40350 Flowers & Gifts";
                  break;
                case "Marketing/Promotional Costs":
                  GL = "40190 Marketing Materials Expense";
                  break;
                case "Meetings & Conventions":
                  GL = "41100 Meetings & Conventions";
                  break;
                case "Office Repairs & Maintenance":
                  GL = "40510 Office Expense : Office Maintenance : Repairs";
                  break;
                case "Operational Supplies":
                  GL = "40950 Supplies : Operational Supplies";
                  break;
                case "Prospecting or Recruiting - Customers":
                  GL = "40010 Advertising: Advertising - Customers";
                  break;
                case "Recruiting - Employees":
                  GL = "40020 Advertising : Recruiting - Employees";
                  break;
                case "Recruiting - Franchise Owners":
                  GL = "40030 Advertising : Advertising - Employees";
                  break;
                case "Tips/Gratuities":
                  GL = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].ExpName }`
                  break;
                case "Training & Development":
                  GL = "41040 Training & Development";
                  break;
                default:
                  GL = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].ExpName }`
              }

              if ( `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Description }` == "undefined" && `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }` == "undefined" )
              {
                memo = " "

              } else if ( `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Description }` == "undefined" && `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }` != "undefined" )
              {
                memo = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }`

              } else if ( `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Description }` != "undefined" && `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }` == "undefined" )
              {
                memo = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Description }`

              } else if ( `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Description }` != "undefined" && `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }` != "undefined" )
              {
                memo = `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].VendorDescription }`
              }
              csvDataForDetailedRecord.push( [ GL, " " + `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].ApprovedAmount }`, " " + memo, " " + `${ data[ i ].res.ExpenseEntry_GetExpenseEntries.Body.ExpenseEntries.Records[ value ].Custom2Name }`, " " ] )
            }
          }

          let csvDetailed = csvDataForDetailedRecord.map( ( itemDetailed ) =>
          {
            var rowDetailed = itemDetailed
            return '"' + rowDetailed.join( '","' ) + '"';
          } ).join( "\n" )

          cy.writeFile( Cypress.env( 'fileFolder' ) + 'ExpenseDetailed.csv', csvDetailed, 'binary' )

        } )
      } )
    } )

  } )
} )
