<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

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
	   //$this->output->enable_profiler(TRUE);
	   $this->load->add_package_path(APPPATH.'modules/system');
	   $this->load->library("MagicMember");
	}
        
        
	public function index()
	{
	    $username="Public";
	    $password="guest";
	    $data["view"]=$this->magicmember->test_magicMember($username, $password);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_frontend");
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
      
}
