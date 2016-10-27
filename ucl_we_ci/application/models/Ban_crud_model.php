<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Code 1 = Article public de une News
// Code 2= Autres articles public des News

class Ban_crud_model extends CI_Model {
    
    
   
   public function  read_data($table,$fields=NULL,$where=NULL,$left=NULL,$order=NULL,$group_by=NULL,$limit=NULL,$count=FALSE,$where_in=NULL,$where_not_in=NULL,$having=NULL,$where_like=NULL)
   {
        //print_r($limit);
        if(!is_null($fields)):
            $this->db->select($fields);
        else:
            $this->db->select("*");
        endif;
        $this->db->from($table);
    
        if(!is_null($left)):
              
            if(!is_array($left[0])):
            $this->db->join($left[0],$left[1],"left");
            else:
              
                foreach($left as $k=>$v):
                    foreach($v as $ks=>$vs):
                        $this->db->join($ks,$vs,"left");
                    endforeach;
                endforeach;
            endif;
            
        endif;
        
        if(!is_null($where)):
           if(!is_array($where)):
               $this->db->where($where,NULL, FALSE);
           else:
                if(!is_array($where[0])):
                    $this->db->where($where[0],$where[1]);
                else:
                    foreach($where as $k=>$v):
                        foreach($v as $ks=>$vs):
                            $this->db->where($ks,$vs);
                        endforeach;
                    endforeach;
                endif;
          endif;  
        endif;
        
        if(!is_null($where_in)):
            $this->db->where_in($where_in[0],$where_in[1]);
        endif;
        
        if(!is_null($where_like)):
           
                if(!is_array($where_like[0])):
                    $this->db->like($where_like[0],$where_like[1]);
                else:
                    foreach($where_like as $k=>$v):
                        foreach($v as $ks=>$vs):
                            $this->db->like($ks,$vs);
                        endforeach;
                    endforeach;
                endif;
         
        endif;
        
        if(!is_null($where_not_in)):
            $this->db->where_not_in($where_not_in[0],$where_not_in[1]);
        endif;
        
        
         if(!is_null($having)):
            $this->db->having($having);
        endif;
        
        if(!is_null($order)):
            $this->db->order_by($order);
        endif;
        
        if(!is_null($group_by)):
            $this->db->group_by($group_by);
        endif;
        
        if(!is_null($limit)):
             
            $this->db->limit($limit[0],$limit[1]);
        endif;
        
        if($count):
            return $this->db->count_all_results();
        else:
            
            return $this->db->get()
                   ->result();
        endif;
   }
   
   public function  search_data($table,$fields=NULL,$where=NULL,$left=NULL,$order=NULL,$group_by=NULL,$limit=NULL,$count=FALSE,$search_champ,$chaine)
   {
       
        //ON prépare le moteur
        $chaine=trim($chaine);
        
            $chaine =preg_replace('/\s{2,}/', ' ', $chaine);
            $chaines=explode(" ",$chaine); 
            
            $is_new_search_champ=FALSE;
             foreach($search_champ as $vsc):
                if(count($chaines)>1):
                $this->db->group_start();
                else:
                    $this->db->or_group_start();
                endif;
                foreach($chaines as $vch):
                    $this->db->or_like($vsc,$vch);
                 /* if($is_new_search_champ):
                     $this->db->or_like($vsc,$vch); 
                  else:
                    $this->db->like($vsc,$vch);
                  endif;
                  $is_new_search_champ=FALSE;*/
                endforeach;
                $this->db->group_end();
                /*$is_new_search_champ=TRUE;*/
            endforeach;
       
        if(!is_null($fields)):
            $this->db->select($fields);
        else:
            $this->db->select("*");
        endif;
        $this->db->from($table);
    
        if(!is_null($left)):
              
            if(!is_array($left[0])):
            $this->db->join($left[0],$left[1],"left");
            else:
              
                foreach($left as $k=>$v):
                    foreach($v as $ks=>$vs):
                        $this->db->join($ks,$vs,"left");
                    endforeach;
                endforeach;
            endif;
            
        endif;
        
        if(!is_null($where)):
           if(!is_array($where)):
               $this->db->where($where,NULL, FALSE);
           else:
                if(!is_array($where[0])):
                    $this->db->where($where[0],$where[1]);
                else:
                    foreach($where as $k=>$v):
                        foreach($v as $ks=>$vs):
                            $this->db->where($ks,$vs);
                        endforeach;
                    endforeach;
                endif;
          endif;  
        endif;
        
        
        if(!is_null($order)):
            $this->db->order_by($order);
        endif;
        
        if(!is_null($group_by)):
            $this->db->group_by($group_by);
        endif;
        
        if(!is_null($limit)):
            $this->db->limit($limit[0],$limit[1]);
        endif;
        
        if($count):
            return $this->db->count_all_results();
        else:
            
            return $this->db->get()
                   ->result();
        endif;
   }
   
   
  
   public function insert_data($data,$table){
       
       $this->db->insert($table,$data);
       $id_insert=$this->db->insert_id();
       return $id_insert;
   }
   
   public function  update_data($table,$data,$where)
   {
        
        $this->db->update($table, $data,$where);
   }
   
   
   public function  delete_data($table,$where)
   {
        $this->db->where($where);
        $this->db->delete($table);
   }
   
   public function is_exist($table,$champ,$value){
        $this->db->select(array($champ));
        $this->db->from($table);
        $this->db->where($champ,$value);
        return $this->db->get()
                ->result();
    }
    
    public function verif_connexion($login,$mdp){

       $this->db->select("*");
       $this->db->from("users");
       $this->db->where("login",$login);
       $this->db->where("mdp",encrypt(trim($mdp)));
       $this->db->join("vignette","vignette.id_vignette=users.id_vignette","left");
       return $this->db->get()
               ->result();
   }
}
