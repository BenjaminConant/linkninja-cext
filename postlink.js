function postLink() {
	var domain = "http://localhost:9000";
	var postTo = "http://localhost:9000/api/links"
	var bkg = chrome.extension.getBackgroundPage();
	var linkData = {};
	
	chrome.cookies.get({"url": domain, "name": "id"}, function(cookie) {
        bkg.console.log("this is the cookie", cookie);
        bkg.console.log("this is the id", cookie.value);
        // bkg.console.log("this is the actual id", JSON.parse(cookie.value)); ///.split('%')[1]);					
    	linkData._id =  cookie.value.split('%22')[1];
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




    });

	




}
chrome.browserAction.onClicked.addListener(postLink);
