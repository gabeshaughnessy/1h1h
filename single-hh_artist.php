<div id="modal-content">
<?php if ( have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				<?php while ( have_posts() ) : the_post(); ?>
				
				<h2 id="modal-title"><?php the_title(); ?></h2>
				<div class="left">
				<?php the_post_thumbnail(); ?>
				<?php the_content(); ?>
				</div>
				
				<a class="close-reveal-modal">&#215;</a>
				

				<?php endwhile; 
				wp_reset_postdata();
				?>

				

			<?php else : ?>
			<p>Sorry, Nothing Here</p>
<?php endif; ?>
		  </div>
