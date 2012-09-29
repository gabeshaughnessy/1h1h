
<?php if ( have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				<?php while ( have_posts() ) : the_post(); ?>
				
				<div class="modal-header">
				<h2 id="modal-title"><?php the_title(); ?></h2>
				</div>
				
				<div class="left modal-inner">
				<?php the_post_thumbnail(); ?>
				<?php the_content(); ?>
				</div>
				
				<div class="modal-footer">
				<div class="navigation"><p class="modal-link three columns first"><span class="left arrow"><?php previous_post_link('%link', 'Previous Project'); ?></span></p><div class="hathand hand three columns"><a href=""></a></div><p class="modal-link three columns last"><span class="right arrow"><?php next_post_link('%link', 'Next Project'); ?></p></span></div>
				</div>
				
				

				<?php endwhile; 
				wp_reset_postdata();
				?>

				

			<?php else : ?>
			<p>Sorry, Nothing Here</p>
<?php endif; ?>

