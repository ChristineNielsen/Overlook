           /*Funktion til at tjekke cookie*/ 
           function checkCookie() {
            if(getCookie("user_id") != "") {
                return true;
            } else {
                return false;
            }
        }   

//POST METHOD
const button = document.getElementById('send');
let cookie = getCookie("token"); //Finder 'token' cookien, som er gemt i browseren ved at bruge getCookie funktionen
let cookie2 = getCookie("user_id");
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 

button.onclick = function() {
let hotel = document.getElementById('destination').value;
let room = document.getElementById('værelsestype').value;
let pris = document.querySelector('input[name="pris"]:checked').value; //Læser værdien i et felt ud fra feltets id
let num_persons = document.getElementById('antal').value;
let checkin = document.getElementById('checkin').value;
let checkin2 = new Date(checkin).getTime() / 1000; //Konvertere datoen til epoch timestamp
let checkout = document.getElementById('checkout').value;
let checkout2 = new Date(checkout).getTime() / 1000;
let firstname = document.getElementById('firstname').value;
let lastname = document.getElementById('lastname').value;
let email = document.getElementById('email').value;
let telefon = document.getElementById('number').value;
let comment = document.getElementById('comment').value;
console.log(hotel, room, pris, num_persons, checkin2, firstname, lastname, email, telefon, comment)

if(!accept.checked) {
alert('Du skal acceptere!');
accept.focus();
return false;  
}


let data = new URLSearchParams(); //Sætter den information, som vi vil sende til api'en til en form, som api'en kan forstå
data.append('user_id', cookie2); //Sender indputet (fra HTMLen) til variablet data
data.append('hotel_id', hotel);
data.append('room_id', room);
data.append('is_flex', pris);
data.append('num_persons', num_persons);
data.append('checkin', checkin2);
data.append('checkout', checkout2);
data.append('firstname', firstname);
data.append('lastname', lastname);
data.append('email', email);
data.append('phone', telefon);
data.append('comment', comment);

let requestOptions = { 
  method: 'POST', //Laver fetchen til en "post"
  headers: { 
      'Authorization': bearer //Sætter token med
  },
  body: data, //Variablet data skal være i fetch'ens body
  redirect: 'follow' 
};
if(!checkCookie()) {
    alert('Du skal logge ind for at lave en reservation')
} else {
fetch(`https://api.mediehuset.net/overlook/reservations`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
alert('Tak for Købet!');
}
}

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
