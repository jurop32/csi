$(document).ready(function()
{
    // MENU
    $('.menu li').on(
        'mouseenter mouseleave',
        function(e)
        {
            if (e.type == 'mouseenter')
            {
                $(this).addClass('act');
            } else {
                $(this).removeClass('act');
            }
        }
    );

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
            box = preview.parent(),
            vertical = box.find('.vertical').html() == '1',
            leftpos = preview.position().left,
            leftMin = (vertical ? 87 : 100),
            topMin = (vertical ? 85 : 25),
            alt = box.find('img').attr('alt'),
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
            var
                xx = box.find('.pict').html(),
                x1 = xx.substr(
                    xx.search('id_image=') + 9
                );
            id_produkt = parseInt(
                x1.substr(0, x1.search('&quot'))
            );
        }
        previewLightbox = $('.image-lightbox');

        userId = parseInt($('#au').html()); // usr

        image = box.find('img').attr('src').replace( // re
            /(_|d=)2/g,
            '$1' +
            ((isNaN(userId) || (exetra && exetra.testing))
                ? '3'
                : '4'
            )
        );

        if (leftpos < 100)
        {
            leftpos = preview.offset().left - (vertical ? 13 : 0);
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

        if (exetra && exetra.visual)
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

    $(document).on(
        'click',
        '.pict a.item-5, a.show-lightbox-category, .lightbox-category a.close, .lightbox-category button',
        function(e)
        {
            var
                item = $(this).attr('class'),
                id = $(this).attr('id'),
                vertical = $(this).attr('type') == 'vertical',
                offset_top = leftPos = topPos = 0,
                winBox = $('.lightbox-category');

            if (item == 'item-5 nopreview')
            {
                if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
                {
                    offset_top = -607;
                } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible')) {
                    offset_top = -462;
                } else {
                    offset_top = -490;//-420
                }

                leftPos = $(this).offset().left - 150;
                topPos = $(this).offset().top + offset_top;

                if ($(window).width() <= 1140)
                {
                    var containerOffset = $('.image-content').offset();
                    leftPos = $(this).offset().left - containerOffset.left - 60;
                    topPos  = $(this).offset().top - containerOffset.top - 60;
                }
                console.log(leftPos, topPos);

                winBox.css({
                    left : leftPos,
                    top : topPos
                });

                $('#id_item_lightbox').val('' + id + '');
            }

            if (item == 'item-5 yespreview')
            {
                if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
                {
                    offset_top = -630;
                } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible')) {
                    offset_top = -485;
                } else {
                    offset_top = -485;//443
                }

                offset_top -= vertical ? 60/*120*/ : 0;

                winBox.css(
                {
                    left: $(this).offset().left - 52
                        - (vertical ? 13 : 0), //add
                    top: $(this).offset().top + offset_top,

                });

                $('#id_item_lightbox').val('' + id + '');
            }

            if (item == 'item-5 yespreview-offset')
            {
                if ($("#keywords_body").is(':visible') && $("#keywords_wrapper").is(':visible'))
                {
                    offset_top = -620;
                } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible')) {
                    offset_top = -470;
                } else {
                    offset_top = -486;///-440
                }

                offset_top -= vertical ? 59 : 0;

                winBox.css(
                {
                    left : $(this).offset().left - 122,
                    top : $(this).offset().top + offset_top,
                });

                $('#id_item_lightbox').val('' + id + '');
            }

            winBox.toggle();

            previewLightbox.html('').hide();

            e.preventDefault();
        }
    );

    // PICT TOOLTIP
    $('.pict a').on(
        'mouseenter mouseleave',
        function(e)
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
        }
    );
});
