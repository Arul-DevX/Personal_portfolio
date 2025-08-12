import React from 'react'
import ThreeDCard from './ThreeDCard'
import projectComplete from '/src/images/project_complete.png';

const Projects = () => {
  const projects = [
    {
      title: "Exploratory Data Analysis of Internships in India",
      link: "https://github.com/Arul-DevX/EDA_of_internships_India",
      isExternal: true
    },
    {
      title: "Implementation Of Ai-Enabled Real Time Speech-To-Sign Language Converter With Animated Avatar",
      link: "https://github.com/Arul-DevX/text_and_voice_to_isl",
      isExternal: true
    },
    {
      title: "Real-Time Weather Data Management",
      link: "https://github.com/Arul-DevX/weather_datasets",
      isExternal: true
    },
    {
      title: "Financial Time Series Forecasting",
      link: "https://github.com/Arul-DevX/financial-forecasting",
      isExternal: true
    },
    {
      title: "A/B Testing Framework",
      link: "https://github.com/Arul-DevX/ab-testing-framework",
      isExternal: true
    },
    {
      title: "COVID-19 Data Analysis Dashboard",
      link: "https://covid-analytics-dashboard.streamlit.app/",
      isExternal: true
    }
  ]

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="col1 animate-on-scroll fade-in-left">
            <ThreeDCard>
              <img 
                src={projectComplete} 
                className="all_img projects-image"  
                alt="Data Analysis Projects Portfolio" 
                width="350px"
              />
            </ThreeDCard>
          </div>
          <div className="col1 animate-on-scroll fade-in-right">
            <h2>My <span className="highlight">Projects</span></h2>
            <p className="projects-description">
              Explore my data analysis projects showcasing statistical modeling, 
              machine learning, and business intelligence solutions.
            </p>
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
    </section>
  )
}

export default Projects