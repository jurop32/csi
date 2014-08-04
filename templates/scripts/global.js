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
        $('.filter-box').toggle(0);
        e.preventDefault();
    });
    // PREVIEW IMAGE
    $('a.preview').on('mouseenter', function(e)
    {
        var preview = $(this),
        alt = preview.parent().find('img').attr('alt');
        desc = preview.parent().find('p').html(),
        pictograms = preview.parent().find('.pict').html();
        pictograms = pictograms.replace('nopreview', 'yespreview');
        pictograms = pictograms.replace('rel="ADD TO CART"', 'title="ADD TO CART"');
        pictograms = pictograms.replace('rel="CALCULATE PRICE"', 'title="CALCULATE PRICE"');
        pictograms = pictograms.replace('rel="ADD TO LIGHTBOX"', 'title="ADD TO LIGHTBOX"');
        pictograms = pictograms.replace('rel="LARGE PREVIEW"', 'title="LARGE PREVIEW"');
        pictograms = pictograms.replace('rel="REMOVE IMAGE"', 'title="REMOVE IMAGE"');
        pictograms = pictograms.replace('rel="EDIT FRIENDLY IMAGE"', 'title="EDIT FRIENDLY IMAGE"');
        var el = preview.parent().find('.id_produkt');
        if (el.length)
        {
            id_produkt = el.html();
        } else {
            var xx = preview.parent().find('.pict').html();
            var x1 = xx.substr(
                xx.search('id_image=') + 9
            );
            id_produkt = parseInt(
                x1.substr(
                    0,
                    x1.search('&quot')
                )
            );
        }
        previewLightbox = $('.image-lightbox');

        var au;
        au = $('#au').html();
        au = parseInt(au);
        if (! isNaN(au))
        {
            image = preview.parent().find('img').attr('src').replace('_2', '_4');
            image = image.replace('d=2', 'd=4');
        } else {
            image = preview.parent().find('img').attr('src').replace('_2', '_3');
            image = image.replace('d=2', 'd=3');
        }
        // if (preview.parent().has('.vertical').length)
        var xx = 0;
        var yy;
        if ((yy = preview.parent().find('.vertical')).length)
        {
            xx = parseInt(yy.html());
        }
        if (xx == 1)
        {
            var leftMin = 92.5, //100,
                topMin = 85; //100;
        } else {
            var leftMin = 100,
                topMin = 25; //5;
        }
        var leftpos = preview.position().left;
        if (leftpos < 100)
        {
            leftpos = 71; //preview.offset().left;
            pictograms = pictograms.replace('yespreview', 'yespreview-offset');
        }

        previewLightbox
            .html(
                '<a style="cursor:pointer;" onclick=\'window.open("/img-detail/?id_image=' + id_produkt + '","mywindow","menubar=0,resizable=1,scrollbars=1,width=850,height=750").focus();\'>' +
                '<img src="' + image + '" alt="' + alt + '" title="' + alt + '" /></a>' +
                '<p>' + desc + '</p>' +
                '<div style="position: relative;">' +
                '<div class="pict xpict">' + pictograms + '</div>' +
                '<div class="cs_addtocart" style="position: absolute; top:30px; display:none; width: 152px; text-align:center; background-color: #999999; color:#ffffff; padding:3px;" id="div_addtocart' + id_produkt + '">Added to cart</div>' +
                '</div>' +
                '<button onclick=\'window.open("/price-quote/?id_image=' + id_produkt + '","mywindow","menubar=0,resizable=1,scrollbars=1,width=850,height=750").focus();\'>Check license</button>' +
                '<form id=""></form>' +
                '<script language="javascript">' + '$(".xpict .item-1").click(function() { $(this).parent().next(".cs_addtocart").slideDown("normal", function() {});});</script>')
            .css(
                {
                    left: leftpos - leftMin,
                    top: preview.position().top - topMin,
                    display: 'block'
                }
            );
        $('.image-lightbox').on(
            'mouseleave',
            function()
            {
                previewLightbox.html('').hide();
            }
        );
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
            } else if ($("#keywords_body").is(':hidden') && $("#keywords_wrapper").is(':visible'))
            {
                var offset_top = -470;
            } else
            {
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
        $('.lightbox-category').toggle(0);
        previewLightbox.html('').hide();
        e.preventDefault();
    });
    // PICT TOOLTIP
    $('.pict a').on('mouseenter mouseleave', function(e)
    {
        var tooltip = $(this).attr('rel'), tooltipE = $(this).parent().find('span');
        if (e.type == 'mouseenter')
        {
            tooltipE.html(tooltip);
        } else
        {
            tooltipE.html('');
        }
    });
});
