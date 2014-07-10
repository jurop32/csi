/**
 * req. jquery, ui easing effects
 * IN
 *     $('#yourelement').slideshow({
 *         slideshow_transition: '',
 *         slideshow_easing: ''
 *     });
 */

// req. globals
var slideshow_count = null;
var slideshow_slideholder = null;
var slideshow_direction = null;
var slideshow_switchholder = null;
var slideshow_allowscroll = true;
var slideshow_timer = null;
var slideshow_easing = null;
var slideshow_slidedelay = null;
var slideshow_transitionspeed = null;
var slideshow_activeslide = 0;
var slideshow_useslideswitch = 1;
var slideshow_continuous = false;

// initialize the slides
jQuery.fn.slideshow = function()
{
    var slideshowholder = $(this[0]); // my element
    var args = arguments[0] || {}; // passed arguments: images,headings,descriptions,links
    slideshow_easing = args.slideshow_easing || 'linear';
    slideshow_slidedelay = args.slideshow_slidedelay || 800;
    slideshow_transitionspeed = args.slideshow_transitionspeed || 800;
    slideshow_useslideswitch = args.slideshow_useslideswitch || true;
    slideshow_continuous = args.slideshow_continuous || true;
    var slidestotransform = slideshowholder.children('ul').children('li');
    var slidecount = slidestotransform.length;
    if (slidecount)
    {
        if (slideshow_useslideswitch && slidecount > 1)
        {
            slideshow_switchholder = $('<ol id="controls" class="list-item-4"></ol>');
            slideshow_switchholder.appendTo(slideshowholder);
        }
        slidestotransform.css({
            'display': 'none',
            'position': 'static'
        });
        slidestotransform
            .first()
            .css('display', 'list-item');
        // bind stop function to mouseover
        slideshowholder.hover(
            slideshow_stopScroll,
            slideshow_allowScroll
        );
        var s;
        for (var i = 0; i < slidecount; i++)
        {
            s = $(slidestotransform[i]);
            /*if (i == 0)
            {
                slidestotransform
                    .parent()
                    .append(
                        slidestotransform
                            .first()
                            .clone()
                            .css({
                                'position': 'static',
                                'display': 'block'
                            })
                    );
            }*/
            s.addClass('sl' + (i + 1));
            if (slideshow_useslideswitch && slidecount > 1)
            {
                slideshow_switchholder
                    .append(
                        '<li id="controls' + (i + 1) + '">' +
                        '<a href="#" onclick="slideshow_scrollToSlide(' + (i + 1) + ')">' +
                        s.attr('title') +
                        '</a></li>'
                    );
            }
        }
        if (slideshow_useslideswitch && slidecount > 1)
        {
            slideshow_switchholder
                .append('<li style="clear:both"></li>');
            slideshow_switchholder
                .children('#controls1')
                .addClass('current');
        }
        // set globals
        slideshow_count = slidecount;
        slideshow_slideholder = slideshowholder.children('ul');
        slideshow_direction = 'left';
        if (slideshow_count > 1)
        {
            slideshow_timer = setTimeout(
                'slideshow_scrollSlides()',
                slideshow_slidedelay * 5
            );
        }
    } else { // no slides
        // slideshowholder.html('');
    }
};

// scroll the slides
function slideshow_scrollSlides()
{
    clearTimeout(slideshow_timer);
    if (slideshow_continuous)
    {
        var act = slideshow_activeslide;
        slideshow_activeslide = (slideshow_activeslide % slideshow_count) + 1;
        slideshow_slideholder
            .children('.sl' + slideshow_activeslide)
            .css('position', 'static')
            .fadeIn(
                slideshow_transitionspeed / 2,
                slideshow_easing,
                function()
                {
                    slideshow_setSlideSwitch();
                    slideshow_timer = setTimeout(
                        'slideshow_scrollSlides()',
                        slideshow_slidedelay * 4
                    );
                }
            );
        slideshow_slideholder
            .children('.sl' + act)
            .css('position', 'absolute')
            .fadeOut(
                slideshow_transitionspeed / 2,
                slideshow_easing
            );
    } else {
        if (slideshow_activeslide >= slideshow_count)
        {
            slideshow_direction = '>';
        }
        if (slideshow_activeslide <= 1)
        {
            slideshow_direction = '<';
        }
        if (slideshow_allowscroll)
        {
            if (slideshow_direction == '<')
            {
                slideshow_slideholder
                    .children('.sl' + slideshow_activeslide)
                    .fadeOut(
                        slideshow_transitionspeed / 2,
                        slideshow_easing
                    );
                slideshow_activeslide++;
                slideshow_slideholder
                    .children('.sl' + slideshow_activeslide)
                    .fadeIn(
                        slideshow_transitionspeed / 2,
                        slideshow_easing,
                        function()
                        {
                            slideshow_setSlideSwitch();
                            slideshow_timer = setTimeout(
                                'slideshow_scrollSlides()',
                                slideshow_slidedelay * 4
                            );
                        }
                    );
            } else {
                slideshow_slideholder
                    .children('.sl' + slideshow_activeslide)
                    .fadeOut(
                        slideshow_transitionspeed / 2,
                        slideshow_easing
                    );
                slideshow_activeslide--;
                slideshow_slideholder
                    .children('.sl' + slideshow_activeslide)
                    .fadeIn(
                        slideshow_transitionspeed / 2,
                        slideshow_easing,
                        function()
                        {
                            slideshow_setSlideSwitch();
                            slideshow_timer = setTimeout(
                                'slideshow_scrollSlides()',
                                slideshow_slidedelay * 4
                            );
                        }
                    );
            }
        }
    }
}

// stop autoscroll
function slideshow_stopScroll()
{
    if (slideshow_count != 1)
    {
        slideshow_allowscroll = false;
        clearTimeout(slideshow_timer);
    }
}

// allow autoscroll
function slideshow_allowScroll()
{
    if (slideshow_count != 1)
    {
        slideshow_allowscroll = true;
        slideshow_timer = setTimeout(
            'slideshow_scrollSlides()',
            slideshow_slidedelay
        );
    }
}

// scroll to specified slide
function slideshow_scrollToSlide(i)
{
    slideshow_slideholder
        .children('.sl' + slideshow_activeslide)
        .stop()
        .css('position', 'absolute')
        .fadeOut(
            slideshow_transitionspeed / 2,
            slideshow_easing
        );
    slideshow_slideholder
        .children('.sl' + i)
        .css('position', 'static')
        .fadeIn(
            slideshow_transitionspeed / 2,
            slideshow_easing,
            function()
            {
                slideshow_setSlideSwitch();
            }
        );
    slideshow_activeslide = i;
}

// set actual slide in the slideswitch
function slideshow_setSlideSwitch()
{
    if (slideshow_useslideswitch)
    {
        slideshow_switchholder
            .children('.current')
            .removeClass('current');
        slideshow_switchholder
            .children('#controls' + slideshow_activeslide)
            .addClass('current');
    }
}

// switch to next slide
function slideshow_nextSlide()
{
    if (slideshow_count > slideshow_activeslide)
    {
        slideshow_scrollToSlide(slideshow_activeslide + 1);
    }
}

// switch to previous slide
function slideshow_prevSlide()
{
    if (slideshow_activeslide > 1)
    {
        slideshow_scrollToSlide(slideshow_activeslide - 1);
    }
}
