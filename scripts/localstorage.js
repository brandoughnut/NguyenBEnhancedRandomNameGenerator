const saveToLocalStorage = (digimon) => {

    let favorites = getLocalStorage();

        favorites.push(digimon);

    localStorage.setItem("Saved Names", JSON.stringify(favorites));

}

const getLocalStorage = () => {

    let localStorageData = localStorage.getItem("Saved Names");


    if(localStorageData == null){
        return [];
    }


    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (digimon) => {

    let favorites = getLocalStorage();


    let namedIndex = favorites.indexOf(digimon);


    favorites.splice(namedIndex, 1);


    localStorage.setItem("Saved Names", JSON.stringify(favorites));

}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage}