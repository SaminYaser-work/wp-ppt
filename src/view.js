import domReady from '@wordpress/dom-ready';

const $ = jQuery;

function requestFullScreen() {
    const element = document.querySelector('body');
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

domReady(() => {
    $('.ppt-slide-button').click(function() {
        const slides = $('.wp-block-ppt-slide');

        if (slides.length === 0) {
            alert('No slides found.');
            return;
        }

        const bgDiv = $('<div class="ppt-bg-div"></div>');

        let currentSlide = -1;

        $('body').append(bgDiv);

        function replaceContent(elem) {
            // const slideWrapper = $('<div class="ppt-slide-content"></div>');
            // slideWrapper.append(elem);
            bgDiv.html(elem);
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            const slide = slides.eq(currentSlide);
            replaceContent(slide);
        }

        function previousSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slides.length - 1;
            }
            const slide = slides.eq(currentSlide);
            replaceContent(slide);
        }

        function stopPresentation() {
            currentSlide = -1;
            bgDiv.remove();
            $('#wpadminbar').show();
        }

        // Start presentation.
        nextSlide();
        $('#wpadminbar').hide();

        $(document).on('keydown', function(e) {
            switch (e.keyCode) {
                case 37:
                    previousSlide();
                    break;
                case 39:
                    nextSlide();
                    break;
                case 27:
                    stopPresentation();
                    break;
            }
        });

        requestFullScreen();
    });
})