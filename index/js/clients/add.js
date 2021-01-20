var addClient = Class.create();
addClient.prototype = {
    initialize: function () {
        this._addIdLinkResponse = this._doAddClientId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idAddClientEventHandler = function () {
            jQuery('#addclient-form').on('submit', function (e) {
                this._idAddClientInit();
                this._addClientHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idAddClientInit = function () {
            this._id_addclient_name = jQuery.trim(jQuery("#id_addc_name").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idAddClientEventHandler();
    },

    /**
     * Reset password handler
     * @private
     */
    _addClientHandler: function () {
        var addClientUrl = jQuery( '#addclient-form' ).attr( 'action' );
        var parameters = {
            name : this._id_addclient_name
        };

        jQuery('#client-add-submit-button').hide();
        jQuery('#client-submit-button-ajax').show();

        new Ajax.Request(addClientUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._addIdLinkResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doAddClientId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#add-clients-results').html(result);
            jQuery('#client-add-submit-button').show();
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
 * Initiate object
 */
jQuery( document ).ready(function() {
    new addClient();
});