var deleteClient = Class.create();
deleteClient.prototype = {
    initialize: function () {
        this._deleteIdLinkResponse = this._dodeleteClientId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idDeleteClientEventHandler = function () {
            jQuery('#deleteclient-form').on('submit', function (e) {
                this._idDeleteClientInit();
                this._deleteClientHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idDeleteClientInit = function () {
            this._id_deletecleint_client_id = jQuery.trim(jQuery("#id_deletecleint_client_id").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idDeleteClientEventHandler();
    },

    /**
     * @private
     */
    _deleteClientHandler: function () {
        var deleteClientUrl = jQuery( '#deleteclient-form' ).attr( 'action' );
        var parameters = {
            id : this._id_deletecleint_client_id,
        };

        jQuery('#client-delete-submit-button').hide();
        jQuery('#client-submit-button-ajax').show();

        new Ajax.Request(deleteClientUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._deleteIdLinkResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _dodeleteClientId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#delete-clients-results').html(result);
            jQuery('#client-delete-submit-button').show();
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

/**
 * Initiate oject
 */
jQuery( document ).ready(function() {
    new deleteClient();
});