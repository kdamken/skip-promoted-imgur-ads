chrome.extension.onMessage.addListener(function (request, sender, response) {
    if (request.type === 'tabUpdated') {
        var hasPromoted = document.querySelector('.promoted-tag');

        if (hasPromoted) {
            // check for the 'Next button, and click it if it's there to go to next page
            if (document.querySelector('.navNext')) {
                document.querySelector('.navNext').click();
            } else {

                // if not, the page might not be loaded all the way yet, so we'll add a short loop to check just in case it needs some more time
                var x = 0;
                var intervalID = setInterval(function () {

                    document.querySelector('.navNext').click();

                    if (document.querySelector('.navNext')) {
                        document.querySelector('.navNext').click();
                        window.clearInterval(intervalID);
                    }
                    
                    if (++x === 5) {
                        window.clearInterval(intervalID);
                    }
                }, 500);
            }
            
        }
    }
});