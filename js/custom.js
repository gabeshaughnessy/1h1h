function resizeSections(){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	//console.log(windowWidth);
	jQuery('#portfolio-wrapper').css({"width": windowWidth, "height": windowHeight});
	jQuery('.section').css({"width": windowWidth, "height": windowHeight});
	//jQuery('.menu-main-menu-container').css({"width": windowWidth});
}

jQuery(window).resize(function(){
	resizeSections();
	moveMenuIndicator();
});

function skrullCheck(){//check the position of the window and make necessary adjustments
	var skrullPos = jQuery(window).scrollTop();
	
	var portfolioPos = jQuery("#portfolio").offset();
	//console.log("skrullPos: ", skrullPos, " portfolioPos: ", portfolioPos);
	
	var servicePos = jQuery("#services").offset();
	
	if(skrullPos >= portfolioPos.top && skrullPos <= servicePos.top -300){
	jQuery('.menu-main-menu-container').slideDown('fast');
	jQuery('#portfolio-nav').slideDown('slow');
	}
	else if(skrullPos <= portfolioPos.top ){
	jQuery('.menu-main-menu-container').slideUp('slow');
	jQuery('#portfolio-nav').slideUp('fast');
	}
	else{
	jQuery('#portfolio-nav').slideUp('fast');
	}
	
}//end of skrullCheck()
   var skrullPos;
   var oldSkrullPos;
   var activeSection;
   var menuLeftPos;
function moveMenuIndicator(){
    skrullPos = jQuery(window).scrollTop();
    //console.log("skrullPos: ", skrullPos, " oldSkrullPos: ", oldSkrullPos);
	jQuery('#menu-main-menu .menu-item a').each(function(){
		var sectionID = jQuery(this).attr('href');
		var sectionOffset = jQuery(sectionID).offset();
		menuLeftPos = jQuery(this).parent().parent().offset().left;
		//console.log('sectionOffset: ', sectionOffset.top);
		console.log("left: ", jQuery(this).parent().parent().offset().left);
		sectionOffset.bottom = sectionOffset.top + jQuery(sectionID).height();
		//console.log("bottom: ", sectionOffset.bottom);
		if(sectionOffset.top < skrullPos && sectionOffset.bottom > skrullPos){
		activeSection = sectionID;
	}
	//console.log("Active Section: ", activeSection);
	//console.log("sectionID: ", sectionID);
	
	});
	if(skrullPos > oldSkrullPos){
	//if they scroll down the page do this
		//jQuery('.menu-main-menu-container').css({"background-position": "+=4" });
	}
	else{
		//jQuery('.menu-main-menu-container').css({"background-position": "-=4" });
	}

	if(activeSection == "#portfolio"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos - 500 + "px 0" });
	}
	else if(activeSection == "#services"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos - 360 + "px 0" });
	}
	else if(activeSection == "#case_studies"){
		jQuery('.menu-main-menu-container').css({"background-position":  menuLeftPos - 220 +"px 0" });
	}	
	else if(activeSection == "#artists"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 60 + "px 0" });
	}
	else if(activeSection == "#clients"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 170 + "px 0" });
	}
	else if(activeSection == "#contact"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 290 + "px 0" });
	}
	oldSkrullPos = skrullPos;
	
}

jQuery(window).scroll(function(){
	skrullCheck();
	moveMenuIndicator()
	});
	
jQuery(document).ready(function($){
	
	
	$('#menu-main-menu').localScroll();
	resizeSections();
	
	$('#portfolio-wrapper').before('<ul id="portfolio-nav">').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'slow', 
	    timeout: 0, 
	    pager:  '#portfolio-nav', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    var bgSource = $(slide).find('.portfolio_bg img').attr('src');
	        return '<li><a href="#"><img src="' + bgSource + '" width="50" height="auto" /></a></li>'; 
	    } 
	}
	);
	
	$('#services .content').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'slow', 
	    timeout: 0, 
	    pager:  '#services-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    var linkTitle = $(slide).find('.post-title').html();
	    var postId = $(slide).attr('id');
	        return '<li><a href="#">'+linkTitle+'</a></li>'; 
	    } 
	}
	);
	$('#clients .content').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'slow', 
	    timeout: 0, 
	    pager:  '#clients-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    var linkTitle = $(slide).find('.post-title').html();
	    var postId = $(slide).attr('id');
	        return '<li><a href="#">'+linkTitle+'</a></li>'; 
	    } 
	}
	);
	$('#case_studies .content').cycle({ 
	    fx:     'fade', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#case_studies-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    var linkTitle = $(slide).find('.post-title').html();
	    var postId = $(slide).attr('id');
	        return '<li><a href="#">'+linkTitle+'</a></li>'; 
	    } 
	}
	);
	$('#artists .content').cycle({ 
	    fx:     'fade', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#artists-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    var linkTitle = $(slide).find('.post-title').html();
	    var postId = $(slide).attr('id');
	        return '<li><a href="#">'+linkTitle+'</a></li>'; 
	    } 
	}
	);
	
	$('.menu-main-menu-container').hide();
	$('#portfolio-nav').hide();
	
});//end document ready