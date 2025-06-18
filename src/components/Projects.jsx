import React from 'react'

const Projects = () => {
  const projects = [
    {
      title: "Sign Language Recognition System",
      description: "A machine learning project for recognizing sign language gestures.",
      link: "/development.html",
      isExternal: false
    },
    {
      title: "Real-Time News Portal",
      description: "A Python-based web scraping project fetching live news updates.",
      link: "https://newsweb-prkuhrwxypz25uxetdk8f.streamlit.app/",
      isExternal: true
    },
    {
      title: "AI Assistant HUB",
      description: "A fully responsive AI Assistant HUB website using HTML and CSS.",
      link: "https://arul28032003.github.io/Ai_service_web/",
      isExternal: true
    },
    {
      title: "Weather App",
      description: "A JavaScript app displaying live weather updates.",
      link: "https://arul28032003.github.io/Simple_web/",
      isExternal: true
    }
  ]

  return (
    <div className="container" id="projects">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <img 
            src="/Images/project_complete.png" 
            className="all_img"  
            alt="project image" 
            width="500px"
          />
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project animate-on-scroll fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a 
                  href={project.link}
                  className="btn"
                  target={project.isExternal ? "_blank" : "_self"}
                  rel={project.isExternal ? "noopener noreferrer" : ""}
                >
                  View Project &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects