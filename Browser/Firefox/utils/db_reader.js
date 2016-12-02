chrome.storage.local.get('last_modified',
    function(date){
        //  update the db every seven days
        if (JSON.stringify(date) == '{}' || (new Date() - new Date(date.last_modified) > 7 * 24 * 60 * 60 * 1000)){
            getDistantCSV();
        }
    }
);

// This code is based on this blog entry :
// https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
function CSVToHashmap(strData){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = ",";
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
    while (arrMatches = objPattern.exec(strData)){


        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"","g"),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length-1].push(strMatchedValue);
        if (arrData[arrData.length-1].length == 9){
          line = arrData[arrData.length-1];
          addToHashMap(hashmap, line);

        }
    }
    return(hashmap);
}

/*
 * Add the line to the hashmap.
 * In case of conflict, appends the line to the end of the array stored at
 * hashmap[line[5]]
 **/
function addToHashMap(hashmap, line){
    if (hashmap[line[5]] == undefined){
        hashmap[line[5]] = [];
    }
    hashmap[line[5]].push(line);
}

/*
 * Gets the database in CSV format from the website
 */
function getDistantCSV(){
    var client = new XMLHttpRequest();
    var filename = 'http://34bw.be/wp-content/uploads/2016/11/temp_database.csv';
    client.open('GET', filename, false);
    client.onreadystatechange = function() {
        var d = new Date();
        browser.storage.local.set({'database_csv': client.responseText}).then(function(){
                console.log("File saved" + client.responseText);
                browser.storage.local.set({'last_modified': d.toString()}).then(function(){
                    console.log("File saved, last modified : " + d);
                }, null);
            }, function(){
                console.log("ERROR");
            });
    }
    client.send();
}
