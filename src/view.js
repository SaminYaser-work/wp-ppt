/** @format */

import domReady from "@wordpress/dom-ready";
import "./transit";
import { requestFullScreen } from "./utils";

const $ = jQuery;

domReady(() => {
    $(".ppt-slide-button").on("click", function () {
        const slides = $(".wp-block-ppt-slide");

        if (slides.length === 0) {
            alert("No slides found.");
            return;
        }

        let currentSlide = -1;

        function startTransition(elem, direction) {
            const attributes = JSON.parse(
                decodeURIComponent(elem.attr("data-attributes"))
            );

            const oldSlide = $(".ppt-bg-div");
            const newSlide = $(
                '<div class="ppt-bg-div" style="display: none;"></div>'
            );
            newSlide.html(elem);

            switch (attributes.transition) {
                case "fade":
                    if (currentSlide === 0) {
                        $("body").append(newSlide);
                        newSlide.fadeIn("slow");
                    } else {
                        oldSlide.fadeOut("slow", function () {
                            $(this).replaceWith(newSlide);
                            newSlide.fadeIn("fast");
                        });
                    }
                    break;
                case "slide_in":
                    newSlide.css({
                        display: "block",
                    });

                    newSlide.transition(
                        {
                            x: direction === "forward" ? "100%" : "-100%",
                        },
                        { duration: 0 }
                    );

                    $("body").append(newSlide);
                    oldSlide.transition(
                        { x: direction === "forward" ? "-100%" : "100%" },
                        {
                            duration: 1000,
                            ease: "ease",
                            complete: function () {
                                $(this).remove();
                            },
                        }
                    );
                    newSlide.transition(
                        { x: "0%" },
                        {
                            duration: 1000,
                            ease: "ease",
                        }
                    );
                    break;
                default:
                    if (oldSlide.length > 0) {
                        oldSlide.replaceWith(newSlide);
                    } else {
                        $("body").append(newSlide);
                    }
                    newSlide.css("display", "block");
            }
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            const slide = slides.eq(currentSlide);
            startTransition(slide, "forward");
        }

        function previousSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slides.length - 1;
            }
            const slide = slides.eq(currentSlide);
            startTransition(slide, "backward");
        }

        function stopPresentation() {
            currentSlide = -1;
            $(".ppt-bg-div").remove();
            $(".ppt-bg").remove();
            $("#wpadminbar").show();
        }

        // Start presentation.
        $('<div class="ppt-bg"></div>').appendTo("body");
        nextSlide();
        $("#wpadminbar").hide();

        $(document).on("keydown", function (e) {
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
});
