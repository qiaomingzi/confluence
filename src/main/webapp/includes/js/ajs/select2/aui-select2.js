/**
 * Wraps a vanilla Select2 with ADG _style_, as an auiSelect2 method on jQuery objects.
 *
 * @since 5.2
 */
(function($) {

    /**
     * We make a copy of the original select2 so that later we might re-specify $.fn.auiSelect2 as $.fn.select2. That
     * way, calling code will be able to call $thing.select2() as if they were calling the original library,
     * and ADG styling will just magically happen.
     */
    var originalSelect2 = $.fn.select2;

    // AUI-specific classes
    var auiContainer = "aui-select2-container";
    var auiDropdown = "aui-select2-drop aui-dropdown2 aui-style-default";
    var auiHasAvatar = "aui-has-avatar";

    $.fn.auiSelect2 = function (first) {
        var updatedArgs;

        if($.isPlainObject(first)) {
            var auiOpts = $.extend({}, first);

            // *****IMPORTANT - don't put extra spaces in the cssClass options as it breaks select2 & FF
            var auiAvatarClass = auiOpts.hasAvatar ? " " + auiHasAvatar : "";
            //add our classes in addition to those the caller specified
            auiOpts.containerCssClass  = auiContainer + auiAvatarClass + (auiOpts.containerCssClass ? " " + auiOpts.containerCssClass : "");
            auiOpts.dropdownCssClass  = auiDropdown + auiAvatarClass + (auiOpts.dropdownCssClass  ? " " + auiOpts.dropdownCssClass : "");

            updatedArgs = Array.prototype.slice.call(arguments, 1);
            updatedArgs.unshift(auiOpts);
        } else if (!arguments.length) {
            updatedArgs = [{
                containerCssClass: auiContainer,
                dropdownCssClass: auiDropdown
            }];
        } else {
            updatedArgs = arguments;
        }

        return originalSelect2.apply(this, updatedArgs);
    };

})(AJS.$);