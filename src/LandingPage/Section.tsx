import React, { useEffect, useRef } from "react";
import "./Section.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown } from "react-icons/fa";

const Section = () => {
  const firstSectionRef = useRef(null); // add this line

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const scrollToFirstSection = () => {
    if (firstSectionRef.current) {
      firstSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <section>
        <div className="scroll-down-indicator" onClick={scrollToFirstSection}>
          <FaChevronDown size={32} />
        </div>
        <section className="section-right" ref={firstSectionRef}>
          <h2 data-aos="fade-up">Bring your team together</h2>
          <p data-aos="fade-up">
            At the heart of Slack are channels: organized spaces for everyone
            and everything you need for work. <br></br>In channels, it’s easier
            to connect across departments, offices, time zones, and even other
            companies.
          </p>
          <a className="1" href="#">
            Learn more about channels
          </a>
        </section>
        <section className="section-left">
          <h2 data-aos="fade-up">Choose how you want to work</h2>
          <p data-aos="fade-up">
            In Slack, you’ve got all the flexibility to work when, where, and
            how it’s best for you. <br></br>You can easily chat, send audio and
            video clips, or hop on a huddle to talk things out live.
          </p>
          <a className="2" href="#">
            Learn more about flexible communication
          </a>
        </section>
        <section className="section-right">
          <h2 data-aos="fade-up">Move faster with your tools in one place</h2>
          <p data-aos="fade-up">
            With your other work apps connected to Slack, you can work faster by
            switching tabs less. <br></br>And with powerful tools like Workflow
            Builder, you can automate away routine tasks.
          </p>
          <a href="#">Learn more about the Slack platform</a>
        </section>
      </section>
      <section className="section-left">
        <h2 data-aos="fade-up">Teams large and small rely on Slack</h2>
        <p data-aos="fade-up">
          Slack securely scales up to support collaboration at the world’s
          biggest companies.
        </p>
        <ul>
          <li>85% of users say Slack has improved communication</li>
          <li>86% feel their ability to work remotely has improved</li>
          <li>88% feel more connected to their teams</li>
        </ul>
      </section>
    </div>
  );
};

export default Section;
