var deleteSection = Class.create();
deleteSection.prototype = {
    initialize: function () {
        this._deleteIdLinkResponse = this._dodeleteSectionId.bindAsEventListener(this);

        /**
         * @return {undefined}
         */
        this._idDeleteSectionEventHandler = function () {
            jQuery('#deletesection-form').on('submit', function (e) {
                this._idDeleteSectionInit();
                this._deleteSectionHandler();
                return false;
            }.bind(this));
        };

        /**
         * @private
         */
        this._idDeleteSectionInit = function () {
            this._id_deletesection_section_id = jQuery.trim(jQuery("#id_deletesection_section_id").val());
        };

        /* Bind all events */
        this._bindEventHandlers();
    },

    _bindEventHandlers: function () {
        this._idDeleteSectionEventHandler();
    },

    /**
     * @private
     */
    _deleteSectionHandler: function () {
        var deleteSectionUrl = jQuery( '#deletesection-form' ).attr( 'action' );
        var parameters = {
            id : this._id_deletesection_section_id,
        };

        jQuery('#section-delete-submit-button').hide();
        jQuery('#section-submit-button-ajax').show();

        new Ajax.Request(deleteSectionUrl, {
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
    _dodeleteSectionId : function(transport) {
        if (transport && transport.status === 200) {
            var data = transport.responseText.evalJSON(true);
            var result = '<div role="alert"> ' + data.message + '</div>';

            jQuery('#delete-sections-results').html(result);
            jQuery('#section-delete-submit-button').show();
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
 * Initiate oject
 */
jQuery( document ).ready(function() {
    new deleteSection();
});