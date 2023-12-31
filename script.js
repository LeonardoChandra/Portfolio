window.onload = function () {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

//Hamburger Menu

const inputs = document.querySelectorAll(".input");
const menu = document.querySelector(".hamburger-links");
const icon = document.querySelector(".hamburger-icon");

function toggleMenu() {
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Sidebar Navigation

function activateSideNav() {
  const sections = document.querySelectorAll("section");
  const navContainer = document.createElement("NAV");
  const sideNavLink = Array.from(sections).map((section) => {
    return `
        <div class="side-nav-link" data-for-section="${section.id}">
          <a href="#${section.id}" class="nav-bullet"> </a>
        </div>
    `;
  });

  navContainer.classList.add("side-nav");
  navContainer.innerHTML = sideNavLink.join("");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const navBullet = document.querySelector(`.side-nav-link[data-for-section="${entry.target.id}"] .nav-bullet`);
        if (entry.isIntersecting) {
          navBullet.classList.add("selected");
        } else {
          navBullet.classList.remove("selected");
        }
      });
    },
    { threshold: [0.5] }
  );

  sections.forEach((section) => observer.observe(section));

  document.body.appendChild(navContainer);
}

activateSideNav();

//Details Preview

let projectPreviewContainer = document.querySelector(".projects-preview");
let projectPreviewBox = document.querySelectorAll(".projects-details-preview");
document.querySelectorAll(".grid-container .project-details-container").forEach((projectDetailsContainer) => {
  projectDetailsContainer.onclick = () => {
    projectPreviewContainer.style.display = "flex";
    let name = projectDetailsContainer.getAttribute("data-name");
    projectPreviewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name == target) {
        preview.classList.add("active");
      }
    });
    $(".main-carousel").flickity({
      // options
      cellAlign: "left",
      wrapAround: true,
      autoPlay: 4000,
      pauseAutoPlayOnHover: false,
    });
  };
});

Flickity.prototype.stopPlayer = function () {
  this.player.stop();
  setTimeout(() => {
    this.player.play();
  }, 5000);
};

projectPreviewBox.forEach((close) => {
  close.querySelector(".closeIcon").onclick = () => {
    close.classList.remove("active");
    projectPreviewContainer.style.display = "none";
    $(".main-carousel").flickity("destroy");
  };
});

//Focus Contact

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

//Form Validation

const eJS_Name = document.getElementById("nameID");
const eJS_Email = document.getElementById("emailID");
const eJS_Message = document.getElementById("messageID");
const submit_btn = document.getElementById("submit-btn");
const honeypot = document.getElementById("honey");
let canSubmit = false;
let reaction = null;

submit_btn.disabled = true;

function eJS_form_event_listeners() {
  eJS_Name.addEventListener("keyup", eJS_can_submit);
  eJS_Email.addEventListener("keyup", eJS_can_submit);
  eJS_Message.addEventListener("keyup", eJS_can_submit);
  honeypot.addEventListener("keyup", eJS_can_submit);
}

eJS_form_event_listeners();

function eJS_validateEmail(eJS_Email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(eJS_Email).toLowerCase());
}

function eJS_disabled_submit() {
  submit_btn.classList.remove("activated");
  submit_btn.disabled = true;
  canSubmit = false;
}

function eJS_can_submit() {
  //check the required field
  let name = eJS_Name.value.trim();
  let email = eJS_Email.value.trim();
  let message = eJS_Message.value.trim();
  let honeyed = honeypot.value.trim();

  if (message.length > 1 && email.length > 4 && name.length > 1) {
    document.getElementById("error-span").style.visibility = "hidden";
    if (eJS_validateEmail(email)) {
      if (honeyed.length < 1) {
        submit_btn.classList.add("activated");
        submit_btn.disabled = false;
        canSubmit = true;
      } else {
        document.getElementById("error-span").style.visibility = "visible";
        document.getElementById("error-span").textContent = "You have been honeyed ;)";
        eJS_disabled_submit();
      }
    } else {
      document.getElementById("error-span").style.visibility = "visible";
      document.getElementById("error-span").textContent = "Please enter a valid email!";
      eJS_disabled_submit();
    }
  } else {
    document.getElementById("error-span").style.visibility = "visible";
    document.getElementById("error-span").textContent = "Please fill all of the form correctly!";
    eJS_disabled_submit();
  }
}

//Send Email

function sendEmail() {
  var params = {
    Name: document.getElementById("nameID").value,
    Email: document.getElementById("emailID").value,
    Message: document.getElementById("messageID").value,
  };

  var serviceID = "service_aox5hfb";
  var templateID = "template_xua3gif";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "success",
        text: "Thank you, " + params["Name"] + "!\nYour message has been sent.",
      });
      document.getElementById("error-span").textContent = "Thank you for your message! :)";
      document.getElementById("error-span").style.color = "green";
      document.getElementById("error-span").style.visibility = "visible";
      document.getElementById("nameID").disabled = true;
      document.getElementById("emailID").disabled = true;
      document.getElementById("messageID").disabled = true;
      const nodeList = document.querySelectorAll(".contact-container");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.color = "#dcdad1";
      }
      eJS_disabled_submit();
    })
    .catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Sorry " + params["Name"] + "! Something went wrong!",
        footer: '<a href="https://www.instagram.com/leonardo.chandraa">Report to my instagram DM</a>',
      });
    });
}

console.log(
  `%c ________________________________________
< mooooooooooooooooooooooooooooooooooooo >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  "font-family:monospace;color: white;"
);
