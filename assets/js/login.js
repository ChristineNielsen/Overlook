        /*Tjekker på om cookie er sat ( dvs. om bruger allerede er logget ind eller ej)*/
        if(!checkCookie()) {
            loginHtml();
        } else {
            logoutpage();
        }
  
        /*Funktion til at logge ind med*/
        function login(form) {
            /*Sætter headers (skal have med, så API'en forstår hvad den modtager)*/
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
            /* Henter form inputs fra HTML'en (username, password)*/
            let username = form.username.value;
            let password = form.password.value;

            /* Sætter input værdierne til URL encoded format*/
            let urlencoded = new URLSearchParams();
            urlencoded.append("username", username);
            urlencoded.append("password", password);
  
            /*Laver en POST request til API endpoint; (requestOptions)*/
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
  
            /*Fetcher til endpointet med vores requestOptions*/
            fetch("https://api.mediehuset.net/token", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.access_token) {
                        
                        /* Sætter cookies med user_id og token*/
                        setCookie('token', result.access_token, 7);
                        setCookie('user_id', result.user_id, 7);
  
                        /* Kører funktionen, der udskriver logout knap i HTML'en*/
                        logoutpage();
  
                    }
                })
        }
  
        /*Funktion til at sætte cookie*/ 
        function setCookie(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
  
        /*Funktion til at hente cookie*/ 
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
  
        /*Funktion til at tjekke cookie*/ 
        function checkCookie() {
            if(getCookie("user_id") != "") {
                return true;
            } else {
                return false;
            }
        }   
        
        /*Fjerner de cookies der er blevet sat ved login, hvis fukntionen 'logout' bliver kørt*/
        function logout() {
            setCookie('token', 0, -7);
            setCookie('user_id', 0, -7);
            loginHtml();
        }
  
        /* Funktion til at udskrive login vinduet i HTML'en*/
        function loginHtml() {
            const html = `
            <div class="grid-container">
            <form class="login4">
                <div>
                  <label for="username">Brugernavn:</label>
                  <input type="text" name="username" id="username" value="">        
                </div>
                <div>
                  <label for="password">Adgangskode:</label>
                  <input type="password" name="password" id="password" value="">        
                </div>
                <div>
                  <button type="button" onclick="login(this.form)">Login</button>
                <a href="/"><button type="button" >Annuller</button></a>
                </div>
              </form>
            </div>          
            `;  
            document.getElementById('login').innerHTML = html;
        }
  
        /*Funktion til at udskrive logout knap i HTML'en*/
        function logoutpage() { 
          const html = `
          <div class="styling">
          <h2>Du er nu logget ind!</h2>
            <div>
          <a href="/"><button type="button" >Tilbage til forsiden!</button></a>
                    <button type="button" onclick="logout()">Logout</button>
                  </div>
            </div>
            `;
            document.getElementById('login').innerHTML = html;
        }