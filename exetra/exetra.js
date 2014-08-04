$(document).ready(function()
{
    var country = $('.imagelist + ul.country + ul.country');
    country.css('display', 'block');

    $('#content .home-text .item .desc h2').click(function()
    {
        exetra_openCloseBenefit(this);
    });

    if (exetra_isTouchDevice())
    {
        // init thumbnails
        $('.image-list li').click(function()
        {
            if (! $(this).hasClass('hover'))
            {
                var hovers = $('.image-list li.hover');
                $(this).addClass('hover');
                hovers.removeClass('hover');
            }
        }).children('a').attr('onclick', '');
        // init datepicker
        $("#publish_start_date_forinline_display").datepicker(
        {
            altField : "#publish_start_date_u",
            altFormat : "yy/mm/dd",
            onSelect : function(datetext)
            {
                $("#publish_start_date").val(datetext);
            }
        });
    } else
    {
        // init thumbnails
        $('.image-list li').hover(function()
        {
            $(this).addClass('hover');
        }, function()
        {
            $(this).removeClass('hover');
        });

        // init datepicker
        $("#publish_start_date").datepicker(
        {
            altField : "#publish_start_date_u",
            altFormat : "yy/mm/dd"
        });
    }
});

function exetra_showHideContent(selector, caller)
{
    var element = $(selector);
    if (element.is(':visible'))
    {
        element.slideUp('normal', function() {
            $(this).css('display', '');
        });
        if ( typeof caller != 'undefined')
        {
            $(caller).removeClass('opened');
        }
    } else
    {

        element.slideDown();
        if ( typeof caller != 'undefined')
        {
            $(caller).addClass('opened');
        }
    }
}

function exetra_scrollToBenefits()
{
    $('html, body').animate(
    {
        scrollTop : $('.home-info').offset().top
    }, 500);
}

function exetra_openCloseBenefit(benefit)
{
    benefit = $(benefit);
    if (benefit.siblings('p').is(':visible'))
    {
        benefit.siblings('p').slideUp();
        benefit.parent().siblings('p').slideUp();
        benefit.removeClass('opened');
    } else
    {
        benefit.siblings('p').slideDown();
        benefit.parent().siblings('p').slideDown();
        benefit.addClass('opened');
    }
}

function exetra_isTouchDevice()
{
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
};