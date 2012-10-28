<?php
/**
 * Template Name: Full-width
 *
 *
 *
 * @package WordPress
 * @subpackage 1H1H
 */

get_header(); 
wp_nav_menu( array('menu' => 'Global Menu' ));
?>
<?php 
//The contact page content
?>
<div  class="section">
	<div  class="wrapper">
	
		<?php 
		if(have_posts()) : while(have_posts()) : the_post();
		the_content(); 
		endwhile;
		endif;
		?>
					
	</div><!-- end contact-wrapper -->
</div><!-- end contact section -->


<?php get_footer(); ?>