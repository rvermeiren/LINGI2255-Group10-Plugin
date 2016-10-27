<div class="container">
    <h4>Political Directory Administration</h4>
</div>
<nav class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
  
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     

      <ul class="nav navbar-nav">
	
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	      <?php echo $active;?> <span class="caret"></span>
	  </a>
          <ul class="dropdown-menu">
		<li <?php if($active=="Welcome screen"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/welcome">Welcome screen</a></li>
		<li <?php if($active=="Admin"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/admin">Admin</a></li>
		<li <?php if($active=="Politicians"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/politicians">Politicians</a></li>
		<li <?php if($active=="Questions"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/questions">Questions</a></li>
		<li <?php if($active=="Opinions"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/opinions">Opinions</a></li>
		<li <?php if($active=="Articles"):?>class="active"<?php endif;?>><a href="<?php echo base_url();?>administration/articles">Articles</a></li>

          </ul>
        </li>
	
	<?php echo $submenu;?>

        
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav> 
