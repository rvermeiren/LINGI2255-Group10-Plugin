<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Politicians
{
    
    
     public function __construct($params= array()) 
    {

	$this->CI =& get_instance();

	if (count($params) > 0): 
	    $this->initialize($params); 

	endif;
	$this->CI->load->model("m_politicians");

    }

    private function initialize($params = array())
    {
	if (count($params) > 0):
	
	    foreach ($params as $key => $val):
		if (isset($this->$key)):
		    $this->$key = $val;
		endif;
	    endforeach;
	endif;
    }
    
    public function get_fiche($id_politician)
    {
	$data["result"]=$this->CI->m_politicians->get_politician($id_politician);
        return $this->CI->load->view("fiche_politician",$data,TRUE);
    }

   
}