
const scriptURL = "https://script.google.com/macros/s/AKfycbyU75BBBR4197fbK2Iy39JuZRMohI2ESwUxqhHksVfSgaF3bxt5x7p-HEplII0osCI7gQ/exec";

document.getElementById("regForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const form = document.getElementById("regForm");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Show loading state or disable button
  const submitBtn = form.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
  }

  try {
    console.log("Sending data to:", scriptURL);
    // Create FormData object instead of JSON
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
      mode: "cors" // Explicitly request CORS
    });
    
    console.log("Response status:", response.status);
    const result = await response.json();

    if (result.status === "success") {
      alert("Your registration was successful!");
      form.reset();
    } else {
      console.error("Error from server:", result);
      alert("Something went wrong: " + (result.message || "Unknown error"));
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to connect to the server. Please check your network connection and try again.\nError details: " + error);
  } finally {
    // Reset button state
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  }
});
