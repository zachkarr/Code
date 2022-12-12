/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define( [ 'N/ui/serverWidget', 'N/runtime' ], function ( serverWidget, runtime )
{

  function beforeLoad ( context )
  {

    try
    {

      var user = runtime.getCurrentUser();
      var role = user.role;
      var id = context.newRecord.id;


      if ( role == 1037 )
      {

        var hideButtons = context.form.addField( {
          id: 'custpage_hide_buttons',
          label: 'not shown - hidden',
          type: serverWidget.FieldType.INLINEHTML,
        } );

        var jquery = "jQuery('#tbl_customize').hide(); jQuery('#tbl_activityhistory.uir-button').hide(); jQuery('#newactcall').attr('value', 'Set Call Back'); jQuery('#logactcall').attr('value', 'Log New Phone Call'); jQuery('#logactevnt').attr('value', 'Complete Scheduled Call Back'); jQuery('#NS_MENU_ID0-item0').hide(); jQuery('#NS_MENU_ID0-item1').hide(); jQuery('#NS_MENU_ID0-item2').hide(); jQuery('#NS_MENU_ID0-item4').hide(); jQuery('#tbl_logactcall').insertBefore(jQuery('#tbl_newactcall')); jQuery('#tbl_logactevnt').insertAfter(jQuery('#tbl_newactcall')); jQuery('#tbl_newactevnt').insertAfter(jQuery('#tbl_logactevnt')); jQuery('#logactevnt').attr('onclick', ''); $(document).ready(function () { let table = document.getElementById('activities__tab'); let rows = table.children.item(1).children; for (var i = 0; i < rows.length; i++) { if (rows.item(i).innerText.includes('Scheduled')) { var ahref = rows.item(i).children.item(0).children.item(0).attributes.href.value; } }; if (ahref == null) { var e = document.getElementById('logactevnt'); e.disabled = true; e.className = 'button_color'; e.style.backgroundColor = 'grey'; }; $('#logactevnt').click(function () { if (ahref == null) { var e = document.getElementById('logactevnt'); e.disabled = true; e.className = 'button_color'; e.style.backgroundColor = 'grey'; } else if (ahref != null) { var win = nlOpenWindow(ahref, 'activitypopup', 'width=840,height=1000,resizable=yes,scrollbars=yes'); var pollTimer = window.setInterval(function () { var w = win.document.getElementsByClassName('title'); try { if (w[0].innerHTML == 'Confirmation') { window.clearInterval(pollTimer); win.close(); location.reload();}} catch (e) {}}, 200);}});}); jQuery('#newactcall').attr('onclick', ''); jQuery('#newactcall').click(function () { var win = nlOpenWindow('/app/crm/calendar/call.nl?l=T&invitee=" + id + "&company=" + id + "&refresh=activities', 'activitypopup', 'width=840,height=1000,resizable=yes,scrollbars=yes'); var pollTimer = window.setInterval(function () { var topSavedButton = win.document.getElementById('spn_multibutton_submitter'); var bottomSavedButton = win.document.getElementById('spn_secondarymultibutton_submitter'); try { topSavedButton.onclick = function reloadOnSaveTop() { window.clearInterval(pollTimer); location.reload();}} catch (e) {} try { bottomSavedButton.onclick = function reloadOnSaveTop() { window.clearInterval(pollTimer); location.reload();}} catch (e) {}}, 2000);})";

        hideButtons.defaultValue +=
          '<script>jQuery(function($){require([], function(){' + jquery + ';})})</script>';

      }

    } catch ( e ) { log.debug( 'error', e ); }
  }
  return { beforeLoad: beforeLoad };
} );

