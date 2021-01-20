var readLinks = Class.create();
readLinks.prototype = {
    initialize: function () {
        this._readIdLinkResponse = this._doReadLinkId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idReadLinkEventHandler = function () {
            jQuery('#readlink-form').on('submit', function (e) {
                jQuery('#link-read-clear-results-button').show();
                this._idReadLinkInit();
                this._readLinkHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idReadLinkInit = function () {
            this._id_readlink = jQuery.trim(jQuery("#id_readlink").val());
        };

        this._clearReadLink = function () {
            jQuery('#link-read-clear-results-button').on('click', function (e) {
                jQuery('#read-links-results').html('');
            });
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idReadLinkEventHandler();
        this._clearReadLink();
    },

    /**
     * Reset password handler
     * @private
     */
    _readLinkHandler: function () {
        var readLinkUrl = jQuery( '#readlink-form' ).attr( 'action' );
        var parameters = {
            id : this._id_readlink
        };

        jQuery('#link-submit-button-ajax').show();
        jQuery('#link-read-submit-button').hide();

        new Ajax.Request(readLinkUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._readIdLinkResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doReadLinkId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            if (data.success) {
                var result = '<table>' +
                                '<tr><td>ID</td><td>Section Id</td><td>Name</td></tr>';
                for(var i = 0; i < data.body.length; i++ ) {
                    var record = data.body[i];
                    result += '<tr><td>' + record['id'] + '</td><td>' + record['section_id'] + '</td><td>' + record['name'] + '</td></tr>';
                }//for

                result += '</table>';
            }
            else {
                var result = '<div role="alert"> ' + data.message + '</div>';
            }
        }

        jQuery('#read-links-results').html(result);
        jQuery('#link-submit-button-ajax').hide();
        jQuery('#link-read-submit-button').show();
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
    new readLinks();
});