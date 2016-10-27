<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Politicians extends CI_Controller {

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
	    $nav["active"]="Politicians";
	    $link["active"]="overview";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
    
	public function add_new_politician()
	{
	    $data["view"]="Here view add new politician";
	    $nav["active"]="Politicians";
	     $link["active"]="add_new_politician";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function import_and_export_procedures()
	{
	    $data["view"]="Here view import and export procedures";
	    $nav["active"]="Politicians";
	     $link["active"]="import_and_export_procedures";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function changes_to_approve()
	{
	    $data["view"]="Here view changes to approve";
	    $nav["active"]="Politicians";
	     $link["active"]="changes_to_approve";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function logs_changes()
	{
	    $data["view"]="Here view logs changes";
	    $nav["active"]="Politicians";
	     $link["active"]="logs_changes";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
	
	public function edit_text_email()
	{
	    $data["view"]="Here view edit text of e-mails";
	    $nav["active"]="Politicians";
	     $link["active"]="edit_text_email";
	    $nav["submenu"]=$this->load->view("template/nav_backend_politicians",$link,TRUE);
	    $this->load->view("template/header");
	    $this->load->view("template/nav_backend",$nav);
	    $this->load->view("template/page",$data);
	    $this->load->view("template/footer");
	}
      
}
