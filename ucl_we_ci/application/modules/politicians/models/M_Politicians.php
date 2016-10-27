<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class M_politicians extends CI_Model
{
	
	public function __construct() {
	    parent::__construct();
	    
	}
    
	public function get_politician($id_politician)
	{
	    $this->db->select(array("name","surname"));
	    $this->db->from("politician");
	    $this->db->where("id",$id_politician);
	    return $this->db->get()
		  ->result();
		
	}

	


}


?>
