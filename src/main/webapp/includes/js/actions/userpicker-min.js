AJS.toInit(function(b){var a=function(){b("#user-search-section").show();b("#membership-search-section").hide();b("#user-tab").parent().addClass("current");b("#membership-tab").parent().removeClass("current");b("#searchTerm").select();return false};var c=function(){b("#membership-search-section").show();b("#user-search-section").hide();b("#membership-tab").parent().addClass("current");b("#user-tab").parent().removeClass("current");b("#groupTerm").select();return false};b("#user-tab").click(a).click(function(){b("#search-results").hide()});b("#membership-tab").click(c).click(function(){b("#search-results").hide()});if(b("#user-search").val()==="true"){a()}else{c()}});