import { useLoaderData } from "react-router";
import DOMPurify from "dompurify";
import "../Styles/about.scss";

export default function AboutUs() {
  const aboutData = useLoaderData();

  const renderContent = (content) => {
    return content
      .split("\n\n")
      .map((paragraph, index) => (
        <p
          key={index}
          className="about-us-page__section-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }}
        />
      ));
  };

  return (
    <div className="about-us-page">
      <h1 className="about-us-page__title">OUR HISTORY</h1>
      <article className="about-us-page__content">
        <section className="about-us-page__section">
          <img
            src={aboutData.section_1.image}
            alt={aboutData.section_1.title}
            className="about-us-page__section-image"
          />
          <div className="about-us-page__section-text-container">
            <h2 className="about-us-page__section-title">
              {aboutData.section_1.title}
            </h2>
            <p className="about-us-page__section-subtitle">
              {aboutData.section_1.subtitle}
            </p>
            {renderContent(aboutData.section_1.content)}
          </div>
        </section>
        <section className="about-us-page__section">
          <img
            src={aboutData.section_2.image}
            alt={aboutData.section_2.title}
            className="about-us-page__section-image"
          />
          <div className="about-us-page__section-text-container">
            <h2 className="about-us-page__section-title">
              {aboutData.section_2.title}
            </h2>
            <p className="about-us-page__section-subtitle">
              {aboutData.section_2.subtitle}
            </p>
            {renderContent(aboutData.section_2.content)}
          </div>
        </section>
        <section className="about-us-page__section">
          <img
            src={aboutData.section_3.image}
            alt={aboutData.section_3.title}
            className="about-us-page__section-image"
          />
          <div className="about-us-page__section-text-container">
            <h2 className="about-us-page__section-title">
              {aboutData.section_3.title}
            </h2>
            <p className="about-us-page__section-subtitle">
              {aboutData.section_3.subtitle}
            </p>
            {renderContent(aboutData.section_3.content)}
          </div>
        </section>
        <section className="about-us-page__section">
          <img
            src={aboutData.section_4.image}
            alt={aboutData.section_4.title}
            className="about-us-page__section-image"
          />
          <div className="about-us-page__section-text-container">
            <h2 className="about-us-page__section-title">
              {aboutData.section_4.title}
            </h2>
            <p className="about-us-page__section-subtitle">
              {aboutData.section_4.subtitle}
            </p>
            {renderContent(aboutData.section_4.content)}
          </div>
        </section>
      </article>
    </div>
  );
}
