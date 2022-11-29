function saveToLocalStorageByName(name)
{
    let favorites = getLocalStorage();
    
    favorites.push(name.toLowerCase());
    saveToLocalStorage(favorites);
}

function saveToLocalStorage(favorites){
    localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null)
    {
       return [];
    }
        return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name){
    const favorites = getLocalStorage();
    let nameIndex = favorites.indexOf(name);
    //console.log(nameIndex)
    //found name in array favorites
    favorites.splice(nameIndex,1);
    saveToLocalStorage(favorites);
}

export {saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage}