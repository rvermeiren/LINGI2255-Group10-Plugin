var xhrObject = new XMLHttpRequest();

function initializeXhrObject(address, callback)
{
    xhrObject.open("get", address, true);
    // définition de la fonction de rappel à exécuter à la réception des données
    xhrObject.onreadystatechange = callback;
}


function removeElement(element)
{
    if(element != null)
    {
        while(element.firstChild)
        {
            element.removeChild(element.firstChild);
        }
    }

}

function replaceContent(id, name, text)
{
    if(id != "")
    {
        element = document.getElementById(id);
    }
    else if(name != "")
    {
        element = document.getElementsByName(name)[0];
    }
    if(element != null)
    {
        removeElement(element);
        var newContent = document.createTextNode(text);
        element.appendChild(newContent);
    }
}
