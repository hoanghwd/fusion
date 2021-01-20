/**
 *
 * @param formId
 * @returns {boolean}
 */
function editSectionForm(formId)
{
    new editSection(formId);
}

var editSection = Class.create();
editSection.prototype = {
    initialize: function (formId) {
        this._formId = '#editsection-form-' + formId;
        this._rowId = formId;
        this._editIdSectionResponse = this._doEditSectionId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idEditSectionEventHandler = function () {
            jQuery(this._formId).on('submit', function (e) {
                this._idEditSectionInit();
                this._editSectionHandler();

                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idEditSectionInit = function () {
            this._id_editsection_client_id = jQuery.trim(jQuery("#clientId-row-" + formId).val());
            this._id_editsection_name = jQuery.trim(jQuery("#clientId-name-row-" + formId).val());
        };


        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idEditSectionEventHandler();
    },

    /**
     * @private
     */
    _editSectionHandler: function () {
        var editSectionUrl = jQuery( this._formId ).attr( 'action' );

        var parameters = {
            sectionId : jQuery.trim(jQuery("#edit-sectionId-row-" + this._rowId).val()),
            clientId : this._id_editsection_client_id,
            name : this._id_editsection_name
        };

        jQuery('#section-edit-submit-button-' + this._rowId).hide();
        jQuery('#section-submit-button-ajax').show();

        new Ajax.Request(editSectionUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._editIdSectionResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doEditSectionId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#section-edit-row-result-' + this._rowId).html(result);
            jQuery('#section-edit-submit-button-' + this._rowId).show();
            jQuery('#section-submit-button-ajax').hide();
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