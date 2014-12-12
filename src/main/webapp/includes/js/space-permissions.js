AJS.Confluence.SpacePermissions = {
    updateField: function(id, valueToAdd) {
        var input = AJS.$("#" + id);
        if (valueToAdd != ""){
            var val = input.val();
            input.val(val == "" ? valueToAdd : val + ", " + valueToAdd);
        }
    },
    updateGroupsField: function(groups) {
        AJS.Confluence.SpacePermissions.updateField("groups-to-add-autocomplete", groups);
    },
    updateUsersField: function(users) {
        AJS.Confluence.SpacePermissions.updateField("users-to-add-autocomplete", users);
    },
    setPermissionsState: function(entity, identifier, state) {
        identifier = identifier.replace(/'/g,"\\'");
        AJS.$("table#" + entity + "PermissionsTable input[type='checkbox'][name$='_" + identifier + "']").each(function () {
            this.checked = state;
        });
    }
};
AJS.$(document).ready(function () {
    var $selectOptions = AJS.$("#select-options");

    AJS.$(".perms-dropdown-trigger").click(function () {
        var trigger = AJS.$(this);
        $selectOptions.data("entity", trigger.data("entity")).data("name", trigger.data("name"));
    });

    $selectOptions.find("a").click(function (e) {
        var $this = AJS.$(this);
        var state = "";
        if ($this.hasClass("select-all")) {
            state = "checked";
        }
        AJS.Confluence.SpacePermissions.setPermissionsState($selectOptions.data("entity"), $selectOptions.data("name"), state);
        e.preventDefault();
    });
});