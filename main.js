///////////////////////////////
//Selectors
//////////////////////////////

const addItems = document.querySelectorAll('.js__add_items');
const lists = document.querySelectorAll('.js__list');


///////////////////////////////
//Variables
//////////////////////////////

const itemArrays = {
    thingToDo   : [],
    doing       : [],
    done        : [],
}


///////////////////////////////
//Event Listeners Callback
//////////////////////////////

function addTheItem(e) {
    e.preventDefault();
    const text = this.querySelector('.input-form').value; //Getting The Form Value
    const name = this.querySelector('.input-form').name;  //Getting The Form Name
    
    if(text === '') return; //If There Is No Text It Just Return
    
    itemArrays[name].push(text); //Storing Form Values Into Array
    
    populateList(name); //Display The Items
    
    this.reset(); //Reseting Form 
    
    console.log(text, name);
}


//Function For Displaying Form Item
function populateList(name) {
    
    const itemList = document.querySelector(`.js__list_${name}`); //Select The Current Working Item List
    
    //This Convert Values Into Output
    //Displays Items
    itemList.innerHTML = itemArrays[name].map((item, index) => {
        return `
        <div id="draggable${index}" draggable="true" class="list-item" data-index="${index}" data-name="${name}">
        <p>${item}</p>
        <i class="fa fa-times-circle js__close_button"></i>
        </div>
        `
    }).join('');
}


//Function For Removing Itmes
function removeItem(e) {
    if(!e.target.matches('i')) return; //Return If Target Is Not Close Icon

    const removeItemIndex = e.target.parentNode.dataset.index; //Getting The Remove Item ID
    const removeItemName = e.target.parentNode.dataset.name; //Getting The Remove Item Name

    itemArrays[removeItemName].splice(removeItemIndex, 1); //Removing item From Stored Array

    populateList(removeItemName); //Display The Updated Items

    console.log(removeItemIndex, removeItemName);
}




///////////////////////////////
//Event Listeners Callback
//////////////////////////////

addItems.forEach(addItem => addItem.addEventListener('submit', addTheItem));
lists.forEach(list => list.addEventListener('click', removeItem));










































