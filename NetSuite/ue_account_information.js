/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define( [ 'N/runtime', 'N/ui/serverWidget' ], function ( runtime, serverWidget )
{
    function beforeLoad ( context )
    {
        try
        {
            if ( context.type == context.UserEventType.EDIT )
            {
                return;
            }

            let user = runtime.getCurrentUser();
            let role = user.role;
            let id = user.id;

            //1038 is outside sales, 1040 is account manager
            if ( id == 1469541 || id == 413375 )
            {
                context.form.clientScriptModulePath = '/SuiteScripts/Zach Dev/cs_account_information.js';
                let button = context.form.addButton( {
                    id: 'custpage_pdfdownload',
                    label: 'Download Account Information',
                    functionName: 'generatePdf()'
                } );
                let printPDF = context.form.addField( {
                    id: 'custpage_print_pdf',
                    label: 'not shown - hidden',
                    type: serverWidget.FieldType.INLINEHTML,

                } );
            }

        } catch ( e )
        {
            log.debug( 'error', e );
        }
    }
    return { beforeLoad: beforeLoad };
} );
