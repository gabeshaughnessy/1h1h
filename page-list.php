<?php
/**
 * Template Name: three column list
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
				<div id="posts" class="post-box full-width">
				<h2 class="section-title center" ><?php the_title(); ?></h2>
					<div class="primary">
							<div class="content" role="main">
				<?php 
							$args = array(
								
										'post_type' => 'hh_client',
										'posts_per_page' => -1
									
									
							);
							$custom_query = new WP_Query( $args );
							if ( $custom_query->have_posts() ) : ?>
				
							
								<div class="row ">
								<div class="three columns first">
								<?php /* Start the Loop */ 
								$i = 1;
								$post_count = $custom_query->post_count;
								?>
								
								<?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 
								
								$meta_values = hh_get_meta_values(get_the_ID());
								?>
								<div id="post_<?php echo get_the_ID(); ?>" class="client <?php $hhpost_type ?>_post">
							
							<h2 class="post-title"><?php the_title();  ?> </h2>
								</div><!--end of the post -->
								<?php 
								if ($i > $post_count/3 && $i <= ($post_count/3 + 1)){ ?>
								</div>
								<div class="three columns">
								<?php
								}
								elseif($i > 2*($post_count/3)&& $i <= 2*($post_count/3)+1) { ?>
								</div>
								<div class="three columns last">
								<?php
								}
								elseif($i == $post_count){ ?>
								</div>
								<?php
								}
								$i = $i + 1;
								?>
								
								<?php
								endwhile; ?>
				
								</div><!-- end row -->
				
							<?php else : ?>
				
								<p> nothing for you here</p>
				
							<?php endif; 
				
							?>

			</div></div>
				</div><!-- end wrapper -->
			</div><!-- end section -->


<?php get_footer(); ?>