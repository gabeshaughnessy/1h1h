/* global variables */
var activeSection = jQuery('#landing');
var skrullPos = 0;
var showedPortfolioNav;
var menuLeftPos;
/* end globals */
//Skrulling - the functions and behaviors required to hunt a skrull

function skrullStack(skrullAmount, skrullMultiplier){

	skrullPos = skrullPos + skrullAmount;
	//console.log('skrullAmount = ', skrullAmount);
	//console.log('skrullPos = ', skrullPos);
	//which section is currently active? Start by setting the first section active, then remove the class and apply it to the next section in the DOM
	activeSection = jQuery('body').find('.section.active');
	activeSection.nextAll('.section').first().animate({"top":0}, {'duration':500, 'queue':false});
	//console.log('Active Section = ', activeSection.attr('id'));
	//give that section a negative top margin to equal the skrullCount
	
		var topDistance = (skrullPos)*skrullMultiplier ;
		
			activeSection.css({"top": topDistance});
		

	
	
		
	//Find the height of the active section then compare it to the top position. toggle active class and assign it to the next section if top position + height < 0
	var activeHeight = activeSection.height();
	var triggerThreshold = -60;
	
	if(activeSection.length > 0){
	
	if(activeSection.offset().top > 0 ){
	console.log('going up');
		
		newSection = activeSection.prevAll('.section').first();
			
		if(newSection.length > 0){		
			//console.log(newSection);
			newSection.animate({"top": 0},{'duration':1000, 'queue':false}, function(){
			
			newSection.addClass('active');
			
			//console.log('closest section: ', activeSection.prevAll('.section').first());
			//console.log('newSection: ', newSection);
			
			if(activeSection.prevAll('.section').first().length > 0){
			activeSection.removeClass('active');
			}
			activeSection = newSection;
			skrullPos = 0;	
			whichSectionIsActive();	
			});
			
			
			
			
		}
		
	}
	
	else if(activeHeight + topDistance < triggerThreshold &&  activeSection.attr('id') != 'contact' ){
		//	console.log('going down');
		if(activeSection.nextAll('.section').first().length > 0){
			newSection = activeSection.nextAll('.section').first();
			
			if(newSection.length > 0){
				console.log('closest section: ', activeSection.nextAll('.section').first());
				console.log('newSection: ', newSection)
				newSection.addClass('active');
				activeSection.removeClass('active');
				activeSection = newSection;
				//activeSection.css({"top": 0});
				skrullPos = 0;
				navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
				whichSectionIsActive();
			}
		}
	}
	
	}
	else {
		whichSectionIsActive();
	}
	jQuery('#portfolio-nav').slideUp('slow');
}//End skrullstack function

function moveSection(event, visible) {
 
  if (visible == true) {
	 activeSection =  jQuery(event.currentTarget);		
	
    activeSection.addClass('active');
  jQuery(window).scrollTo(activeSection, 1000, {'offset':0});

  } 
  else {
   jQuery(event.currentTarget).removeClass('active');

  }
  whichSectionIsActive();
  moveMenuIndicator();
  if(activeSection.attr('id') == ('portfolio')){
  jQuery('#portfolio .nav-tab').show('slow');
  }
}



function resizeSections(){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	//console.log(windowWidth);
	jQuery('#portfolio-wrapper').css({"width": windowWidth, "height": windowHeight + 100});
	jQuery('.section').css({"width": windowWidth, "min-height": windowHeight + 100});
	//jQuery('body').css({'height':windowHeight, 'overflow':'hidden'});
	//jQuery('.menu-main-menu-container').css({"width": windowWidth});
	var menuPos =  jQuery('#menu-main-menu').offset();
	jQuery('#portfolio-nav').css({"paddingLeft": menuPos.left});
}

/* Accordions */
function hhAccordion(target){
	jQuery(target).slideUp('fast');
	var accordionControl = jQuery(target).attr('data-controller');
	//console.log('Target: ', target, ' Controller: ', accordionControl);
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





function skrullCheck(){//check the position of the window and make necessary adjustments
	var skrullPos = jQuery(window).scrollTop();
	
	var portfolioPos = jQuery("#portfolio").offset();
	//console.log("skrullPos: ", skrullPos, " portfolioPos: ", portfolioPos);
	
	var servicePos = jQuery("#services").offset();
	var contactPos = jQuery("#contact").offset();
	
	if(skrullPos >= portfolioPos.top && skrullPos <= servicePos.top){
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

function whichSectionIsActive(){

if(jQuery('#landing').hasClass('active')){
	//jQuery('.menu-main-menu-container').slideUp('slow');
	jQuery('#portfolio-nav').slideUp('fast');
	jQuery('#portfolio .nav-tab').hide();
}

else if (jQuery('#services').hasClass('active')) {
jQuery('#portfolio-nav').slideUp('fast');
jQuery('#portfolio .nav-tab').hide();

	
}
else if(jQuery('#portfolio').hasClass('active')){
	jQuery('.menu-main-menu-container').slideDown('slow');
	jQuery('#portfolio .nav-tab').show('slow');
	resizeSections();

}
else if (jQuery('#case_studies').hasClass('active')) {
	jQuery('#portfolio .nav-tab').hide();
	jQuery('.menu-main-menu-container').slideDown('slow');
	jQuery('#portfolio-nav').slideUp('fast');
}
else if (jQuery('#artists').hasClass('active')) {
	jQuery('#portfolio .nav-tab').hide();
	jQuery('.menu-main-menu-container').slideDown('slow');
	jQuery('#portfolio-nav').slideUp('fast');
}
else if (jQuery('#clients').hasClass('active')) {
	jQuery('#portfolio .nav-tab').hide();
	jQuery('.menu-main-menu-container').slideDown('slow');
	jQuery('#portfolio-nav').slideUp('fast');
}
else if (jQuery('#contact').hasClass('active')) {
		jQuery('#portfolio .nav-tab').hide();
		jQuery('#portfolio-nav').slideUp('fast');
		//jQuery('.menu-main-menu-container').slideUp('fast');
}

moveMenuIndicator();

}// end of whichSectionIsActive function

function menuNav(){
jQuery('#menu-main-menu .menu-item a').click(function(e){

	jQuery('.section').unbind('inview', moveSection);
	
	var sectionID = jQuery(this).attr('href');
	activeSection = jQuery(sectionID);
	console.log('menu activated: ', activeSection);
	jQuery('.section').each(function(){
		jQuery(this).removeClass('active');
	});
	//activeSection.animate({"top":0},{ queue: false, duration: 1000 });
	activeSection.addClass('active');
	moveMenuIndicator();
	skrullPos = 0;
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	whichSectionIsActive();
	e.preventDefault();
});
}

function moveMenuIndicator(){
	jQuery('#menu-main-menu .menu-item a').each(function(){
		var sectionID = jQuery(this).attr('href');
		var sectionOffset = jQuery(sectionID).offset();
		menuLeftPos = jQuery(this).parent().parent().offset().left;
		//console.log('sectionOffset: ', sectionOffset.top);
		//console.log("left: ", jQuery(this).parent().parent().offset().left);
		sectionOffset.bottom = sectionOffset.top + jQuery(sectionID).height();
		//console.log("bottom: ", sectionOffset.bottom);
	
	//console.log("Active Section: ", activeSection.attr('id'));
	//console.log("sectionID: ", sectionID);
	
	});//end each for menu item links
	
	if(activeSection.attr('id') == "landing"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos - 50 + "px 0" });
	}
	else if(activeSection.attr('id') == "portfolio"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos - 500 + "px 0" });
	}
	else if(activeSection.attr('id') == "services"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos - 360 + "px 0" });
	}
	else if(activeSection.attr('id') == "case_studies"){
		jQuery('.menu-main-menu-container').css({"background-position":  menuLeftPos - 220 +"px 0" });
	}	
	else if(activeSection.attr('id') == "artists"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 60 + "px 0" });
	}
	else if(activeSection.attr('id') == "clients"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 170 + "px 0" });
	}
	else if(activeSection.attr('id') == "contact"){
		jQuery('.menu-main-menu-container').css({"background-position": menuLeftPos + 290 + "px 0" });
	}
}//end moveMenuIndicator function

function navTabActivate(tab, target){
jQuery(tab).click(function(e){
jQuery(target).slideDown('slow');
jQuery(this).slideUp('fast');
e.preventDefault();
});
}


/* Events --------- */


/* keypress events to control things like navigation */
jQuery(document.documentElement).keydown(function(event){
	console.log("key pressed: ", event.which);
	if(event.which == 49){
	//if the number 1 key is pressed
	//jQuery(window).scrollTo("#landing", 500, {offset: {top:0, left:0}});
	
	}
	if(event.which == 50){
	//if the number 2 key is pressed
	//jQuery(window).scrollTo("#portfolio", 500, {offset: {top:50, left:0}});
	
	}
	if(event.which == 51){
	//if the number 3 key is pressed
	//jQuery(window).scrollTo("#services", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 52){
	//if the number 4 key is pressed
	//jQuery(window).scrollTo("#case_studies", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 53){
	//if the number 5 key is pressed
	//jQuery(window).scrollTo("#artists", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 54){
	//if the number 6 key is pressed
	//jQuery(window).scrollTo("#clients", 500, {offset: {top:-48, left:0}});
	
	}
	if(event.which == 55){
	//if the number 7 key is pressed
	//jQuery(window).scrollTo("#contact", 500, {offset: {top:10, left:0}});
	
	}
});

jQuery(window).resize(function(){
	resizeSections();
	moveMenuIndicator();
	whichSectionIsActive();
});


// using the mousewheel 
jQuery(window).on("mousewheel", function(event, delta, deltaX, deltaY) {	
  // skrullStack(delta, 4);
   
    //console.log(delta, deltaX, deltaY);
});


jQuery(window).scroll(
function(){

if(jQuery(window).scrollTop() == 0 || jQuery(window).scrollTop() > jQuery('#contact').offset().top - 100){
jQuery('.menu-main-menu-container').slideUp('fast');
jQuery('#portfolio .nav-tab').hide('fast');

}
else if(jQuery(window).scrollTop() > jQuery('#landing').height() && jQuery(window).scrollTop() < jQuery('#contact').offset().top - 100){
jQuery('.menu-main-menu-container').slideDown('fast');
}

}
);

jQuery(window).load(function(){
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	jQuery('#wrapper').animate({'opacity':1},1400);	
	jQuery('#portfolio, #services, #case_studies, #artists, #clients, #contact').bind('inview', moveSection);
	resizeSections();
});	
jQuery(document).ready(function($){

jQuery("#landing-wrapper").touchwipe({//touch settings
     wipeLeft: function() {  },
     wipeRight: function() {  },
     wipeUp: function() { },
     wipeDown: function() { 
     skrullStack(-400, 4);
     $('#wrapper').scrollTop(0);
      },
     min_move_x: 100,
     min_move_y: 100,
     preventDefaultEvents: false
});
jQuery(" #portfolio-wrapper").touchwipe({//touch settings
     wipeLeft: function() {  },
     wipeRight: function() {  },
     wipeUp: function() { skrullStack(100, 4);},
     wipeDown: function() { 
     skrullStack(-400, 4);
      },
     min_move_x: 100,
     min_move_y: 30,
     preventDefaultEvents: false
});
jQuery(" #contact-wrapper").touchwipe({//touch settings
     wipeLeft: function() {  },
     wipeRight: function() {  },
     wipeUp: function() { skrullStack(100, 4);},
     wipeDown: function() { 
    
      },
     min_move_x: 100,
     min_move_y: 30,
     preventDefaultEvents: false
});

navTabActivate('#portfolio .nav-tab', '#portfolio-nav');	
hhAccordion('#contact-accordion');
	
	menuNav();//replacement for smooth scroll to handle the stacked sections
	$('#menu-main-menu').localScroll({offset: {top:0, left:0}, onBefore: function(){
	console.log(this);
	}, onAfter: function(){
	jQuery('#portfolio, #services, #case_studies, #artists, #clients, #contact').bind('inview', moveSection);
		}  });
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
	
	//Build the portfolio slider 
	$(function() {
	
	var oldAmount = 0;
	var sliderLength = 100;
	var numberOfSlides = $('#portfolio-wrapper').children().length;
	console.log(numberOfSlides);
	sliderStep = sliderLength/numberOfSlides;
			$( "#slider" ).slider({
				value:0,
				min: 0,
				max: sliderLength,
				step: sliderStep,
				slide: function( event, ui ) {
				if (ui.value > oldAmount){
					$('#portfolio-wrapper').cycle('next');
				}
				else if(ui.value < oldAmount){
					$('#portfolio-wrapper').cycle('prev');
				}
				oldAmount = ui.value;
					console.log(ui.value);
					
				}
			});
			//$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
		});
	
	$('#portfolio-nav').after('<a class="nav-tab">+</a>');
	skrullStack(0,0);
	whichSectionIsActive();
		
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
	    fx:     'scrollHorz', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#case_studies-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	   return buildPageAnchors(slide);	    } 
	}
	);
	$('#artists .content').cycle({ 
	    fx:     'scrollHorz', 
	    speed:  'fast', 
	    timeout: 0, 
	    pager:  '#artists-menu', 
	     
	    // callback fn that creates a thumbnail to use as pager anchor 
	    pagerAnchorBuilder: function(idx, slide) { 
	   return buildPageAnchors(slide); 
	    } 
	}
	);
	
	//$('.menu-main-menu-container').hide();
	$('#portfolio-nav').hide();
	

	jQuery('.section-title').each(function(){
	jQuery(this).click(function() { 
	console.log(jQuery(this).parent().parent().parent().find('.content'));
	    jQuery(this).parent().parent().parent().find('.content').cycle(0); 
	    return false; 
	}); 
	});

/* Image Textures */
$('img').each(function(){
	$(this).wrap('<div class="image-wrapper">');
	$(this).parent().css({'background-image': 'url('+templateDir + '/images/paper_bg.png), url('+ $(this).attr('src')+')', 'background-repeat': 'repeat, no-repeat', 'background-size':'100px 100px, contain'});
	
	$(this).css({'opacity':0});
	$('.image-wrapper img').mouseover(function(e){
		$(this).animate({'opacity':1}, {'duration':'fast', 'queue':false});
	});
	$('.image-wrapper img').mouseleave(function(e){
		$(this).animate({'opacity':0}, {'duration':'fast', 'queue':false});
	});
});
	
});//end document ready