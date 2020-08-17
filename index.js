const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const fetch = require('node-fetch');

//Sætter view engine til ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Definerer root mappe til css referencer m.m.
app.use(express.static(__dirname + '/'));
app.use(cookieparser());

//Route til forside
app.get("/", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/overlook/news');
    const requestToApi2 = await fetch('https://api.mediehuset.net/overlook/hotels/1');
    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 
    const apiResponse2 = await requestToApi2.json(); 
    console.log(apiResponse2.item.rooms) 


    return res.render("pages/index", {
       nyheder: apiResponse,
       værelser: apiResponse2.item.rooms
      });
});

app.get("/land/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/countries/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 

    return res.render("pages/land", {
       land: apiResponse,
       by: apiResponse.item.cities.items
      });
});

app.get("/by/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/cities/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 

    return res.render("pages/by", {
       by: apiResponse,
       hotel: apiResponse.item.hotels.items
      });
});

app.get("/hotel/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/hotels/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 

    return res.render("pages/hotel", {
       hotel: apiResponse,
       room: apiResponse.item.rooms.items
      });
});


app.get("/room/:roomid/:hotelid", async (req, res) => {
    let id = req.params.roomid
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/rooms/${id}`);
    let id2 = req.params.hotelid
    const requestToApi2 = await fetch(`https://api.mediehuset.net/overlook/hotels/${id2}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    const apiResponse2 = await requestToApi2.json();  
    console.log(apiResponse) 

    return res.render("pages/værelse", {
       room: apiResponse,
       hotel: apiResponse2
      });
});

app.get("/reservation/:roomid/:hotelid", async (req, res) => {
    let id = req.params.roomid
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/rooms/${id}`);
    let id2 = req.params.hotelid
    const requestToApi2 = await fetch(`https://api.mediehuset.net/overlook/hotels/${id2}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    const apiResponse2 = await requestToApi2.json();  
    console.log(apiResponse) 


    return res.render('pages/reservation',{
    room: apiResponse,
    hotel: apiResponse2
    });

});


app.get("/administre_reservation", async (req, res) => {

    let id = req.cookies.user_id
    const token = req.cookies.token //Finder 'token' cookien i mine cookies
    console.log(id)
    console.log(token)
    let bearer = 'Bearer ' + token //Definere bearertoken med cookien 
    console.log(token);

    let requestOptions = { 
        method: 'GET', //Laver fetchen til en "get"
        headers: { 
            'Authorization': bearer //Sætter token med
        },
        redirect: 'follow' 
      };
      
      const requestComments = await fetch(`https://api.mediehuset.net/overlook/reservations/list_by_user/${id}`, requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse3 = await requestComments.json();  
    console.log(apiResponse3) 

    return res.render('pages/administre_reservation',{
        reservation: apiResponse3
        });

});

app.get("/rooms", async (req, res) => {
 const requestToApi = await fetch('https://api.mediehuset.net/overlook/hotels/12');
 const apiResponse = await requestToApi.json(); 
 console.log(apiResponse) 

 return res.render("pages/rooms", {
    rooms: apiResponse.item.rooms
   });
});


app.get("/room_type/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/overlook/rooms/${id}`);
    const requestToApi2 = await fetch('https://api.mediehuset.net/overlook/hotels/12');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 
    const apiResponse2 = await requestToApi2.json();  

    return res.render("pages/room_types", {
       types: apiResponse,
       rooms: apiResponse2.item.rooms
      });
});


app.get("/login", (req, res) => {
    return res.render('pages/login');

});

//Angiver port der skal lyttes på
app.listen(3500, () => {
    console.log("Express server kører...");
});