const content = document.querySelector(".box-content");
const searchInput = document.querySelector(".search-input");
const searchResult = document.querySelector(".search-result");
const searchButton = document.querySelector("button");
const searchWords = searchInput.value;

const storeInput = async (event) => {
    event.preventDefault();
    let searchElements = searchInput.value;
    searchResult.innerHTML = "";
    const response = await fetch (`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='${encodeURIComponent(searchElements)}`);
    const wikipediaData = await response.json();

    if (!response.ok) {
        alert("Error in geting Data");
    }
    result(wikipediaData);
    content.remove();
}

searchButton.addEventListener("click", storeInput)
searchButton.addEventListener("submit", storeInput)

const result = (wikipediaData) => {
    for (let i = 0; i < wikipediaData[1].length; i++) {
        searchResult.innerHTML += `<a class="wikipedia-result" href=${wikipediaData[3][i]} target=_blank>${wikipediaData[1][i]}</a>`;     
    }
}

const fetchFact = async () => {
    const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const randomFacts = await response.json();

    if (!response.ok) {
        alert("Error getting the quote, please try again later.");
    }

    updateFact(randomFacts);
}

const updateFact = (randomFacts) => {
    content.innerHTML=`FunFacts :) <br> ${randomFacts.text}`
}

fetchFact()