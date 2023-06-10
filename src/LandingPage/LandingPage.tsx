import React from 'react';
import Header from './Header';
import './LandingPage.css';
import Footer from './Footer';


const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <section>
        <h2>Bring your team together</h2>
        <p>At the heart of Slack are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
        <a href="#">Learn more about channels</a>
      </section>
      <section>
        <h2>Choose how you want to work</h2>
        <p>In Slack, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
        <a href="#">Learn more about flexible communication</a>
      </section>
      <section>
        <h2>Move faster with your tools in one place</h2>
        <p>With your other work apps connected to Slack, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks.</p>
        <a href="#">Learn more about the Slack platform</a>
      </section>
      <section>
        <h2>Teams large and small rely on Slack</h2>
        <p>Slack securely scales up to support collaboration at the world’s biggest companies.</p>
        <ul>
          <li>85% of users say Slack has improved communication</li>
          <li>86% feel their ability to work remotely has improved</li>
          <li>88% feel more connected to their teams</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
