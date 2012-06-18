<?php 
//The artists page content
?>
<div id="artists" class="section">
	<div id="artists-wrapper" class="wrapper post-type-wrapper">
			<div id="artists-sidebar" class="sidebar">
				<h2 class="section-title" id="artists-title">artists</h2>
				<p class="section-logo">One Hat One Hand</p>
				<ul id="artists-menu" class="section-menu">
				<?php //Post title loop goes here, pulling in posts, their titles and linkign to that post in the section by #post-id 
				//use javascript to do this
				?>
					<!-- <li class="menu-item"><a href="#posttitle"></a></li> -->
				</ul>
			</div>	
			<div id="artists-posts" class="post-box">
				<?php
				 hh_post_type_loop('hh_artist', 10)
				?>
			</div>
			

	</div><!-- end artists wrapper -->
</div><!-- end artists section -->