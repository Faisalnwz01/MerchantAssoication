/**
 * createIT main javascript file.
 */

var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var $bodyel = jQuery("body");
var $navbarel = jQuery("nav.navbar");
var $dropdownSM = jQuery('.ct-menuMobile-navbar .dropdown');

/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}


(function ($) {
    "use strict";
    if(document.getElementById('ct-js-wrapper')){
        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        snapper.settings({
            disable: "right",
            addBodyClasses: true
        });
    }

    // Preloader
    $(window).on('load', function(){

        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');

        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');
        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);
    });


    $(document).ready(function () {

        //Logo Position for ct-navbar--imgTop --------------------------------------------------------------------------------------------------------------------------------------------------------------------

        var $logoPosition = $(".ct-navbar--type3").find(".navbar-header img").height();
        var logoPositionHeight = 150/2 - $logoPosition/2;
        $(".ct-navbar--type3 .navbar-header").css("top", logoPositionHeight + "px");

        if ($("nav.navbar + .ct-sectionGray2").length > 0){
            $(".ct-pageWrapper").css("background-color", "#f7f7f0");
        }

        $("#search").focus(function(){
            $(".ct-navbar--sidebarLeft").css("left", "0");
            $(".ct-navbar--sidebarRight").css("right", "0");
        });

        // Add Color // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-js-color").each(function(){
            $(this).css("color", '#' + $(this).attr("data-color"))
        });


        // Snap Navigation in Mobile // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if ($devicewidth > 767 && document.getElementById('ct-js-wrapper')) {
            snapper.disable();
        }

        $(".navbar-toggle").click(function () {
            if($bodyel.hasClass('snapjs-left')){
                snapper.close();
                $dropdownSM.removeClass('open');

            } else{
                snapper.open('left');
            }
        });
        $('#ct-js-wrapper').on('click', function(e){
            if($bodyel.hasClass('snapjs-left')){
                snapper.close();
                $dropdownSM.removeClass('open');
            }
        });


        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').click(function(e) {
            return false; // iOS SUCKS
        });
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').click(function(e){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $('.ct-menuMobile .ct-menuMobile-navbar .dropdown.open').toggleClass('open');
                $(this).parent().addClass('open');
            }
        });

        // Onepager Close on click

        var $mobileOnepager = $('.ct-menuMobile .ct-menuMobile-navbar .onepage');

        $mobileOnepager.click(function(e){return false;});
        $mobileOnepager.click(function(e){snapper.close();});


        // Ignore Owl // ---------------------------------
        $('.ct-js-owl').attr('data-snap-ignore', 'true');


        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {
                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);
                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -300});
            }
        }

        // Tooltips and Popovers // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover({trigger: "click", html: true});

        // Link Scroll to Section // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-js-btnScroll[href^="#"]').click(function (e) {
            e.preventDefault();

            var target = this.hash, $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 0
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });
        $('.ct-js-btnScrollUp').click(function (e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            return false;
        });


        // Navbar Search // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        var $searchform = $(".ct-navbar-search");
        $('.ct-js-navSearch').click(function(e){
            e.preventDefault();

            $searchform.fadeToggle(250, function () {
                if (($searchform).is(":visible")) {$searchform.find("[type=text]").focus();}
            });
            return false;
        });

        // navbar-toggle // ------------------------------------------------------------

        $searchform.each(function(){
            var $hideNavToggle = $(".navbar-toggle");
            $(this).find(".form-control").blur(function(){
                $($hideNavToggle).css("display", "block"); // iOS sucks
                $($hideNavToggle).animate({left: "10px"}, 200);
            });
            $(this).find(".form-control").focus(function(){
                $($hideNavToggle).css("display", "none"); // iOS sucks
                $($hideNavToggle).animate({left: "-60px"}, 200);
            });
        });

        // Placeholder Fallback // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if ($().placeholder) {$("input[placeholder],textarea[placeholder]").placeholder();}

    });

    $(window).load(function(){

        // Masonry For Sidebar // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (jQuery().masonry  && (jQuery(window).width()<992) && (jQuery(window).width()>767)) {

            jQuery('.ct-js-sidebar .row').masonry({
                itemSelector: '.col-sm-6.col-md-12',
                layoutMode: 'sloppyMasonry',
                resizable: false, // disable normal resizing
                // set columnWidth to a percentage of container width
                masonry: { }
            });
        }
    });

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if (scroll > 600) {
            jQuery('.ct-js-btnScrollUp').addClass('is-active');
        } else {
            jQuery('.ct-js-btnScrollUp').removeClass('is-active');
        }


        // Mobile Menu Toggle Button Position // ------------------------------------

        if (scroll > 50) {
            $(".ct-menuMobile-toggle").addClass("fixed");
        }
        else {
            $(".ct-menuMobile-toggle").removeClass("fixed");
        }

    });

    // Video Autoplay on Hover ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    $(function(){
        $(".ct-js-video").hover(function(){
            this.play();
        },function(){
            this.pause()
        });
    });


    // Snap.js -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    $(window).on('resize', function() {

        if ($(window).width() < 768) {
            snapper.enable();
        } else{
            snapper.disable();
        }
    });

    // Navbar Type3 to position absolute // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    var navType3Padding = function(){
        if (($bodyel.hasClass("ct-headroom--fixedMenu")) && ($navbarel.hasClass("ct-navbar--type3")) && !($navbarel.hasClass("navbar-transparent"))){
            if ($(window).width() > 768) {
                if ($bodyel.hasClass("ct-headroom--fullPage")){
                    //$(".section").css("padding-top", "100" + "px");
                }
                else{
                    $(".ct-pageWrapper").css("padding-top", "261" + "px");
                    $(".navbar.ct-navbar--type3").css("position", "absolute").css("top", "0");
                }

            }
            else {
                $(".ct-pageWrapper").css("padding-top", "0" + "px");
            }
        }
    };



    // Wrapper Padding // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    var headerPaddingChange = function(headerClass, headerPadding){
        if ($(window).width() < 768) {
            headerClass.css("padding-top", "0");
        }
        else{
            headerClass.css("padding-top", headerPadding);
        }
    };


    $(window).on('load', function(){
        var headerClass = $("#ct-js-header .ct-mediaSection-inner");
        var headerPadding = headerClass.css("padding-top");

        headerPaddingChange(headerClass, headerPadding);
        navType3Padding();

        $(window).on('resize', function(){
            headerPaddingChange(headerClass, headerPadding);
            navType3Padding();
        });

    });



    // Navbar Search ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document).mouseup(function (e) {
        var $searchform = $(".ct-navbar-search");

        if(!$('.ct-js-navSearch').is(e.target)){
            if (!$searchform.is(e.target) // if the target of the click isn't the container...
                && $searchform.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $searchform.hide();
                $('.ct-js-navSearch').removeClass('is-active');
            }
        }
    });

    // Intro Image --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    $(".ct-intro-topImage").css("min-height",  $deviceheight + "px");

})(jQuery);



// Features Button Morth -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

(function(){
    "use strict";

    var featurewidth = 203;

    $('.ct-featureButton').on('click', function(e){
        e.preventDefault();

        var $dropdowncontainer = $('.ct-dropdown-container');

        $(window).on('load resize', function(){
            if ($(window).width() < 480){
                featurewidth = 130;
            }
        })  ;

        if ($($dropdowncontainer).hasClass('active')){
            $($dropdowncontainer).removeClass('active').animate({width: '130' + 'px'}, 300).animate({height: '50' + 'px'}, 150);
        }
        else{
            $($dropdowncontainer).addClass('active').animate({width: featurewidth + 'px'}, 200).animate({height: '338' + 'px'}, 300);
        }
        return false;
    });
    $(window).on('load resize', function(){
        var $figure = $('.ct-gallery-item figure');
        if (device.mobile() || device.tablet()) {
            $figure.addClass('noTouch');
        }
        else{
            $figure.removeClass('noTouch');
        }
    })

}(jQuery));
