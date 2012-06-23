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
				<div class="primary">
						<div class="content" role="main">
				<?php
				//need to do the first page loop here, getting the content from a page called by id
				hh_section_page_loop(407);
				 hh_post_type_loop('hh_artist', 10)
				?>
				</div>
				</div>
			</div>
			

	</div><!-- end artists wrapper -->
</div><!-- end artists section -->