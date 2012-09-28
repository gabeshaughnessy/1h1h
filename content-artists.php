<?php 
//The artists page content
?>
<div id="artists" class="section">
	<div id="artists-wrapper" class="wrapper post-type-wrapper">
			<div id="artists-sidebar" class="sidebar">
				<h2 class="section-title" id="artists-title">artists</h2>
				<p class="section-logo">One Hat One Hand</p>
				<p>filter by:
				<ul id="profile-filter" class="filter-menu button-group nine columns">
				<?php echo isotope_filter_menu('hh_classification'); ?>
				</ul>
				</div>	
			<div id="artists-posts" class="post-box">
				<div class="primary">
						<div class="content" role="main">
				<?php
				//need to do the first page loop here, getting the content from a page called by id
				//hh_section_page_loop(of_get_option('artists_intro_page', 'no artists page selected'));
				
				 
				 
				 			$args = array(
				 				
				 						'post_type' => 'hh_artist',
				 						'posts_per_page' => '-1'
				 					
				 			);
				 			$custom_query = new WP_Query( $args );
				 			if ( $custom_query->have_posts() ) : ?>
				 
				 			<div class="filter-target row">
				 
				 				<?php /* Start the Loop */ ?>
				 				
				 				<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 
				 				$id = get_the_ID();
				 				
				 				?>
				 				<div id="post_<?php echo $id ?>" class="artist profile listing <?php echo print_the_terms('hh_classification', ' '); ?>" data-target="<?php echo the_permalink(); ?>">
				 			
				 				<?php echo get_the_post_thumbnail($id, 'isotope-grid', array('class' => 'no-texture')); ?>
				 					</div><!--end of the post -->
				 				<?php endwhile; ?>
				 </div><!-- end filter-target -->
				 				
				 
				 			<?php else : ?>
				 
				 				<p> nothing for you here</p>
				 
				 			<?php endif; 
				 			// Reset Post Data
				 			wp_reset_postdata();
				 			
				 
				 				?>
				 				<?php get_template_part('post_footer'); ?>
				</div>
				</div>
			</div>
			

	</div><!-- end artists wrapper -->
</div><!-- end artists section -->