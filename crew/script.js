function displayAirports(data) {
  var table = document.getElementById("airportTable");
  var cityFilter = document.getElementById("cityFilter");
  var countryFilter = document.getElementById("countryFilter");

  function createGenerateButton(destinationIATA) {
    var generateButton = document.createElement('button');
    generateButton.innerText = 'Generate Flight';
    generateButton.onclick = function() {
      openFlightForm(destinationIATA);
    };
    return generateButton;
  }

  function applyFilters() {
    var cityValue = cityFilter.value.toLowerCase();
    var countryValue = countryFilter.value.toLowerCase();

    table.innerHTML = ''; // Clear the table

    for (var i = 0; i < data.length; i++) {
      if (data[i].City.toLowerCase().includes(cityValue) && data[i].Country.toLowerCase().includes(countryValue)) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = data[i].City;
        cell2.innerHTML = data[i].Country;
        cell3.innerHTML = data[i].IATA;
        cell4.innerHTML = data[i].ICAO;
        cell5.innerHTML = data[i].Airport;

        // Create a button that opens the form for the specific airport
        var generateButton = createGenerateButton(data[i].IATA);
        cell6.appendChild(generateButton);
      }
    }
  }

  cityFilter.addEventListener('input', applyFilters);
  countryFilter.addEventListener('input', applyFilters);

  // Initial display of airports
  applyFilters();
}

function openFlightForm(destinationIATA) {
  // Create the form HTML content
  var formHTML = `
    <div class="modal-overlay" onclick="closeFlightForm()"></div>
    <div class="modal">
      <h2>Generate Flight</h2>
      <form>
        <div class="form-group">
          <label for="destinationIATA">Destination IATA Code:</label>
          <input type="text" id="destinationIATA" value="${destinationIATA}" readonly>
        </div>
        <div class="form-group">
          <label for="departureTime">Departure Time:</label>
          <input type="time" id="departureTime" required>
        </div>
        <div class="form-group">
          <label for="arrivalTime">Arrival Time:</label>
          <input type="time" id="arrivalTime" required>
        </div>
        <div class="form-group">
          <label for="arrivalIATA">Arrival IATA Code:</label>
          <input type="text" id="arrivalIATA" required>
        </div>
        <div class="form-group">
          <label for="flightDate">Flight Date:</label>
          <input type="date" id="flightDate" required>
        </div>
        <div class="form-group">
          <label for="aircraft">Aircraft:</label>
          <input type="text" id="aircraft" required>
        </div>
        <div class="button-container">
          <button type="button" class="generate-button" onclick="generateFlight()">Generate</button>
          <button type="button" class="close-button" onclick="closeFlightForm()">Close</button>
        </div>
      </form>
    </div>
  `;

  // Insert the form content into the document
  document.body.insertAdjacentHTML("beforeend", formHTML);
}

function closeFlightForm() {
  // Remove the form content from the document
  var modalOverlay = document.querySelector(".modal-overlay");
  var modal = document.querySelector(".modal");
  if (modalOverlay) {
    modalOverlay.remove();
  }
  if (modal) {
    modal.remove();
  }
}

function generateFlight() {
  var destinationIATA = document.getElementById("destinationIATA").value;
  var departureTime = document.getElementById("departureTime").value;
  var arrivalTime = document.getElementById("arrivalTime").value;
  var arrivalIATA = document.getElementById("arrivalIATA").value;
  var flightDate = document.getElementById("flightDate").value;
  var aircraft = document.getElementById("aircraft").value;

  var subject = "Flight Details: " + destinationIATA + " on " + flightDate;
  var body = "Flight details:\n\nDeparture IATA: " + destinationIATA +
             "\nDeparture Time: " + departureTime +
             "\nArrival Time: " + arrivalTime +
             "\nArrival IATA: " + arrivalIATA +
             "\nFlight Date: " + flightDate +
             "\nAircraft: " + aircraft;

  var calendarEvent = "BEGIN:VCALENDAR\n" +
                      "VERSION:2.0\n" +
                      "BEGIN:VEVENT\n" +
                      "SUMMARY:" + subject + "\n" +
                      "DTSTART:" + flightDate + "T" + departureTime + "Z\n" +
                      "DTEND:" + flightDate + "T" + arrivalTime + "Z\n" +
                      "DESCRIPTION:" + body + "\n" +
                      "END:VEVENT\n" +
                      "END:VCALENDAR";

  var encodedCalendarEvent = encodeURIComponent(calendarEvent);

  var mailtoLink = "mailto:?subject=" + encodeURIComponent(subject) +
                   "&body=" + encodeURIComponent(body) +
                   "&attach=" + "data:text/calendar," + encodedCalendarEvent;

  window.location.href = mailtoLink;

  closeFlightForm();
}

// Sample JSON data
var jsonData = [
  {
    "City": "Adana",
    "Country": "Turkey",
    "IATA": "ADA",
    "ICAO": "LTAF",
    "Airport": "Adana Şakirpaşa Airport",
    "Refs": ["1"]
  },
  {
    "City": "Alicante",
    "Country": "Spain",
    "IATA": "ALC",
    "ICAO": "LEAL",
    "Airport": "Alicante–Elche Airport",
    "Refs": ["2"]
  },
  {
    "City": "Amsterdam",
    "Country": "Netherlands",
    "IATA": "AMS",
    "ICAO": "EHAM",
    "Airport": "Amsterdam Airport Schiphol",
    "Refs": ["3"]
  },
  {
    "City": "Ancona",
    "Country": "Italy",
    "IATA": "AOI",
    "ICAO": "LIPY",
    "Airport": "Ancona Falconara Airport",
    "Refs": ["4"]
  },
  {
    "City": "Ankara",
    "Country": "Turkey",
    "IATA": "ESB",
    "ICAO": "LTAC",
    "Airport": "Esenboğa International Airport",
    "Refs": ["5"]
  },
  {
    "City": "Antalya",
    "Country": "Turkey",
    "IATA": "AYT",
    "ICAO": "LTAI",
    "Airport": "Antalya Airport",
    "Refs": ["6"]
  },
  {
    "City": "Athens",
    "Country": "Greece",
    "IATA": "ATH",
    "ICAO": "LGAV",
    "Airport": "Athens International Airport",
    "Refs": ["7"]
  },
  {
    "City": "Barcelona",
    "Country": "Spain",
    "IATA": "BCN",
    "ICAO": "LEBL",
    "Airport": "Barcelona–El Prat Airport",
    "Refs": ["8"]
  },
  {
    "City": "Bari",
    "Country": "Italy",
    "IATA": "BRI",
    "ICAO": "LIBD",
    "Airport": "Bari Karol Wojtyła Airport",
    "Refs": ["9"]
  },
  {
    "City": "Basel Mulhouse Freiburg",
    "Country": "Switzerland/France/Germany",
    "IATA": "BSL/MLH/EAP",
    "ICAO": "LFSB",
    "Airport": "EuroAirport Basel–Mulhouse–Freiburg",
    "Refs": ["10"]
  },
  {
    "City": "Bastia",
    "Country": "France",
    "IATA": "BIA",
    "ICAO": "LFKB",
    "Airport": "Bastia – Poretta Airport",
    "Refs": ["11"]
  },
  {
    "City": "Bergen",
    "Country": "Norway",
    "IATA": "BGO",
    "ICAO": "ENBR",
    "Airport": "Bergen Airport, Flesland",
    "Refs": ["12"]
  },
  {
    "City": "Belgrade",
    "Country": "Serbia",
    "IATA": "BEG",
    "ICAO": "LYBE",
    "Airport": "Belgrade Nikola Tesla Airport",
    "Refs": ["13"]
  },
  {
    "City": "Berlin",
    "Country": "Germany",
    "IATA": "SXF",
    "ICAO": "EDDB",
    "Airport": "Berlin Schönefeld Airport",
    "Refs": ["14"]
  },
  {
    "City": "Berlin",
    "Country": "Germany",
    "IATA": "TXL",
    "ICAO": "EDDT",
    "Airport": "Berlin Tegel Airport",
    "Refs": ["15"]
  },
  {
    "City": "Bilbao",
    "Country": "Spain",
    "IATA": "BIO",
    "ICAO": "LEBB",
    "Airport": "Bilbao Airport",
    "Refs": ["16"]
  },
  {
    "City": "Birmingham",
    "Country": "United Kingdom",
    "IATA": "BHX",
    "ICAO": "EGBB",
    "Airport": "Birmingham Airport",
    "Refs": ["17"]
  },
  {
    "City": "Bodrum",
    "Country": "Turkey",
    "IATA": "BJV",
    "ICAO": "LTFE",
    "Airport": "Milas–Bodrum Airport",
    "Refs": ["18"]
  },
  {
    "City": "Bologna",
    "Country": "Italy",
    "IATA": "BLQ",
    "ICAO": "LIPE",
    "Airport": "Bologna Guglielmo Marconi Airport",
    "Refs": ["19"]
  },
  {
    "City": "Bordeaux",
    "Country": "France",
    "IATA": "BOD",
    "ICAO": "LFBD",
    "Airport": "Bordeaux–Mérignac Airport",
    "Refs": ["20"]
  },
  {
    "City": "Bremen",
    "Country": "Germany",
    "IATA": "BRE",
    "ICAO": "EDDW",
    "Airport": "Bremen Airport",
    "Refs": ["21"]
  },
  {
    "City": "Brindisi",
    "Country": "Italy",
    "IATA": "BDS",
    "ICAO": "LIBR",
    "Airport": "Brindisi – Salento Airport",
    "Refs": ["22"]
  },
  {
    "City": "Brussels",
    "Country": "Belgium",
    "IATA": "BRU",
    "ICAO": "EBBR",
    "Airport": "Brussels Airport",
    "Refs": ["23"]
  },
  {
    "City": "Bucharest",
    "Country": "Romania",
    "IATA": "BBU",
    "ICAO": "LRBS",
    "Airport": "Aurel Vlaicu International Airport",
    "Refs": ["24"]
  },
  {
    "City": "Bucharest",
    "Country": "Romania",
    "IATA": "OTP",
    "ICAO": "LROP",
    "Airport": "Henri Coandă International Airport",
    "Refs": ["25"]
  },
  {
    "City": "Budapest",
    "Country": "Hungary",
    "IATA": "BUD",
    "ICAO": "LHBP",
    "Airport": "Budapest Ferenc Liszt International Airport",
    "Refs": ["26"]
  },
  {
    "City": "Burgas",
    "Country": "Bulgaria",
    "IATA": "BOJ",
    "ICAO": "LBBG",
    "Airport": "Burgas Airport",
    "Refs": ["27"]
  },
  {
    "City": "Cagliari",
    "Country": "Italy",
    "IATA": "CAG",
    "ICAO": "LIEE",
    "Airport": "Cagliari Elmas Airport",
    "Refs": ["28"]
  },
  {
    "City": "Calvi",
    "Country": "France",
    "IATA": "CLY",
    "ICAO": "LFKC",
    "Airport": "Calvi – Sainte-Catherine Airport",
    "Refs": ["29"]
  },
  {
    "City": "Casablanca",
    "Country": "Morocco",
    "IATA": "CMN",
    "ICAO": "GMMN",
    "Airport": "Mohammed V International Airport",
    "Refs": ["30"]
  },
  {
    "City": "Catania",
    "Country": "Italy",
    "IATA": "CTA",
    "ICAO": "LICC",
    "Airport": "Catania–Fontanarossa Airport",
    "Refs": ["31"]
  },
  {
    "City": "Cluj-Napoca",
    "Country": "Romania",
    "IATA": "CLJ",
    "ICAO": "LRCL",
    "Airport": "Cluj International Airport",
    "Refs": ["32"]
  },
  {
    "City": "Cologne/Bonn",
    "Country": "Germany",
    "IATA": "CGN",
    "ICAO": "EDDK",
    "Airport": "Cologne Bonn Airport",
    "Refs": ["33"]
  },
  {
    "City": "Corfu",
    "Country": "Greece",
    "IATA": "CFU",
    "ICAO": "LGKR",
    "Airport": "Corfu International Airport",
    "Refs": ["34"]
  },
  {
    "City": "Dortmund",
    "Country": "Germany",
    "IATA": "DTM",
    "ICAO": "EDLW",
    "Airport": "Dortmund Airport",
    "Refs": ["35"]
  },
  {
    "City": "Dresden",
    "Country": "Germany",
    "IATA": "DRS",
    "ICAO": "EDDC",
    "Airport": "Dresden Airport",
    "Refs": ["36"]
  },
  {
    "City": "Dublin",
    "Country": "Ireland",
    "IATA": "DUB",
    "ICAO": "EIDW",
    "Airport": "Dublin Airport",
    "Refs": ["37"]
  },
  {
    "City": "Dubrovnik",
    "Country": "Croatia",
    "IATA": "DBV",
    "ICAO": "LDDU",
    "Airport": "Dubrovnik Airport",
    "Refs": ["38"]
  },
  {
    "City": "Düsseldorf",
    "Country": "Germany",
    "IATA": "DUS",
    "ICAO": "EDDL",
    "Airport": "Düsseldorf Airport",
    "Refs": ["39"]
  },
  {
    "City": "Edinburgh",
    "Country": "United Kingdom",
    "IATA": "EDI",
    "ICAO": "EGPH",
    "Airport": "Edinburgh Airport",
    "Refs": ["40"]
  },
  {
    "City": "Faro",
    "Country": "Portugal",
    "IATA": "FAO",
    "ICAO": "LPFR",
    "Airport": "Faro Airport",
    "Refs": ["41"]
  },
  {
    "City": "Friedrichshafen",
    "Country": "Germany",
    "IATA": "FDH",
    "ICAO": "EDNY",
    "Airport": "Friedrichshafen Airport",
    "Refs": ["42"]
  },
  {
    "City": "Fuerteventura",
    "Country": "Spain",
    "IATA": "FUE",
    "ICAO": "GCFV",
    "Airport": "Fuerteventura Airport",
    "Refs": ["43"]
  },
  {
    "City": "Geneva",
    "Country": "Switzerland",
    "IATA": "GVA",
    "ICAO": "LSGG",
    "Airport": "Geneva Airport",
    "Refs": ["44"]
  },
  {
    "City": "Glasgow",
    "Country": "United Kingdom",
    "IATA": "GLA",
    "ICAO": "EGPF",
    "Airport": "Glasgow Airport",
    "Refs": ["45"]
  },
  {
    "City": "Gothenburg",
    "Country": "Sweden",
    "IATA": "GOT",
    "ICAO": "ESGG",
    "Airport": "Göteborg Landvetter Airport",
    "Refs": ["46"]
  },
  {
    "City": "Gran Canaria",
    "Country": "Spain",
    "IATA": "LPA",
    "ICAO": "GCLP",
    "Airport": "Gran Canaria Airport",
    "Refs": ["47"]
  },
  {
    "City": "Hamburg",
    "Country": "Germany",
    "IATA": "HAM",
    "ICAO": "EDHH",
    "Airport": "Hamburg Airport",
    "Refs": ["48"]
  },
  {
    "City": "Hannover",
    "Country": "Germany",
    "IATA": "HAJ",
    "ICAO": "EDDV",
    "Airport": "Hannover Airport",
    "Refs": ["49"]
  },
  {
    "City": "Helsinki",
    "Country": "Finland",
    "IATA": "HEL",
    "ICAO": "EFHK",
    "Airport": "Helsinki Airport",
    "Refs": ["50"]
  },
  {
    "City": "Heraklion",
    "Country": "Greece",
    "IATA": "HER",
    "ICAO": "LGIR",
    "Airport": "Heraklion International Airport",
    "Refs": ["51"]
  },
  {
    "City": "Heringsdorf",
    "Country": "Germany",
    "IATA": "HDF",
    "ICAO": "EDAH",
    "Airport": "Heringsdorf Airport",
    "Refs": ["52"]
  },
  {
    "City": "Ibiza",
    "Country": "Spain",
    "IATA": "IBZ",
    "ICAO": "LEIB",
    "Airport": "Ibiza Airport",
    "Refs": ["53"]
  },
  {
    "City": "Istanbul",
    "Country": "Turkey",
    "IATA": "SAW",
    "ICAO": "LTFJ",
    "Airport": "Istanbul Sabiha Gökçen International Airport",
    "Refs": ["54"]
  },
  {
    "City": "İzmir",
    "Country": "Turkey",
    "IATA": "ADB",
    "ICAO": "LTBJ",
    "Airport": "Adnan Menderes Airport",
    "Refs": ["55"]
  },
  {
    "City": "Jerez de la Frontera",
    "Country": "Spain",
    "IATA": "XRY",
    "ICAO": "LEJR",
    "Airport": "Jerez Airport",
    "Refs": ["56"]
  },
  {
    "City": "Jersey",
    "Country": "United Kingdom",
    "IATA": "JER",
    "ICAO": "EGJJ",
    "Airport": "Jersey Airport",
    "Refs": ["57"]
  },
  {
    "City": "Karlsruhe/Baden-Baden",
    "Country": "Germany",
    "IATA": "FKB",
    "ICAO": "EDSB",
    "Airport": "Karlsruhe/Baden-Baden Airport",
    "Refs": ["58"]
  },
  {
    "City": "Katowice",
    "Country": "Poland",
    "IATA": "KTW",
    "ICAO": "EPKT",
    "Airport": "Katowice International Airport",
    "Refs": ["59"]
  },
  {
    "City": "Kavala",
    "Country": "Greece",
    "IATA": "KVA",
    "ICAO": "LGKV",
    "Airport": "Kavala International Airport",
    "Refs": ["60"]
  },
  {
    "City": "Kyiv",
    "Country": "Ukraine",
    "IATA": "KBP",
    "ICAO": "UKBB",
    "Airport": "Boryspil International Airport",
    "Refs": ["61"]
  },
  {
    "City": "Klagenfurt",
    "Country": "Austria",
    "IATA": "KLU",
    "ICAO": "LOWK",
    "Airport": "Klagenfurt Airport",
    "Refs": ["62"]
  },
  {
    "City": "Kos",
    "Country": "Greece",
    "IATA": "KGS",
    "ICAO": "LGKO",
    "Airport": "Kos Island International Airport",
    "Refs": ["63"]
  },
  {
    "City": "Kraków",
    "Country": "Poland",
    "IATA": "KRK",
    "ICAO": "EPKK",
    "Airport": "John Paul II International Airport Kraków–Balice",
    "Refs": ["64"]
  },
  {
    "City": "Lamezia Terme",
    "Country": "Italy",
    "IATA": "SUF",
    "ICAO": "LICA",
    "Airport": "Lamezia Terme International Airport",
    "Refs": ["65"]
  },
  {
    "City": "Larnaca",
    "Country": "Cyprus",
    "IATA": "LCA",
    "ICAO": "LCLK",
    "Airport": "Larnaca International Airport",
    "Refs": ["66"]
  },
  {
    "City": "Leipzig/Halle",
    "Country": "Germany",
    "IATA": "LEJ",
    "ICAO": "EDDP",
    "Airport": "Leipzig/Halle Airport",
    "Refs": ["67"]
  },
  {
    "City": "Lisbon",
    "Country": "Portugal",
    "IATA": "LIS",
    "ICAO": "LPPT",
    "Airport": "Lisbon Portela Airport",
    "Refs": ["68"]
  },
  {
    "City": "London",
    "Country": "United Kingdom",
    "IATA": "LGW",
    "ICAO": "EGKK",
    "Airport": "Gatwick Airport",
    "Refs": ["69"]
  },
  {
    "City": "London",
    "Country": "United Kingdom",
    "IATA": "LHR",
    "ICAO": "EGLL",
    "Airport": "Heathrow Airport",
    "Refs": ["70"]
  },
  {
    "City": "London",
    "Country": "United Kingdom",
    "IATA": "STN",
    "ICAO": "EGSS",
    "Airport": "London Stansted Airport",
    "Refs": ["71"]
  },
  {
    "City": "Lourdes",
    "Country": "France",
    "IATA": "LDE",
    "ICAO": "LFBT",
    "Airport": "Tarbes–Lourdes–Pyrénées Airport",
    "Refs": ["72"]
  },
  {
    "City": "Lyon",
    "Country": "France",
    "IATA": "LYS",
    "ICAO": "LFLL",
    "Airport": "Lyon–Saint-Exupéry Airport",
    "Refs": ["73"]
  },
  {
    "City": "Maastricht",
    "Country": "Netherlands",
    "IATA": "MST",
    "ICAO": "EHBK",
    "Airport": "Maastricht Aachen Airport",
    "Refs": ["74"]
  },
  {
    "City": "Madrid",
    "Country": "Spain",
    "IATA": "MAD",
    "ICAO": "LEMD",
    "Airport": "Adolfo Suárez Madrid–Barajas Airport",
    "Refs": ["75"]
  },
  {
    "City": "Málaga",
    "Country": "Spain",
    "IATA": "AGP",
    "ICAO": "LEMG",
    "Airport": "Málaga Airport",
    "Refs": ["76"]
  },
  {
    "City": "Manchester",
    "Country": "United Kingdom",
    "IATA": "MAN",
    "ICAO": "EGCC",
    "Airport": "Manchester Airport",
    "Refs": ["77"]
  },
  {
    "City": "Marrakesh",
    "Country": "Morocco",
    "IATA": "RAK",
    "ICAO": "GMMX",
    "Airport": "Marrakesh Menara Airport",
    "Refs": ["78"]
  },
  {
    "City": "Marseille",
    "Country": "France",
    "IATA": "MRS",
    "ICAO": "LFML",
    "Airport": "Marseille Provence Airport",
    "Refs": ["79"]
  },
  {
    "City": "Memmingen",
    "Country": "Germany",
    "IATA": "FMM",
    "ICAO": "EDJA",
    "Airport": "Memmingen Airport",
    "Refs": ["80"]
  },
  {
    "City": "Milan",
    "Country": "Italy",
    "IATA": "BGY",
    "ICAO": "LIME",
    "Airport": "Milan Bergamo Airport",
    "Refs": ["81"]
  },
  {
    "City": "Milan",
    "Country": "Italy",
    "IATA": "LIN",
    "ICAO": "LIML",
    "Airport": "Milan Linate Airport",
    "Refs": ["82"]
  },
  {
    "City": "Milan",
    "Country": "Italy",
    "IATA": "MXP",
    "ICAO": "LIMC",
    "Airport": "Milan Malpensa Airport",
    "Refs": ["83"]
  },
  {
    "City": "Minsk",
    "Country": "Belarus",
    "IATA": "MSQ",
    "ICAO": "UMMS",
    "Airport": "Minsk National Airport",
    "Refs": ["84"]
  },
  {
    "City": "Montpellier",
    "Country": "France",
    "IATA": "MPL",
    "ICAO": "LFMT",
    "Airport": "Montpellier–Méditerranée Airport",
    "Refs": ["85"]
  },
  {
    "City": "Moscow",
    "Country": "Russia",
    "IATA": "DME",
    "ICAO": "UUDD",
    "Airport": "Domodedovo International Airport",
    "Refs": ["86"]
  },
  {
    "City": "Moscow",
    "Country": "Russia",
    "IATA": "SVO",
    "ICAO": "UUEE",
    "Airport": "Sheremetyevo International Airport",
    "Refs": ["87"]
  },
  {
    "City": "Moscow",
    "Country": "Russia",
    "IATA": "VKO",
    "ICAO": "UUEE",
    "Airport": "Vnukovo International Airport",
    "Refs": ["88"]
  },
  {
    "City": "Munich",
    "Country": "Germany",
    "IATA": "MUC",
    "ICAO": "EDDM",
    "Airport": "Munich Airport",
    "Refs": ["89"]
  },
  {
    "City": "Mykonos",
    "Country": "Greece",
    "IATA": "JMK",
    "ICAO": "LGMK",
    "Airport": "Mykonos Island National Airport",
    "Refs": ["90"]
  },
  {
    "City": "Naples",
    "Country": "Italy",
    "IATA": "NAP",
    "ICAO": "LIRN",
    "Airport": "Naples International Airport",
    "Refs": ["91"]
  },
  {
    "City": "Nantes",
    "Country": "France",
    "IATA": "NTE",
    "ICAO": "LFRS",
    "Airport": "Nantes Atlantique Airport",
    "Refs": ["92"]
  },
  {
    "City": "Naples",
    "Country": "Italy",
    "IATA": "NAP",
    "ICAO": "LIRN",
    "Airport": "Naples International Airport",
    "Refs": ["91"]
  },
  {
    "City": "Nantes",
    "Country": "France",
    "IATA": "NTE",
    "ICAO": "LFRS",
    "Airport": "Nantes Atlantique Airport",
    "Refs": ["92"]
  },
  {
    "City": "Nice",
    "Country": "France",
    "IATA": "NCE",
    "ICAO": "LFMN",
    "Airport": "Nice Côte d'Azur Airport",
    "Refs": ["93"]
  },
  {
    "City": "Olbia",
    "Country": "Italy",
    "IATA": "OLB",
    "ICAO": "LIEO",
    "Airport": "Olbia Costa Smeralda Airport",
    "Refs": ["94"]
  },
  {
    "City": "Oradea",
    "Country": "Romania",
    "IATA": "OMR",
    "ICAO": "LROD",
    "Airport": "Oradea International Airport",
    "Refs": ["95"]
  },
  {
    "City": "Oslo",
    "Country": "Norway",
    "IATA": "OSL",
    "ICAO": "ENGM",
    "Airport": "Oslo Gardermoen Airport",
    "Refs": ["96"]
  },
  {
    "City": "Paderborn",
    "Country": "Germany",
    "IATA": "PAD",
    "ICAO": "EDLP",
    "Airport": "Paderborn Lippstadt Airport",
    "Refs": ["97"]
  },
  {
    "City": "Palermo",
    "Country": "Italy",
    "IATA": "PMO",
    "ICAO": "LICJ",
    "Airport": "Falcone–Borsellino Airport",
    "Refs": ["98"]
  },
  {
    "City": "Palma de Mallorca",
    "Country": "Spain",
    "IATA": "PMI",
    "ICAO": "LEPA",
    "Airport": "Palma de Mallorca Airport",
    "Refs": ["99"]
  },
  {
    "City": "Paphos",
    "Country": "Cyprus",
    "IATA": "PFO",
    "ICAO": "LCPH",
    "Airport": "Paphos International Airport",
    "Refs": ["100"]
  },
  {
    "City": "Paris",
    "Country": "France",
    "IATA": "BVA",
    "ICAO": "LFOB",
    "Airport": "Beauvais–Tillé Airport",
    "Refs": ["101"]
  },
  {
    "City": "Paris",
    "Country": "France",
    "IATA": "CDG",
    "ICAO": "LFPG",
    "Airport": "Charles de Gaulle Airport",
    "Refs": ["102"]
  },
  {
    "City": "Paris",
    "Country": "France",
    "IATA": "ORY",
    "ICAO": "LFPO",
    "Airport": "Orly Airport",
    "Refs": ["103"]
  },
  {
    "City": "Patras",
    "Country": "Greece",
    "IATA": "GPA",
    "ICAO": "LGRX",
    "Airport": "Araxos Airport",
    "Refs": ["104"]
  },
  {
    "City": "Pécs-Pogány",
    "Country": "Hungary",
    "IATA": "PEV",
    "ICAO": "LHPP",
    "Airport": "Pécs-Pogány Airport",
    "Refs": ["105"]
  },
  {
    "City": "Pisa",
    "Country": "Italy",
    "IATA": "PSA",
    "ICAO": "LIRP",
    "Airport": "Pisa International Airport",
    "Refs": ["106"]
  },
  {
    "City": "Podgorica",
    "Country": "Montenegro",
    "IATA": "TGD",
    "ICAO": "LYPG",
    "Airport": "Podgorica Airport",
    "Refs": ["107"]
  },
  {
    "City": "Porto",
    "Country": "Portugal",
    "IATA": "OPO",
    "ICAO": "LPPR",
    "Airport": "Francisco Sá Carneiro Airport",
    "Refs": ["108"]
  },
  {
    "City": "Poznań",
    "Country": "Poland",
    "IATA": "POZ",
    "ICAO": "EPPO",
    "Airport": "Poznań–Ławica Henryk Wieniawski Airport",
    "Refs": ["109"]
  },
  {
    "City": "Prague",
    "Country": "Czech Republic",
    "IATA": "PRG",
    "ICAO": "LKPR",
    "Airport": "Václav Havel Airport Prague",
    "Refs": ["110"]
  },
  {
    "City": "Pristina",
    "Country": "Kosovo",
    "IATA": "PRN",
    "ICAO": "BKPR",
    "Airport": "Pristina International Airport",
    "Refs": ["111"]
  },
  {
    "City": "Pula",
    "Country": "Croatia",
    "IATA": "PUY",
    "ICAO": "LDPL",
    "Airport": "Pula Airport",
    "Refs": ["112"]
  },
  {
    "City": "Reus",
    "Country": "Spain",
    "IATA": "REU",
    "ICAO": "LERS",
    "Airport": "Reus Airport",
    "Refs": ["113"]
  },
  {
    "City": "Reykjavík",
    "Country": "Iceland",
    "IATA": "KEF",
    "ICAO": "BIKF",
    "Airport": "Keflavík International Airport",
    "Refs": ["114"]
  },
  {
    "City": "Rhodes",
    "Country": "Greece",
    "IATA": "RHO",
    "ICAO": "LGRP",
    "Airport": "Rhodes International Airport",
    "Refs": ["115"]
  },
  {
    "City": "Riga",
    "Country": "Latvia",
    "IATA": "RIX",
    "ICAO": "EVRA",
    "Airport": "Riga International Airport",
    "Refs": ["116"]
  },
  {
    "City": "Rijeka",
    "Country": "Croatia",
    "IATA": "RJK",
    "ICAO": "LDRI",
    "Airport": "Rijeka Airport",
    "Refs": ["117"]
  },
  {
    "City": "Rome",
    "Country": "Italy",
    "IATA": "CIA",
    "ICAO": "LIRA",
    "Airport": "Ciampino–G. B. Pastine International Airport",
    "Refs": ["118"]
  },
  {
    "City": "Rome",
    "Country": "Italy",
    "IATA": "FCO",
    "ICAO": "LIRF",
    "Airport": "Fiumicino Leonardo da Vinci International Airport",
    "Refs": ["119"]
  },
  {
    "City": "Rzeszów",
    "Country": "Poland",
    "IATA": "RZE",
    "ICAO": "EPRZ",
    "Airport": "Rzeszów-Jasionka Airport",
    "Refs": ["120"]
  },
  {
    "City": "Salzburg",
    "Country": "Austria",
    "IATA": "SZG",
    "ICAO": "LOWS",
    "Airport": "Salzburg Airport",
    "Refs": ["121"]
  },
  {
    "City": "Samos",
    "Country": "Greece",
    "IATA": "SMI",
    "ICAO": "LGSM",
    "Airport": "Samos International Airport",
    "Refs": ["122"]
  },
  {
    "City": "Santorini",
    "Country": "Greece",
    "IATA": "JTR",
    "ICAO": "LGSR",
    "Airport": "Santorini (Thira) National Airport",
    "Refs": ["123"]
  },
  {
    "City": "Sármellék",
    "Country": "Hungary",
    "IATA": "SOB",
    "ICAO": "LHSM",
    "Airport": "FlyBalaton Airport",
    "Refs": ["124"]
  },
  {
    "City": "Sarajevo",
    "Country": "Bosnia and Herzegovina",
    "IATA": "SJJ",
    "ICAO": "LQSA",
    "Airport": "Sarajevo International Airport",
    "Refs": ["125"]
  },
  {
    "City": "Shannon",
    "Country": "Ireland",
    "IATA": "SNN",
    "ICAO": "EINN",
    "Airport": "Shannon Airport",
    "Refs": ["126"]
  },
  {
    "City": "Sofia",
    "Country": "Bulgaria",
    "IATA": "SOF",
    "ICAO": "LBSF",
    "Airport": "Sofia Airport",
    "Refs": ["127"]
  },
  {
    "City": "Split",
    "Country": "Croatia",
    "IATA": "SPU",
    "ICAO": "LDSP",
    "Airport": "Split Airport",
    "Refs": ["128"]
  },
  {
    "City": "Stockholm",
    "Country": "Sweden",
    "IATA": "ARN",
    "ICAO": "ESSA",
    "Airport": "Stockholm Arlanda Airport",
    "Refs": ["129"]
  },
  {
    "City": "Stockholm",
    "Country": "Sweden",
    "IATA": "BMA",
    "ICAO": "ESSB",
    "Airport": "Stockholm Bromma Airport",
    "Refs": ["130"]
  },
  {
    "City": "Stockholm",
    "Country": "Sweden",
    "IATA": "NYO",
    "ICAO": "ESKN",
    "Airport": "Stockholm Skavsta Airport",
    "Refs": ["131"]
  },
  {
    "City": "Stuttgart",
    "Country": "Germany",
    "IATA": "STR",
    "ICAO": "EDDS",
    "Airport": "Stuttgart Airport",
    "Refs": ["132"]
  },
  {
    "City": "Suceava",
    "Country": "Romania",
    "IATA": "SCV",
    "ICAO": "LRSV",
    "Airport": "Suceava International Airport",
    "Refs": ["133"]
  },
  {
    "City": "Szczecin",
    "Country": "Poland",
    "IATA": "SZZ",
    "ICAO": "EPSC",
    "Airport": "Szczecin-Goleniów Solidarność Airport",
    "Refs": ["134"]
  },
  {
    "City": "Tallinn",
    "Country": "Estonia",
    "IATA": "TLL",
    "ICAO": "EETN",
    "Airport": "Lennart Meri Tallinn Airport",
    "Refs": ["135"]
  },
  {
    "City": "Tampere",
    "Country": "Finland",
    "IATA": "TMP",
    "ICAO": "EFTP",
    "Airport": "Tampere–Pirkkala Airport",
    "Refs": ["136"]
  },
  {
    "City": "Tbilisi",
    "Country": "Georgia",
    "IATA": "TBS",
    "ICAO": "UGTB",
    "Airport": "Tbilisi International Airport",
    "Refs": ["137"]
  },
  {
    "City": "Tenerife",
    "Country": "Spain",
    "IATA": "TFS",
    "ICAO": "GCTS",
    "Airport": "Tenerife South Airport",
    "Refs": ["138"]
  },
  {
    "City": "Thessaloniki",
    "Country": "Greece",
    "IATA": "SKG",
    "ICAO": "LGTS",
    "Airport": "Thessaloniki Airport",
    "Refs": ["139"]
  },
  {
    "City": "Timișoara",
    "Country": "Romania",
    "IATA": "TSR",
    "ICAO": "LRTR",
    "Airport": "Traian Vuia International Airport",
    "Refs": ["140"]
  },
  {
    "City": "Tirana",
    "Country": "Albania",
    "IATA": "TIA",
    "ICAO": "LATI",
    "Airport": "Mother Teresa International Airport",
    "Refs": ["141"]
  },
  {
    "City": "Tivat",
    "Country": "Montenegro",
    "IATA": "TIV",
    "ICAO": "LYTV",
    "Airport": "Tivat Airport",
    "Refs": ["142"]
  },
  {
    "City": "Toulouse",
    "Country": "France",
    "IATA": "TLS",
    "ICAO": "LFBO",
    "Airport": "Toulouse–Blagnac Airport",
    "Refs": ["143"]
  },
  {
    "City": "Trapani",
    "Country": "Italy",
    "IATA": "TPS",
    "ICAO": "LICT",
    "Airport": "Vincenzo Florio Airport Trapani–Birgi",
    "Refs": ["144"]
  },
  {
    "City": "Trondheim",
    "Country": "Norway",
    "IATA": "TRD",
    "ICAO": "ENVA",
    "Airport": "Trondheim Airport Værnes",
    "Refs": ["145"]
  },
  {
    "City": "Turin",
    "Country": "Italy",
    "IATA": "TRN",
    "ICAO": "LIMF",
    "Airport": "Turin Airport",
    "Refs": ["146"]
  },
  {
    "City": "Ufa",
    "Country": "Russia",
    "IATA": "UFA",
    "ICAO": "UWUU",
    "Airport": "Ufa International Airport",
    "Refs": ["147"]
  },
  {
    "City": "Valencia",
    "Country": "Spain",
    "IATA": "VLC",
    "ICAO": "LEVC",
    "Airport": "Valencia Airport",
    "Refs": ["148"]
  },
  {
    "City": "Valletta",
    "Country": "Malta",
    "IATA": "MLA",
    "ICAO": "LMML",
    "Airport": "Malta International Airport",
    "Refs": ["149"]
  },
  {
    "City": "Varna",
    "Country": "Bulgaria",
    "IATA": "VAR",
    "ICAO": "LBWN",
    "Airport": "Varna Airport",
    "Refs": ["150"]
  },
  {
    "City": "Venice",
    "Country": "Italy",
    "IATA": "VCE",
    "ICAO": "LIPZ",
    "Airport": "Venice Marco Polo Airport",
    "Refs": ["151"]
  },
  {
    "City": "Verona",
    "Country": "Italy",
    "IATA": "VRN",
    "ICAO": "LIPX",
    "Airport": "Verona Villafranca Airport",
    "Refs": ["152"]
  },
  {
    "City": "Vienna",
    "Country": "Austria",
    "IATA": "VIE",
    "ICAO": "LOWW",
    "Airport": "Vienna International Airport",
    "Refs": ["153"]
  },
  {
    "City": "Vilnius",
    "Country": "Lithuania",
    "IATA": "VNO",
    "ICAO": "EYVI",
    "Airport": "Vilnius Airport",
    "Refs": ["154"]
  },
  {
    "City": "Warsaw",
    "Country": "Poland",
    "IATA": "WAW",
    "ICAO": "EPWA",
    "Airport": "Warsaw Chopin Airport",
    "Refs": ["155"]
  },
  {
    "City": "Wrocław",
    "Country": "Poland",
    "IATA": "WRO",
    "ICAO": "EPWR",
    "Airport": "Wrocław–Copernicus Airport",
    "Refs": ["156"]
  },
  {
    "City": "Yerevan",
    "Country": "Armenia",
    "IATA": "EVN",
    "ICAO": "UDYZ",
    "Airport": "Zvartnots International Airport",
    "Refs": ["157"]
  },
  {
    "City": "Zadar",
    "Country": "Croatia",
    "IATA": "ZAD",
    "ICAO": "LDZD",
    "Airport": "Zadar Airport",
    "Refs": ["158"]
  },
  {
    "City": "Zakynthos",
    "Country": "Greece",
    "IATA": "ZTH",
    "ICAO": "LGZA",
    "Airport": "Zakynthos International Airport",
    "Refs": ["159"]
  },
  {
    "City": "Zurich",
    "Country": "Switzerland",
    "IATA": "ZRH",
    "ICAO": "LSZH",
    "Airport": "Zurich Airport",
    "Refs": ["160"]
  },
  {
    "City": "Hurghada",
    "Country": "Egypt",
    "IATA": "HRG",
    "ICAO": "HEGN",
    "Airport": "Hurghada International Airport",
    "Refs": ["161"]
  },
  {
    "City": "Marsa Alam",
    "Country": "Egypt",
    "IATA": "RMF",
    "ICAO": "HEMA",
    "Airport": "Marsa Alam International Airport",
    "Refs": ["162"]
  },
  {
    "City": "Cairo",
    "Country": "Egypt",
    "IATA": "CAI",
    "ICAO": "HECA",
    "Airport": "Cairo International Airport",
    "Refs": ["163"]
  }
];

// Call the function with the sample data
displayAirports(jsonData);