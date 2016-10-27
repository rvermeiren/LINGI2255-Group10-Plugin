<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MagicMember
{
    private $magicmember_api_url="http://local.testwebsite.wecitizens.be";
    
     public function __construct($params= array()) 
    {

	$this->CI =& get_instance();

	if (count($params) > 0):  //load other descriptor
	    $this->initialize($params); 

	endif;
	    

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
    
    public function test_magicMember($username,$password)
    {
	  $data["json_to_array"]=$this->userAuthenticate($username, $password);
	  return $this->CI->load->view("test_magicMember",$data,TRUE);
    }
	    
    
    public function userAuthenticate($username, $password)
    {
        $data = array('username' => $username, 'password' => $password);
        $result = file_get_contents($this->magicmember_api_url . '?json=user.authenticate', false, $this->getHttpContext($data));
       //echo $this->magicmember_api_url.'?json=user.authenticate'; die();
       //print_r(json_decode($result, true)); echo "toto"; die();
        return json_decode($result, true);
    }

    public function userRegister($username, $password, $email)
    {
        $data = array('username' => $username, 'password' => $password, 'email' => $email);
        $result = file_get_contents($this->magicmember_api_url . '?json=user.register', false, $this->getHttpContext($data));
        return json_decode($result, true);
    }

    public function userInfo($username)
    {
        $data = array('username' => $username);
        $result = file_get_contents($this->magicmember_api_url . '?json=user.get_info', false, $this->getHttpContext($data));
        return json_decode($result, true);
    }

    public function paidUsers()
    {
        $data = array();
        $result = file_get_contents($this->magicmember_api_url . '?json=user.paid_list', false, $this->getHttpContext($data));
        return json_decode($result, true);
    }

    private function getHttpContext($data)
    {
	
        $options = array('http' => array('header'  => "Content-type: application/x-www-form-urlencoded\r\nConnection: close\r\n",
                                         'method'  => 'POST',
                                         'content' => http_build_query($data)));
				 
        $context = stream_context_create($options);
	
        return $context;
    }
}