<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

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
	    $data["view"]="Here view index";
	    $nav["active"]="Admin";
	    $link["active"]="overview";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	
	public function add_administrator()
	{
	    $data["view"]="Here view add administrator";
	    $nav["active"]="Admin";
	    $link["active"]="add_administrator";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function statistical()
	{
	    $data["view"]="Here view statistical";
	    $nav["active"]="Admin";
	    $link["active"]="statistical";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	
	public function upload_langage_file()
	{
	    $data["view"]="Here view upload langage file";
	    $nav["active"]="Admin";
	    $link["active"]="upload_langage_file";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function hyperlink_validity_list()
	{
	    $data["view"]="Here hyperlink validity list";
	    $nav["active"]="Admin";
	    $link["active"]="hyperlink_validity_list";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function transparency()
	{
	    $data["view"]="Here view transparency";
	    $nav["active"]="Admin";
	    $link["active"]="transparency";
	    $nav["submenu"]=$this->load->view("template/nav_backend_admin",$link,TRUE);
	    
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
	
      
}
