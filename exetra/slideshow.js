/**
 * req. jquery, ui easing effects
 * IN
 *     $('#yourelement').slideshow({
 *         transition: '',
 *         opts.easing: ''
 *     });
 */
(function($)
{
    var the_switch = direction = timer = main = box = slides = null;
    var cnt = act = 0;
    var opts = {
        allowscroll: true,
        use_switch: true,
        continuous: true,
        easing: 'linear',
        delay: 800,
        transitionspeed: 800
    };
    function slideshow(options)
    {
        var args = arguments[0] || {};
        $.extend(opts, options);
        main = $(this);
        box = main.children('ul');
        slides = box.children('li');
        cnt = slides.length;
        if (cnt)
        {
            if (opts.use_switch && cnt > 1)
            {
                the_switch = $('<ol id="controls" class="list-item-4"></ol>');
                the_switch.appendTo(main);
            }
            slides.css({
                'display': 'none',
                'position': 'static'
            });
            slides.first().css('display', 'list-item');
            act = 1;
            main.hover(stopScroll, allowScroll);
            slides.each(function(i)
            {
                /*if (i == 0)
                {
                    slides.parent().append(
                        slides.first().clone().css({
                            'position': 'static',
                            'display': 'block'
                        })
                    );
                }*/
                //$(this).addClass('sl' + ++i);
                if (opts.use_switch && cnt > 1)
                {
                    the_switch.append('<li id="controls' + i + '">' + '<a href="#">' + $(this).attr('title') + '</a></li>');
                    $('#controls' + i + ' a').on(
                        'click',
                        function()
                        {
                            scrollToSlide(i);
                        }
                    );
                }
            });
            if (opts.use_switch && cnt > 1)
            {
                the_switch.append('<li style="clear:both"></li>');
                the_switch.children('#controls1').addClass('current');
            }
            direction = 'left';
            if (cnt > 1)
            {
                timer = setTimeout(scrollSlides, opts.delay * 5);
            }
        }
        return this;
    };
    function scrollSlides()
    {
        clearTimeout(timer);
        if (opts.continuous)
        {
            // var out = slides.eq(act);
            var act2 = act;
            act = (act % cnt) + 1;
            slides.eq(act-1).css('position', 'static').fadeIn(opts.transitionspeed / 2, opts.easing, function()
            {
                setSlideSwitch();
                timer = setTimeout(scrollSlides, opts.delay * 4);
            });
            slides.eq(act2-1).css('position', 'absolute').fadeOut(opts.transitionspeed / 2, opts.easing);
        } else
        {
            if (act >= cnt)
            {
                direction = '>';
            }
            if (act <= 1)
            {
                direction = '<';
            }
            if (opts.allowscroll)
            {
                if (direction == '<')
                {
                    slides.eq(act-1)
                    // box.children('.sl' + act++)
                    .fadeOut(opts.transitionspeed / 2, opts.easing);
                    slides.eq(act++)
                    //box.children('.sl' + act)
                    .fadeIn(opts.transitionspeed / 2, opts.easing, function()
                    {
                        setSlideSwitch();
                        timer = setTimeout(scrollSlides, opts.delay * 4);
                    });
                } else
                {
                    slides.eq(act-1).fadeOut(opts.transitionspeed / 2, opts.easing);
                    slides.eq(act--).fadeIn(opts.transitionspeed / 2, opts.easing, function()
                    {
                        setSlideSwitch();
                        timer = setTimeout(scrollSlides, opts.delay * 4);
                    });
                }
            }
        }
    }
    function stopScroll()
    {
        if (cnt != 1)
        {
            opts.allowscroll = false;
            clearTimeout(timer);
        }
    }
    function allowScroll()
    {
        if (cnt != 1)
        {
            opts.allowscroll = true;
            timer = setTimeout(scrollSlides, opts.delay);
        }
    }
    function scrollToSlide(i)
    {
        slides.eq(i-1).css('position', 'static').fadeIn(opts.transitionspeed / 2, opts.easing, function()
        {
            setSlideSwitch();
        });
        slides.eq(act - 1).stop().css('position', 'absolute').fadeOut(opts.transitionspeed / 2, opts.easing);
        act = i;
    }
    function setSlideSwitch()
    {
        if (opts.use_switch)
        {
            the_switch.children('.current').removeClass('current');
            the_switch.children('#controls' + act).addClass('current');
        }
    }
    function nextSlide()
    {
        if (cnt > act)
        {
            scrollToSlide(act + 1);
        }
    }
    function prevSlide()
    {
        if (act > 1)
        {
            scrollToSlide(act - 1);
        }
    }
    $.fn.slideshow = slideshow;
    $.fn.scrollToSlide = scrollToSlide;
})(jQuery);
