//+++++++ Globals ++++++++
var pageHeight; //add all the sections to get the page height
var scrollDistance = 0; // how far have they scrolled down the page?
var actualHeight = 0; // how big is a section?
var activeSection;
//+++++++++ Helper Functions +++++++++++

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
function imageTexturizer(){//puts a texture over all the images

	jQuery('img:not(#portfolio img)').each(function(){
		jQuery(this).wrap('<div class="image-wrapper">');
		jQuery(this).parent().css({'background-image': 'url('+templateDir + '/images/paper_bg2.png), url('+ jQuery(this).attr('src')+')', 'background-repeat': 'repeat, no-repeat', 'background-size':'1400px 752px, contain', 'background-position':'center, center'});
		
		jQuery(this).css({'opacity':0});
		jQuery('.image-wrapper img').mouseover(function(e){
			jQuery(this).animate({'opacity':1}, {'duration':'fast', 'queue':false});
		});
		jQuery('.image-wrapper img').mouseleave(function(e){
			jQuery(this).animate({'opacity':0}, {'duration':'fast', 'queue':false});
		});
	});
	
}

function setActive() { //determines which section is active based on scroll bar position and the height of the sections.

	jQuery('.section').each(function(){
		var offset = 0;
		//add up the height of all the previous sections 
		jQuery(this).prevAll('.section').each(function(){
			offset += jQuery(this).outerHeight();
		});
		
		//store the offset in a data attribute
		jQuery(this).attr('data-offset', offset);
		
		if(scrollDistance >= offset && scrollDistance < jQuery(this).outerHeight() + offset){
			//If the scroll distance is between the offset and the height of the section, this section is active
			jQuery(this).addClass('active'); //don't use toggle class because this fires for every scroll event
		}
		else if(scrollDistance < jQuery(this).outerHeight() + offset){
		//if we haven't scrolled to the section yet
		jQuery(this).removeClass('active');
		jQuery(this).css({'top':0})
		}
		else if(scrollDistance > jQuery(this).outerHeight() + offset){
		//if the window is scrolled past the section
		jQuery(this).removeClass('active');
		jQuery(this).css({'top': jQuery(this).outerHeight() +100})
		}
		else{
			jQuery(this).removeClass('active');
		}
		
		
	});
}//end setActive

function falsePageHeight(){ //make the page the total height of all the sections with fixed positions
	pageHeight = 0;
	
	jQuery('.section').each(function(){
		pageHeight += jQuery(this).outerHeight();
		console.log(pageHeight);
	});
	
	jQuery('body').css('height',pageHeight);
}

// ++++++ Scroll Event Helper Function - used in touch events too!
function scrollAction(){
scrollDistance = jQuery(window).scrollTop();
activeSection = jQuery('.active');

flipDistance = parseInt(activeSection.attr('data-offset'))-scrollDistance;
//console.log(flipDistance);
activeSection.css({'top': flipDistance});
setActive();


}

//++++++++++++Add Touch Support
function gestureChange(e) {
	scrollDistance = jQuery(window).scrollTop() + e;
	jQuery('.ipad-console').html(scrollDistance);
	activeSection = jQuery('.active');
	flipDistance = parseInt(activeSection.attr('data-offset'))-scrollDistance;
	console.log(flipDistance);
	activeSection.css({'top': flipDistance});
	setActive();
	
}
function addTouchSupport(){
document.body.addEventListener("gesturechange", gestureChange, false);


	//++++ Touch EVENTS +++++
	jQuery('.section').touchwipe({//touch settings
	     wipeLeft: function() {  },
	     wipeRight: function() {  },
	     wipeUp: function(){scrollAction()},
	     wipeDown: function(){scrollAction()},
	     min_move_x: 10,
	     min_move_y: 10,
	     preventDefaultEvents: false
	});
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

function whichSectionIsActive(){
	
	if(jQuery('#landing').hasClass('active')){
		jQuery('.menu-main-menu-container').slideUp('slow');
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
			jQuery('.menu-main-menu-container').slideUp('fast');
}

moveMenuIndicator();

}// end of whichSectionIsActive function

function menuNav(){ //handles the active class for clicks in the menu
jQuery('#menu-main-menu .menu-item a').click(function(e){
	
	var sectionID = jQuery(this).attr('href');
	activeSection = jQuery(sectionID);
	console.log('menu activated: ', activeSection);
	jQuery('.section').each(function(){
		jQuery(this).removeClass('active');
	});
	//activeSection.animate({"top":0},{ queue: false, duration: 1000 });
	activeSection.addClass('active');
	jQuery('.section:not(.active)').each(function(){
		jQuery(this).delay(1000).animate({'top': -jQuery(this).outerHeight()-100 }, {'duration':2000, 'easing': 'easeInOutExpo'})}
	);
	jQuery('.active').each(function(){
		jQuery(this).animate({'top': 0 }, {'duration':2000, 'easing': 'easeInOutExpo'})}
	);
	jQuery('body').scrollTop(parseInt(activeSection.attr('data-offset')));
	moveMenuIndicator();
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	whichSectionIsActive();
	e.preventDefault();
});
}//end menuNav

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

function makeCycles(){
		jQuery('#portfolio-wrapper').before('<ul id="portfolio-nav">').cycle({ 
		    fx:     'scrollHorz', 
		    speed:  'slow', 
		    timeout: 0, 
		    pager:  '#portfolio-nav', 
		     
		    // callback fn that creates a thumbnail to use as pager anchor 
		    pagerAnchorBuilder: function(idx, slide) { 
		    var bgSource = jQuery(slide).find('.portfolio_bg img').attr('src');
		        return '<li><a href="#"><img src="' + bgSource + '" width="50" height="auto" /></a></li>'; 
		    } 
		}
		);
		
		//Build the portfolio slider 
		jQuery(function() {
		
		var oldAmount = 0;
		var sliderLength = 100;
		var numberOfSlides = jQuery('#portfolio-wrapper').children().length;
		//console.log(numberOfSlides);
		sliderStep = sliderLength/numberOfSlides;
				jQuery( "#slider" ).slider({
					value:0,
					min: 0,
					max: sliderLength,
					step: sliderStep,
					slide: function( event, ui ) {
					if (ui.value > oldAmount){
						jQuery('#portfolio-wrapper').cycle('next');
					}
					else if(ui.value < oldAmount){
						jQuery('#portfolio-wrapper').cycle('prev');
					}
					oldAmount = ui.value;
						console.log(ui.value);
						
					}
				});
				//jQuery( "#amount" ).val( "jQuery" + jQuery( "#slider" ).slider( "value" ) );
			});
		
		jQuery('#portfolio-nav').after('<a class="nav-tab">+</a>');
		
			
	function buildPageAnchors(slide){
		if(jQuery(slide).find('.post-title').html()){
		var linkTitle = jQuery(slide).find('.post-title').html();
		var postId = jQuery(slide).attr('id');
		    return '<li><a href="#">'+linkTitle+'</a></li>'; 
		    }
		    else {
		    	return '<li class="hidden"><a href="#"></a></li>';
		    }
	} 
	
	
		jQuery('#services .content').cycle({ 
		    fx:     'scrollHorz', 
		    speed:  'slow', 
		    timeout: 0, 
		    pager:  '#services-menu', 
		     
		    // callback fn that creates a thumbnail to use as pager anchor 
		    pagerAnchorBuilder: function(idx, slide) { 
			   return buildPageAnchors(slide);
		    	}
	    	});
	
		jQuery('#clients .content').cycle({ 
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
		jQuery('#case_studies .content').cycle({ 
		    fx:     'scrollHorz', 
		    speed:  'fast', 
		    timeout: 0, 
		    pager:  '#case_studies-menu', 
		     
		    // callback fn that creates a thumbnail to use as pager anchor 
		    pagerAnchorBuilder: function(idx, slide) { 
		   return buildPageAnchors(slide);	    } 
		}
		);
		jQuery('#artists .content').cycle({ 
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
		
		//jQuery('.menu-main-menu-container').hide();
		jQuery('#portfolio-nav').hide();
		
	
		jQuery('.section-title').each(function(){
			jQuery(this).click(function() { 
			console.log(jQuery(this).parent().parent().parent().find('.content'));
			    jQuery(this).parent().parent().parent().find('.content').cycle(0); 
			    return false; 
			}); 
		});
	}//End make cycles
	
//+++++++++ WINDOW LOAD ++++++++++++++
jQuery(window).load(function(){
	//fade the wrapper in after it loads
	jQuery('#wrapper').animate({'opacity':1},1400);
	
	resizeSections();
	
	addTouchSupport();
	
	makeCycles();
	
	
	falsePageHeight();
	activeSection = jQuery('.active');
	
	
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	hhAccordion('#contact-accordion');//the contact form accordion
	
	
	menuNav();//replacement for smooth scroll to handle the stacked sections
	
	
		
	imageTexturizer();
	whichSectionIsActive();
		
});


//++++++++++ WINDOW SCROLL ++++++++++
jQuery(window).scroll(function(){
	
	scrollAction();
	whichSectionIsActive();
	
	});
	
//++++++ WINDOW RESIZE +++++
jQuery(window).resize(function(){
	resizeSections();
	falsePageHeight();
});

//++++ Change Orientation ++++++
window.addEventListener('orientationchange', handleOrientation, false);
function handleOrientation() {
resizeSections();
falsePageHeight();
if (orientation == 0) {
  //portraitMode, do your stuff here
}
else if (orientation == 90) {
  //landscapeMode
}
else if (orientation == -90) {
  //landscapeMode
}
else if (orientation == 180) {
  //portraitMode
}
else {
}
}
