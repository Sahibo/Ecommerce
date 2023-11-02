fetch('https://localhost:44313')
  .then(response => response.json())
  .then(data => {
    // Process the data received from the backend
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });