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

//Register a Main Menu
register_nav_menu( "homepage", "The fixed menu at the top of pages, uses relative links to scroll through the page." );
register_nav_menu( "otherpages", "The menu that shows up on other pages besides the homepage, with links to other setions in the site" );

//add javascript to frontend

function my_scripts_method() {
    wp_enqueue_script('cycle',
		get_template_directory_uri() . '/js/cycle.js',
		array('jquery') );   
  	/*wp_enqueue_script('scrollspy',
		get_template_directory_uri() . '/js/scrollspy.js',
		array('jquery') ); 
	wp_enqueue_script('scroll-to',
		get_template_directory_uri() . '/js/jquery.scrollTo-1.4.2-min.js',
		array('jquery') ); 
	wp_enqueue_script('local-scroll',
		get_template_directory_uri() . '/js/jquery.localscroll-1.2.7-min.js',
		array('jquery', 'scroll-to') ); */
	//mousewheel detection
	wp_enqueue_script('mousewheel',
		get_template_directory_uri() . '/js/jquery.mousewheel.js',
		array('jquery') ); 
		
	wp_enqueue_script('custom_scripts',
		get_template_directory_uri() . '/js/custom.js',
		array('jquery', 'mousewheel') );
		
		         
}    
 
add_action('wp_enqueue_scripts', 'my_scripts_method'); // For use on the Front end (ie. Theme)


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
	function hh_get_portfolio_backgrounds($thumbnail_size){
			if (has_post_thumbnail()) { 
							
				$img = get_the_post_thumbnail();
				$img_id = get_post_thumbnail_id();
				$img_src = wp_get_attachment_image_src($img_id, $thumbnail_size );
							?>
			<div class="portfolio_bg">
			
			<img src="<?php echo($img_src[0]);?>" width="100%" height="auto" alt=" <?php the_title();?>"/>
							</div>
							<?php }
							} //end of portfolio background function


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


/* +++++ T H E   P O S T - T Y P E  L O O P ++++++ */
//////////////////////////////////////////////////////

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

			<?php 
			$args = array(
				
						'post_type' => $hhpost_type,
						'post_count' => $hhcount
					
			);
			$custom_query = new WP_Query( $args );
			if ( $custom_query->have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				
				<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 
				
				$meta_values = hh_get_meta_values(get_the_ID());
				?>
				<div id="post_<?php echo get_the_ID(); ?>" class="post <?php $hhpost_type ?>_post">
				<?php 
				if($meta_values['vimeo_link']){
				echo apply_filters('the_content', $meta_values['vimeo_link']); 
				}
				else if($meta_values['youtube_link']){
				echo apply_filters('the_content', $meta_values['youtube_link']); 
				}
				else {
				 hh_get_the_thumbnails('feature_slide');
				}
				?>
				<h2 class="post-title"><?php the_title(); ?></h2>
				<?php the_content(); ?>
				<?php get_template_part('post_footer'); ?>
				</div><!--end of the post -->
				<?php endwhile; ?>

				

			<?php else : ?>

				<p> nothing for you here</p>

			<?php endif; 
			// Reset Post Data
			wp_reset_postdata();
			?>
	
<?php }

function hh_section_page_loop($hh_pageID){ ?>


			<?php 
			$args = array(
				
						'page_id' => $hh_pageID
						
					
			);
			$custom_query = new WP_Query( $args );
			if ( $custom_query->have_posts() ) : ?>

			

				<?php /* Start the Loop */ ?>
				
				<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 
				
				$meta_values = hh_get_meta_values(get_the_ID());
				?>
				<div id="post_<?php echo get_the_ID(); ?>" class="post section_page">
				<div class="post-intro">
				<?php 
				if($meta_values['vimeo_id']){
				echo apply_filters('the_content', $meta_values['vimeo_id']); 
				}
				else if($meta_values['youtube_id']){
				echo apply_filters('the_content', $meta_values['youtube_id']); 
				}
				else {
				 hh_get_the_thumbnails('feature_slide');
				}
				?></div>
				<!--<h2 class="post-title"><?php the_title(); ?></h2>-->
				<?php the_content(); ?>
				<?php get_template_part('post_footer'); ?>
				</div><!--end of the post -->
				<?php endwhile; ?>

				

			<?php else : ?>

				<p> nothing for you here</p>

			<?php endif; 
			// Reset Post Data
			wp_reset_postdata();
			?>
		
<?php }


 ?>