function getUrlParam(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var dispatch = function(cmd,data){
    window.parent.postMessage({cmd:cmd,data:data}, '*');
};

window.addEventListener("load", function() {
    var title = getUrlParam("title");
    var description = getUrlParam("description");
    document.getElementById("dp-title").innerHTML = title;
    document.getElementById("dp-description").innerHTML = description;
    document.querySelector(".ginger-dp-close").onclick = function(){dispatch('definitionPopup.close');};
    document.querySelector(".ginger-dp-more").onclick = function(){dispatch('definitionPopup.definition',{text:title});};
    document.querySelector(".ginger-dp-title-synonyms").onclick = function(){dispatch('definitionPopup.synonyms',{text:title});};
    document.querySelector(".ginger-dp-title-translate").onclick = function(){dispatch('definitionPopup.translate',{text:title});};
});
