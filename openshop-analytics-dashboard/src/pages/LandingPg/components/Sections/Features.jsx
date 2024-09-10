import React from "react";
import styled from "styled-components";

export default function Features() {
  return (
    <Wrapper id="features">
      <div className="container">
        <HeaderInfo>
          <h1 className="font40 extraBold" style={{ textAlign: 'center' }}>Features</h1>
          <p className="font20" style={{ textAlign: 'center' }}>Empowering Our Users with Comprehensive Tools</p>
        </HeaderInfo>
        <FeatureCards className="flex">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index}>
              <CardIcon>
                <i className={feature.icon}></i>
              </CardIcon>
              <h2>{feature.title}</h2>
              <p>{feature.subtitle}</p>
            </FeatureCard>
          ))}
        </FeatureCards>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 60px 0;
  background-color: #f8f9fa;
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const FeatureCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 calc(33.33% - 30px);
  max-width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6f42c1;
    color: #fff;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Increased shadow */
    
    h2, p {
      color: #fff;
    }
  }

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #666;
  }

  @media (max-width: 860px) {
    flex: 1 1 100%;
  }
`;

const CardIcon = styled.div`
  font-size: 48px;
  color: #5e72e4;
  margin-bottom: 20px;
`;

const featuresData = [
  {
    icon: "fa fa-line-chart",
    title: "Startup Dashboard",
    subtitle: "Startups can monitor their progress with an interactive dashboard featuring graphs and charts, manage collaborations, request funding, and apply for patents all in one platform.",
  },
  {
    icon: "fa fa-bar-chart",
    title: "Investor Insights",
    subtitle: "Investors have a dedicated dashboard to track the growth of their invested startups, manage funding requests, and access AI-based recommendations for smart investment decisions.",
  },
  {
    icon: "fa fa-flask",
    title: "Researcher Collaboration",
    subtitle: "Researchers can manage projects, apply for patents, collaborate with startups to bring research to market, and view success metrics via an interactive dashboard.",
  },
  {
    icon: "fa fa-shield",
    title: "IPR Management System",
    subtitle: "IPR Managers oversee patent and trademark applications, approve or reject requests, and access detailed statistics on filings through a comprehensive dashboard.",
  },
  {
    icon: "fa fa-university",
    title: "Government Oversight",
    subtitle: "Government agencies can monitor overall portal activity including startup growth, investment trends, and research progress to aid in policy making and resource allocation.",
  },
  {
    icon: "fa fa-comments",
    title: "Smart AI Chatbot",
    subtitle: "An AI-powered chatbot trained specifically for this platform, capable of answering queries in English and Gujarati, providing seamless support and fostering regional growth.",
  },
  {
    icon: "fa fa-users",
    title: "Collaboration Requests",
    subtitle: "Startups and researchers can request collaborations through the portal, fostering innovation and speeding up the development of market-ready products.",
  },
  {
    icon: "fa fa-money",
    title: "Funding Management",
    subtitle: "A streamlined process for startups to request funding and for investors to approve or reject them, supported by AI-driven growth analysis to ensure profitability.",
  },
  {
    icon: "fa fa-lightbulb-o",
    title: "Patent Approval System",
    subtitle: "A dedicated system for filing and approving patents, enabling startups and researchers to protect their innovations and streamline the intellectual property process.",
  },
];
