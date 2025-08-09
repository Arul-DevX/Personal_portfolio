import React from 'react'
import ThreeDCard from './ThreeDCard'

const Projects = () => {
  const projects = [
    {
      title: "Customer Churn Prediction Model",
      link: "https://github.com/Arul-DevX/customer-churn-analysis",
      isExternal: true
    },
    {
      title: "Sales Performance Dashboard",
      link: "https://public.tableau.com/app/profile/arul.analyst/viz/SalesDashboard",
      isExternal: true
    },
    {
      title: "Market Basket Analysis",
      link: "https://github.com/Arul-DevX/market-basket-analysis",
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
    <div className="container projects-section" id="projects">
      <div className="row">
        <div className="col1 animate-on-scroll fade-in-left">
          <ThreeDCard>
            <img 
              src="https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800" 
              className="all_img"  
              alt="Data analytics dashboard with charts, graphs and business intelligence reports" 
              width="500px"
            />
          </ThreeDCard>
        </div>
        <div className="col1 animate-on-scroll fade-in-right">
          <h2>Projects</h2>
          <p style={{ marginBottom: '30px', color: '#ccc' }}>
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
  )
}

export default Projects