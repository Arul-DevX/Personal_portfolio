// Navigation menu toggle
  var menuitems = document.getElementById("menuitems");
  menuitems.style.maxHeight = "0px";

  function menu_toggle() {
      if (menuitems.style.maxHeight == "0px") {
          menuitems.style.maxHeight = "400px";
      } else {
          menuitems.style.maxHeight = "0px";
      }
  }

// Select all necessary DOM elements at the beginning
const ghostContainer = document.getElementById('ghost-container');
const ghostImage = document.getElementById('ghost-image');
const messageBubble = document.getElementById('message-bubble');
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');
const homeSection = document.getElementById('home');
const skillsSection = document.getElementById('skills');
const contactSection = document.getElementById('contact');

let currentSection = null;
let typingTimeout;

function typeMessage(message) {
    clearTimeout(typingTimeout);
    let i = 0;
    messageBubble.textContent = '';
    messageBubble.classList.add('show');

    function typeChar() {
        if (i < message.length) {
            messageBubble.textContent += message.charAt(i);
            i++;
            typingTimeout = setTimeout(typeChar, 30);
        }
    }

    typeChar();
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    ghostContainer.style.left = (x + 20) + 'px';
    ghostContainer.style.top = (y - 20) + 'px';
});

const sectionMessages = {
    about: "Here's where you can learn about Arul's skills and passion for web development.",
    projects: "Check out Arul's impressive portfolio of web development projects.",
    home: "Welcome to Arul's portfolio! Explore his skills, projects, and achievements as a frontend developer and tech enthusiast. Let's dive in!",
    skills: "Arul is skilled in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub. He's adept at solving problems with his programming expertise and has a solid understanding of Cloud Computing!",
    contact: "Want to get in touch? You can reach Arul via email at arulraman77@gmail.com or connect on LinkedIn. Looking forward to hearing from you!"
};

function handleSectionHover(section) {
    return () => {
        if (currentSection !== section) {
            currentSection = section;
            ghostImage.src = 'Images/ghost-smile.png';
            typeMessage(sectionMessages[section]);
        }
    };
}

aboutSection.addEventListener('mouseenter', handleSectionHover('about'));
projectsSection.addEventListener('mouseenter', handleSectionHover('projects'));
homeSection.addEventListener('mouseenter', handleSectionHover('home'));
skillsSection.addEventListener('mouseenter', handleSectionHover('skills'));
contactSection.addEventListener('mouseenter', handleSectionHover('contact'));

document.addEventListener('mousemove', (e) => {
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (!aboutSection.contains(hoveredElement) && 
        !projectsSection.contains(hoveredElement) && 
        !homeSection.contains(hoveredElement) && 
        !skillsSection.contains(hoveredElement) && 
        !contactSection.contains(hoveredElement) && 
        currentSection) {
        currentSection = null;
        ghostImage.src = 'Images/ghost-normal.png';
        messageBubble.classList.remove('show');
    }
});

