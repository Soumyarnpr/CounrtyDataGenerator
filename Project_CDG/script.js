const bodyData = document.body.innerHTML;

function chkNLoad() {
    let cName = document.getElementById("name").value.trim(); // Getting counrty name

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${cName}?fullText=true`);
    request.send();
    request.onprogress = () => {
        // console.log(request.status);
        if(request.status == 404) {
            document.getElementById("msg").innerHTML="Try again after checking spellings or Data not found!!!";
            return 1;
        }
    } // Check if Data avialable

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        // console.log(data);
        const loadDataStr = `
            <div>
                <h1 id="page-header">${data.name.common.toUpperCase()}</h1>
                <div id="container">
                <div id="image-container">
                    <div id="flag">
                        <h3>National Flag</h3>
                        <img src="${data.flags.svg}" alt="${data.flags.alt}">
                    </div>
                    <div id="symbole">
                        <h3>Coat of Arms</h3>
                        <center><img src="${data.coatOfArms.svg}" alt="coat of arms"></center>
                    </div>
                    <div id="map">
                        <h3>Map</h3>
                        <a href="${data.maps.googleMaps}" target="_blank">
                            <center><img src="loc.svg" alt="map"></center>
                        </a>
                    </div>
                </div>
                <div id="text-container">
                    <p>
                        <span>Country Name: </span> ${data.name.common} <br>
                        <span>Official Name: </span> ${data.name.official} <br>
                        <span>Capital: </span> ${data.capital.join(", ")} <br>
                        <span>Area: </span> ${data.area} Square Kilometers<br>
                        <span>Currency Name: </span> ${Object.values(data.currencies)[0].name} <br>
                        <span>Currency Symbole: </span> ${Object.values(data.currencies)[0].symbol} <br>
                        <span>Border Country(s): </span> ${data.borders ? data.borders.join(", ") : "No Border Countries"} <br>
                        <span>Continent(s): </span> ${data.continents.join(", ")} <br>
                        <span>Demonyms: </span> Male: ${data.demonyms.eng.m}, Female: ${data.demonyms.eng.f} <br>
                        <span>Short Name: </span> ${data.cca3} <br>
                        <span>Time Zone: </span> ${data.timezones.join(", ")}
                    </p>
                </div>
                </div>
                <center><button id="newSrc" class="btn" onclick="newSrc();" style="margin-bottom: 25px;">Search for another Counrty</button></center>
            </div>
        `;
        document.body.innerHTML = loadDataStr;  
    });
}

const newSrc = () => {document.body.innerHTML = bodyData}