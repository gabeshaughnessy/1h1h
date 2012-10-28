<?php
/**
 * Template Name: Category Slider
 *
 *
 *
 * @package WordPress
 * @subpackage 1H1H
 */

get_header(); 
wp_nav_menu( array('menu' => 'Global Menu' ));
global $post;
$content_type = get_post_meta($post->ID, 'hh_content_post_type', true);
$filter_tax = get_post_meta($post->ID, 'hh_filter_taxonomy', true);
?>
			<div class="section">
				<div class="wrapper post-type-wrapper">
						<div  class="sidebar">
							<h2 class="section-title fredericka"><?php the_title(); ?></h2>
							<p class="section-logo">One Hat One Hand</p>
							<ul  class="section-menu">
							<?php //Post title loop goes here, pulling in posts, their titles and linkign to that post in the section by #post-id 
							//use javascript to do this
							?>
								<!-- <li class="menu-item"><a href="#posttitle"></a></li> -->
							</ul>
						</div>	
						<div class="post-box">
							<div class="primary">
									<div class="slider content" role="main"> 
									<?php
									if(have_posts()) : while(have_posts()) : the_post();
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
							
						
							//need to do the first page loop here, getting the content from a page called by id
							
													 hh_post_type_loop($content_type, 10)
							?>
							</div>
							</div>
						</div>
						
			
				</div><!-- end services wrapper -->
			</div><!-- end services section -->


<?php get_footer(); ?>