AJS.toInit(function ($) {

    var $aboutLink = $("#confluence-about-link"),
        $aboutDialog;

    var createAboutDialog = function() {
        var minorVersion =  AJS.Meta.get("version-number").match(/^\d+\.\d+/),
            header = AJS.I18n.getText("aboutpage.section.title", minorVersion),
            contentUrl = AJS.Meta.get("context-path") + "/aboutconfluence.action",
            $dialog = new AJS.ConfluenceDialog({
                id: 'about-confluence-dialog',
                closeOnOutsideClick: true
            });

        $dialog.addHeader(header);
        $dialog.addCancel(AJS.I18n.getText("close.name"), function() {
            $dialog.hide();
        });

        $.get(contentUrl, function (data) {
            $dialog.addPanel("default", data, "about-page-content");
        });

        return $dialog;
    };

    $aboutLink.click(function (e) {
        e.preventDefault();
        AJS.$(document).focus();
        if ($aboutDialog == null) {
            $aboutDialog = createAboutDialog();
        }
        $aboutDialog.show();
    });
});