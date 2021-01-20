var readSection = Class.create();
readSection.prototype = {
    initialize: function () {
        this._readIdSectionResponse = this._doReadSectionId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idReadSectionEventHandler = function () {
            jQuery('#readsection-form').on('submit', function (e) {
                jQuery('#section-read-clear-results-button').show();
                this._idReadSectionInit();
                this._readSectionHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idReadSectionInit = function () {
            this._id_readsection = jQuery.trim(jQuery("#id_readsection").val());
        };

        this._clearReadSection = function () {
            jQuery('#section-read-clear-results-button').on('click', function (e) {
                jQuery('#read-sections-results').html('');
            });
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idReadSectionEventHandler();
        this._clearReadSection();
    },

    /**
     * Reset password handler
     * @private
     */
    _readSectionHandler: function () {
        var readSectionUrl = jQuery( '#readsection-form' ).attr( 'action' );
        var parameters = {
            id : this._id_readsection
        };

        jQuery('#section-submit-button-ajax').show();
        jQuery('#section-read-submit-button').hide();

        new Ajax.Request(readSectionUrl, {
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
    _doReadSectionId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            if (data.success) {
                var result = '<table>' +
                    '<tr><td>ID</td><td>Client Id</td><td>Name</td></tr>';
                for(var i = 0; i < data.body.length; i++ ) {
                    var record = data.body[i];
                    result += '<tr><td>' + record['id'] + '</td><td>' + record['client_id'] + '</td><td>' + record['name'] + '</td></tr>';
                }//for

                result += '</table>';
            }
            else {
                var result = '<div role="alert"> ' + data.message + '</div>';
            }
        }

        jQuery('#read-sections-results').html(result);
        jQuery('#section-submit-button-ajax').hide();
        jQuery('#section-read-submit-button').show();
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
    new readSection();
});