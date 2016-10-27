<?php
   $db = $this->load->database();

   $sql = "SELECT politician.id, politician.ident, party.abbr, politician.id_image, politician.name, politician.surname, politician.personal_birth, politician.home_city, politician.political_function 
      INTO OUTFILE '../../assets/media/upload/tamp.csv' FIELDS TERMINATED BY ','ENCLOSED BY '''' LINES TERMINATED BY '\n' 
      FROM politician 
      INNER JOIN party 
      WHERE party.id = politician.id_party 
      LIMIT 10000";

   $query = $this->db->query($sql);
   
   echo "Backedup  data successfully\n";
?>
