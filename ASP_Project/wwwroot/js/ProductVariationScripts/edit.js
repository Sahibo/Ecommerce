const fileInput = document.querySelector('#fileInput');

fileInput.addEventListener('change', () => {
    // Handle file input change if needed
});

function toggleImageSelection(element) {
    element.classList.toggle('selected');
}

const deleteImagesButton = document.querySelector('#deleteImagesButton');
const selectedImageIdsInput = document.querySelector('#selectedImageIds');

deleteImagesButton.addEventListener('click', async () => {
    
    const selectedImages = document.querySelectorAll('.selected');
    const selectedImageIds = Array.from(selectedImages).map(image => image.dataset.imageId);

    if (selectedImageIds.length > 0) {
        selectedImageIdsInput.value = selectedImageIds.join(',');
        await fetch('/Admin/ProductVariation/DeleteImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': getAntiForgeryTokenValue()
            },
            body: JSON.stringify(selectedImageIds)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
});

const addImagesButton = document.querySelector('#addImagesButton');
//const fileInput = document.querySelector('#fileInput'); // Assuming you have a file input with id 'fileInput'

addImagesButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const productVariationId = addImagesButton.getAttribute('data-product-variation-id');
    
    selectImage().then(async files => {
        if (files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            formData.append('productVariationId', productVariationId); // Include the productVariation.Id in the form data
            console.log(formData);

            // Send the images to the server for addition
            await fetch('/Admin/ProductVariation/AddImages', {
                method: 'POST',
                headers: {
                    'RequestVerificationToken': getAntiForgeryTokenValue()
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload(); // Reload the page to see the added images
                    } else {
                        console.error(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log("No files selected.");
        }
    });
});

function selectImage() {
    return new Promise((resolve) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            resolve(files);
        });
        document.body.appendChild(fileInput);
        fileInput.click();
    });
}

function getAntiForgeryTokenValue() {
    const tokenInput = document.querySelector('input[name="__RequestVerificationToken"]');
    return tokenInput.value;
}
