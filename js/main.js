// Get id of city and append it to selection page url
function selectCity(city) {
    let redirect = new URL(`${window.location.origin}/selection.html`);
    redirect.searchParams.append('city', city);
    // Redirect user to target url
    window.location.href = redirect.href;
}

// Get city id from selection page url,
// If id doesn't exist redirect to homepage
async function loadCity() {
    let data = await fetch("./cities.json").then(response => response.json())
    let url = new URL(window.location.href);
    let city = url.searchParams.get('city');

    // If url doesn't include a valid city id as a parameter,
    // redirect the user to the homepage
    if (!Object.keys(data).includes(city)) window.location.href = window.location.origin;

    // Construct city specific information html 
    // Set header text and background
    const ELEMENT_HEADER = document.getElementById("header");
    const ELEMENT_HEADERTEXT = document.getElementById("header-text");
    ELEMENT_HEADER.style.backgroundImage = `url(${data[city].bgurl})`;
    ELEMENT_HEADERTEXT.innerHTML = city;

    // Fetch sauna data 
    let saunaData = await fetch("./saunas.json").then(response => response.json())

    // Only select saunas from current city
    let saunas = saunaData.saunas.filter(sauna => sauna.city == city);

    // Target element to append to
    ELEMENT_SAUNAS = document.getElementById("saunat");

    saunas.forEach(sauna => {
        let card = document.createElement("div");
        let image = document.createElement("img");
        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("h5");
        let cardText = document.createElement("p");
        let cardLink = document.createElement("a");

        // Add correct data to each element
        card.classList.add("card");
        card.classList.add("sauna");
        image.src = data[city].bgurl;
        image.classList.add("card-img-top");
        cardBody.classList.add("card-body");
        cardTitle.classList.add("card-title");
        cardText.classList.add("card-text");
        cardLink.classList.add("btn");
        cardLink.classList.add("btn-primary");
        cardTitle.innerHTML = sauna.title;
        cardText.innerHTML = sauna.description;
        cardLink.innerHTML = "Varaa Sauna"

        // Construct card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardLink);

        // Construct card
        card.appendChild(image);
        card.appendChild(cardBody);

        // Attach card to saunas section
        ELEMENT_SAUNAS.appendChild(card);
    });

    if (saunas.length == 0) {
        ELEMENT_SAUNAS.innerHTML = "Alueeltasi ei l??ytynyt saunoja :(";
    }
}