//GLOBALS
var pageHeight; //add all the sections to get the page height
var scrollDistance = 0; // how far have they scrolled down the page?
var actualHeight = 0; // how big is a section?
var activeSection;
var scrollPadding = 0; //give a little resistance/delay when scrolling past a section


//+++++++++ Helper Functions +++++++++++

/* detect browser */

function getBrowser (){
if(jQuery.uaMatch(navigator.userAgent).browser == 'webkit'){
var userAgent = navigator.userAgent.toLowerCase();
if ( userAgent.indexOf("chrome") === -1 ) { 
return 'safari';
}
else {
return jQuery.uaMatch(navigator.userAgent).browser;
}
}
}
/* end browser test */

function navTabActivate(tab, target){ //displays the portfolio navigation tab
	jQuery(tab).click(function(e){
	jQuery(target).slideDown('slow');
	jQuery(this).slideUp('fast');
	e.preventDefault();
	});
}

function centerElement(element){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	var elementWidth = element.width();
	var elementHeight = element.height();
	var elementOffset = new Object();
	elementOffset.x = windowWidth/2 - elementWidth/2;
	elementOffset.y = windowHeight/2;
	element.css({
	'left' : elementOffset.x,
	'top' : elementOffset.y
	});
}
function falsePageHeight(){ //make the page the total height of all the sections with fixed positions
	pageHeight = 0;
	
	jQuery('.section').each(function(){
		pageHeight += jQuery(this).outerHeight();
	});
	
	jQuery('body').css('height',pageHeight);
}//end falsePageHeight

function resizeSections(){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
	jQuery('#fixed_bg').css({'height':windowHeight});
	jQuery('#portfolio-wrapper').css({"width": windowWidth, "height": windowHeight + 100});
	jQuery('.section').css({"width": windowWidth, "min-height": windowHeight + 100});
	//jQuery('body').css({'height':windowHeight, 'overflow':'hidden'});
	//jQuery('.menu-main-menu-container').css({"width": windowWidth});
	var menuPos =  jQuery('#menu-main-menu').offset();
	jQuery('#portfolio-nav').css({"paddingLeft": menuPos.left});
}
//End resizeSections

function imageTexturizer(){//puts a texture over all the images

	jQuery('img:not(#portfolio img, img.no-texture)').each(function(){
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
	
}//end imageTexturizer

//TOUCHWIPE EVENT HANDLER
function makeSwipes(targetElement){
jQuery(targetElement).touchwipe({//touch settings
     wipeLeft: function() { 
     jQuery(targetElement).cycle('next'); 
      },
     wipeRight: function() {
      jQuery(targetElement).cycle('prev'); 
       },
     min_move_x: 30,
     min_move_y: 30,
     preventDefaultEvents: false
});
}

function whichSectionIsActive(){

	if(jQuery('#landing').hasClass('active') ){
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
		/* Isotope Activation */
			
		
	
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


function setActive() { //determines which section is active based on scroll bar position and the height of the sections.

var hash = window.location.hash;
if (hash.length > 0){//if there is a link in the url
jQuery('.section').each(function(){
	var offset = 0;
	//add up the height of all the previous sections 
	jQuery(this).prevAll('.section').each(function(){
		offset += jQuery(this).outerHeight();
	});
	
	//store the offset in a data attribute
	jQuery(this).attr('data-offset', offset);
	});
 
}
else {
	jQuery('.section').each(function(){	
		var offset = 0;
		//add up the height of all the previous sections 
		jQuery(this).prevAll('.section').each(function(){
			offset += jQuery(this).outerHeight();
		});
		
		//store the offset in a data attribute
		jQuery(this).attr('data-offset', offset);
	
		if(scrollDistance >= offset + scrollPadding && scrollDistance < jQuery(this).outerHeight() + offset){
			//If the scroll distance is between the offset and the height of the section, this section is active
			jQuery(this).addClass('active'); //don't use toggle class because this fires for every scroll event
			
		}
		else if(scrollDistance < jQuery(this).outerHeight() + offset){
		//if we haven't scrolled to the section yet
		jQuery(this).removeClass('active');
			
			
			jQuery(this).css({'top':0});
			jQuery('.section').css({'position':'relative'});
			}
		
		
		else if(scrollDistance > jQuery(this).outerHeight() + offset){
		//if the window is scrolled past the section
		jQuery(this).removeClass('active');
		
		
		jQuery(this).css({'top': jQuery(this).outerHeight() +100})
		}
		
		else{
			jQuery(this).removeClass('active');
		}
		
		//set menu active
		
			
		if(scrollDistance >= offset && scrollDistance < jQuery(this).outerHeight() + offset - 500){
			jQuery(this).find('.sidebar').addClass('active-sidebar');
		} 
		else if(scrollDistance + jQuery(this).find('.sidebar').outerHeight() > jQuery(this).outerHeight() + offset){
		jQuery(this).find('.sidebar').removeClass('active-sidebar');
		}
		
		
		
		
	});
	}//end else
	
}//end setActive


function moveMenuIndicator(){
	jQuery('#menu-main-menu .menu-item a').each(function(){
		var sectionID = jQuery(this).attr('href');
		var sectionOffset = jQuery(sectionID).offset();
		menuLeftPos = jQuery(this).parent().parent().offset().left;
		sectionOffset.bottom = sectionOffset.top + jQuery(sectionID).height();
	
	
	});//end each for menu item links
	
	//menu for touch devices
	activeSection = jQuery('.active').first();
	
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
		//jQuery('.sidebar').slideDown();
	}
	
	
}//end moveMenuIndicator function
	

/* Accordions */
function hhAccordion(target){
	jQuery(target).slideUp('fast');
	var accordionControl = jQuery(target).attr('data-controller');
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




//++++++++++++Add Touch Support
function gestureChange(e) {
	scrollDistance = jQuery(window).scrollTop() + e;
	activeSection = jQuery('.active');
	flipDistance = parseInt(activeSection.attr('data-offset'))-scrollDistance;
	activeSection.css({'top': flipDistance});
	setActive();
	
}

function addTouchSupport(){
document.body.addEventListener("gesturechange", gestureChange, false);

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
						
					}
				});
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
		
		
		//jQuery('.menu-main-menu-container').hide();
		jQuery('#portfolio-nav').hide();
		
	
		jQuery('.section-title').each(function(){
			jQuery(this).click(function() { 
			    jQuery(this).parent().parent().parent().find('.content').cycle(0); 
			    return false; 
			}); 
		});
	}//End make cycles

/* ============= Global Scripts ========*/
jQuery(window).load(function(){

	activeSection = jQuery('.active');
	//fade the wrapper in after it loads
	jQuery('#wrapper').animate({'opacity':1},1400);
	
	resizeSections();
	makeCycles();
	navTabActivate('#portfolio .nav-tab', '#portfolio-nav');
	hhAccordion('#contact-accordion');//the contact form accordion
	imageTexturizer();
	whichSectionIsActive();
	
	centerElement(jQuery('#portfolio-control'));
	
	jQuery('.menu-main-menu-container').slideUp();
	
	jQuery('#landing').bind('inview', function (event, visible) {
	  if (visible == true) {
	 // alert('active landing'); //for debugging
	 jQuery('.section').removeClass('active');
	  jQuery('#landing').addClass('active');
	    // element is now visible in the viewport
	  jQuery('.menu-main-menu-container').slideUp();
	 
	  } 
	  else { //landing out of view
	  jQuery('#landing').removeClass('active');
	    jQuery('.menu-main-menu-container').slideDown('fast');
		   jQuery('#portfolio-nav').slideUp('fast');
		   jQuery('#portfolio .nav-tab').hide();
	  }
	   moveMenuIndicator();
	});
	
	jQuery('#portfolio').bind('inview', function (event, visible) {
	  if (visible == true) {
	//  alert('active portfolio'); //for debugging
		 jQuery('.section').removeClass('active');
	
	  jQuery('#portfolio').addClass('active');
	    // element is now visible in the viewport
	    jQuery('.menu-main-menu-container').slideDown('fast');
	   jQuery('#portfolio .nav-tab').show('fast');
	   	
	  } 
	  else { //portfolio out of view
	  jQuery('#portfolio').removeClass('active');
	   jQuery('#portfolio-nav').slideUp('fast');
	   jQuery('#portfolio .nav-tab').hide('fast');
	  }
	  moveMenuIndicator();
	});
	
	jQuery('#services').bind('inview', function (event, visible) {
	  if (visible == true) {
	  //alert('active services'); //for debugging
	  	 jQuery('.section').removeClass('active');
	  
	  jQuery('#services').addClass('active');
	    // element is now visible in the viewport
	    jQuery('.menu-main-menu-container').slideDown('fast');
	    jQuery('#portfolio-nav').slideUp('fast');
	    jQuery('#portfolio .nav-tab').hide();
	    	
	  } 
	  else {
	  jQuery('#services').removeClass('active');
	    // element has gone out of viewport
	   
	  }
	  moveMenuIndicator();
	});
	
	jQuery('#case_studies').bind('inview', function (event, visible) {
	  if (visible == true) {
	 // alert('active casestudies'); //for debugging
	 	 jQuery('.section').removeClass('active');
	 
	  jQuery('#case_studies').addClass('active');
	    // element is now visible in the viewport
	    jQuery('.menu-main-menu-container').slideDown('fast');
	    jQuery('#portfolio-nav').slideUp('fast');
	    jQuery('#portfolio .nav-tab').hide();
	  } 
	  else {
	  jQuery('#case_studies').removeClass('active');
	    // element has gone out of viewport
	   
	  }
	  moveMenuIndicator();
	});
	
	jQuery('#artists').bind('inview', function (event, visible) {
	  if (visible == true) {
	  //alert('active artists'); //for debugging
	  	 jQuery('.section').removeClass('active');
	  
		  jQuery('#artists').addClass('active');
		    // element is now visible in the viewport
		    jQuery('.menu-main-menu-container').slideDown('fast');
		    jQuery('#portfolio-nav').slideUp('fast');
		    jQuery('#portfolio .nav-tab').hide();
		  
		   var $container = jQuery('.filter-target');
		   if($container.length > 0){
		   	$container.isotope({
		   	  filter: '.artist'
		   	});
		   	$container.find('.isotope-item').animate({'opacity':1}, 500);	
		   }
	  	 } //end in view
	  	  
  	  else {
	  jQuery('#artists').removeClass('active');
	    // element has gone out of viewport
	  } 
	  moveMenuIndicator();
	});
	
	jQuery('#clients').bind('inview', function (event, visible) {
	  if (visible == true) {
	  	 jQuery('.section').removeClass('active');
	  
	  jQuery('#clients').addClass('active');
	    // element is now visible in the viewport
	    jQuery('.menu-main-menu-container').slideDown('fast');
	    jQuery('#portfolio-nav').slideUp('fast');
	    jQuery('#portfolio .nav-tab').hide();
	  } 
	  
	  else {
	  jQuery('#clients').removeClass('active');
	   
	  }
	  moveMenuIndicator();
	});
	
	jQuery('#contact').bind('inview', function (event, visible) {
	  if (visible == true) {
	  	 jQuery('.section').removeClass('active');
	  
	  jQuery('#contact').addClass('active');
	    // element is now visible in the viewport
	    jQuery('.menu-main-menu-container').slideUp('fast');
	    jQuery('#portfolio-nav').slideUp('fast');
	    jQuery('#portfolio .nav-tab').hide();
	  } 
	  else {
	  jQuery('#contact').removeClass('active');
	   jQuery('.menu-main-menu-container').slideDown('fast');
	   
	  }
	  moveMenuIndicator();
	});
	
	
			});

/* +++++ Touch and Non-Touch Scripts ++++++ */

jQuery(document).ready(function($){

//KEYBOARD EVENTS

$('body').keydown(function(e){
	console.log('keycode: ',e.keyCode); //uncomment to see keycodes
	var targetSection;
	var currentSection = jQuery('.section.active');
	
	if(e.keyCode == 38 ){//up arrow(38) is pressed
		
		jQuery('.close-reveal-modal').click();//close the modal
		targetSection = currentSection.prev();
		$.scrollTo(targetSection, 500);
		
		e.preventDefault();
	}
	else if(e.keyCode == 40 ){//down(40) arrow is pressed
		
		
		jQuery('.close-reveal-modal').click();//close the modal	
		targetSection = currentSection.next();
		$.scrollTo(targetSection, 500);
		
		e.preventDefault();
	}
	if(e.keyCode == 37){//left(37) arrow is pressed
		if(currentSection.attr('id') == 'portfolio'){
			//modal changes too
			if(jQuery('#modal').hasClass('open')){
				jQuery('#modal').find('.modal-link a[rel="next"]').click();
			}//end open modal	
			
			else {
				jQuery('#portfolio-wrapper').cycle('prev'); //this is reversed to match wp post order
			} 
		}
		
		else if(currentSection.attr('id') == 'case_studies'){
			jQuery('#case_studies-posts .content').cycle('prev'); //this is reversed to match wp post order
		}
		else if(currentSection.attr('id') == 'services'){
			jQuery('#services-posts .content').cycle('prev'); //this is reversed to match wp post order
		}
		else if(currentSection.attr('id') == 'artists'){
			if(jQuery('#modal').hasClass('open')){
				jQuery('#modal').find('.modal-link a[rel="next"]').click();
			}//end open modal	
		}
		e.preventDefault();
	}
	else if(e.keyCode == 39){//right(39) arrow is pressed
		if(currentSection.attr('id') == 'portfolio'){
			
			//modal changes too
			if(jQuery('#modal').hasClass('open')){
				jQuery('#modal').find('.modal-link a[rel="prev"]').click();
			}//end open modal	
			else {
				jQuery('#portfolio-wrapper').cycle('next'); //this is reversed to match wp post order
			}
			
		}
		else if(currentSection.attr('id') == 'case_studies'){
			jQuery('#case_studies-posts .content').cycle('next'); //this is reversed to match wp post order
		}
		else if(currentSection.attr('id') == 'services'){
			jQuery('#services-posts .content').cycle('next'); //this is reversed to match wp post order
		}
		else if(currentSection.attr('id') == 'artists'){
			if(jQuery('#modal').hasClass('open')){
				jQuery('#modal').find('.modal-link a[rel="prev"]').click();
			}//end open modal	
		}
		e.preventDefault();
	}
else if (e.keyCode == 13) {//return(13) key was pressed
	if(currentSection.attr('id') == 'portfolio' && !jQuery('#modal').hasClass('open')){ 
		jQuery('#portfolio-wrapper').click();
	}
}
});//end keydown events
//end KEYBOARD EVENTS

$.localScroll();
var $container = jQuery('.filter-target');
if($container.length > 0){
	$container.isotope({
	  filter: 'artist'
	});
	$container.find('.isotope-item').animate({'opacity':1}, 500);		
	
}

//++++ Touch EVENTS +++++
if(jQuery('html').hasClass('touch')){//Scripts for touch-enabled devices


makeSwipes('#case_studies-posts .content');
makeSwipes('#services-posts .content');
makeSwipes('#portfolio-wrapper');
	//++++ Change Orientation ++++++
	window.addEventListener('orientationchange', handleOrientation, false);
	function handleOrientation() {

		var windowWidth = jQuery(window).width();
		var windowHeight = jQuery(window).height();
		
		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		    var viewportmeta = document.querySelector('meta[name="viewport"]');
		    if (viewportmeta) {
		}
		}
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
}
	
jQuery(window).load(function(){
	
	var $container = jQuery('.filter-target');
	// initialize isotope
	if($container.length > 0){
	$container.isotope({
	  // options... http://isotope.metafizzy.co/docs/options.html
	  filter: '.artist' 
	});
	}
	$container.find('.isotope-item').animate(500);

		
});
	

/* isotope activate */


//ISTOPE MENU
// filter items when filter link is clicked
$('.filter-menu a').click(function(){
$('.filter-menu li').removeClass('activeSlide');
  var selector = $(this).attr('data-filter');
  jQuery(this).parent('li').toggleClass('activeSlide');
  var $container = jQuery('.filter-target');
  // initialize isotope
  if($container.length > 0){
  $container.isotope({
    // options... http://isotope.metafizzy.co/docs/options.html
    filter: selector 
  });
  }
  $container.find('.isotope-item').animate(500);	
  return false;
});
//End isotope activation scripts

/* Video playback control */
function stopVideo(container){

jQuery('.close-reveal-modal').bind('click', function() {
    container.find('#modal-content').empty();
});
}
/* Modal Activations */

    jQuery('.artist').click(function() {
    var target = jQuery(this);
    var targetID = target.attr('data-target');
    var modal = jQuery('#modal');
   //load modal template into modal content with ajax
	var modalContent =  $.ajax({
	    url: targetID,
	    
	    context: document.body
	  }).done(function() { 
	  
	    modal.find('#modal-content').html(modalContent.responseText);
	    
	     modal.reveal().fitVids();
	      stopVideo(modal);
	     activateLinks();
	     
	  }); 

    });

   jQuery('#portfolio-wrapper').click(function() {
    var target = jQuery(this).find('.portfolio-entry:visible');
    var targetID = target.attr('data-target');
    var modal = jQuery('#modal');
   //load modal template into modal content with ajax
	var modalContent =  $.ajax({
	    url: targetID,
	    context: document.body
	  }).done(function() { 
	   
	   modal.find('#modal-content').html(modalContent.responseText);
	   
	    modal.reveal().fitVids();
	     stopVideo(modal);
	    activateLinks();
	     
	   	  }); 
    });
   
  var modalPosition = 0;
 function activateLinks(){
 
	 jQuery('.modal-link a').click(function(e) {
	 
	        modalPosition = modalPosition + 1;
	         var target = jQuery(this);
	         var targetID = target.attr('href');
	         var modal = jQuery('#modal');	      
		    
	    if(jQuery('html').hasClass('no-touch')){//Scripts for touch-enabled devices  
		   
		 if(modalPosition == 1 && getBrowser() == 'safari'){
		      modalPosition = modal.css('margin-left');
				
						        modalPosition = 0-parseInt(modalPosition)/2;
		        
		        
		       
		        }
		else{
		modalPosition = modal.css('margin-left');
		}
		           if(target.attr('rel') == 'prev'){
		               var  animationDirection = '1000px';
		           }
		           else if(target.attr('rel') == 'next'){
		               var  animationDirection = '-2000px';
		           }
		      
		       modal.css('margin-left', modalPosition);
		       
		       modal.animate({'margin-left':animationDirection}, 300, 'easeInQuad', function(){
			       var modalContent =  $.ajax({
		     	    url: targetID,
		     	    context: document.body
		     	  }).done(function() { 
		     	   
		     	    modal.find('#modal-content').html(modalContent.responseText);
		     	    
		     	    modal.animate({'margin-left':modalPosition}, 300, 'easeOutQuad', function(){
		     	    modal.reveal().fitVids();
		     	     stopVideo(modal);
		     	    });
		     	    if(jQuery(target).attr('rel') == 'prev'){
		     	    jQuery('#portfolio-wrapper').cycle('next'); //this is reversed to match wp post order
		     	    }
		     	   else if(jQuery(target).attr('rel') == 'next'){
		     	    jQuery('#portfolio-wrapper').cycle('prev');//this is reversed to match wp post order
		     	    }
		     	    activateLinks();
		     	    
		     			     	  }); 
		     
		     	  });
     	  }
     	  else { //touch devices dont animate
     	  var modalContent =  $.ajax({
     	    url: targetID,
     	    context: document.body
     	  }).done(function() { 
	        modal.find('#modal-content').html(modalContent.responseText);
	        
     	    modal.reveal().fitVids();
     	     stopVideo(modal);
     	    if(jQuery(target).attr('rel') == 'prev'){
     	    jQuery('#portfolio-wrapper').cycle('next'); //this is reversed to match wp post order
     	    }
     	   else if(jQuery(target).attr('rel') == 'next'){
     	    jQuery('#portfolio-wrapper').cycle('prev');//this is reversed to match wp post order
     	    }
     	    activateLinks();
     	  }); 
     	  
     	  
     	  }
	 	     e.preventDefault();
	         });
	 
 }  
    
/* End modal activations */
}); //end document ready
