(function ($) {
    var contentTop = [];
    var content = [];
    var lastScrollTop = 0;
    var scrollDir = '';
    var itemClass = '';
    var itemHover = '';
    var menuSize = null;
    var stickyHeight = 0;
    var stickyMarginB = 0;
    var currentMarginT = 0;
    var topMargin = 0;
    var top;

    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            scrollDir = 'down';
        } else {
            scrollDir = 'up';
        }
        lastScrollTop = st;
    });

    $.fn.stickUp = function (options) {
        // adding a class to users div
        $(this).addClass('stuckMenu');
        //getting options
        var objn = 0;
        if (options != null) {
            for (var o in options.parts) {
                if (options.parts.hasOwnProperty(o)) {
                    content[objn] = options.parts[objn];
                    objn++;
                }
            }

            itemClass = options.itemClass;
            itemHover = options.itemHover;
            if (options.topMargin != null) {
                if (options.topMargin == 'auto') {
                    topMargin = parseInt($('.stuckMenu').css('margin-top'));
                } else {
                    if (isNaN(options.topMargin) && options.topMargin.search("px") > 0) {
                        topMargin = parseInt(options.topMargin.replace("px", ""));
                    } else if (!isNaN(parseInt(options.topMargin))) {
                        topMargin = parseInt(options.topMargin);
                    } else {
                        console.log("incorrect argument, ignored.");
                        topMargin = 0;
                    }
                }
            } else {
                topMargin = 0;
            }
            menuSize = $('.' + itemClass).size();
        }
        stickyHeight = parseInt($(this).height());
        stickyMarginB = parseInt($(this).css('margin-bottom'));
        currentMarginT = parseInt($(this).next().closest('div').css('margin-top'));
        top = parseInt($(this).offset().top);
        //$(this).find('*').removeClass(itemHover);
    };

    $(document).on('scroll', function () {
        var scroll = parseInt($(document).scrollTop());
        if (menuSize != null && content.length > 0) {
            for (var i = 0; i < menuSize; i++) {
                contentTop[i] = $('#' + content[i] + '').offset().top;
                function bottomView(i) {
                    var contentView = $('#' + content[i] + '').height() * .4;
                    var testView = contentTop[i] - contentView;
                    //console.log(varscroll);
                    if (scroll > testView) {
                        $('.' + itemClass).removeClass(itemHover);
                        $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                    } else if (scroll < 50) {
                        $('.' + itemClass).removeClass(itemHover);
                        $('.' + itemClass + ':eq(0)').addClass(itemHover);
                    }
                }

                if (scrollDir == 'down' && scroll > contentTop[i] - 50 && scroll < contentTop[i] + 50) {
                    $('.' + itemClass).removeClass(itemHover);
                    $('.' + itemClass + ':eq(' + i + ')').addClass(itemHover);
                }

                if (scrollDir == 'up') {
                    bottomView(i);
                }
            }
        }


        if (top < scroll + topMargin) {
            var $stuckMenu = $('.stuckMenu');

            $stuckMenu.addClass('isStuck');
            $stuckMenu.next().closest('div').css({
                'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
            }, 10);
            $stuckMenu.css("position", "fixed");
            $('.isStuck').css({
                top: '0px'
            }, 10, function () {

            });
        }
        ;

        if (scroll + topMargin < top) {
            var $stuckMenu = $('.stuckMenu');

            $stuckMenu.removeClass('isStuck');
            $stuckMenu.next().closest('div').css({
                'margin-top': currentMarginT + 'px'
            }, 10);
            $stuckMenu.css("position", "relative");
        }
        ;

    });
}(jQuery));