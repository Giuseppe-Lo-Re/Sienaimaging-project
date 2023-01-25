// Define counter component to 0
let componentCount =  0;


// -------------------- "ADD" BUTTON LOGIC -------------------- //

//  Select button with "addButton" class and  assign a "click" event
document.querySelector(".addButton").addEventListener("click", function() {
    
    // Increase componentCount value by one
    componentCount++;

    // Call addComponent function
    addComponent();
});

// Add a new component
function addComponent() {

    // Create a new div element
    let newComponent = document.createElement("div");

    // Assign "component" class to new component
    newComponent.classList.add("component");

    // Create a new div element
    let insideComponent = document.createElement("div");

    // Assign "inside-component" class to new div element
    insideComponent.classList.add("inside-component");

    // ---------- FOLDER INPUT BUTTON ---------- //

    // Create a button to open the modal
    let selectBtn = document.createElement("button");
    selectBtn.innerHTML = "Images Folder";
    selectBtn.classList.add("btn", "btn-primary");
    
    // Create ad Event Listener on button
    selectBtn.addEventListener("click", event => {

        // Create a new input element to upload images folder
        let folderInput = document.createElement("input");
        folderInput.type = "file";
        folderInput.setAttribute("webkitdirectory", "");
        folderInput.setAttribute("mozdirectory", "");

        let target = event.target;
        let insideComponent = target.parentElement;

        // Create ad Event Listener after folder selection
        folderInput.addEventListener("change", function(event) {
            
        // Set variable selectedFolder to the files object returned by the event(folder selected files) 
        let selectedFolder = event.target.files;
        
        // Call renderImages function
        renderImages(selectedFolder, target, insideComponent);
    });

        // Hide folder input
        folderInput.style.display = "none";

        // Append folder input to body
        document.body.appendChild(folderInput);

        // Make the folder input clickable
        folderInput.click();
      });

    // Append the button to the inside component
    insideComponent.appendChild(selectBtn);

    // Append new div element "insideComponent" inside the new component
    newComponent.appendChild(insideComponent);

    // Select element with "main" class and add new component
    document.querySelector(".main").appendChild(newComponent);

    // Select all printed components
    let allComponents = document.querySelectorAll('.component');

    // Call fitComponents() function
    fitComponents(allComponents)

    // Set new component width on base those components present 
    newComponent.style.width = (100 / componentCount) + "%";
}

// -------------------- "REMOVE" BUTTON LOGIC -------------------- //

//  Assign a "click" event on addButton
document.querySelector(".removeButton").addEventListener("click", function() {
    
    // Decrease componentCount value by one
    componentCount--;

    // Call removeComponent function
    removeComponent();
});

// Remove last component
function removeComponent() {

    // Select last component from main
    let lastComponent = 

    // Select last component printed inside element with "main" class
    document.querySelector('.main').lastChild;

    // Remove last component
    lastComponent.remove();

    // Select all printed components
    let allComponents = document.querySelectorAll('.component');

    // Call fitComponents() function
    fitComponents(allComponents)
}

// -------------------- UTILITY FUNCTIONS -------------------- //

function fitComponents(allComponents) {

    // For each printed components set components width on base those presents
    allComponents.forEach(function(component) {

        // Create a style inline width string calculating  100% width / number components + "%"   
        component.style.width = (100 / componentCount) + "%";
});
}
// basic upload without slide
function renderImages(images, target, insideComponent) {

    target.parentNode.removeChild(target);
    
    // For loop to append images in the component
    for (let i = 0; i < images.length; i++) {

        // Create img element
        let img = document.createElement('img');
        if(i == 0) {
            img.classList.add('active')
        } else {
            img.classList.add('disable')
        }
        // Define img src
        let reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(images[i]);
        insideComponent.appendChild(img);
    }
}
