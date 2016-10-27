<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Opinions extends CI_Controller {

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
	    $data["view"]="Here view overview";
	    $nav["active"]="Opinions";
	     $link["active"]="overview";
	    $nav["submenu"]=$this->load->view("template/nav_backend_opinions",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function campaign()
	{
	    $data["view"]="Here view campaign";
	    $nav["active"]="Opinions";
	     $link["active"]="campaign";
	    $nav["submenu"]=$this->load->view("template/nav_backend_opinions",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function mail_text()
	{
	    $data["view"]="Here view mail text";
	    $nav["active"]="Opinions";
	     $link["active"]="mail_text";
	    $nav["submenu"]=$this->load->view("template/nav_backend_opinions",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
	
      
}
