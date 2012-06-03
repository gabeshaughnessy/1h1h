<?php
/**
 * The single page template.
 *
 *
 *
 * @package WordPress
 * @subpackage 1H1H
 */

get_header(); ?>

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


<?php get_footer(); ?>