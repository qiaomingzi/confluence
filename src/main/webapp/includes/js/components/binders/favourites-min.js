(function(c){var e=[];var b=function(f){return f.hasClass("icon-remove-fav")};var a=function(g,i,h){var k=b(h),j=h.parent().find(".icon-wait"),f,l;if(i=="page"){f=Confluence.getContextPath()+"/json/"+(k?"removefavourite.action":"addfavourite.action");l={entityId:g}}if(i=="space"){f=Confluence.getContextPath()+"/json/"+(k?"removespacefromfavourites.action":"addspacetofavourites.action");l={key:g}}h.addClass("hidden");j.removeClass("hidden");AJS.safe.ajax({url:f,type:"POST",data:l,success:function(m){AJS.log(m);j.addClass("hidden");h.parent().find(k?".icon-add-fav":".icon-remove-fav").removeClass("hidden");delete e[g]},error:function(o,n,m){j.addClass("hidden");h.parent().find(k?".icon-remove-fav":".icon-add-fav").removeClass("hidden");AJS.log("Error Toggling Favourite: "+n);delete e[g]}})};var d=function(g,f){if(g.attr("data-favourites-bound")){return}g.delegate(".icon-add-fav, .icon-remove-fav","click",function(k){var i=c(k.target);var h,j=g.attr("data-entity-type");if(f&&f.getEntityId&&typeof f.getEntityId=="function"){h=f.getEntityId(i)}else{h=g.attr("data-entity-id")}if(e[h]){AJS.log("Already busy toggling favourite for "+j+" '"+h+"'. Ignoring request.");return}e[h]=true;a(h,j,i);return false});g.attr("data-favourites-bound",true)};AJS.Confluence.Binder.favourites=function(){c(".entity-favourites").each(function(){if(!c(this).attr("data-favourites-bound")){d(c(this),{})}})};c.fn.favourites=function(f){c(this).each(function(){var g=c(this);d(g,f)})}})(AJS.$);