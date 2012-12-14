<?php 
//The portfolio page content
?>
<div id="portfolio" class="section">
		<div id="portfolio-wrapper" class="wrapper">
		
		
		<?php //Portfolio Loop Goes Here
		hh_portfolio_loop('hh_project', 10);
		/* +++++ T H E   P O R T F O L I O   L O O P ++++++ */
		//////////////////////////////////////////////////////
		function hh_portfolio_loop($hhpost_type, $hhcount){ ?>
		
		
					<?php 
					$args = array(
						
								'post_type' => $hhpost_type,
								'post_count' => $hhcount
							
					);
					$custom_query = new WP_Query( $args );
					if ( $custom_query->have_posts() ) : ?>
		
					
		
						<?php /* Start the Loop */ ?>
						
						<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); ?>
						<div class="portfolio-entry post" data-target="<?php the_permalink(); ?>" id="portfolio_post_<?php echo get_the_ID(); ?>">
						<?php hh_get_portfolio_backgrounds("full-bg"); ?>
						<!--<h2 class="portfolio-title"><?php the_title(); ?></h2>-->
						</div><!-- end post -->
						<?php endwhile; ?>
		
						
		
					<?php else : ?>
		
						<p> No Items to display </p>
		
					<?php endif; 
					// Reset Post Data
					wp_reset_postdata();
					?>
			
		<?php }
		//End Portfolio_Loop()
		
		//print out each portfolio post with a large backround image that is absolute positioned and full-screen
		//it would be similar to the homepage loop on zach coffin's site. 
		//Then build a thumbnail menu that appears at first below the main menu, then slides up out of view except a tab to reactivate it (and keyboard comman "i")
		
		//Use a fluid width carousel plugin that has: thumbnail pagers, slider controls
		 //using cycle.js
		
		//The title and the slider controller get absolute positioned over the portfolio entries in the center of the page.
		
		/* zach does it with cycle:
			 $('.cycle #content').cycle({
			  fx: 'fade', 
		   speed: 300, 
		   timeout: 200000,
		   containerResize: 0		 });
		   
		   Each post has a background image container with width: 100%, height: auto and fixed position, overflow hidden and z-index: -2
		   then inside that container is an img element with the post image also width 100% and height auto
		   
		   */
		 ?>
	</div>
	<div id="portfolio-control">
		<!--<div id="portfolio-title" > <span class="hh_text">One Hat One Hand</span> <span class="fredericka" >Portfolio</span></div>
	
		<div id="slider"></div>-->
		<h4 class="instructions" ><a data-target="<?php 
		$page = get_page_by_path( 'instructions' );
		echo get_permalink($page->ID); 
		?>" class="modal-link parisienne">Instructions</a></h4>
	</div>
	<div id="hand-navigation">
		<div id="next-hand" class="hand"></div>
		<div id="prev-hand" class="hand"></div>
	</div>
	
</div>