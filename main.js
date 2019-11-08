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
}


//Function For Displaying Form Item
function populateList(name) {
    
    const itemList = document.querySelector(`.js__list_${name}`); //Select The Current Working Item List
    
    //This Convert Values Into Output
    //Displays Items
    itemList.innerHTML = itemArrays[name].map((item, index) => {
        return `
        <div id="js__drag_${name}_${index}" draggable="true" class="list-item" data-index="${index}" data-name="${name}">
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
}


///////////////////////////////
//Drag And Drop Related CallBacks
//////////////////////////////

//On Drag Start Fucntion
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id); //Set The Draggable Data Into Plain Text

    //After Drag Start This Don't Display Dragged Item
    //Set Timeout gives Time Before Setting Display To None 
    setTimeout(() => e.target.classList.add('invisible'), 0);
}


//On Drag End Fucntion
function dragEnd(e) {
    //After Drag End This Remove Invisible Class
    setTimeout(() => e.target.classList.remove('invisible'), 0);
}


//On Drag Over Fucntion
function dragOver(e) {
    e.preventDefault(); //Enables dragDrop() to fire
}


//On Drag Over Fucntion
function dragDrop(e) {
    const droppedItemID = e.dataTransfer.getData('text'); //Returns Dropped Item ID

    const droppedElement = document.getElementById(droppedItemID); //Select Dropped Item ID

    const droppedItemText = droppedElement.querySelector(`p`).textContent; //Get The Selected Dropped Item Text

    const droppedItemIndex = droppedElement.dataset.index; //Get The Dropped Item Index
    const droppedItemName = droppedElement.dataset.name; //Get The Dropped List Item Name

    let dropZoneName; //Get The Drop Zone List Name

    //Thsi Select Drop Zone List Name Correctly
    if(e.target.classList[0] === 'list') {
        dropZoneName = e.target.classList[2].split('_')[3];
    }else if(e.target.matches('p')) {
        dropZoneName = e.target.parentNode.dataset.name;    
    }else {
        dropZoneName = e.target.dataset.name;
    }

    itemArrays[dropZoneName].push(droppedItemText); //Stores The Updated Value

    itemArrays[droppedItemName].splice(droppedItemIndex, 1); //Update The Value

    populateList(droppedItemName); //Display The Updated Items
    populateList(dropZoneName); //Display The Updated Items
    
    //This Add Space In List If There Is No Item
    if(itemArrays[droppedItemName].length === 0) {
        const itemList = document.querySelector(`.js__list_${droppedItemName}`); //Select The Current Working Item List
    
        //This Convert Values Into Output
        //Displays Items
        itemList.innerHTML = `<br>`;   
    }
    
    e.dataTransfer.clearData(); //Cearn getData() And setData()
}



///////////////////////////////
//Event Listeners Callback
//////////////////////////////

addItems.forEach(addItem => addItem.addEventListener('submit', addTheItem));
lists.forEach(list => list.addEventListener('click', removeItem));

//Drag And Drop Events
lists.forEach(list => {
    list.addEventListener('dragstart', dragStart);
    list.addEventListener('dragend', dragEnd);
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', dragDrop);
});










































