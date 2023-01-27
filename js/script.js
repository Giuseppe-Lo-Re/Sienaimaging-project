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

        // Set limit message to visible
        document.querySelector(".limit-message").style.display = "block";

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
    
    // Set limit message to invisible
    document.querySelector(".limit-message").style.display = "none";
    
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

   	// Create a new div element for component
    let Component = document.createElement("div");
	
	// Create a new div element for inside component
    let insideComponent = document.createElement("div");
	
	// Create a button to open file directory to select image folder
    let selectBtn = document.createElement("button");
	
   
    // ---------- FOLDER INPUT BUTTON LOGIC---------- //

    // Set HTML content on button
    selectBtn.innerHTML = `📂`;

    // Assign "btn", "btn-outline-warning" classes to selectBtn
    selectBtn.classList.add("btn", "btn-outline-warning");
    
    // Create ad Event Listener on button
    selectBtn.addEventListener("click", event => {

        // Create a new input element to upload images folder and set attribute
        let folderInput = document.createElement("input");
        folderInput.type = "file";
        folderInput.setAttribute("webkitdirectory", "");
        folderInput.setAttribute("mozdirectory", "");
		folderInput.setAttribute("accept", ".jpg, .jpeg, .png");
				
        // Assign the target variable to the element where the event is raised
        let target = event.target;
       
        // Create an Event Listener after folder selection
        folderInput.addEventListener("change", function(event) {
            
            // Set variable selectedFiles to the files object returned by the event
            let selectedFiles = event.target.files;
			
			// Filter files by type "image"
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

        // Remove folder input from DOM
        folderInput.remove();
    });
	  
	  
	// ---------- INSIDE COMPONENT LOGIC---------- //  
	
	// Assign "inside-component" class to new insideComponent
    insideComponent.classList.add("inside-component");  
	
	// Set Id on insideComponent
    insideComponent.setAttribute("id", `${componentCount}`)

    // Append button to insideComponent
    insideComponent.appendChild(selectBtn);
	

	// ---------- COMPONENT LOGIC ---------- //

    // Assign "component" class to new Component
    Component.classList.add("component");
   
    // Append insideComponent to Component
    Component.appendChild(insideComponent);

    // Select div with "#main" ID and add Component
    document.querySelector("#main").appendChild(Component); 


	// ---------- GRAPHIC SETTING ---------- //

    // Select all printed components
    let allComponents = document.querySelectorAll('.component');

    // Call fitComponents() function
    fitComponents(allComponents)
}


// -------------------- REMOVE COMPONENT FUNCTION -------------------- //

function removeComponent() {

    // Select last component printed in main
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

    // For each printed components set component width ratio
    allComponents.forEach(function(component) {

        // Create a style inline width string  
        component.style.width = (100 / componentCount) + "%";
    });
}


// -------------------- RENDERIMAGES FUNCTION -------------------- //

function renderImages(files, target, insideComponent) {
    
    // Remove button after click 
    target.parentNode.removeChild(target);
    
    // Create a new div element for sliderContainer
    const sliderContainer = document.createElement("div");

    // Assign "slider-container" class to sliderContainer
    sliderContainer.classList.add("slider-container");
    
    // Create a slider element and set attribute
    let slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", "0");
    slider.setAttribute("class", "slider");

    // Append slider to sliderContainer
    sliderContainer.appendChild(slider);

    // Append sliderContainer to insideComponent
    insideComponent.appendChild(sliderContainer);

    // For loop to append images files to insideComponent
    for (let i = 0; i < files.length ; i++) {

        // Create a new img element
        let img = document.createElement('img');

		// Set an univoque ID for the img, composed from: insideComponent id iteration + image id iteration
		img.setAttribute("id", insideComponent.getAttribute("id") + '_' + i); 

        // Add "img-fluid" responsive class to img
        img.classList.add("img-fluid");

        // Create a new FileReader object to read files
        let reader = new FileReader();

        // Set img source to the data uploaded files  when the file is uploaded
        reader.onload = function(e) {
            img.src = e.target.result;
        }
        
        // Read the data uploaded files
        reader.readAsDataURL(files[i]);

        // Append created image to insideComponent
        insideComponent.appendChild(img);
    }

    // Select slider input
    slider = insideComponent.querySelector("input");

    // Select all images
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
        } else {

            // Add class "active" -> image invisible
            const element = img[i].classList.add("disable");  
        }
    }
    
    // Set "i" value -> The first time the first image is visible
    let index = 0; 

    // Assign an event listener to slider
    slider.addEventListener("change", function(event){

        // Remove class "active" and add class "disable" to image triggered the event -> previous image invisible
        img[index].classList.remove("active");
        img[index].classList.add("disable");
  

        // Assign "i" variable when the event is triggered
        index = event.target.value;

        // Remove class "disable" and add class "active" to image triggered the event -> next image visible
        img[index].classList.remove("disable");
        img[index].classList.add("active");
    });
	
    // Set focus on slider to use it via keyboard arrows
	slider.focus(); 
}
