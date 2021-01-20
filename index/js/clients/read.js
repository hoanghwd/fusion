var readClient = Class.create();
readClient.prototype = {
    initialize: function () {
        this._readIdSectionResponse = this._doReadClientId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idreadClientEventHandler = function () {
            jQuery('#readclient-form').on('submit', function (e) {
                jQuery('#client-read-clear-results-button').show();
                this._idReadClientInit();
                this._readClientHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idReadClientInit = function () {
            this._id_readclient = jQuery.trim(jQuery("#id_readclient").val());
        };

        this._clearReadClient = function () {
            jQuery('#client-read-clear-results-button').on('click', function (e) {
                jQuery('#read-client-results').html('');
            });
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idreadClientEventHandler();
        this._clearReadClient();
    },

    /**
     * @private
     */
    _readClientHandler: function () {
        var readClientUrl = jQuery( '#readclient-form' ).attr( 'action' );
        var parameters = {
            id : this._id_readclient
        };

        jQuery('#client-submit-button-ajax').show();
        jQuery('#client-read-submit-button').hide();

        new Ajax.Request(readClientUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._readIdSectionResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doReadClientId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            if (data.success) {
                var result = '<table>' +
                                '<tr><td>ID</td><td>Name</td></tr>';
                for(var i = 0; i < data.body.length; i++ ) {
                    var record = data.body[i];
                    result +=   '<tr><td>' + record['id'] + '</td><td>' + record['name'] + '</td></tr>';
                }//for

                result += '</table>';
            }
            else {
                var result = '<div role="alert"> ' + data.message + '</div>';
            }
        }

        jQuery('#read-client-results').html(result);
        jQuery('#client-submit-button-ajax').hide();
        jQuery('#client-read-submit-button').show();
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
    new readClient();
});