AJS.toInit(function(d){var c=d("#create-group-form");var a=d("#switch-button");c.hide();var b=function(){c.toggle();d("#group-list").toggle()};a.toggle(function(){b();a.text(d("#i18n-cancel-add").val());return false},function(){b();a.text(d("#i18n-add-group").val());d(".error").remove();return false});d("#cancel-button").click(function(){a.click()});if(d("#fielderrors-empty").val()==="false"){a.click()}});