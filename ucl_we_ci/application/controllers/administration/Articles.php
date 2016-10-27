<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Articles extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
	{
	   parent::__construct();
	  // $this->output->enable_profiler(TRUE);
	}
        
        
	public function index()
	{
	    $data["view"]="Here view articles";
	    $nav["active"]="Articles";
	    $link["active"]="overview";
	    $nav["submenu"]=$this->load->view("template/nav_backend_articles",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
	
      
}
