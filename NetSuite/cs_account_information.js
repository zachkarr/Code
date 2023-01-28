/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define( [ 'N/runtime' ], function ( runtime )
{

    function generatePdf ()
    {
        let setButtonText = document.getElementById( 'custpage_pdfdownload' );
        let setSecondaryButtonText = document.getElementById( 'secondarycustpage_pdfdownload' );

        setButtonText.value = 'Downloading.. Please Wait.....';
        setSecondaryButtonText.value = 'Downloading.. Please Wait.....';

        function outer ()
        {
            let doc;
            let jsp = document.createElement( 'script' );

            jsp.setAttribute( 'src',
                'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js' );

            document.getElementById( 'ext-element-5' )
                .appendChild( jsp );

            console.log( 'jsp', jsp );
            console.log( 'Hello,' );

            function inner ()
            {
                let loadAutoTable = () => setTimeout( () =>
                {
                    let jsp2 = document.createElement( 'script' );

                    jsp2.setAttribute( 'src',
                        'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.1/jspdf.plugin.autotable.min.js' );

                    document.getElementById( 'ext-element-5' )
                        .appendChild( jsp2 );

                    console.log( 'jsp2', jsp2 );
                    console.log( 'World!' );

                }, 500 );

                loadAutoTable();

                let pdfDataBuilder = () => setTimeout( () =>
                {
                    let res = [];
                    let companyName = document.getElementsByClassName( 'uir-record-name' );

                    let locationOfCustomer = document.getElementById( 'shipaddr1' ).value + ' ' +
                        document.getElementById( 'shipcity' ).value + '' +
                        document.getElementById( 'shipstate' ).value + ' ' +
                        document.getElementById( 'shipzip' ).value;

                    let primaryContact = document.getElementById( 'custentity_primary_contact_name' );
                    let primaryPhone = document.getElementById( 'custentity_main_phone_inline' );

                    let salesTeam = document.getElementById( 'salesteam_splits' );
                    let outsideSalesRep = salesTeam?.children.item( 0 ).children.item( 2 )?.children.item( 0 )?.innerText.trim() ?? '';

                    document.getElementById( 'custom176_form' ).children.item( 0 ).setAttribute( 'id', 'pdfDownloader' );

                    let downloading = document.getElementById( 'pdfDownloader' );
                    doc = new jsPDF( 'p', 'pt', [ 612, 792 ] );

                    let accountInformationTableData = () =>
                    {
                        res = doc.autoTableHtmlToJson( downloading );

                        let acctInfoRows = res.columns[ 0 ].getElementsByTagName( 'tr' );
                        let acctInfoCells = [];

                        for ( let i = 0; i < acctInfoRows.length; i++ )
                        {
                            let acctInfoCellsInRow = acctInfoRows[ i ].getElementsByTagName( 'td' );

                            for ( let j = 0; j < acctInfoCellsInRow.length; j++ )
                            {
                                acctInfoCells.push( acctInfoCellsInRow[ j ] );
                            }
                        }

                        return { acctInfoCells: acctInfoCells };
                    };

                    let accountInformationTable = accountInformationTableData();

                    let accountInformationTextContent = [];

                    let accountInformationTableCells = {

                        afterHoursContactNameData: 1,
                        afterHoursContactPhoneData: 2,
                        accessMethodData: 3,
                        accessMethodNotesData: 4,
                        alarmCodeData: 5,
                        alarmInstructionsData: 6,
                        alarmTriggeredProcedureData: 7,
                        suppliesLocationData: 8,
                        suppliesLocationNotesData: 10,
                        suppliesOrderedByData: 11,
                        suppliesVendorData: 12,
                        suppliesVendorInformationData: 13,
                        locationOfDumpsterData: 14,
                        recyclingProgramInformationData: 16,
                        specialInstructionsData: 17,
                        timeRestrictionsData: 18,
                        cleaningTime: 19,

                        cells: function ( data, position )
                        {
                            data = accountInformationTable.acctInfoCells[ position ]
                                .getElementsByTagName( 'span' )
                                .item( 2 ).textContent
                                .trim();

                            return {
                                data: data,
                                position: position
                            };
                        },
                        entries: function ( obj )
                        {
                            obj = Object.values( this );
                            let cells = -1;
                            let entry = "";

                            for ( let i = 0; i < Object.entries(
                                accountInformationTableCells ).length - 2; i++ )
                            {
                                cells++;

                                entry = accountInformationTableCells.cells( Object.entries(
                                    accountInformationTableCells )
                                    .at( cells ).at( cells ),
                                    obj[ i ] );

                                accountInformationTextContent
                                    .push( entry );
                            }
                        }
                    };

                    accountInformationTableCells.entries();

                    let customerItemTableData = () =>
                    {
                        let cells = [];

                        let customerItemsTable = document.getElementById( "customsublist35__tab" );

                        let customerItemsRows = customerItemsTable.getElementsByTagName( "tr" );

                        for ( i = 0; i < customerItemsRows.length; i++ )
                        {
                            let customerItemsCellsInRow = customerItemsRows[ i ].getElementsByTagName( "td" );

                            for ( j = 0; j < customerItemsCellsInRow.length; j++ )
                            {
                                cells.push( customerItemsCellsInRow[ j ] );

                            }
                        }

                        return { j: cells };
                    };

                    let customerTable = customerItemTableData();

                    let customerItemsTableCells = {
                        rate: '',
                        description: '',
                        nights: '',
                        frequency: '',
                        data: [],

                        cleaningServices: function ( type, rate, description, frequency, nights, bool, data = [] )
                        {
                            for ( val of customerTable.j )
                            {
                                if ( val.innerText.includes( type ) && val.innerText != 'Specialty Allowance Monthly' )
                                {
                                    rate = val.parentElement.children[ 3 ]?.innerText ?? "";
                                    description = val.parentElement.children[ 2 ]?.innerText ?? "";
                                    frequency = val.parentElement.children[ 5 ]?.innerText ?? "";
                                    nights = val.parentElement.children[ 6 ]?.innerText ?? "";
                                    data.push( [ rate, description, frequency, nights ] );
                                }
                                if ( val.innerText.includes( type ) && val.innerText == 'Specialty Allowance Monthly'
                                    && val.parentElement.children[ 4 ] == '' == bool )
                                {
                                    rate = val.parentElement.children[ 3 ]?.innerText ?? "";
                                    description = val.parentElement.children[ 2 ]?.innerText ?? "";
                                    frequency = val.parentElement.children[ 5 ]?.innerText ?? "";
                                    nights = val.parentElement.children[ 6 ]?.innerText ?? "";
                                    data.push( [ rate, description, frequency, nights ] );
                                }
                            }
                            return {
                                type: type,
                                rate: rate,
                                description: description,
                                frequency: frequency,
                                nights: nights,
                                data: data,
                            };
                        },
                    };

                    let cleaningServices = customerItemsTableCells
                        .cleaningServices( 'Cleaning Services',
                            customerItemsTableCells.rate,
                            customerItemsTableCells.description,
                            customerItemsTableCells.frequency,
                            customerItemsTableCells.nights,
                            customerItemsTableCells.data );

                    let dayPorter = customerItemsTableCells
                        .cleaningServices( 'Day Porter',
                            customerItemsTableCells.rate,
                            customerItemsTableCells.description,
                            customerItemsTableCells.frequency,
                            customerItemsTableCells.nights,
                        );

                    let discountItem = customerItemsTableCells
                        .cleaningServices( 'Discount Item',
                            customerItemsTableCells.rate,
                            customerItemsTableCells.description,
                            customerItemsTableCells.frequency,
                            customerItemsTableCells.nights,
                        );

                    let escrow = customerItemsTableCells
                        .cleaningServices( 'Specialty Allowance Monthly',
                            customerItemsTableCells.rate,
                            customerItemsTableCells.description,
                            customerItemsTableCells.frequency,
                            customerItemsTableCells.nights,
                            false
                        );

                    let specialty = customerItemsTableCells
                        .cleaningServices( 'Specialty Allowance Monthly',
                            customerItemsTableCells.rate,
                            customerItemsTableCells.description,
                            customerItemsTableCells.frequency,
                            customerItemsTableCells.nights,
                            true
                        );

                    let highest = '';
                    let other = [];

                    cleaningServices.data.forEach( ( item, i, list ) =>
                    {

                        if ( parseInt( list[ i ][ 0 ] ) < parseInt( list[ i - i ][ 0 ] ) )
                        {

                            highest = cleaningServices.data[ i ];
                            other.push( item );

                        }
                        else if ( parseInt( list[ i ][ 0 ] ) > parseInt( list[ i - i ][ 0 ] ) )
                        {

                            highest = cleaningServices.data[ i - i ];
                            other.push( item );

                        } else
                        {
                            highest = cleaningServices.data[ 0 ];
                        }

                    } );

                    let allCleaningServicesResults = [];

                    let firstColumn = null;

                    let secondColumn = null;

                    if ( cleaningServices.data.length > 1 )
                    {
                        for ( let i = 0; i < other.length; i++ )
                        {
                            allCleaningServicesResults
                                .push( '\n\nOther Cleaning Services - Monthly Amount: ' +
                                    other[ i ][ 0 ] + '\n\nDesc: ' +
                                    other[ i ][ 1 ] );
                        }
                    }
                    else
                    {
                        allCleaningServicesResults = '';
                    }

                    if ( allCleaningServicesResults.length / 2 % 1 == 0 )
                    {
                        firstColumn = allCleaningServicesResults.slice(
                            0, allCleaningServicesResults.length / 2 );

                        secondColumn = allCleaningServicesResults.slice(
                            allCleaningServicesResults.length / 2, allCleaningServicesResults.length );

                    }

                    function sortNights ()
                    {
                        let cleaningNights = highest[ 3 ].split( ',' );
                        let daysOfTheWeek = new Map();
                        let nights = [];

                        for ( let i = 0; i < cleaningNights.length; i++ )
                        {
                            switch ( cleaningNights[ i ] )
                            {
                                case "Monday":
                                    daysOfTheWeek.set(
                                        0, cleaningNights[ i ] );
                                    break;
                                case "Tuesday":
                                    daysOfTheWeek.set(
                                        1, cleaningNights[ i ] );
                                    break;
                                case "Wednesday":
                                    daysOfTheWeek.set(
                                        2, cleaningNights[ i ] );
                                    break;
                                case "Thursday":
                                    daysOfTheWeek.set(
                                        3, cleaningNights[ i ] );
                                    break;
                                case "Friday":
                                    daysOfTheWeek.set(
                                        4, cleaningNights[ i ] );
                                    break;
                                case "Saturday":
                                    daysOfTheWeek.set(
                                        5, cleaningNights[ i ] );
                                    break;
                                case "Sunday":
                                    daysOfTheWeek.set(
                                        6, cleaningNights[ i ] );
                                    break;
                                case "Weekend":
                                    daysOfTheWeek.set(
                                        7, cleaningNights[ i ] );
                                    break;
                                case "Any":
                                    daysOfTheWeek.set(
                                        8, cleaningNights[ i ] );
                                    break;
                                default:
                                    daysOfTheWeek.set(
                                        9, "" );
                            }
                        }

                        for ( let i = 0; i < 10; i++ )
                        {
                            if ( daysOfTheWeek.get( i ) == undefined )
                            {

                            } else
                            {
                                nights.push( daysOfTheWeek.get( i ) );
                            }
                        }
                        return nights.toString();
                    }

                    let nightsCleaned = sortNights();

                    const alertBox = require( 'N/ui/dialog' );

                    let dayPorterAlertResult = '';

                    let specialtyAlertResult = '';

                    let discountAlertResult = '';

                    let escrowAlertResult = '';

                    function showCertainAlertBoxes ()
                    {

                        // if ( escrow.rate != '' || escrow.description != '' )
                        // {
                        //     let escrowAlert = { title: 'Account Information PDF - Escrow Info', message: 'Would you like to include escrow information in the PDF?', buttons: [ { label: 'Yes', value: 1, id: 'escrowYes' }, { label: 'No', value: 2, id: 'escrowNo' } ] };

                        //     function escrowSuccess ( result )
                        //     {
                        //         console.log( 'Success with value: ' + result );
                        //         escrowAlertResult = result;
                        //         if ( escrowAlertResult == 2 ) { escrow.rate = ''; escrow.description = ''; }
                        //     }
                        //     function escrowFailure ( reason )
                        //     {
                        //         console.log( 'Failure: ' + reason );
                        //     }
                        //     alertBox.create( escrowAlert ).then( escrowSuccess ).catch( escrowFailure );

                        //     setTimeout( function ()
                        //     {
                        //         let msg2 = document.getElementsByClassName( 'uir-message-text' );
                        //         msg2[ 0 ].setAttribute( 'class', 'escrowClass' );
                        //         let boldEscrowMsg = document.getElementsByClassName( 'escrowClass' );
                        //         let subStringEscrow = boldEscrowMsg[ 0 ].innerHTML;
                        //         boldEscrowMsg[ 0 ].innerHTML = subStringEscrow.substring( 0, 25 ) + ' ' + '<span style="font-weight: bold">' + subStringEscrow.substring( 26, 32 ) + '</span>' + ' ' + subStringEscrow.substring( 33, 59 );

                        //     }, 100 );
                        // }

                        // if ( specialty.rate != '' || specialty.description != '' )
                        // {

                        //     let specialtyAlert = { title: 'Account Information PDF - Specialty Info', message: 'Would you like to include specialty information in the PDF?', buttons: [ { label: 'Yes', value: 1, id: 'specialtyYes' }, { label: 'No', value: 2, id: 'specialtyNo' } ] };

                        //     function specialtySuccess ( result )
                        //     {
                        //         console.log( 'Success with value: ' + result ); specialtyAlertResult = result;
                        //         if ( specialtyAlertResult == 2 ) { specialty.rate = ''; specialty.description = ''; }
                        //     }
                        //     function specialtyFailure ( reason )
                        //     {
                        //         console.log( 'Failure: ' + reason );
                        //     }

                        //     alertBox.create( specialtyAlert ).then( specialtySuccess ).catch( specialtyFailure );


                        //     let msg = document.getElementsByClassName( 'uir-message-text' );
                        //     msg[ 1 ].setAttribute( 'class', 'specialtyClass' );

                        //     let boldSpecialtyMsg = document.getElementsByClassName( 'specialtyClass' );
                        //     subStringSpecialty = boldSpecialtyMsg[ 0 ].innerHTML;
                        //     boldSpecialtyMsg[ 0 ].innerHTML = subStringSpecialty.substring( 0, 25 ) + ' ' + '<span style="font-weight: bold">' + subStringSpecialty.substring( 26, 35 ) + '</span>' + ' ' + subStringSpecialty.substring( 36, 59 );
                        // }

                        if ( dayPorter.rate != '' || dayPorter.description != '' )
                        {
                            let dayPorterAlert = {
                                title: 'Account Information PDF - Day Porter Info',
                                message: 'Would you like to include day porter information in the PDF?',
                                buttons: [ {
                                    label: 'Yes', value: 1, id: 'dayPorterYes'
                                },
                                {
                                    label: 'No', value: 2, id: 'dayPorterNo'
                                } ]
                            };

                            function dayPorterSuccess ( result )
                            {
                                console.log( 'Success with value: ' + result );

                                dayPorterAlertResult = result;

                                if ( dayPorterAlertResult == 2 )
                                {
                                    dayPorter.rate = ''; dayPorter.description = '';
                                }
                            }

                            function dayPorterFailure ( reason )
                            {
                                console.log( 'Failure: ' + reason );
                            }

                            alertBox.create( dayPorterAlert )
                                .then( dayPorterSuccess )
                                .catch( dayPorterFailure );

                            setTimeout( function ()
                            {
                                let msg3 = document.getElementsByClassName( 'uir-message-text' );

                                msg3[ 0 ].setAttribute( 'class', 'dayPorterClass' );

                                let boldDayPorterMsg = document.getElementsByClassName( 'dayPorterClass' );

                                let subStringDayPorter = boldDayPorterMsg[ 0 ].innerHTML;

                                boldDayPorterMsg[ 0 ].innerHTML = subStringDayPorter.substring( 0, 25 ) + ' ' +
                                    '<span style="font-weight: bold">' +
                                    subStringDayPorter.substring( 26, 36 ) +
                                    '</span>' + ' ' +
                                    subStringDayPorter.substring( 37, 59 );

                            }, 100 );
                        }

                        if ( discountItem.rate != '' || discountItem.description != '' )
                        {
                            let discountAlert = {
                                title: 'Account Information PDF - Discount Info',
                                message: 'Would you like to include discount information in the PDF?',
                                buttons: [ {
                                    label: 'Yes', value: 1, id: 'discountYes'
                                }, {
                                    label: 'No', value: 2, id: 'discountNo'
                                } ]
                            };

                            function discountSuccess ( result )
                            {
                                console.log( 'Success with value: ' + result );

                                discountAlertResult = result;

                                if ( discountAlertResult == 2 )
                                {
                                    discountItem.rate = ''; discountItem.description = '';
                                }
                            }

                            function discountFailure ( reason )
                            {
                                console.log( 'Failure: ' + reason );
                            }

                            alertBox.create( discountAlert )
                                .then( discountSuccess )
                                .catch( discountFailure );

                            setTimeout( function ()
                            {
                                let msg4 = document.getElementsByClassName( 'uir-message-text' );

                                msg4[ 0 ].setAttribute( 'class', 'discountClass' );

                                let boldDiscountMsg = document.getElementsByClassName( 'discountClass' );

                                let subStringDiscount = boldDiscountMsg[ 0 ].innerHTML;

                                boldDiscountMsg[ 0 ].innerHTML = subStringDiscount
                                    .substring( 0, 25 ) + ' ' +
                                    '<span style="font-weight: bold">' +
                                    subStringDiscount.substring( 26, 35 ) +
                                    '</span>' + ' ' +
                                    subStringDiscount.substring( 35, 58 );

                            }, 100 );
                        }

                        return {
                            //escrowSuccess: escrowSuccess,
                            //specialtySuccess: specialtySuccess,
                            dayPorterSuccess: dayPorterSuccess,
                            discountSuccess: discountSuccess
                        };
                    }

                    let setCertainAlertBoxesVisibility = showCertainAlertBoxes();

                    let alertOptions = setInterval( function ()
                    {

                        // if ( escrow.rate != '' || escrow.description != '' )
                        // {

                        //     setCertainAlertBoxesVisibility.escrowSuccess;
                        // }

                        // if ( specialty.rate != '' || specialty.description != '' )
                        // {

                        //     setCertainAlertBoxesVisibility.specialtySuccess;
                        // }
                        if (
                            discountItem.rate != '' ||
                            discountItem.description != '' )
                        {
                            setCertainAlertBoxesVisibility.discountSuccess;
                        }

                        if (
                            dayPorter.rate != '' ||
                            dayPorter.description != '' )
                        {

                            setCertainAlertBoxesVisibility.dayPorterSuccess;
                        }

                        if (
                            dayPorter.rate == '' &&
                            dayPorter.description == '' &&
                            discountItem.rate == '' &&
                            discountItem.description == '' )
                        {
                            populatePdfData();
                        }

                    }, 1000 );

                    let btns = document.getElementsByClassName( 'uir-message-buttons' );

                    btns[ 0 ]?.children?.item( 0 ).addEventListener(
                        'click', populatePdfData );

                    btns[ 0 ]?.children?.item( 1 ).addEventListener(
                        'click', populatePdfData );

                    function populatePdfData ()
                    {

                        let headerColumn = [ {
                            title: 'Buildingstars Customer Information Form',
                            dataKey: 'column1'
                        } ];

                        let headerRow = [ {
                            'column1': 'Outside Sales Rep: ' +
                                outsideSalesRep
                        } ];

                        let companyDataColumns = [ {
                            title: 'Company: ' +
                                companyName[ 0 ]?.innerText + '',
                            dataKey: 'column1'
                        },
                        {
                            title: 'Location: ' +
                                locationOfCustomer,
                            dataKey: 'column2'
                        } ];

                        let companyDataRows = [ {
                            'column1': 'Contact: ' +
                                primaryContact.value,

                            'column2': 'Contact Phone: ' +
                                primaryPhone.value
                        },
                        {
                            'column1': 'After Hours Contact: ' +
                                accountInformationTextContent[ 0 ].data,

                            'column2': 'After Hours Contact Phone: ' +
                                accountInformationTextContent[ 1 ].data
                        },
                        {
                            'column1': 'Cleaning Services - Monthly Amount: ' + highest[ 0 ] +
                                '\n\nDesc: ' + highest[ 1 ] +
                                '\n\nEst. Cleaning Time: ' +
                                accountInformationTextContent[ 16 ].data,

                            'column2': 'Discount Item: ' +
                                discountItem.rate + '\n\nDesc: ' +
                                discountItem.description
                        },
                        {
                            'column1': 'Nights Cleaned: ' + nightsCleaned,
                            'column2': 'Day Porter - Monthly Amount: ' + dayPorter.rate + '\n\nDesc: ' + dayPorter.description
                        },
                        {
                            'column1': 'Escrow - Monthly Amount: ' + '\n\nDesc: ',
                            'column2': 'Specialty - Monthly Amount: ' + '\n\nDesc: '
                        },
                        {
                            'column1': firstColumn ?? allCleaningServicesResults,
                            'column2': secondColumn ?? ''
                        } ];
                        // { 'column1': 'Specialty - Monthly Amount: ' + specialty.rate, 'column2': 'Specialty Detail: ' + specialty.description, }, { 'column1': 'Escrow - Monthly Amount: ' + escrow.rate, 'column2': 'Escrow Detail: ' + escrow.description } ];

                        let columns1 = [ {
                            title: 'Access Method: ' +
                                accountInformationTextContent[ 2 ].data + '',
                            dataKey: 'column1'
                        },
                        {
                            title: 'Access Method Notes: ' +
                                accountInformationTextContent[ 3 ].data + '',
                            dataKey: 'column2'
                        }
                        ];

                        let rows1 = [ {
                            'column1': 'Alarm Code: ' +
                                accountInformationTextContent[ 4 ].data,

                            'column2': 'Alarm Code Instructions: ' +
                                accountInformationTextContent[ 5 ].data
                        },
                        {
                            'column1': 'Alarm Triggered Procedure: ' +
                                accountInformationTextContent[ 6 ].data,

                            'column2': 'Time Restrictions: ' +
                                accountInformationTextContent[ 15 ].data
                        } ];

                        let columns2 = [ {
                            title: 'Supplies Location: ' +
                                accountInformationTextContent[ 7 ].data + '',
                            dataKey: 'column1'
                        },
                        {
                            title: 'Supplies Location Notes: ' +
                                accountInformationTextContent[ 8 ].data + '',
                            dataKey: 'column2'
                        } ];

                        let rows2 = [ {
                            'column1': 'Supplies Vendor: ' +
                                accountInformationTextContent[ 10 ].data,

                            'column2': 'Supplies Vendor Information: ' +
                                accountInformationTextContent[ 11 ].data
                        },
                        {
                            'column1': 'Supplies Ordered By: ' +
                                accountInformationTextContent[ 9 ].data
                        } ];

                        let columns3 = [ {
                            title: 'Location of Dumpster: ' +
                                accountInformationTextContent[ 12 ].data + '',
                            dataKey: 'column1'
                        },
                        {
                            title: 'Recycling Program Information: ' +
                                accountInformationTextContent[ 13 ].data + '',
                            dataKey: 'column2'
                        } ];

                        let columns4 = [ {
                            title: 'Special Instructions: ' +
                                accountInformationTextContent[ 14 ].data + '',
                            dataKey: 'column1'
                        } ];

                        doc.autoTable(
                            headerColumn, headerRow,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 2,
                                    fontSize: 27, halign: "left", fillColor: [ 48, 79, 156 ]
                                },
                                columnStyles: {
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    fontSize: 9, textColor: 20, fillColor: 255
                                },
                                alternateRowStyles: {
                                    fontSize: 9, halign: "left", textColor: 20, fillColor: 255
                                },
                                startY: 15,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        doc.autoTable(
                            companyDataColumns, companyDataRows,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 6,
                                    fontSize: 9, fillColor: [ 48, 79, 156 ]
                                },
                                columnStyles: {
                                    column1: { columnWidth: 285 },
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    textColor: 20, fillColor: 255
                                },
                                alternateRowStyles: {
                                    textColor: 20
                                },
                                startY: doc.autoTable.previous.finalY + 10,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        doc.autoTable(
                            columns1, rows1,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 6,
                                    fontSize: 9, fillColor: 255, textColor: 40, fontStyle: 'normal'
                                },
                                columnStyles: {
                                    column1: { columnWidth: 285 },
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    textColor: 20
                                },
                                alternateRowStyles: {
                                    textColor: 20
                                },
                                startY: doc.autoTable.previous.finalY + 10,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        doc.autoTable(
                            columns2, rows2,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 6,
                                    fontSize: 9, fillColor: 255, textColor: 40, fontStyle: 'normal'
                                },
                                columnStyles: {
                                    column1: { columnWidth: 285 },
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    textColor: 20
                                },
                                alternateRowStyles: {
                                    textColor: 20
                                },
                                startY: doc.autoTable.previous.finalY + 10,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        doc.autoTable(
                            columns3, res.rows,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 6,
                                    fontSize: 9, fillColor: 255, textColor: 40, fontStyle: 'normal'
                                },
                                columnStyles: {
                                    column1: { columnWidth: 285 },
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    textColor: 20
                                },
                                alternateRowStyles: {
                                    textColor: 20
                                },
                                startY: doc.autoTable.previous.finalY + 10,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        doc.autoTable(
                            columns4, res.rows,
                            {
                                theme: 'striped',
                                styles: {
                                    overflow: 'linebreak',
                                    columnWidth: 'auto', lineWidth: 1, cellPadding: 6,
                                    fontSize: 9, fillColor: 255, textColor: 40, fontStyle: 'normal'
                                },
                                columnStyles: {
                                    text: { columnWidth: 'auto' }
                                },
                                headerStyles: {},
                                bodyStyles: {
                                    textColor: 20
                                },
                                alternateRowStyles: {
                                    textColor: 20
                                },
                                startY: doc.autoTable.previous.finalY + 10,
                                margin: { top: 15, right: 15, bottom: 15, left: 15 },
                                pageBreak: 'auto', tableWidth: 'auto', showHeader: 'everyPage',
                                tableLineColor: 200, customerItemsTableLineWidth: 0,
                            } );

                        clearInterval( alertOptions );

                        doc.save( 'CustomerInformation.pdf' );

                        setButtonText.value = 'Download Account Information';

                        setSecondaryButtonText.value = 'Download Account Information';
                    }

                }, 1000 );

                pdfDataBuilder();
            }

            inner();
        }

        outer();
    }

    document.getElementById( 'custpage_pdfdownload' ).onclick = generatePdf;

    return { generatePdf: generatePdf };

} );
