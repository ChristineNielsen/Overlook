//Finder en bestemt cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    let item;
    for(item of ca) {
        while (item.charAt(0) == ' ') {
            item = item.substring(1);
        }
        if (item.indexOf(name) == 0) {
            return item.substring(name.length, item.length);
        }
    }
    return "";
}

//DELETE METHOD

function deleteComments(id) {

    let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 
    
    let requestOptions = { 
      method: 'DELETE', //Laver fetchen til en "delete"
      headers: { 
        'Authorization': bearer //Sætter token med
    },
      redirect: 'follow' 
    };
    console.log(id)
    
    fetch(`https://api.mediehuset.net/overlook/reservations/${id}`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    setTimeout(function(){ location.reload(); }, 1000);
    }
    