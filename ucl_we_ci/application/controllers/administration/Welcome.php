<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

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
	    $data["view"]="Bienvenue sur le page d'accueil de l'administration de pol dir";
	    $nav["active"]="Welcome screen";
	    $nav["submenu"]="";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
	public function admin()
	{
	    $data["view"]="Admin";
	    $nav["active"]="Admin";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function politicians()
	{
	    $data["view"]="Politiciens";
	    $nav["active"]="Politicians";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function questions()
	{
	    $data["view"]="Question";
	    $nav["active"]="Questions";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function opinions()
	{
	    $data["view"]="Opinion";
	    $nav["active"]="Opinions";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function articles()
	{
	    $data["view"]="Article";
	    $nav["active"]="Articles";
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
      
}
