/// <reference path="/Scripts/FabricUI/MessageBanner.js" />


(function () {
    "use strict";

    var messageBanner;

    var alreadyFoundPoliticians = {}

    var politicsName = {};

    politicsName["Magnette"] = "Paul Magnette;PS,8/06/1971,Charleroi,Walloon Government";
    politicsName["Michel"] = "Charles Michel;MR,21/12/1975,Wavre,Federal Government";
    politicsName["Di Rupo"] = "Elio Di Rupo;PS,18/07/1951,Mons,Chair of a party";

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
            $('#button-text').text(" Search for politicians");
            $('#button-desc').text("Met en surbrillance les noms de la liste.");

            loadSampleData();
            $('#highlight-button').click(searchNames);

            //politicsName = readTextFile('http://34bw.be/wp-content/uploads/2016/10/temp_database.csv')

            launchProcess()

        });
    };

    // Launches the main function of the add-in
    function launchProcess() {
      searchNames();
      $('#content-main').append('<span id="politicians"></div>');
      return ;
    }

    function loadSampleData() {

        // Executez une opération de traitement par lots sur le modèle objet Word.
        Word.run(function (context) {

            // Creez un objet proxy pour le corps du document.
            var body = context.document.body;

            // Mettez en file d'attente une commande pour effacer le contenu du corps.
            body.clear();

            // Synchronisez l'etat du document en exécutant les commandes en file d'attente, puis retournez une promesse pour indiquer l'achevement de la tache.
            return context.sync();
        })
        .catch(errorHandler);
    }

    /*
    Search for the names matching the names in the politicians database
    */
    function searchNames() {

        Word.run(function (context) {

            // Mettez en file d'attente une commande pour obtenir la selection actuelle, puis
            // creez un objet de plage proxy avec les resultats.
            var body = context.document.body;
            context.load(body, 'text');

            // Clears the search results and the display when "relaunching" the search
            var searchResults = [];
            $('#politicians').empty();
            alreadyFoundPoliticians = {}

            return context.sync()
            .then(function () {

                // Search for politicians
                for (var name in politicsName) {
                    searchResults.push(body.search(name, {matchCase:true, matchWholeWord: true }));
                }

                var arrayLength = searchResults.length;
                for (var i = 0; i < arrayLength; i++) {
                    context.load(searchResults[i], 'font');
                    context.load(searchResults[i], 'text')
                }

            })
            .then(context.sync)
            .then(function () {
              // Displays in the panel the politicians found
              var arrayLength = searchResults.length;
              for (var i = 0; i < arrayLength; i++) {
                  if (searchResults[i].items[0] != null && alreadyFoundPoliticians[searchResults[i].items[0].text] == null) {
                      alreadyFoundPoliticians[searchResults[i].items[0].text] = true;
                      var currentPolName = politicsName[searchResults[i].items[0].text].split(";");
                      var currentPolInfos = currentPolName[1].split(",");
                      console.log(currentPolInfos[0]);
                      $('#politicians').append(
         '<div class="panel panel-default" id="panel' + i +'">\
          <div class="panel-heading">\
             <a data-toggle="collapse" data-target="#collapse'+i+'">\
                 <h4 class="panel-title">'+ currentPolName[0] + '</h4>\
             </a>\
          </div>\
          <div id="collapse'+i+'" class="panel-collapse collapse ">\
              <div class="panel-body">\
                <div class="row">\
                 <div class="col-xs-2" id="photo"> <i class="material-icons md-60">face</i> </div>\
                  <div class="col-xs-10">\
                    <div class="row"> ' + currentPolInfos[0] +'</div>\
                    <div class="row"> ' + currentPolInfos[1] +'</div>\
                    <div class="row"> ' + currentPolInfos[2] +'</div>\
                    <div class="row"> ' + currentPolInfos[3] +'</div>\
                    <div class="row"> <a href="http://www.wecitizens.be">More on Wecitizens.be</a> </div>\
                  </div>\
                 </div>\
                </div>\
              </div>\
          </div>\ '
                    );
                  }
              }
            })
            .then(context.sync);
        })
        .catch(errorHandler);
    }

    function readTextFile(filename) {
        var client = new XMLHttpRequest();
        client.open('GET', filename, true);
        client.onreadystatechange = function () {
            //alert(client.responseText);
            client.responseText;
        }
        client.send();
    }

    // creates the hashmap
    function getHashMap(filename) {
        var csv = 'http://34bw.be/wp-content/uploads/2016/10/temp_database.csv';
        var strContent = readTextFile(csv);
        var hashmap = {};
        hashmap = CSVToArray(strContent);
        //alert(hashmap);
        return hashmap;
    }// JavaScript source code

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

})();
