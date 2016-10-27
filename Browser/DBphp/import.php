<?php
   $conn = mysql_connect('localhost', 'root', '');
   
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
	
   $table_name = "politician";
   $backup_file  = "/tmp/poltest.csv";
   $sql = "SELECT politician.id, politician.ident, party.abbr, politician.id_image, politician.name, politician.surname, politician.personal_birth, politician.home_city, politician.political_function 
      INTO OUTFILE '/tmp/temp_database.csv' FIELDS TERMINATED BY ','ENCLOSED BY '''' LINES TERMINATED BY '\n' 
      FROM politician 
      INNER JOIN party 
      WHERE party.id = politician.id_party 
      LIMIT 10000";
   
   mysql_select_db('we_poldir');
   $retval = mysql_query( $sql, $conn );
   
   if(! $retval ) {
      die('Could not take data backup: ' . mysql_error());
   }
   
   echo "Backedup  data successfully\n";
   
   mysql_close($conn);
?>