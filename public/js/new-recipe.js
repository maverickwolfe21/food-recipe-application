//Create new post
// const newPostFormHandler = async (event) => {
//   event.preventDefault();

//   const title = document.querySelector("#title-new-post").value.trim();
//   const content = document.querySelector("#content-new-post").value.trim();

//   if (title && content) {
//     const response = await fetch("/api/posts", {
//       method: "POST",
//       body: JSON.stringify({ title, content }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard"); //if sucessful load the dashboard page
//     } else {
//       alert("Failed to create a new post."); //if unsuccessful give alert
//     }
//   }
// };

// //event listeners
// const newPostForm = document.querySelector(".new-post-form");
// if (newPostForm) {
//   newPostForm.addEventListener("submit", newPostFormHandler);
// }
