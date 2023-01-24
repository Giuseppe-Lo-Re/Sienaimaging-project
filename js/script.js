// Define counter component to 0
let componentCount =  0;

//  Assign a "click" event on addButton
document.querySelector(".addButton").addEventListener("click", function() {
    
    // Increase componentCount value by one
    componentCount++;

    // Call addComponent function
    addAndFitComponents();
});

// Add a new component
function addAndFitComponents() {

    // Create a new div
    let newComponent = document.createElement("div");

    // Assign "component" class to new component
    newComponent.classList.add("component");
    
    // Add new component in the main
    document.querySelector(".main").appendChild(newComponent);

    let allComponents = 

        // Select all printed components
        document.querySelectorAll('.component');

        // For each printed components sets components width on base those presents
        allComponents.forEach(function(component) {
        component.style.width = (100 / componentCount) + "%";
    });

    // Set new component width on base those components present 
    newComponent.style.width = (100 / componentCount) + "%";
}
