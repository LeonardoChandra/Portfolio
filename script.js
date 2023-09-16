const inputs = document.querySelectorAll(".input");
const menu = document.querySelector(".hamburger-links");
const icon = document.querySelector(".hamburger-icon");

function toggleMenu() {
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

function sendEmail() {
  var params = {
    Name: document.getElementById("nameID").value,
    Email: document.getElementById("emailID").value,
    Message: document.getElementById("messageID").value,
  };

  var serviceID = "service_aox5hfb";
  var templateID = "template_xua3gif";

  if (params.Name.value !== "" || params.Email.value !== "" || params.Message.value !== "") {
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        alert("Thank you, " + params["Name"] + "! Your message has been sent.");
      })
      .catch();
  }
}
