(function ($) {
    if (!$) return;

    $.fn.ready(function() {
        $(document).bind("long-running-task-complete", function () {
            $("#wait-spinner").hide();
        });

        $(document).bind("long-running-task-failed", function () {
            $("#wait-spinner").hide();
            $("#task-elapsed-time-label").hide();
            $("#taskElapsedTime").hide();
        });

        var mySQLWarningMessage = $('#db-choice-warning');
        var mySQLErrorMessage = $('#mysql-db-choice-error');

        $('select[name=dbChoiceSelect]').change(function() {
            if ($(this).val() === 'mysql') {
                mySQLErrorMessage.hide();
                mySQLWarningMessage.show();
            } else {
                mySQLWarningMessage.hide();
                mySQLErrorMessage.hide();
                $('.aui-message.error').hide();
            }
        });

        if ($('#mysql-db-choice-error').length) { //implies *not* zero
            $('select[name=dbChoiceSelect]').val("mysql");
        }

    });
})(AJS && AJS.$);