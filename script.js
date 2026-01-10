let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (searchValue) => {
    try {
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
        if (!data.ok) throw new Error("Word not found");
        let jsonData = await data.json();

        const textDiv = document.querySelector(".text");
        textDiv.innerHTML = "";

        let div = document.createElement("div");
        div.classList.add("detail");
        div.innerHTML = `
            <h2>Word : <span>${jsonData[0].word}</span></h2>
            <p>Part of Speech: ${jsonData[0].meanings[0].partOfSpeech}</p>
            <p>Meaning : <span>${jsonData[0].meanings[0].definitions[0].definition}</span></p>
            <p>Example : <span>${jsonData[0].meanings[0].definitions[0].example || "Not Found"}</span></p>
            <p>Synonyms : <span>${jsonData[0].meanings[0].synonyms.length > 0 ? jsonData[0].meanings[0].synonyms.join(", ") : "None"}</span></p>
            <a href="${jsonData[0].sourceUrls[0]}" target="_blank">Read More</a>
        `;
        textDiv.appendChild(div);

    } catch (error) {
        alert("Word not found! Please try another word.");
        console.error(error);
    }
};

// Button click
searchBtn.addEventListener("click", function () {
    let searchValue = searchInput.value.trim();
    if (searchValue === "") {
        alert("Please enter a word first.");
    } else {
        getData(searchValue);
    }
});

// Press Enter to search
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchBtn.click();
});
