/**
 *
 * @param formId
 * @param id
 */
function showHideEditRow(formId, id) {
    var rowId = '#edit-' + formId + '-row-' + id;
    var itemCounts = jQuery('#edit-' + formId + '-item-counts').val();

    //Of closed then Open
    if (jQuery(rowId).css('display') == 'none') {
        jQuery(rowId).show();
        jQuery('#edit' + formId + '-form-' + id + '-active').val(1);

        //Close and set 0 everyone else
        for( var i = 0; i < itemCounts; i++ ) {
            if( i != id ) {
                var myRowId = '#edit-' + formId + '-row-' + i;
                jQuery(myRowId).hide();
                jQuery('#edit' + formId + '-form-' + i + '-active').val(0);
            }//if
        }//for
    }
    //If collapse
    else {
        jQuery(rowId).hide();
        jQuery('#edit' + formId + '-form-' + id + '-active').val(0);
        jQuery('#' + formId +'-edit-row-result-' + id).html('');
    }
}

/**
 *
 * @param wsId
 */
function showHideWS(wsId) {
    var wsEle = '#' + wsId;
    if (jQuery(wsEle).css('display') == 'none') {
        jQuery(wsEle).show();
    }
    else {
        jQuery(wsEle).hide();
    }
}