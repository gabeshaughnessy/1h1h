function resizeSections(){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	//console.log(windowWidth);
	jQuery('#portfolio-wrapper').css({"width": windowWidth, "height": windowHeight});
	jQuery('.section').css({"width": windowWidth, "min-height": windowHeight});
	//jQuery('.menu-main-menu-container').css({"width": windowWidth});
	var menuPos =  jQuery('#menu-main-menu').offset();
	jQuery('#portfolio-nav').css({"paddingLeft": menuPos.left});
}

/* Accordions */
function hhAccordion(target){
	jQuery(target).slideUp('fast');
	var accordionControl = jQuery(target).attr('data-controller');
	console.log('Target: ', target, ' Controller: ', accordionControl);
	jQuery(accordionControl).click(function(e){
		jQuery(target).toggleClass('in');
		if(!jQuery(target).hasClass('in')){
		jQuery(target).slideUp('fast');
		}
		else {
			jQuery(target).slideDown('fast');
		}
		
				e.preventDefault();
	});
	
}//End of accordions function


jQuery(window).resize(function(){
	resizeSections();
	moveMenuIndicator();
});
var showedPortfolioNav;

function skrullCheck(){//check the position of the window and make necessary adjustments
	var skrullPos = jQuery(window).scrollTop();
	
	var portfolioPos = jQuery("#portfolio").offset();
	//console.log("skrullPos: ", skrullPos, " portfolioPos: ", portfolioPos);
	
	var servicePos = jQuery("#services").offset();
	var contactPos = jQuery("#contact").offset();
	
	if(skrullPos >= portfolioPos.top && skrullPos <= servicePos.top -300){
	jQuery('.menu-main-menu-container').slideDown('fast');
		if( showedPortfolioNav != true){
			//jQuery('#portfolio-nav').slideDown('slow');
			jQuery('#portfolio .nav-tab').hide();
			showedPortfolioNav = true;
		}
		else{
			jQuery('#portfolio-nav').slideUp('slow');
			jQuery('#portfolio .nav-tab').show('slow');
		}
	
		resizeSections();
		
	}

	else if(skrullPos <= portfolioPos.top ){
	jQuery('.menu-main-menu-container').slideUp('slow');
	jQuery('#portfolio-nav').slideUp('fast');
	jQuery('#portfolio .nav-tab').hide();
	}
	else if(skrullPos >= portfolioPos.top && skrullPos <= contactPos.top){
	//jQuery('.menu-main-menu-container').slideDown('fast');
	}
	if(skrullPos >= portfolioPos.top && !(skrullPos <= servicePos.top -300)){
	jQuery('#portfolio-nav').slideUp('fast');
	jQuery('#portfolio .nav-tab').hide();
	}
	if(skrullPos >= contactPos.top){
	jQuery('.menu-main-menu-container').slideUp('fast');
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
		//console.log("left: ", jQuery(this).parent().parent().offset().left);
		sectionOffset.bottom = sectionOffset.top + jQuery(sectionID).height();
		//console.log("bottom: ", sectionOffset.bottom);
		if(sectionOffset.top  < skrullPos+100 && sectionOffset.bottom  > skrullPos+100){
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

function navTabActivate(tab, target){
jQuery(tab).click(function(e){
jQuery(target).slideDown('slow');
jQuery(this).slideUp('fast');
e.preventDefault();
});
}

/* keypress events to control things like navigation */
jQuery(document.documentElement).keydown(function(event){
	console.log("key pressed: ", event.which);
	if(event.which == 49){
	//if the number 1 key is pressed
	jQuery(window).scrollTo("#landing", 500, {offset: {top:0, left:0}});
	
	}
	if(event.which == 50){
	//if the number 2 key is pressed
	jQuery(window).scrollTo("#portfolio", 500, {offset: {top:50, left:0}});
	
	}
	if(event.which == 51){
	//if the number 3 key is pressed
	jQuery(window).scrollTo("#services", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 52){
	//if the number 4 key is pressed
	jQuery(window).scrollTo("#case_studies", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 53){
	//if the number 5 key is pressed
	jQuery(window).scrollTo("#artists", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 54){
	//if the number 6 key is pressed
	jQuery(window).scrollTo("#clients", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 55){
	//if the number 7 key is pressed
	jQuery(window).scrollTo("#contact", 500, {offset: {top:10, left:0}});
	
	}
});



jQuery(window).scroll(function(){
	skrullCheck();
	moveMenuIndicator();
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	});


	
jQuery(document).ready(function($){

navTabActivate('#portfolio .nav-tab', '#portfolio-nav');	
hhAccordion('#contact-accordion');
	
	$('#menu-main-menu').localScroll({offset: {top:-50, left:0} });
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
	$('#portfolio-nav').after('<a class="nav-tab">+</a>');
function buildPageAnchors(slide){
	if($(slide).find('.post-title').html()){
	var linkTitle = $(slide).find('.post-title').html();
	var postId = $(slide).attr('id');
	    return '<li><a href="#">'+linkTitle+'</a></li>'; 
	    }
	    else {
	    	return '<li class="hidden"><a href="#"></a></li>';
	    }
} 


	$('#services .content').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'slow', 
	    timeout: 0, 
	    pager:  '#services-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
		   return buildPageAnchors(slide);
	    	}
    	});

	$('#clients .content').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'slow', 
	    timeout: 0, 
	    pager:  '#clients-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	    return buildPageAnchors(slide); 
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
	   return buildPageAnchors(slide);	    } 
	}
	);
	$('#artists .content').cycle({ 
	    fx:     'fade', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#artists-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	   return buildPageAnchors(slide); 
	    } 
	}
	);
	
	$('.menu-main-menu-container').hide();
	$('#portfolio-nav').hide();
	

	jQuery('.section-title').each(function(){
	jQuery(this).click(function() { 
	console.log(jQuery(this).parent().parent().parent().find('.content'));
	    jQuery(this).parent().parent().parent().find('.content').cycle(0); 
	    return false; 
	}); 
	});
	
});//end document ready