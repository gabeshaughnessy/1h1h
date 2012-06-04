<?php 
//Rebrand the dashboard
//require_once('rebrand.php');
//Thumbnail columns
require_once('thumb_column.php');

//add support for featured images and set thumbnail sizes
require_once('image_support.php');

//add excerpts to the pages:
add_action( 'init', 'add_excerpts_to_pages' );
function add_excerpts_to_pages() {
     add_post_type_support( 'page', 'excerpt' );
}


// ------------------ GET THUMBNAILS --------------------------- 
// this function will return a thumbnail image from a the current post (it must be used inside the loop)
//the image size is set in the file image_support.php
//the width and height are pulled from the array $img_src, which gets the src and dimensions from an attachment image.

	function hh_get_the_thumbnails($thumbnail_size){
			if (has_post_thumbnail()) { 
							
				$img = get_the_post_thumbnail();
				$img_id = get_post_thumbnail_id();
				$img_src = wp_get_attachment_image_src($img_id, $thumbnail_size );
							?>
			<div class="feature_postimage">
			
			<img src="<?php echo($img_src[0]);?>" width="<?php echo($img_src[1]);?>" height="<?php echo($img_src[2]);?>" alt=" <?php the_title();?>"/>
							</div>
							<?php }
							} //end of post thumbnail function


//The Main Loop:
function main_loop(){ ?>
	<div id="primary">
			<div id="content" role="main">

			<?php if ( have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				
				<?php while ( have_posts() ) : the_post(); ?>
				
				<?php endwhile; ?>

				

			<?php else : ?>

				<article id="post-0" class="post no-results not-found">
					<header class="entry-header">
						<h1 class="entry-title"></h1>
					</header><!-- .entry-header -->

					<div class="entry-content">
						<p>Oops! Couldn't find what you were looking for! Maybe try searching?</p>
						<?php get_search_form(); ?>
					</div><!-- .entry-content -->
				</article><!-- #post-0 -->

			<?php endif; ?>

			</div><!-- #content -->
		</div><!-- #primary -->
<?php }

//The Main Loop:
/*--- post types to draw from:
	hh_artist
	hh_case_study
	hh_client
	hh_event
	hh_hhpress
	hh_project
	hh_portfolio
	hh_proposal
	hh_rental
	hh_service
	hh_testimonials
*/
function hh_post_type_loop($hhpost_type, $hhcount){ ?>

	<div class="primary">
			<div class="content" role="main">

			<?php 
			$args = array(
				
						'post_type' => $hhpost_type,
						'post_count' => $hhcount
					
			);
			$custom_query = new WP_Query( $args );
			if ( $custom_query->have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				
				<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); ?>
				<h2><?php the_title(); ?></h2>
				<?php endwhile; ?>

				

			<?php else : ?>

				<article id="post-0" class="post no-results not-found">
					<header class="entry-header">
						<h1 class="entry-title"></h1>
					</header><!-- .entry-header -->

					<div class="entry-content">
						<p>Oops! Couldn't find what you were looking for! Maybe try searching?</p>
						<?php get_search_form(); ?>
					</div><!-- .entry-content -->
				</article><!-- #post-0 -->

			<?php endif; 
			// Reset Post Data
			wp_reset_postdata();
			?>
			
			</div><!-- #content -->
		</div><!-- #primary -->
<?php }

 ?>