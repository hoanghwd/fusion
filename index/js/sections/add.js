var addSection = Class.create();
addSection.prototype = {
    initialize: function () {
        this._addIdSectionResponse = this._doAddSectionId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idAddSectionEventHandler = function () {
            jQuery('#addsection-form').on('submit', function (e) {
                this._idAddSectionInit();
                this._addSectionHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idAddSectionInit = function () {
            this._id_addsection_client_id = jQuery.trim(jQuery("#id_addsection_client_id").val());
            this._id_addclient_name = jQuery.trim(jQuery("#id_addclient_name").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idAddSectionEventHandler();
    },

    /**
     * Reset password handler
     * @private
     */
    _addSectionHandler: function () {
        var addSectionUrl = jQuery( '#addsection-form' ).attr( 'action' );
        var parameters = {
            clientId : this._id_addsection_client_id,
            name : this._id_addclient_name
        };

        jQuery('#section-add-submit-button').hide();
        jQuery('#section-submit-button-ajax').show();

        new Ajax.Request(addSectionUrl, {
            method: 'POST',
            parameters: parameters,
            onSuccess: this._addIdSectionResponse,
            onFailure: this._onFailure.bind(this)
        });
    },

    /**
     *
     * @param transport
     * @private
     */
    _doAddSectionId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#add-sections-results').html(result);
            jQuery('#section-add-submit-button').show();
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

/**
 * Initiate object
 */
jQuery( document ).ready(function() {
    new addSection();
});