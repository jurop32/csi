$(document).ready(function(){    	
	$('#back_to_top').click(function () {    	   
		$('body,html').animate({
			scrollTop: 0
		}, 700);
		return false;            
	});
});
/* :NEW moved to exetra.js */
/*$(function() {        
    $( "#publish_start_date" ).datepicker({
		altField: "#publish_start_date_u",
		altFormat: "yy/mm/dd"
	});
});*/
/* /:NEW */


function show_keywords() {
    $("#keywords_body").slideDown(0);
    document.getElementById("keywords").style.overflow="auto";
    document.getElementById("showhide_link").innerHTML="hide";        
}

function showhide_keywords() {               
    if ($("#keywords_body").is(':visible')) {
        $("#keywords_body").slideUp(300);
        document.getElementById("keywords").style.overflow="hidden";
        document.getElementById("showhide_link").innerHTML="show";            
        jsrequest_layerkeywords('/sys-jscall-layer-keywords/?rolled=0', 'sys_div_keywords');                        
    } else {
        $("#keywords_body").slideDown(300);
        document.getElementById("keywords").style.overflow="auto";
        document.getElementById("showhide_link").innerHTML="hide";
        jsrequest_layerkeywords('/sys-jscall-layer-keywords/?rolled=1', 'sys_div_keywords');            
    }        
}

function open_keywords() {
    $("#keywords_wrapper").slideDown(200);
    jsrequest_layerkeywords('/sys-jscall-layer-keywords/?visible=1&rolled=1', 'sys_div_keywords');        
    $('body,html').animate({
		scrollTop: 0
	}, 700);
	return false;
}

function close_keywords() {
    $("#keywords_wrapper").slideUp(200);
    jsrequest_layerkeywords('/sys-jscall-layer-keywords/?visible=0', 'sys_div_keywords');
}