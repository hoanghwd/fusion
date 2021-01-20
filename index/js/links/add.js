var addLink = Class.create();
addLink.prototype = {
    initialize: function () {
        this._addIdLinkResponse = this._doAddLinkId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idAddLinkEventHandler = function () {
            jQuery('#addlink-form').on('submit', function (e) {
                this._idAddLinkInit();
                this._addLinkHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idAddLinkInit = function () {
            this._id_addlink_section_id = jQuery.trim(jQuery("#id_addlink_section_id").val());
            this._id_addlink_name = jQuery.trim(jQuery("#id_addlink_name").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idAddLinkEventHandler();
    },

    /**
     * Reset password handler
     * @private
     */
    _addLinkHandler: function () {
        var addLinkUrl = jQuery( '#addlink-form' ).attr( 'action' );
        var parameters = {
            sectionId : this._id_addlink_section_id,
            name : this._id_addlink_name
        };

        jQuery('#link-add-submit-button').hide();
        jQuery('#link-submit-button-ajax').show();

        new Ajax.Request(addLinkUrl, {
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
    _doAddLinkId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#add-links-results').html(result);
            jQuery('#link-add-submit-button').show();
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
 * Initiate object
 */
jQuery( document ).ready(function() {
    new addLink();
});