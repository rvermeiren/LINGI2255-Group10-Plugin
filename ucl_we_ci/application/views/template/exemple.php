<div class="container">
    <div class="panel">
	<div class="panel-body">
	    <h2>Ce lien demande le nom et le prénom d'un politicien dont l'id est 665</h2>
	    <h2><a href="<?php echo base_url();?>politician/fiche/665"><?php echo base_url();?>politician/fiche/665</a></h2>
	    <p>
	
		<b>Controller:</b> Politician<br>
		<b>Méthode:</b> fiche<br>
		<b>Paramètre de méthode:</b>$id_politician=665<br>
	    </p>
	</div>
    </div>
</div>

<div class="container">
    <div class="panel">
	<div class="panel-body">
	    <h2>La connexion d'utilisateur en front end doit utiliser la library MagicMember du module system</h2>
	    
	    <p>
		L'authentification se fait par échange json avec le plugin magicmember du wordpress.<br>
		En cliquant sur le lien ci-dessous, le système va appeller le controller Login qui va faire appel à la library MagicMember ppur vérifier si cet utilisateur existe dans le wordpress
	    <h2><a href="<?php echo base_url();?>login">Connecter l'<b>user Public</b> avec le <b>mdp guest</b></a></h2>
	    </p>
	</div>
    </div>
</div>