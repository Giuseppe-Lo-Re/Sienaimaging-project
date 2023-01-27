## Frontend Developer Position Second session TEST

### General Info
The project consists in the development of a web app that allows the user to create different components on the page, within each of which it is possible to view images uploaded from their own device.
***
### Screenshots
![1.On load](img/screenshots/1_%20On_load.png)
![2.On click add button](img/screenshots/2_%20on_click_add_button.png)
![3.On hover folder input button](img/screenshots/3_On_hover_folder_input_button.png)
![4.On click folder input](img/screenshots/4_On_click_folder_input.png)
![5.Images loaded on single component](img/screenshots/5_Images_loaded_on_single_component.png)
![6.Images loaded on different components with slider selection](img/screenshots/6_Images_loaded_on_different_components_with_slider_selection.png)
![7.Limit max components](img/screenshots/7_limit_max_components.png)
![8.On click remove button](img/screenshots/8_On_click_remove_button.png)
![9.Components adaptation](img/screenshots/9_Components_adaptation.png)
![10.Responsive design](img/screenshots/10_Responsive_design)
***
### Technologies

* HTML
* CSS
* Javascript
* Bootstrap
***
### Installation

Download repository and open index.html file
***
### Logic used in the project

I have decided to use plain Javascript. On page load, the "-" button that removes components from the page is disabled. Additionally, a counter is set that will keep track of the components present on the page.

- ##### Add button

When the button that adds components to the page is clicked, the counter is incremented. Until it is equal to 10, it will call the AddComponent function, which is responsible for printing. Once the limit is reached, it will print a message in the header and disable the button itself (I set this limit for personal choice and aesthetic appeal).

- ##### Remove button

On click to the button that removes components from the page (enabled only after the first one is created) is clicked, the message disappears, the counter is decremented, and the removeComponent function is called, which is responsible for removing the component. If there are no components on the page, the button itself will be disabled.

- ##### addComponent function

Create the component that will be the container for "insideComponent" (a choice made to have more control over the styles), which contains a button inside that allows the user to upload an image folder from their device. When the button is clicked, a window will open for selecting a directory of a folder, the only choice that is allowed. Once the folder is selected, the files inside are filtered for images and passed to the function renderImages, which is responsible for printing the images on the page.

- ##### removeComponent function

Select the last printed component and remove it, select all remaining components and pass them to the function fitComponents, which manages the proportions of the components on the page.

- ##### fitComponent function

Set the width of the components by dividing 100% of the width by the number of components present.

- ##### renderImages function

Remove the upload button after it has been clicked; create a container for the slider and print it inside, then print the container inside the component. 
Through an iteration equal to the number of images in the selected folder, create each individual image and print it inside the component.
Assign the focus of the page to the newly printed component slider, which can be used through the use of the left and right arrow keys. With every change of the slider, the visible image is hidden and the next one (or previous, depending on the position of the slider) is shown.