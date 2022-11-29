function selectCity(city) {
    let redirect = new URL(`${window.location.origin}/selection.html`);
    redirect.searchParams.append('city', city);
    window.location.href = redirect.href;
}

async function loadCity() {
    let data = await fetch("./cities.json").then(response => response.json())
    let url = new URL(window.location.href);
    let city = url.searchParams.get('city');

    if (!Object.keys(data).includes(city)) window.location.href = window.location.origin;

    const ELEMENT_HEADER = document.getElementById("header");
    const ELEMENT_HEADERTEXT = document.getElementById("header-text");
    ELEMENT_HEADER.style.backgroundImage = `url(${data[city].bgurl})`;
    console.log(ELEMENT_HEADER.style.backgroundImage)
    ELEMENT_HEADERTEXT.innerHTML = city;
}