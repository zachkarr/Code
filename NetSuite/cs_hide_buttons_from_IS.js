/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define( [ 'N/runtime' ],

    function ( runtime )
    {

        function pageInit ( scriptContext )
        {

            try
            {

                var user = runtime.getCurrentUser();
                var id = scriptContext.currentRecord.id;
                if ( scriptContext.currentRecord.getValue( 'customform' ) == '181' )
                {

                    console.log( id );
                    console.log( 'hiding view history' );

                    var viewHistory = document.getElementById( 'tr_activityhistory' );
                    viewHistory.style.display = 'none';

                    console.log( 'hiding log appointment' );

                    var leftArrow = document.getElementById( 'NS_MENU_ID0-item0' );
                    leftArrow.style.display = 'none';

                    var rightArrow = document.getElementById( 'NS_MENU_ID0-item1' );
                    rightArrow.style.display = 'none';

                    var list = document.getElementById( 'NS_MENU_ID0-item2' );
                    list.style.display = 'none';

                    var search = document.getElementById( 'NS_MENU_ID0-item4' );
                    search.style.display = 'none';

                    var logAppointment = document.getElementById( 'logactevnt' );
                    logAppointment.value = "Complete Scheduled Call Back";

                    document.getElementById( jQuery( '#tbl_logactcall' ).insertBefore( jQuery( '#tbl_newactcall' ) ) );
                    document.getElementById( jQuery( '#tbl_logactevnt' ).insertAfter( jQuery( '#tbl_newactcall' ) ) );
                    document.getElementById( jQuery( '#tbl_newactevnt' ).insertAfter( jQuery( '#tbl_logactevnt' ) ) );

                    var newPhoneCall = document.getElementById( 'newactcall' );
                    newPhoneCall.value = 'Set Call Back';

                    newPhoneCall.onclick = function reloadOnSetCallBack ()
                    {
                        var win = nlOpenWindow( "/app/crm/calendar/call.nl?l=T&invitee=" + id + "&company=" + id + "&refresh=activities", 'activitypopup', 'width=840,height=1000,resizable=yes,scrollbars=yes' );

                        var pollTimer = window.setInterval( function ()
                        {
                            var topSavedButton = win.document.getElementById( 'spn_multibutton_submitter' );
                            var bottomSavedButton = win.document.getElementById( 'spn_secondarymultibutton_submitter' );

                            try
                            {

                                topSavedButton.onclick = function reloadOnSaveTop ()
                                {
                                    window.clearInterval( pollTimer );
                                    location.reload();
                                };

                            } catch ( e )
                            {

                            }

                            try
                            {

                                bottomSavedButton.onclick = function reloadOnSaveTop ()
                                {
                                    window.clearInterval( pollTimer );
                                    location.reload();
                                };

                            } catch ( e )
                            {

                            }

                        }, 2000 );
                    };

                    var table = document.getElementById( 'activities__tab' );
                    var rows = table.children.item( 1 ).children;

                    for ( var i = 0; i < rows.length; i++ )
                    {

                        if ( rows.item( i ).innerText.includes( 'Scheduled' ) )
                        {

                            var ahref = rows.item( i ).children.item( 0 ).children.item( 0 ).attributes.href.value;

                        }

                    } console.log( ahref );

                    if ( ahref == null )
                    {

                        logAppointment.disabled = true;
                        logAppointment.className = 'button_color';
                        logAppointment.style.backgroundColor = 'grey';

                    } else if ( ahref != null )
                    {

                        logAppointment.onclick = function reloadOnCompleteCallBack ()
                        {
                            var win = nlOpenWindow( ahref, 'activitypopup', 'width=840,height=1000,resizable=yes,scrollbars=yes' );

                            var pollTimer = window.setInterval( function ()
                            {
                                var savedWasClicked = win.document.getElementsByClassName( 'title' );

                                try
                                {

                                    if ( savedWasClicked[ 0 ].innerHTML == 'Confirmation' )
                                    {
                                        window.clearInterval( pollTimer );
                                        win.close();
                                        location.reload();
                                    }

                                } catch ( e )
                                {

                                }
                            }, 200 );
                        };
                    };
                }

            } catch ( e )
            {

                console.log( "error on load", e.message );

            }
        }

        return { pageInit: pageInit, };
    } );