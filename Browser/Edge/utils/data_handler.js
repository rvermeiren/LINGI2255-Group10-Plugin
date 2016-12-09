/** data_handler.js
 * This script handles the tranformations on the data
 * Formatting, building urls, and so on.
 */

 //checks if the database entries are not \N or undefined and gives a cleaner output
 function cleanData(person) {
 	var bdate;
 	if (person[6] == "\\N" || typeof person[6] == 'undefined' || person[6] == null) {
 		bdate = "Unknown age";
 	} else {
 		bdate = new Date(person[6]+'T10:20:30Z');
 		bdate = calculateAge(bdate);
 	}

 	var city;
 	if (person[7] == "\\N" || typeof person[7] == 'undefined' || person[7] == null){
 		city = "Unknown city";
 	}else{
 		city= person[7];
 	}

 	var post;
 	if (person[8] == "\\N" || typeof person[8] == 'undefined' || person[8] == null){
 		post = "Unknown post";
 	}else{
 		post = person[8];
 	}

 	return [person[0], person[1], person[2], person[3], person[4], person[5], bdate, city, post];
 }

//http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
function calculateAge(birthday) { // birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	ret = Math.abs(ageDate.getUTCFullYear() - 1970);
	return (ret + " years old");
}

function removeAccent(str) {
	var accent = [
		/[\300-\306]/g, /[\340-\346]/g, // A, a
		/[\310-\313]/g, /[\350-\353]/g, // E, e
		/[\314-\317]/g, /[\354-\357]/g, // I, i
		/[\322-\330]/g, /[\362-\370]/g, // O, o
		/[\331-\334]/g, /[\371-\374]/g, // U, u
		/[\321]/g, /[\361]/g, // N, n
		/[\307]/g, /[\347]/g, // C, c
	];
	var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

	for(var i = 0; i < accent.length; i++){
		str = str.replace(accent[i], noaccent[i]);
	}

	return str;
}

function urlBuild(name, firstname, id) {
	var linkedName = name.replace(" ", "-");
	var linkedFirstname = firstname.replace(" ", "-");
	var res = linkedFirstname.concat(linkedName);
	res.toLowerCase();
	res.replace(" ", "-");
	res = removeAccent(res);
	return("http://directory.wecitizens.be/fr/politician/" + res + "-" + id);
}

function imgBuild(name, imgName) {
	if (imgName != "\\N" && imgName != 0) {
		var photo = ("http://directory.wecitizens.be/images/generic/politician-thumb/" + imgName);
	} else {
		var photo = ("http://directory.wecitizens.be/images/img-no-photo.png");
	}
	return "<img src="+ photo +" height=75 alt="+ name +">";
}
