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