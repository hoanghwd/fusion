/**
 *
 * @param formId
 * @returns {boolean}
 */
function editLinkForm(formId)
{
    new editLink(formId);
}

var editLink = Class.create();
editLink.prototype = {
    initialize: function (formId) {
        this._formId = '#editlink-form-' + formId;
        this._rowId = formId;
        this._editIdLinkResponse = this._doEditLinkId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idEditLinkEventHandler = function () {
            jQuery(this._formId).on('submit', function (e) {
                this._idEditLinkInit();
                this._editLinkHandler();

                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idEditLinkInit = function () {
           this._id_editlink_section_id = jQuery.trim(jQuery("#sectionId-row-" + formId).val());
           this._id_editlink_name = jQuery.trim(jQuery("#name-row-" + formId).val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idEditLinkEventHandler();
    },

    /**
     * @private
     */
    _editLinkHandler: function () {
        var editLinkUrl = jQuery( this._formId ).attr( 'action' );
        var parameters = {
            linkId : jQuery.trim(jQuery("#linkId-row-" + this._rowId).val()),
            sectionId : this._id_editlink_section_id,
            name : this._id_editlink_name
        };

        jQuery('#link-edit-submit-button-' + this._rowId).hide();
        jQuery('#link-submit-button-ajax').show();

        new Ajax.Request(editLinkUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._editIdLinkResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doEditLinkId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#edit-row-result-' + this._rowId).html(result);
            jQuery('#link-edit-submit-button-' + this._rowId).show();
            jQuery('#link-submit-button-ajax').hide();
        }
    },

    /**
     * On the event of failure, browser will come back the original page
     * @private
     */
    _onFailure: function () {
        location.href = encodeURI(window.location.href);
    }
};