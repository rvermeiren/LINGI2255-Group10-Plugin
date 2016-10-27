function play(address, callback)
{
    initializeXhrObject(address, callback);
    // gestion du bouton et du loaderur pendant le loaderment asynchrone
    var $result = document.getElementsByName("result")[0].disabled = true;
    document.getElementById("loader").style.visibility = "visible";
    xhrObject.send(null);

}


function refreshPage()
{
//    contrôle de la valeur de la propriété readyState
    if(xhrObject.readyState == 4)
    {
        document.getElementById("loader").style.visibility = "hidden";
        // réponse serveur ok
        if(xhrObject.status == 200)
        {
            var newGain = xhrObject.responseText;
            // loaderment du résultat dans l'élement d'id result
            replaceContent("result", "", newGain)
            // passe le div info en visible
            document.getElementById("info").style.visibility="visible";
        }
        // réponse serveur nok
        else
        {
            var txt = "Erreur serveur : " + xhrObject.status + ", " + xhrObject.statusText;
            replaceContent("result", "", txt);
            document.getElementById("info").style.visibility="visible";
            // annule la requête
            xhrObject.abort();
            xhrObject = null;
        }
        // réactiver le bouton
        document.getElementsByName("result")[0].disabled = false;
    }
}
