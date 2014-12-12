/**
 * AUI Overrides
 *
 * As new versions of AUI are implemented, this JS
 * should be reviewed and adjusted as appropriate.
 */
(function () {
    if (typeof AJS != "undefined") {
        /**
         * Find parameters in the DOM and store them in the ajs.params object.
         *
         * Override the AUI version so we can patch in AJS.Meta meta tag values for old scripts still using
         * AJS.params that *should* be using AJS.Meta.
         */
        var origPopulateParameters = AJS.populateParameters;

        AJS.populateParameters = function () {
            origPopulateParameters.apply(AJS, arguments);

            AJS.$("meta[name^=ajs-]").each(function () {
                var key = this.name,
                    value = this.content;

                // convert name from ajs-foo-bar-baz format to fooBarBaz format.
                key = key.substring(4).replace(/(-\w)/g, function(s) {
                    return s.charAt(1).toUpperCase();
                });
                // Only set if not already defined
                if (typeof AJS.params[key] == "undefined") {
                    AJS.params[key] = AJS.asBooleanOrString(value);
                }
            });
        };
    }

    /**
     * @aui-override Disable element extension to AJS.$
     *
     * @date 2009-09-23
     * @author dtaylor
     * @since confluence-3.1-m5
     *
     * @param element
     */
    AJS.$.fn.disable = function(element) {
        return this.each(function() {
            var el = AJS.$(this);
            var id = el.prop("disabled", true).addClass("disabled").attr("id");
            if (id) {
                // Only search in the parent - element might not exist in the DOM yet.
                AJS.$("label[for=" + id + "]", el.parent()).addClass("disabled");
            }
        });
    };

    /**
     * @aui-override Enable element extension to AJS.$
     *
     * @date 2009-09-23
     * @author dtaylor
     * @since confluence-3.1-m5
     *
     * @param element
     */
    AJS.$.fn.enable = function(element) {
        return this.each(function() {
            var el = AJS.$(this);
            var id = el.attr("disabled", false).removeClass("disabled").attr("id");
            if (id) {
                AJS.$("label[for=" + id + "]", el.parent()).removeClass("disabled");
            }
        });
    };

    /**
     * @aui-override Debounce function wrapper that ensures a function is not called more often than specified in delay.
     * A little bird told me that AUI is going to include underscore.js. Once it does, we can use underscore's version.
     *
     * @date 2012-06-20
     * @author nbhawnani
     * @since confluence-4.2.8
     *
     * @param delay Call the function exactly once in this amount of time.
     * @param callback The function to be debounced
     * @return A function that wraps the callback that calls the given function once per time period specified in delay.
     */
    AJS.$.debounce = function(callback, delay) {
        var timeoutId;
        return function() {
            var that = this, args = arguments;
            // if a timeout is already set, it means we've been called before the timeout expired
            if (timeoutId) {
                // discard the old timeout
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
            // create another one
            timeoutId = setTimeout(function() {
                callback.apply(that, args);
                timeoutId = undefined;
            }, delay);
        };
    };

})();