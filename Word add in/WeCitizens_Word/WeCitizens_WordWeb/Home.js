/// <reference path="/Scripts/FabricUI/MessageBanner.js" />
// DEBUG ASSUMPTIONS : Hashmap and CSVtoHashmap work, the hashmap is not empty

// TODO : Image loading different!

(function () {
    "use strict";

    var messageBanner;

    var alreadyFoundPoliticians = {};

    var hashmap = [];

	var counter = {i: 0};

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

           // loadSampleData();
            $('#highlight-button').click(searchNames);

            document.getElementById('file').onchange = function () {

               var file = this.files[0];

               var reader = new FileReader();
               reader.onload = function (progressEvent) {

                   // Give entire file to the function CSVToHashmap
                   hashmap = CSVToHashmap(this.result);

               };
               reader.readAsText(file);
           };

            launchProcess();

        });
    };

    // Launches the main function of the add-in
    function launchProcess() {
      searchNames();
      $('#content-main').append('<span id="politicians"></div>');
    }


/*****************************************************************************************************************/


    /*********************************************/
    /***** SEARCH RELATED AUXILIARY FUNCTIONS*****/
    /*********************************************/

    /**
     * Displays infos of a specific politician
     * in the add-in panel.
     *
     * @index allows to retrieve the first name
     * of the policitian.
     */
    function display(hashmap, name, index, context) {

        Word.run(function (context) {

            // Mettez en file d'attente une commande pour obtenir la selection actuelle, puis
            // creez un objet de plage proxy avec les resultats.
            var body = context.document.body;
            context.load(body, 'text');

            console.log("Name to display : " + hashmap[name][index]);

            var bdate = new Date(hashmap[name][index][6] + 'T10:20:30Z');
            bdate = calculateAge(bdate);

            $('#politicians').append(
                    '<div class="panel panel-default" id="panel' + counter.i + '">\
                        <div class="panel-heading">\
                            <a data-toggle="collapse" data-target="#collapse'+ counter.i + '">\
                            <h4 class="panel-title">' + hashmap[name][index][4] + " " + hashmap[name][index][5] + '</h4>\
                            </a>\
                        </div>\
                        <div id="collapse'+ counter.i + '" class="panel-collapse collapse ">\
                            <div class="panel-body">\
                                <div class="row">\
                                    <div class="col-xs-2" id="photo"> <i class="material-icons md-60">face</i> </div>\
                                    <div class="col-xs-10">\
                                <div class="row"> ' + hashmap[name][index][8] + '</div>\
                                <div class="row"> ' + hashmap[name][index][2] + '</div>\
                                <div class="row"> ' + hashmap[name][index][7] + '</div>\
                                <div class="row"> ' + bdate + ' years old' + '</div>\
                                <div class="row"> <a href="http://www.wecitizens.be">More on Wecitizens.be</a> </div>\
                            </div>\
                        </div>\
                        </div>\
                    </div>\
                </div>\ '
                );
				counter.i++;
        })
    }

    /**
     * Given the name of a politician, displays
     * the infos of all the policitians in the DB matching
     * this name.
     */
    function display_multiple(hashmap, name, context) {

        Word.run(function (context) {
            console.log("Name to display : " + name);
            // Mettez en file d'attente une commande pour obtenir la selection actuelle, puis
            // creez un objet de plage proxy avec les resultats.
            var body = context.document.body;
            context.load(body, 'text');

            for (var i = 0; i < hashmap[name].length; i++) {
                var person = hashmap[name][i];
                var bdate = new Date(person[6] + 'T10:20:30Z');
                bdate = calculateAge(bdate);

                $('#politicians').append(
                    '<div class="panel panel-default" id="panel' + counter.i + '">\
                        <div class="panel-heading">\
                            <a data-toggle="collapse" data-target="#collapse'+ counter.i + '">\
                            <h4 class="panel-title">' + person[4] + " " + person[5] + '</h4>\
                            </a>\
                        </div>\
                        <div id="collapse'+ counter.i + '" class="panel-collapse collapse ">\
                            <div class="panel-body">\
                                <div class="row">\
                                    <div class="col-xs-2" id="photo"> <i class="material-icons md-60">face</i> </div>\
                                    <div class="col-xs-10">\
                                <div class="row"> ' + person[8] + '</div>\
                                <div class="row"> ' + person[2] + '</div>\
                                <div class="row"> ' + person[7] + '</div>\
                                <div class="row"> ' + bdate + ' years old' + '</div>\
                                <div class="row"> <a href="http://www.wecitizens.be">More on Wecitizens.be</a> </div>\
                            </div>\
                        </div>\
                        </div>\
                    </div>\
                </div>\ '
                );
				counter.i++;
            }
        })
    }

   /**
    * General function which launches the search for politicians.
    * Loads the text of the documents (body.text),
    * then calls inspectText().
    */
    function searchNames() {

        Word.run(function (context) {

            // Mettez en file d'attente une commande pour obtenir la selection actuelle, puis
            // creez un objet de plage proxy avec les resultats.
            var body = context.document.body;
            context.load(body, 'text');

            // Empties the politicians already found since we "relaunch" the search.
            alreadyFoundPoliticians = {};

            $('#politicians').empty();  // Empties all the content of the panel.

            return context.sync().then(function () {

                var wholeText = body.text;  // Get the whole text of the body as a String

                // Launch the search
                inspectText(wholeText, context);

            }).then(context.sync);
        })
        .catch(errorHandler);

    }

    /**
     * Given a text as a String object (body),
     * the function searches for any politicians' names in the text of the document.
     * It uses a regular expression.
     */
    function inspectText(body, context) {
        var toDisplay = [];
        console.log(body);
        var prev, pref, word;
        var prefix = ["", "den ", "der ", "de ", "van "];
        var reg = /[A-Z]+[a-z\-]*/gm;
        var i = 0;
        while (word = reg.exec(body)) {
            if (word == "De" || word == "Van" || word == "Di" || word == "Vanden" || word == "Ver") {		//Di Rupo rpz
                pref = word;
                console.log("Prefix found: " + pref);
                continue;
            }
            var name;
            var found = false;
            var iter = 0;
            while (!found && iter < prefix.length) {
                // Search for prefixes
                if (pref != null) {
                    name = pref + " " + prefix[iter] + word;
                } else {
                    name = prefix[iter] + word;
                }
                // Search for the name in the hashmap
                if (name in hashmap && !(name in alreadyFoundPoliticians)) {
					alreadyFoundPoliticians[name] = true;
                    found = true;
                    var matching = [];
                    var pol = null;
                    // If only one politician has this name
                    var twoNames = false;
                    if (hashmap[name].length == 1) {
                        pol = 0;
                    }
                        // If a politician has his first name cited just before his last name in the text
                    else for (var i in hashmap[name]) {
                        matching.push(hashmap[name][i]);
                        if (prev == hashmap[name][i][4]) { //Matching also firstname
                            pol = i;
                            twoNames = true;
                        }
                    }
                    var nameLength = name.length;
                    if (twoNames) {
                        prev += " ";
                        nameLength += prev.length;
                    }
                    else {
                        prev = "";
                    }

                    // Only one politician
                    if (pol != null) {
                        display(hashmap, name, pol, context);
                    }
                        //Multiple policitians
                    else {
                        console.log("display multiple");
                        display_multiple(hashmap, name, context);
                    }
                    pref = null;
                }
                prev = word;
                iter++;
            }
        }
    }

    //http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
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

    //Code found on STACKOVERFLOW
    function CSVToHashmap(strData) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        var strDelimiter = ",";
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        var hashmap = {};

        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {


            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            var strMatchedValue;
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                    );
            } else {
                // We found a non-quoted value.
                strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
            if (arrData[arrData.length - 1].length == 9) {
                var line = arrData[arrData.length - 1];
                addToHashMap(hashmap, line);

            }
        }
        //Return the parsed data.
        // var test = hashmap['Michel'];
        // for(var i = 0; i<test.length; i++){
        //     alert(test[i]);
        // }
        return (hashmap);
    }

    /*
     * Add the line to the hashmap.
     * In case of conflict, appends the line to the end of the array stored at
     * hashmap[line[5]]
     **/
    function addToHashMap(hashmap, line) {
        if (hashmap[line[5]] == undefined) {
            hashmap[line[5]] = [];
        }
        hashmap[line[5]].push(line);
    }

})();
