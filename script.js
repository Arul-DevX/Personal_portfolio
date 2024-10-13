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

// Dark mode button
const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', null);
            }
        });

        // Smooth color transition for all elements
        const allElements = document.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].style.transition = 'background-color .2s, color .2s, box-shadow .2s';
        }

//Welcome script

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    document.querySelectorAll('.circle').forEach(circle => {
        const rect = circle.getBoundingClientRect();
        const circleX = rect.left + rect.width / 2;
        const circleY = rect.top + rect.height / 2;

        const diffX = circleX - mouseX;
        const diffY = circleY - mouseY;

        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const magneticRadius = 50; // Magnetic field radius

        if (distance < magneticRadius) {
            const angle = Math.atan2(diffY, diffX);
            const moveX = Math.cos(angle) * (magneticRadius - distance);
            const moveY = Math.sin(angle) * (magneticRadius - distance);

            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            circle.style.transform = `translate(0, 0)`;
        }
    });
});

// Select all necessary DOM elements at the beginning
const ghostContainer = document.getElementById('ghost-container');
const ghostImage = document.getElementById('ghost-image');
const messageBubble = document.getElementById('message-bubble');
const ghosthomeSection = document.getElementById('ghosthome');
const zzzContainer = document.querySelector('.zzz-container');
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');
const homeSection = document.getElementById('home');
const skillsSection = document.getElementById('skills');
const contactSection = document.getElementById('contact');

let currentSection = null;
let typingTimeout;
let isAsleep = false;

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

    if (isAsleep) {
        wakeUp();
    }
});

const sectionMessages = {
    about: "Here's where you can learn about Arul's skills and passion for web development.",
    projects: "Check out Arul's impressive portfolio of web development projects.",
    home: "Welcome to Arul's portfolio! Explore his skills, projects, and achievements as a frontend developer and tech enthusiast. Let's dive in!",
    skills: "Arul is skilled in Python, Web Development (HTML, CSS, JavaScript), SQL, and Git/GitHub. He's adept at solving problems with his programming expertise and has a solid understanding of Cloud Computing!",
    contact: "Want to get in touch? You can reach Arul via email at arulraman77@gmail.com or connect on LinkedIn. Looking forward to hearing from you!",
    ghosthome: "My Home !!"
};

function handleSectionHover(section) {
    return () => {
        if (currentSection !== section) {
            currentSection = section;
            ghostImage.src = 'images/ghost-smile.png';
            typeMessage(sectionMessages[section]);
        }
    };
}

aboutSection.addEventListener('mouseenter', handleSectionHover('about'));
projectsSection.addEventListener('mouseenter', handleSectionHover('projects'));
homeSection.addEventListener('mouseenter', handleSectionHover('home'));
skillsSection.addEventListener('mouseenter', handleSectionHover('skills'));
contactSection.addEventListener('mouseenter', handleSectionHover('contact'));
ghosthomeSection.addEventListener('mouseenter', handleSectionHover('ghosthome'));

document.addEventListener('mousemove', (e) => {
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (!aboutSection.contains(hoveredElement) && 
        !projectsSection.contains(hoveredElement) && 
        !homeSection.contains(hoveredElement) && 
        !skillsSection.contains(hoveredElement) && 
        !contactSection.contains(hoveredElement) && 
        !ghosthomeSection.contains(hoveredElement) && 
        currentSection) {
        currentSection = null;
        ghostImage.src = 'images/ghost-normal.png';
        messageBubble.classList.remove('show');
    }
});

document.addEventListener('mouseleave', () => {
    const homeRect = ghosthomeSection.getBoundingClientRect();
    ghostContainer.style.transition = 'all .5s ease';
    ghostContainer.style.left = `${homeRect.left + homeRect.width / 2 - ghostContainer.offsetWidth / 2}px`;
    ghostContainer.style.top = `${homeRect.top + homeRect.height / 2 - ghostContainer.offsetHeight / 2}px`;
    ghostContainer.style.animation = 'none';

    setTimeout(() => {
        goToSleep();
    }, 1500);
});

function goToSleep() {
    ghostImage.src = 'images/ghost-sleep.png';
    isAsleep = true;
    if (zzzContainer) {
        zzzContainer.style.opacity = 1;
    }
    messageBubble.classList.remove('show');
}

function wakeUp() {
    ghostImage.src = 'images/ghost-normal.png';
    isAsleep = false;
    if (zzzContainer) {
        zzzContainer.style.opacity = 0;
    }
    ghostContainer.style.animation = 'float 5s infinite';
}

function updateGhostHomePosition() {
    if (isAsleep) {
        const homeRect = ghosthomeSection.getBoundingClientRect();
        ghostContainer.style.left = `${homeRect.left + homeRect.width / 2 - ghostContainer.offsetWidth / 2}px`;
        ghostContainer.style.top = `${homeRect.top + homeRect.height / 2 - ghostContainer.offsetHeight / 2}px`;
    }
}

window.addEventListener('scroll', updateGhostHomePosition);
