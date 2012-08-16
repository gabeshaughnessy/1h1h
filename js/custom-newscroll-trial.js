//+++++++ Globals ++++++++
var pageHeight; //add all the sections to get the page height
var scrollDistance = 0; // how far have they scrolled down the page?
var prevScroll = 0; //how far was the previous scroll - determines up and down scrollign
var actualHeight = 0; // how big is a section?
var activeSection;
var scrollPadding = 200; //give a little resistance/delay when scrolling past a section
var iPadConsole;

jQuery(document).ready(function($){
//----- Check if its a touch device

	//if it is a touch device do this:
		//trigger local scroll on the main nav menu
		//add scrollspy to the main nav menu
		
	//if its not a touch device do this:
		$(window).load(function(){
			hhFadeIn();
			makeCycles();
			whichSectionIsActive();
		});
		//scrollAction - what to do when the page scrolls?
		function scrollAction() {
		console.log(' --- scrolled ---');
			//check the scroll amount
			scrollDistance = jQuery(window).scrollTop();
							//check which section is currently active
						console.log('scrollAmount1 ', scrollDistance);
			activeSection = $(whichSectionIsActive());
				console.log('activeSection = ', activeSection);
			//get the active sections current position
			
			
			console.log('prev: ',prevScroll);
			
			if(prevScroll > scrollDistance){
				//scrolled down the page
				console.log('scrollDistance = ', scrollDistance);
				var currentPos = activeSection.scrollTop();
					console.log('currentPos = ', currentPos);
				// move the active section up or down by the amount scrolled
				var newPosition = currentPos - scrollDistance;
				console.log('newPos ', newPosition);
					activeSection.css({'top': newPosition - activeSection.attr('data-offset')});
					console.log('moved down the page to ', newPosition);
					
					prevScroll = scrollDistance;
			}
			
			else if(prevScroll <= scrollDistance){
				//scrolled up the page
				scrollDistance = 0 - scrollDistance;//invert the scroll distance
				console.log('scrollDistance = ', scrollDistance);
				var currentPos = activeSection.scrollTop();
				currentPos = 0 - currentPos;
					console.log('currentPos = ', currentPos);
				// move the active section up or down by the amount scrolled
				
				var newPosition = currentPos + scrollDistance;
				console.log('newPos ', newPosition, newPosition - parseInt(activeSection.attr('data-offset')));	
					activeSection.css({'top':newPosition - activeSection.attr('data-offset')});
					
					console.log('moved up the page to ', newPosition);
					
					prevScroll = 0 - scrollDistance;
					scrollDistance = jQuery(window).scrollTop();
			}
			
			
			//repeat
		}
		$('body').css({'height':10000});
		
		$(window).scroll(function(){
		scrollAction();
		});//end window.scroll
		
		//figure out which section is active, set it to active, 
		function whichSectionIsActive(){
			
			$('.section').each(function(index){//for each section, 
				thisSection = $(this);
				//find the offset of the section for the top position
				var offset = 0;
				//add up the height of all the previous sections 
				thisSection.prevAll('.section').each(function(){
					offset += $(this).outerHeight();
				});
				
				//store the offset in a data attribute
				thisSection.attr('data-offset', offset);
				
				//find the window height
				var windowHeight = jQuery(window).height();
				//find the height of the section and add it to the offset.top to get the section bottom
				var sectionTop = thisSection.offset().top;
				var sectionBottom = sectionTop + thisSection.height();
				thisSection.attr('data-top', sectionTop);
				thisSection.attr('data-bottom', sectionBottom);
				//find the z-index of the section
				//find the total number of sections 
				numSections = $('.section').length;
				thisSection.css({'z-index': numSections - index});
				thisSection.attr('data-stackorder', numSections - index);
				var sectionOrder = numSections - index;
				//compare the top and the bottom position of the section to the top of the window(y=0)
				//console.log('top ',sectionTop, ' bottom ', sectionBottom, ' windowheight ', windowHeight);
				
				if(scrollDistance <= thisSection.outerHeight() +  offset ){
				//if the top is greater than 0 and less than the height of the window, and the bottom is greater than 0 then the section is visible
					//set the current section's class to visible
					thisSection.addClass('visible');
					//compare the z-index of the section, and the z-index of other visible sections.
										
									
				}
				else {
					thisSection.removeClass('visible');
					
				}
				
				$('.section.visible').each(function(i){
					var stackIndex = $('.section.visible').length;
					
					if($(this).attr('data-stackorder') >= stackIndex){
						$('.section').removeClass('active');
						$(this).addClass('active');
						activeSection = $(this);
					}
					else{
					//do nothing
					$(this).removeClass('active');
					}
					stackIndex = $(this).attr('data-stackorder');
				});
									//if the current section's z-index is lower than another visible section's z-index, then the section is not active and we need to find out which section is
						//remove the active class from the current section
				//else the section is off screen, and not visible or active	
					//remove the visible class from the current section
			});//end for each section
			
			return activeSection;
		}
	
	

//-------Check the URL for a Hashtag

	//if hashtag is not present do this:
	
		//load no-hashtag scripts
	
	//if hashtag is present do this:	

		//load no hashtag scripts
//------Global scripts
	//Menu scripts:
	function moveMenuIndicator(){
	//find the active menu item - either it was just clicked or one of the sections that is active will tell you. on touch devices, scrollspy will tell you
	
	//if an active section exists, 
		//change the menu container background position to the right spot for the currently active item
		
	}
	
	//fadein - fades the wrapper in after the window loads, changes laoding text too.
		function hhFadeIn(){ 
			jQuery('#wrapper').animate({'opacity':1},1400);
		}
	
	//makeCycles - triggers cycle() on all the elements that should be carouseled. changes document height so needs to be called early on, but after the window loads
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
							//console.log(ui.value);
							
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
				//console.log(jQuery(this).parent().parent().parent().find('.content'));
				    jQuery(this).parent().parent().parent().find('.content').cycle(0); 
				    return false; 
				}); 
			});
		}//End make cycles
		
		
	//makeAccordions - triggers collapsible accordions - also effects document height so needs to be triggered ealy, and after the window loads
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
	
	//imageTexture - replaces images with 2-background divs that have a texture image layered over the original
	function imageTexturizer(){
	var windowWidth = jQuery(window).width();
	var windowHeight = jQuery(window).height();
			jQuery('img:not(#portfolio img)').each(function(){//get every image that's not in the portfolio
			jQuery(this).wrap('<div class="image-wrapper">');//a div to contain the two background images
			jQuery(this).parent().css({'background-image': 'url('+templateDir + '/images/paper_bg2.png), url('+ jQuery(this).attr('src')+')', 'background-repeat': 'repeat, no-repeat', 'background-size':windowWidth+'px '+windowHeight+'px, contain', 'background-position':'center, center'});
			
			jQuery(this).css({'opacity':0});
			jQuery('.image-wrapper img').mouseover(function(e){
				jQuery(this).animate({'opacity':1}, {'duration':'fast', 'queue':false});
			});
			jQuery('.image-wrapper img').mouseleave(function(e){
				jQuery(this).animate({'opacity':0}, {'duration':'fast', 'queue':false});
			});
		});
		
	}//end imageTexturizer
	
	//resizeSections - recalculate the size of each section after the window is resized or the orientation changes, then retrigger scripts that effect section size
	function resizeSections(){
		var windowWidth = jQuery(window).width();
		var windowHeight = jQuery(window).height();
		
		jQuery('#fixed_bg').css({'height':windowHeight});//the background behind everything
		jQuery('#portfolio-wrapper').css({"width": windowWidth, "height": windowHeight + 100});//the portfolio gets a set width equal to the window and a seet height equal to the window
		jQuery('.section').css({"width": windowWidth, "min-height": windowHeight + 100});//other sections get width set equal to the window but a minimum height set equal to the window height, and can expand beyond that.
		var menuPos =  jQuery('#menu-main-menu').offset();//move the menu indicator
		jQuery('#portfolio-nav').css({"paddingLeft": menuPos.left});//move the portfolio sub-menu tab
		imageTexturizer();//resize the textures if necessary
		}//end resizeSections

});//end document ready