var deleteLink = Class.create();
deleteLink.prototype = {
    initialize: function () {
        this._deleteIdLinkResponse = this._doDeleteLinkId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idDeleteLinkEventHandler = function () {
            jQuery('#deletelink-form').on('submit', function (e) {
                this._idDeleteLinkInit();
                this._deleteLinkHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idDeleteLinkInit = function () {
            this._id_deletelink_link_id = jQuery.trim(jQuery("#id_deletelink_link_id").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idDeleteLinkEventHandler();
    },

    /**
     * @private
     */
    _deleteLinkHandler: function () {
        var deleteLinkUrl = jQuery( '#deletelink-form' ).attr( 'action' );
        var parameters = {
            id : this._id_deletelink_link_id,
        };

        jQuery('#link-delete-submit-button').hide();
        jQuery('#link-submit-button-ajax').show();

        new Ajax.Request(deleteLinkUrl, {
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
    _doDeleteLinkId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#delete-links-results').html(result);
            jQuery('#link-delete-submit-button').show();
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

/**
 * Initiate oject
 */
jQuery( document ).ready(function() {
    new deleteLink();
});