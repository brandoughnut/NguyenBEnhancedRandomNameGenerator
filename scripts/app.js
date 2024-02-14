import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localstorage.js";

let totalNames = document.getElementById("totalNames");
let injectName = document.getElementById("injectName");
let inputField = document.getElementById("inputField");
let inputBtn = document.getElementById("inputBtn");
let length = document.getElementById("length");
let number = document.getElementById("number");
let groupText = document.getElementById("groupText");

let names = getLocalStorage();

groupBtn.addEventListener('click', () => {

    groupText.textContent = "";
    if(length.value == 1){
        groupText.textContent = `Group 1: ${randomizeNames(names)[0]}`;
    }else if(length.value == 0){
        groupText.textContent = "PLEASE CHANGE THE SLIDER!";
    }else{
        groupText.textContent = "";
        groupPeople(randomizeNames(names));
    }
    
});

inputBtn.addEventListener('click', () => {

    if(!inputField.value == ""){
        saveToLocalStorage(inputField.value);
        creatingElements(inputField.value);
        setNumber();
        names = getLocalStorage();
        totalNames.textContent = `Total Names: ${names.length}`;
        inputField.value = "";
    }
    randomizeNames(names);
});

length.addEventListener('change', () => {
    number.textContent = length.value;
});

const setNumber = () => {
    names = getLocalStorage();
    length.setAttribute('max', names.length);
}

const loadElements = () => {
    names = getLocalStorage();
    totalNames.textContent = `Total Names: ${names.length}`;
    names.map((elements) => {
        creatingElements(elements);
    });
}

const creatingElements = (name) => {
    let innerDiv1 = document.createElement('div');
    innerDiv1.className = "col";
    innerDiv1.textContent = name;

    let button = document.createElement('button');
    button.type = "button";
    button.className = "btn btn-danger";
    button.textContent = "Remove";

    let innerDiv2 = document.createElement('div');
    innerDiv2.className = "col";

    innerDiv2.appendChild(button);

    let middleDiv = document.createElement('div');
    middleDiv.className = "d-flex";

    middleDiv.appendChild(innerDiv1);
    middleDiv.appendChild(innerDiv2);

    let hr1 = document.createElement('hr');
    let hr2 = document.createElement('hr');

    let outerDiv = document.createElement('div');

    outerDiv.appendChild(hr1);
    outerDiv.appendChild(middleDiv);
    outerDiv.appendChild(hr2);

    button.addEventListener('click', () => {
        outerDiv.remove();
        removeFromLocalStorage(name);
        names = getLocalStorage();
        setNumber();
        length.value = "0";
        number.textContent = "0";
        totalNames.textContent = `Total Names: ${names.length}`;
        randomizeNames(names);
    });

    injectName.appendChild(outerDiv);

}

const randomizeNames = (name) => {
    let randomize = name.sort( () => .5 - Math.random() );
    return randomize;
}

const groupPeople = (name) => {

    const groups = [];
    let currentGroup = [];

    name.forEach(people => {
        if (currentGroup.length + 1 > length.value) {
            groups.push(currentGroup);
            currentGroup = [];
        }
        currentGroup.push(people);
    });

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }
    
    if(groups[groups.length-1].length == 1){
        let lastPerson = groups.pop();
        groups[groups.length-1].push(lastPerson);
    }

    for(let i = 0; i< groups.length; i++){
        let div = document.createElement('div');
        if(groups[i].length > 1){
            div.textContent = `Group ${i+1}: ${groups[i].join(" ")}`;
            groupText.appendChild(div);
        }

    }

    return groups;   

}
    
loadElements();
setNumber();
randomizeNames(names);