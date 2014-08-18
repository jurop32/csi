var xmlhttp = false;
try
{
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e)
{
    try
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E)
    {
        xmlhttp = false;
    }
}
if (!xmlhttp && typeof XMLHttpRequest != 'undefined')
{
    xmlhttp = new XMLHttpRequest();
}

function jsrequest_general(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            obj.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.send(null);
}

function jsrequest_addtocart(serverPage, objID, opener)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var jsonObject = JSON.parse(xmlhttp.responseText);
            obj.innerHTML = jsonObject[0]['text_added'];
            if (opener == 'opener')
            {
                window.opener.location.reload();
            } else
            {
                document.getElementById("no_cart_items").innerHTML = "(" + jsonObject[0]['no_cart_items'] + ")";
            }

        }
    };
    xmlhttp.send(null);
}

function jsrequest_removefromcart(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var jsonObject = JSON.parse(xmlhttp.responseText);
            obj.innerHTML = jsonObject[0]['text'];
            document.getElementById("no_cart_items").innerHTML = "(" + jsonObject[0]['no_cart_items'] + ")";
            document.getElementById("subtotal_top_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("subtotal_bottom_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("total_bottom_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("all_calculated").value = jsonObject[0]['all_calculated'];
            document.getElementById("something_expired").value = jsonObject[0]['something_expired'];
            document.getElementById("something_not_available").value = jsonObject[0]['something_not_available'];
            document.getElementById("something_locked").value = jsonObject[0]['something_locked'];
            if (jsonObject[0]['no_cart_items'] == 0)
            {
                document.getElementById("cart_status_top").innerHTML = "<h4>Your shopping cart is empty.</h4>";
                document.getElementById("cart_status_bottom").innerHTML = "<div class=\"left\"><br class=\"clear\"><div class=\"c\"><a style=\"cursor:pointer;\" onclick=\"window.history.back();\" class=\"button-grey\">back</a></div></div>";
            }
            if (jsonObject[0]['reload_needed'] > 0)
            {
                location.reload();
            }
        }
    };
    xmlhttp.send(null);
}

function jsrequest_selectforpurchase(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var jsonObject = JSON.parse(xmlhttp.responseText);
            document.getElementById("no_cart_items").innerHTML = "(" + jsonObject[0]['no_cart_items'] + ")";
            document.getElementById("subtotal_top_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("subtotal_bottom_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("total_bottom_value").innerHTML = jsonObject[0]['total_price'];
            document.getElementById("all_calculated").value = jsonObject[0]['all_calculated'];
            document.getElementById("something_expired").value = jsonObject[0]['something_expired'];
            document.getElementById("something_not_available").value = jsonObject[0]['something_not_available'];
            document.getElementById("something_locked").value = jsonObject[0]['something_locked'];
            if (jsonObject[0]['no_cart_items'] == 0)
            {
                document.getElementById("cart_status_top").innerHTML = "<h4>Your shopping cart is empty.</h4>";
                document.getElementById("cart_status_bottom").innerHTML = "<div class=\"left\"><br class=\"clear\"><div class=\"c\"><a style=\"cursor:pointer;\" onclick=\"window.history.back();\" class=\"button-grey\">back</a></div></div>";
            }
            if (jsonObject[0]['reload_needed'] > 0)
            {
                location.reload();
            }
        }
    };
    xmlhttp.send(null);
}

function jsrequest_addtolightbox(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            obj.innerHTML = xmlhttp.responseText;
        } else if (exetra && exetra.testing == 1) {
            obj.innerHTML = 'Added to lightbox';
        }
    };
    xmlhttp.send(null);
}

function jsrequest_removefromlightbox(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            obj.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.send(null);
}

function jsrequest_createnewcategory(serverPage, objID)
{
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            obj.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.send(null);
}

function jsrequest_layerkeywords(serverPage, objID)
{
    return true;
    var obj = document.getElementById(objID);
    xmlhttp.open("GET", serverPage);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            obj.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.send(null);
}
