
	<b>Voici le contenu de l'array que renvoie la library MagicMember avec la méthode userAuthenticate()</b>
	    <div class='well'>
		 <?php print_r($json_to_array); ?>
	    </div>
	aarray["msg"] indique si la connexion est permise.<br>
	    <b>Si array["msg"]= "ok"</b> alors on peut connecter l'utilisateur<br>
	    <b>Si array["msg"]= "incorrect_password "</b> alors on doit refuser la connexion<br>
	    

