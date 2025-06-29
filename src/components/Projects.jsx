import React from 'react'
import ThreeDCard from './ThreeDCard'
import projectComplete from '/src/images/project_complete.png';

const Projects = () => {
  const projects = [
    {
      title: "Sign Language Recognition System(College Final Year Project)",
      link: "https://github.com/Arul-DevX/text_and_voice_to_isl",
      isExternal: true
    },
    {
      title: "Real-Time News Portal",
      link: "https://newsweb-prkuhrwxypz25uxetdk8f.streamlit.app/",
      isExternal: true
    },
    {
      title: "AI Assistant HUB",
      link: "https://arul-devx.github.io/Ai_service_web/",
      isExternal: true
    },
    {
      title: "Weather App",
      link: "https://arul-devx.github.io/Web_Weather_App/",
      isExternal: true
    }
  ]

  return (
    <div className="container projects-section" id="projects">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src={projectComplete} 
              className="all_img"  
              alt="project image" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Projects</h2>
          <div className="projects-list">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-item animate-on-scroll fade-in-up" 
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <a 
                  href={project.link}
                  className="project-link"
                  target={project.isExternal ? "_blank" : "_self"}
                  rel={project.isExternal ? "noopener noreferrer" : ""}
                >
                  <span className="project-number">0{index + 1}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-arrow">→</div>
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