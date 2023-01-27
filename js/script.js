// Define counter component to 0
let componentCount =  0;

// Set remove button disable
document.querySelector(".removeButton").disabled = true;


// -------------------- "ADD" BUTTON LOGIC -------------------- //

//  Select button with "addButton" class and  assign a "click" event
document.querySelector(".addButton").addEventListener("click", function() {
    
    // Increase componentCount value by one
    componentCount++;

    // If main contains 10 components ( I decided to set it as limit)
    if(componentCount == 10) {
        
        // Set add button disable
        document.querySelector(".addButton").disabled = true;
    } else {
        // Set remove button disable
        document.querySelector(".removeButton").disabled = false;
    }

    // Call addComponent function
    addComponent();
});


// -------------------- "REMOVE" BUTTON LOGIC -------------------- //

//  Assign a "click" event on addButton
document.querySelector(".removeButton").addEventListener("click", function() {
    
    // Decrease componentCount value by one
    componentCount--;

    // Call removeComponent function
    removeComponent();

    // If main not contains any components
    if(componentCount == 0) {
        
        // Set remove button disable
        document.querySelector(".removeButton").disabled = true;
    } else {

        // Set add button visible
        document.querySelector(".addButton").disabled = false;
    }
});


// -------------------- ADD COMPONENT FUNCTION -------------------- //

function addComponent() {

   	// Create a new div element
    let Component = document.createElement("div");
	
	// Create a new div element
    let insideComponent = document.createElement("div");
	
	// Create a button to open the modal
    let selectBtn = document.createElement("button");
	
   
    // ---------- FOLDER INPUT BUTTON LOGIC---------- //

    selectBtn.innerHTML = `📂`;
    selectBtn.classList.add("btn", "btn-outline-warning");
    
    // Create ad Event Listener on button
    selectBtn.addEventListener("click", event => {

        // Create a new input element to upload images folder
        let folderInput = document.createElement("input");
        folderInput.type = "file";
        folderInput.setAttribute("webkitdirectory", "");
        folderInput.setAttribute("mozdirectory", "");
		folderInput.setAttribute("accept", ".jpg, .jpeg, .png");
				
        // Assign the target variable to the element where the event was raised
        let target = event.target;
       
        // Create ad Event Listener after folder selection
        folderInput.addEventListener("change", function(event) {
            
            // Set variable selectedFiles to the files object returned by the event(folder selected files) 
            let selectedFiles = event.target.files;
			
			//Filters files with type "image"
			selectedFiles = [...selectedFiles].filter( s => s.type.includes("image") )
            
            // Call renderImages function
            renderImages(selectedFiles, target, insideComponent);
        });

        // Hide folder input
        folderInput.style.display = "none";

        // Append folder input to body
        document.body.appendChild(folderInput);

        // Select directory on click 
        folderInput.click();
    });
	  
	  
	// ---------- INSIDE COMPONENT LOGIC---------- //  
	
	// Assign "inside-component" class to new div element
    insideComponent.classList.add("inside-component");  
	
	// Set Id on insideComponent
    insideComponent.setAttribute("id", `${componentCount}`)

    // Append the button to the inside component
    insideComponent.appendChild(selectBtn);
	

	// ---------- COMPONENT LOGIC ---------- //

    // Assign "component" class to new component
    Component.classList.add("component");
   
    // Append new div element "insideComponent" inside the new component
    Component.appendChild(insideComponent);

    // Select element with "main" class and add new component
    document.querySelector("#main").appendChild(Component); 


	// ---------- GRAPHIC SETTING ---------- //

    // Select all printed components
    let allComponents = document.querySelectorAll('.component');

    // Call fitComponents() function
    fitComponents(allComponents)
}


// -------------------- REMOVE COMPONENT FUNCTION -------------------- //
function removeComponent() {

    // Select last component printed inside element with "main" class
    let lastComponent = document.querySelector('#main').lastChild;

    // Remove last component
    lastComponent.remove();

    // Select all printed components
    let allComponents = document.querySelectorAll('.component');

    // Call fitComponents() function
    fitComponents(allComponents)
}

// -------------------- FITCOMPONENTS FUNCTION -------------------- //

function fitComponents(allComponents) {

    // For each printed components set components width on base those presents
    allComponents.forEach(function(component) {

        // Create a style inline width string calculating  100% width / number components + "%"   
        component.style.width = (100 / componentCount) + "%";
});
}


// -------------------- RENDERIMAGES FUNCTION -------------------- //

function renderImages(files, target, insideComponent) {
    
    // Remove button after click upload images
    target.parentNode.removeChild(target);
    
    // Create a new div element
    const slidercontainer = document.createElement("div");

    // Add "slider-container" class
    slidercontainer.classList.add("slider-container");
    
    // Crea un elemento input con un tipo range, min, max e value
    let slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", "0");
    slider.setAttribute("class", "slider");

    // Add slider slider container
    slidercontainer.appendChild(slider);

    // Add slider container inside component
    insideComponent.appendChild(slidercontainer);

    // For loop to append images files in the component
    for (let i = 0; i < files.length ; i++) {

        // // Create img element
        let img = document.createElement('img');

		// Set an univoque ID for the img, composed from inside component id iteration + image id iteration
		img.setAttribute("id", insideComponent.getAttribute("id") + '_' + i); 

        // Add "img-fluid" class
        img.classList.add("img-fluid");

        // Define img src
        // when the file is uploaded, the img.src is set to the data of the uploaded file      
        let reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        
        // Read the data of the uploaded file
        reader.readAsDataURL(files[i]);

        // Append created image to element parent insideComponent
        insideComponent.appendChild(img);
    }

    // Select slider input
    slider = insideComponent.querySelector("input");

    // Select images
    const img = insideComponent.querySelectorAll("img");

    // Set slider parameters
    slider.min = 0;
    slider.max = img.length - 1;
    slider.value = 0;

    // For loop to iterate every image
    for (let i = 0; i < img.length ; i++) {
    
        // If it's the first image selected
        if(i == 0) {

            // Add class "active" -> image visible
            const element = img[i].classList.add("active");  
        }
        else {

            // Add class "active" -> image invisible
            const element = img[i].classList.add("disable");  
        }
    }
    
    // Set "i" value
    let index = 0; //la prima volta img[0] è attiva

    // Assign an event listener to slider
    slider.addEventListener("change", function(event){

        // Remove class "active" and add class "disable" to image triggered the event 
        // -> previous image invisible
        img[index].classList.remove("active");
        img[index].classList.add("disable");
  

        // Assign "i" variable when the event is triggered
        index = event.target.value;

        // Remove class "disable" and add class "active" to image triggered the event 
        // -> next image visible
        img[index].classList.remove("disable");
        img[index].classList.add("active");
    });
	
    // Set focus on slider to use via keyboard arrows
	slider.focus(); 
}
