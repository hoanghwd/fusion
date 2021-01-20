/**
 *
 * @param formId
 */
function editClientForm(formId)
{
    new editClient(formId);
}

var editClient = Class.create();
editClient.prototype = {
    initialize: function (formId) {
        this._formId = '#editclient-form-' + formId;
        this._rowId = formId;
        this._editIdClientResponse = this._doEditClientId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idEditClientEventHandler = function () {
            jQuery(this._formId).on('submit', function (e) {
                this._idEditClientInit();
                this._editClientHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idEditClientInit = function () {
            this._id_client_id = jQuery.trim(jQuery("#client-edit-Id-row-" + formId).val());
            this._name = jQuery.trim(jQuery("#edit-name-row-" + formId).val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idEditClientEventHandler();
    },

    /**
     * @private
     */
    _editClientHandler: function () {
        var editClientUrl = jQuery( this._formId ).attr( 'action' );
        var parameters = {
            clientId : this._id_client_id,
            name : this._name
        };

        jQuery('#client-edit-submit-button-' + this._rowId).hide();
        jQuery('#client-submit-button-ajax').show();

        new Ajax.Request(editClientUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._editIdClientResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doEditClientId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#client-edit-row-result-' + this._rowId).html(result);
            jQuery('#client-edit-submit-button-' + this._rowId).show();
            jQuery('#client-submit-button-ajax').hide();
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
