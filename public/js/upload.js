// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector("#recipe-name").value.trim();
//   const instructions = document.querySelector("#recipe-instructions").value.trim();
//   const image = document.querySelector("#img").value.trim();

//   if (name && instructions) {
//     // aws upload
//     // onSuccess, get img link
//     // const image = img link from aws

//     const response = await fetch(`/api/recipes`, {
//       method: "POST",
//       body: JSON.stringify({
//         name,
//         instructions,
//         image: "", //
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert("Failed to create project");
//     }
//   }
// };

// document.querySelector(".new-recipe-form").addEventListener("submit", newFormHandler);

// const { uploadFile } = require('./s3')


const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const instructions = document.querySelector("#recipe-instructions").value.trim();
  const imageInput = document.querySelector("#img");

  let imageUrl = ""; // Placeholder for the image URL

  // Check if an image was selected
  if (imageInput.files.length > 0) {
    const imageFile = imageInput.files[0];

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      // Upload the image to S3
      const response = await fetch('/api/upload-img', {
        method: 'POST',
        body: formData,

      });

      if (response.ok) {
        // Parse the response to get the URL of the uploaded image
        const data = await response.json();
        imageUrl = data.filename;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      return;
    }
  }

  // If name and instructions are provided
  if (name && instructions) {
    try {
      // Send recipe data to your backend API
      const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          instructions,
          image: imageUrl // Use the uploaded image URL
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the homepage upon successful creation
        // document.location.replace('/');
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  }
};

document.querySelector('.new-recipe-form').addEventListener('submit', newFormHandler);