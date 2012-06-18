<?php 
//The clients page content
?>
<div id="clients" class="section">
	<div id="clients-wrapper" class="wrapper post-type-wrapper">
			<div id="clients-sidebar" class="sidebar">
				<h2 class="section-title" id="clients-title">clients</h2>
				<p class="section-logo">One Hat One Hand</p>
				<ul id="clients-menu" class="section-menu">
				<?php //Post title loop goes here, pulling in posts, their titles and linkign to that post in the section by #post-id 
				//use javascript to do this
				?>
					<!-- <li class="menu-item"><a href="#posttitle"></a></li> -->
				</ul>
			</div>	
			<div id="clients-posts" class="post-box">
				<?php
				 hh_post_type_loop('hh_client', 10)
				?>
			</div>
			

	</div><!-- end clients wrapper -->
</div><!-- end clients section -->