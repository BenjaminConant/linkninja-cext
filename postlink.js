function postLink() {
	var postTo = "http://localhost:9000/api/links"
	var bkg = chrome.extension.getBackgroundPage();
	var linkData = { _id: "5521951e74f83e6eab37ce6f"};
	

	chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    	var url = tabs[0].url;
    	linkData.url = url;
    	bkg.console.log(url);

    	$.ajax({
	    	type: "POST",
	    	url: postTo,
	    	data: JSON.stringify(linkData),
	    	contentType: "application/json; charset=utf-8",
	    	dataType: "json",
	    	success: function(data){bkg.console.log(data);},
	    	failure: function(errMsg) {
	        	bkg.console.log(errMsg);
	    	}
		});

	});



}
chrome.browserAction.onClicked.addListener(postLink);
