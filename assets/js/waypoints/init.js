(function ($) {
    "use strict";

    $(document).ready(function () {

// Fixed on Scroll // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($devicewidth > 480) {
            $('.ct-js-fixOnScroll').waypoint('sticky', {
                direction: 'down',
                stuckClass: 'ct-navbar--stuck',
                wrapper: '<div class="sticky-wrapper" />',
                offset: -50
            });

        }

    });

})(jQuery);