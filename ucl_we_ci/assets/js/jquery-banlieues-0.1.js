//Connaitre l'url du site
var base_url=$(location).attr("host");
//Fonction de test
function test(value){ alert(value); return ; } 
//fonction de chargement ajax de type html
function ajax_simple(adresse,view)
{    
    //alert(adresse);
    jQuery("#"+view).append('<div class="loader"></div>');
    jQuery.ajax
             ({
                type:'POST',
		url: adresse,
		cache: false,
		success: function(html)
                {
                    
                      jQuery("#"+view).html(html);
                      jQuery("#"+view).fadeIn();
                     
                }   
             });
}
//Fonction de chargement ajax de vue
function load_view(controller, view){
     //On charge le loader
     var adresse="http://"+base_url+"/"+controller+"/"+view;
     //alert(adresse);
     ajax_simple(adresse,view);
     return false;
}




