/// <reference path="/Scripts/FabricUI/MessageBanner.js" />


(function () {
    "use strict";

    var messageBanner;

    var alreadyFoundPoliticians = {}

    var politicsName = []
    politicsName.push('Louis')
    politicsName.push('Anatole')
    politicsName.push('Zébulon')
    politicsName.push('Anguerrand')
    politicsName.push('téophilémon')
    politicsName.push('quentin de grolard')


    // La fonction d'initialisation doit être exécutée chaque fois qu'une nouvelle page est chargée.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            // Initialiser le mécanisme de notification de FabricUI, et le masquer
            var element = document.querySelector('.ms-MessageBanner');
            messageBanner = new fabric.MessageBanner(element);
            messageBanner.hideBanner();

            // Si Word 2016 n'est pas utilisé, employez la logique de secours.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                $("#template-description").text("Cet exemple affiche le texte sélectionné.");
                $('#button-text').text("Chercher les politiciens");
                $('#button-desc').text("Afficher le texte sélectionné");

                $('#highlight-button').click(
                    displaySelectedText);
                return;
            }

            /*$("#template-description").text("Version d'essai.");*/
            $('#button-text').text("Chercher les politiciens !");
            $('#button-desc').text("Met en surbrillance les noms de la liste.");
            var lol;
            include("Scripts/node_modules/papaparse/papaparse.min.js", function(){
              lol = importCSV("database/politicians.csv");
            });

            loadSampleData();
            $('#highlight-button').click(searchNames);

            launchProcess()

            // Ajoutez un gestionnaire d'événements Click pour le bouton de mise en surbrillance.

        });
    };

    function launchProcess() {
      searchNames();
      $('#content-main').append('<span id="politicians"></div>');
      return ;
    }

    function loadSampleData() {

        // Exécutez une opération de traitement par lots sur le modèle objet Word.
        Word.run(function (context) {

            // Créez un objet proxy pour le corps du document.
            var body = context.document.body;

            // Mettez en file d'attente une commande pour effacer le contenu du corps.
            body.clear();
            // Mettez en file d'attente une commande pour insérer du texte à la fin du corps du document Word.
            body.insertText("This bLouis guy was writing a sample text but Zébulon and Téophilémon inserted Anatole in anatole.\ntéophilémon is totally not a cool guy. Lol.\nquentin de grolard is a funny guy.",
                            Word.InsertLocation.end);

            // Synchronisez l'état du document en exécutant les commandes en file d'attente, puis retournez une promesse pour indiquer l'achèvement de la tâche.
            return context.sync();
        })
        .catch(errorHandler);
    }

    /*
    Hightlights the names of the politicians that are contained in the text
    */
    function searchNames() {

        Word.run(function (context) {

            // Mettez en file d'attente une commande pour obtenir la sélection actuelle, puis
            // créez un objet de plage proxy avec les résultats.
            var body = context.document.body;
            context.load(body, 'text');
            var searchResults = [];
            $('#politicians').empty();
            alreadyFoundPoliticians = {}

            return context.sync()
            .then(function () {

                for (var name in politicsName) {
                    searchResults.push(body.search(politicsName[name], {matchCase:true, matchWholeWord: true }));
                }

                var arrayLength = searchResults.length;
                for (var i = 0; i < arrayLength; i++) {
                    context.load(searchResults[i], 'font');
                    context.load(searchResults[i], 'text')
                }

            })
            .then(context.sync)
            .then(function () {
              var arrayLength = searchResults.length;
              for (var i = 0; i < arrayLength; i++) {
                  if (searchResults[i].items[0] != null && alreadyFoundPoliticians[searchResults[i].items[0].text] == null) {
                      alreadyFoundPoliticians[searchResults[i].items[0].text] = true;
                      $('#politicians').append('<div class="panel panel-default" id="panel'+i+'">\
                                                <div class="panel-heading">\
                                                  <a data-toggle="collapse" data-target="#collapse'+i+'">\
                                                    <h4 class="panel-title">'+searchResults[i].items[0].text+'</h4>\
                                                  </a>\
                                                </div>\
                                                <div id="collapse'+i+'" class="panel-collapse collapse ">\
                                                    <div class="panel-body">Here is some info about the politician</div>\
                                                </div>\
                                              </div>'
                  );
                  }
              }
            })
            .then(context.sync);
        })
        .catch(errorHandler);
    }

    function displaySelectedText() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    showNotification('Le texte sélectionné est :', '"' + result.value + '"');
                } else {
                    showNotification('Erreur :', result.error.message);
                }
            });
    }

    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Erreur :", error);
        console.debug("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Fonction d'assistance pour afficher les notifications
    function showNotification(header, content) {
        $("#notificationHeader").text(header);
        $("#notificationBody").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }

    function importCSV(file){
      Papa.SCRIPT_PATH="Script/node_modules/papaparse/papaparse.min.js";
      console.log("Starting import...");
      return Papa.parse(file, {
      	step: function(row) {
      		console.log("Row:", row.data);
      	},
      	complete: function() {
      		console.log("All done!");
      	}
      });
    }


    function include(url, callback){

      /* on crée une balise<script type="text/javascript"></script> */
      var script = document.createElement('script');
      script.type = 'text/javascript';

      /* On fait pointer la balise sur le script qu'on veut charger
         avec en prime un timestamp pour éviter les problèmes de cache
      */

      script.src = url + '?' + (new Date().getTime());

      /* On dit d'exécuter cette fonction une fois que le script est chargé */
      if (callback) {
          script.onreadystatechange = callback;
          script.onload = script.onreadystatechange;
      }

      /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
      document.getElementsByTagName('head')[0].appendChild(script);
    }

})();
