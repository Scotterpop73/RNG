function saveToLocalStorageByName(name)
{
    //get current elements saved in local storage
    //save the array in our variable 
    let favorites = getLocalStorage();
    
    //add new name to our array 
    favorites.push(name.toLowerCase());
    //save updated array in local storage
    saveToLocalStorage(favorites);
    //localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function saveToLocalStorage(favorites){
    //this saves our array in local storage and the name will be Favorites
    localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function getLocalStorage(){
    //get all the elements in Favorites that are in local storage
    let localStorageData = localStorage.getItem('Favorites');

    //check if anything exists in local storage if it doesn't exist return an empty array
    if(localStorageData == null)
    {
       return [];
    }

    //otherwise return as JSON data
        return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name){
    const favorites = getLocalStorage();

    //find the index of the name in local storage
    let nameIndex = favorites.indexOf(name);
    //console.log(nameIndex)
    //found name in array favorites
    //remove the name by using the splice method
    favorites.splice(nameIndex,1);
    //save updated array to local storage
    saveToLocalStorage(favorites);
    //localStorage.setItem('Favorites',JSON.stringify(favorites));
}

//export our functions so that they can be used in the app.js file
export {saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage}

// function CreateElements(){
//     let favorites = getLocalStorage();

//     favorites.map(person => {
//         let p = document.createElement('p');
//         p.textContent = person;

//         let deleteBtn = document.createElement('button');
//         deleteBtn.className = 'btn btn-danger';
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.type = "button";
//         deleteBtn.addEventListener('click', function(){
//             removeFromLocalStorage(person);
//         })

//         injectHere.appendChild(p);
//         injectHere.appendChild(deleteBtn);
//     })

    
// }