<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Politician extends CI_Controller {

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
	   $this->load->add_package_path(APPPATH.'modules/politicians');
	   $this->load->library("Politicians");
	}
        
        
	public function fiche($id_politician)
	{
	    $data["view"]=$this->politicians->get_fiche($id_politician);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_frontend");
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
      
}
