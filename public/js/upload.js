const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#recipe-name").value.trim();
  const instructions = document.querySelector("#recipe-instructions").value.trim();
  const image = document.querySelector("#image").value.trim();
  const caption = document.querySelector("#caption").value.trim();

  if (name && instructions) {
    // aws upload
    // onSuccess, get img link
    // const image = img link from aws

    const response = await fetch(`/api/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name,
        instructions,
        image,
        caption,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create project");
    }
  }
};

document.querySelector(".new-recipe-form").addEventListener("submit", newFormHandler);
