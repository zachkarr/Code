/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define( [ 'N/runtime', 'N/file', 'N/render', 'N/query', 'N/ui/serverWidget', 'N/encode', 'N/xml' ], function ( runtime, file, render, query, serverWidget, encode, xml )
{
    function beforeLoad ( context )
    {
        try
        {
            var button = context.form.addButton( {
                id: 'custpage_pdfdownload',
                label: 'Download Account Information'
            } );
            var printPDF = context.form.addField( {
                id: 'custpage_print_pdf',
                label: 'not shown - hidden',
                type: serverWidget.FieldType.INLINEHTML,
            } );
            var jquery =
                "var h2c = document.createElement( 'script' ); h2c.setAttribute( 'src', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.0/html2canvas.min.js' ); document.getElementById( 'custpage_pdfdownload' ).appendChild( h2c ); var jsp = document.createElement( 'script' ); jsp.setAttribute( 'src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js' ); document.getElementById( 'custpage_pdfdownload' ).appendChild( jsp ); var jsp2 = document.createElement('script'); jsp2.setAttribute( 'src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.1/jspdf.plugin.autotable.min.js' ); document.getElementById( 'custpage_pdfdownload' ).appendChild( jsp2 ); console.log( 'jsp', jsp ); console.log( 'jsp2', jsp2 ); document.getElementById('custom176_form').children.item(0).setAttribute('id', 'pdfDownloader'); async function generatePdf (){ document.getElementById( 'custpage_pdfdownload' ).innerHTML = 'Downloading now..'; var downloading = document.getElementById('pdfDownloader'); var doc = new jsPDF(); var res = doc.autoTableHtmlToJson(downloading); console.log('res', res); console.log('res.data', res.data); console.log('res.columns', res.columns); doc.autoTable(res.columns, res.data, {}); doc.save( 'document.pdf' ); document.getElementById( 'custpage_pdfdownload' ).innerHTML = 'Download Account Information PDF';} document.getElementById( 'custpage_pdfdownload' ).onclick = generatePdf";

            printPDF.defaultValue +=
                '<script>jQuery(function($){require([], function(){' + jquery + ';})})</script>';

        } catch ( e )
        {
            log.debug( 'error', e );
        }
    }
    return { beforeLoad: beforeLoad };
} );

var jsp = document.createElement( 'script' ); jsp.setAttribute( 'src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js' ); document.getElementById( 'custpage_pdfdownload' ).appendChild( jsp ); var jsp2 = document.createElement( 'script' ); jsp2.setAttribute( 'src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.1/jspdf.plugin.autotable.min.js' ); document.getElementById( 'custpage_pdfdownload' ).appendChild( jsp2 ); console.log( 'jsp', jsp ); console.log( 'jsp2', jsp2 );

var downloading = document.getElementById( 'pdfDownloader' ); var doc = new jsPDF(); var res = doc.autoTableHtmlToJson( downloading ); console.log( 'res', res ); console.log( 'res.data', res.data ); console.log( 'res.columns', res.columns ); var columns = [ res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ), res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ) ]; doc.autoTable( columns, res.data, { styles: { fillColor: [ 252, 252, 252 ], textColor: [ 0, 0, 0 ], fontSize: 11, font: "times" }, columnStyles: { 0: { halign: 'center', fillColor: [ 0, 0, 0 ] } }, margin: { top: 20, left: 10, right: 0 } } ); doc.save( 'document.pdf' );


var afterHoursContactName = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var afterHoursContactNameData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var afterHoursContactPhone = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var afterHoursContactPhoneData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var accessMethod = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 2 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var accessMethodData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 2 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var accessMethodNotes = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 3 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var accessMethodNotesData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 3 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var alarmCode = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 4 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var alarmCodeData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 4 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var alarmInstructions = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 5 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var alarmInstructionsData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 5 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var alarmTriggeredProcedure = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 6 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var alarmTriggeredProcedureData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 6 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var suppliesLocation = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 7 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var suppliesLocationData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 7 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var suppliesLocationNotes = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var suppliesLocationNotesData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var suppliesOrderedBy = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var suppliesOrderedByData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var suppliesVendor = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 2 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var suppliesVendorData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 2 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var suppliesVendorInformation = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 3 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var suppliesVendorInformationData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 3 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var locationOfDumpster = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 4 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var locationOfDumpsterData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 4 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var recyclingProgramCheckBox = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 5 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var recyclingProgram = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 5 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var recyclingProgramInformation = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 6 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var recyclingProgramInformationData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 6 ).children.item( 0 ).children.item( 0 ).children.item( 1 );
var specialInstructions = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 7 ).children.item( 0 ).children.item( 0 ).children.item( 0 );
var specialInstructionsData = res.columns[ 0 ].children.item( 0 ).children.item( 0 ).children.item( 0 ).children.item( 1 ).children.item( 0 ).children.item( 0 ).children.item( 7 ).children.item( 0 ).children.item( 0 ).children.item( 1 );



//https://unpkg.com/browse/jspdf-autotable@2.0.8/README.md