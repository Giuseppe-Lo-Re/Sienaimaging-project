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

        // Assign the target variable to the element where the event was raised
        let target = event.target;

        // Assign the insideComponent variable to the "target" parent element 
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

    // Select last component printed inside element with "main" class
    let lastComponent = document.querySelector('.main').lastChild;

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

    // Remove button after click
    target.parentNode.removeChild(target);

    // Create a new div element
    const slidercontainer = document.createElement("div");

    // Add "slider-container" class
    slidercontainer.classList.add("slidercontainer");
    
    // Crea un elemento input con un tipo range, min, max e value
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "1");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", "0");
    slider.setAttribute("class", "slider");

    // Aggiunge l'elemento input all'interno del div slidecontainer
    slidercontainer.appendChild(slider);

    // Create a new div element
    const imageAndSliderContainer = document.createElement("div");

    // Add "imageandslider-container" class
    imageAndSliderContainer.classList.add("imageandslider-container");

    // Append imageAndSliderContainer inside component
    insideComponent.appendChild(imageAndSliderContainer);

    // Append slidercontainer inside imageAndSliderContainer
    imageAndSliderContainer.appendChild(slidercontainer);

    // Create image container
    let imgContainer = document.createElement("div");

    // Add class to image container
    imgContainer.classList.add("img-container");
    
    // Append image container inside component
    imageAndSliderContainer.appendChild(imgContainer);

    // For loop to append images in the component
    for (let i = 0; i < images.length; i++) {

        // // Create img element
        let img = document.createElement('img');

        // Define img src
        // when the file is uploaded, the "src" property of the image object (img) is set to the data of the uploaded file      
        let reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }

        // Read the data of the uploaded file
        reader.readAsDataURL(images[i]);

        // Append created image to element parent insideComponent
        imgContainer.appendChild(img);
    }

    // Select slider input
    slider = document.querySelector("input");

    // Select images
    const img = document.querySelectorAll("img");

    // Set slider parameters
    slider.min = 0;
    slider.max = img.length - 1;
    slider.value = 0;

    // For loop to iterate every image
    for (let i = 0; i < img.length; i++) {
    
        // If it's the first image selected
        if(i == 0) {

            // Add class "active" -> image visible
            const element = img[i].classList.add("active");  
        }
        else{

            // Add class "active" -> image invisible
            const element = img[i].classList.add("disable");  
        }
    }

    // Set "i" value
    let i = 0;

    // Assign an event listener to slider
    slider.addEventListener("change", function(event){
        
        // Remove class "active" and add class "disable" to image triggered the event -> previous image invisible
        img[i].classList.remove("active");
        img[i].classList.add("disable");

        // Assign "i" variable when the event is triggered
        i = event.target.value;

        // Remove class "disable" and add class "active" to image triggered the event -> next image visible
        img[event.target.value].classList.remove("disable");
        img[event.target.value].classList.add("active");
    });
}
