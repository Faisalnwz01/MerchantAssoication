$(document).ready(function() {

    var $section = $('.section');

    if ($devicewidth > 768){
        $('#fullpage').fullpage({

            //Navigation
            navigation: true,
            navigationPosition: 'right',
            slidesNavigation: true,
            slidesNavPosition: 'bottom',

            'afterLoad': function(){
                $(".section.active").click();

                if (!$section.hasClass('ct-js-noVideo')){
                    $section.find("video").get(0).play();
                }
            }
        });
    }



});