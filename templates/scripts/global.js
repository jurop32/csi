$(document).ready(function()
{
    // MENU
    $('.menu li').on('mouseenter mouseleave', function(e)
    {
        var menuitem = $(this);
        if (e.type == 'mouseenter')
        {
            menuitem.addClass('act');
        } else
        {
            menuitem.removeClass('act');
        }
    });

    // HOME SLIDER
    if ($('.home-slider').length)
    {
        $(".home-slider-in").slideshow();
    }

    // FILTER
    $('.filter.button, .filter-box a.close').on('click', function(e)
    {
        $('.filter-box').toggle();
        e.preventDefault();
    });

    // PREVIEW IMAGE
    $('a.preview').on('mouseenter', function(e)
    {
        var
            preview = $(this),
            box = preview.parent(), // nahlad
            alt = box.find('img').attr('alt');
            desc = box.find('p').html(),
            pictograms = box.find('.pict').html(),
            pictograms = pictograms.replace('nopreview', 'yespreview'),
            pictograms = pictograms.replace('rel="ADD TO CART"', 'title="ADD TO CART"'),
            pictograms = pictograms.replace('rel="CALCULATE PRICE"', 'title="CALCULATE PRICE"'),
            pictograms = pictograms.replace('rel="ADD TO LIGHTBOX"', 'title="ADD TO LIGHTBOX"'),
            pictograms = pictograms.replace('rel="LARGE PREVIEW"', 'title="LARGE PREVIEW"'),
            pictograms = pictograms.replace('rel="REMOVE IMAGE"', 'title="REMOVE IMAGE"'),
            pictograms = pictograms.replace('rel="EDIT FRIENDLY IMAGE"', 'title="EDIT FRIENDLY IMAGE"'),
            el = box.find('.id_produkt');
        if (el.length)
        {
            id_produkt = el.html();
        } else { // my-account-lightbox
            var xx = box.find('.pict').html();
            var x1 = xx.substr(
                xx.search('id_image=') + 9
            );
            id_produkt = parseInt(
                x1.substr(0, x1.search('&quot'))
            );
        }
        previewLightbox = $('.image-lightbox');

        userId = parseInt($('#au').html()); // re

        image = box.find('img').attr('src').replace( // re
            /(_|d=)2/g,
            '$1' + (isNaN(userId) ? '3' : '4')
        );

        if (box.find('.vertical').html() == '1')
        { // refun
            var leftMin = 87,
                topMin = 85;
        } else {
            var leftMin = 100,
                topMin = 25;//0 mod
        }
        var leftpos = preview.position().left;
        if (leftpos < 100)
        {
            leftpos = 71; //preview.offset().left;
            pictograms = pictograms.replace('yespreview', 'yespreview-offset');
        }

        previewLightbox.html(
            '<a style="cursor:pointer;" onclick=\'window.open("/img-detail/?id_image=' + id_produkt + '","mywindow","menubar=0,resizable=1,scrollbars=1,width=850,height=750").focus();\'>' +
            '<img src="' + image + '" alt="' + alt + '" title="' + alt + '" /></a>' +
            '<p>' + desc + '</p>' +
            '<div style="position: relative;">' +
            '<div class="pict xpict">' + pictograms + '</div>' +
            '<div class="cs_addtocart" style="position: absolute; top:30px; display:none; width: 152px; text-align:center; background-color: #999999; color:#ffffff; padding:3px;" id="div_addtocart' + id_produkt + '">Added to cart</div>' +
            '</div>' +
            '<button onclick=\'window.open("/price-quote/?id_image=' + id_produkt + '","mywindow","menubar=0,resizable=1,scrollbars=1,width=850,height=750").focus();\'>Check license</button>' +
            '<form id=""></form>' +
            '<script language="javascript">' + '$(".xpict .item-1").click(function() { $(this).parent().next(".cs_addtocart").slideDown("normal", function() {});});</script>'
        ).css({
            left: leftpos - leftMin,
            top: preview.position().top - topMin,
            display: 'block'
        });

        if (fun && fun.exe)
        {
            previewLightbox
                .find('a:first')
                .after(
                    '<div class="light golden prop above h-span v-span top-left"></div>' +
                    '<div class="light hot prop above h-span v-center log em"></div>' +
                    '<div class="light hot prop above v-span h-center stick em-2"></div>'
                );
        }

        previewLightbox.on('mouseleave', function() {
            previewLightbox.html('').hide();
        });

        e.preventDefault();
    });

    // INVOICE DETAIL
    $('.invoices input').change(function()
    {
        if ($(this).attr('checked') == 'checked')
        {
            $(this).parent().parent().next().removeClass('hide');
        }
        if ($(this).attr('checked') != 'checked')
        {
            $(this).parent().parent().next().addClass('hide');
        }
    });

    $(document).on('click', '.pict a.item-5, a.show-lightbox-category, .lightbox-category a.close, .lightbox-category button', function()
    {
        var item = $(this).attr('class');
        var id = $(this).attr('id');
        if ($(this).attr('type') == 'vertical')
        {
            var vertical = 1;
        }
        if (item == 'item-5 nopreview')
        {
            if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -607;
            } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -462;
            } else
            {
                var offset_top = -420;
            }

            $('.lightbox-category').css(
            {
                left : $(this).offset().left - 150,
                top : $(this).offset().top + offset_top,
                right : 'auto'
            });
            $('#id_item_lightbox').val('' + id + '');
        }

        if (item == 'item-5 yespreview')
        {
            if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -630;
            } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -485;
            } else
            {
                var offset_top = -443;
            }

            if (vertical == 1)
            {
                offset_top = offset_top - 120;
            }

            $('.lightbox-category').css(
            {
                left : $(this).offset().left - 50,
                top : $(this).offset().top + offset_top,
                right : 'auto'
            });

            $('#id_item_lightbox').val('' + id + '');
        }

        if (item == 'item-5 yespreview-offset')
        {
            if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -620;
            } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible')) {
                var offset_top = -470;
            } else {
                var offset_top = -440;
            }

            $('.lightbox-category').css(
            {
                left : $(this).offset().left - 120,
                top : $(this).offset().top + offset_top,
                right : 'auto'
            });

            $('#id_item_lightbox').val('' + id + '');
        }

        $('.lightbox-category').toggle();

        previewLightbox.html('').hide();

        e.preventDefault();
    });

    // PICT TOOLTIP
    $('.pict a').on('mouseenter mouseleave', function(e)
    {
        var
            tooltip = $(this).attr('rel'),
            tooltipE = $(this).parent().find('span');
        if (e.type == 'mouseenter')
        {
            tooltipE.html(tooltip);
        } else {
            tooltipE.html('');
        }
    });
});
