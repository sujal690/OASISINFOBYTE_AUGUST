import React from 'react';
import './LandingPage.css'; 
import { FaChalkboardTeacher, FaLaptopCode, FaProjectDiagram, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaCode, FaDatabase, FaPaintBrush } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to LearnHub</h1>
            <p className="hero-subtitle">Transform Your Skills with Our Online Courses</p>
            <a href="#courses" className="cta-button">Explore Courses</a>
          </div>
        </div>
      </header>

      <section id="about" className="about-section">
        <div className="section-content">
          <h2 className="section-title">About Us</h2>
          <p className="section-text">At LearnHub, we provide world-class online education to help you achieve your goals. Join our community of learners and start your journey today.</p>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-content">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FaChalkboardTeacher className="feature-icon" />
              <h3>Expert Instructors</h3>
              <p>Learn from top professionals in your field.</p>
            </div>
            <div className="feature-item">
              <FaLaptopCode className="feature-icon" />
              <h3>Flexible Learning</h3>
              <p>Learn at your own pace, from anywhere in the world.</p>
            </div>
            <div className="feature-item">
              <FaProjectDiagram className="feature-icon" />
              <h3>Interactive Content</h3>
              <p>Engage with interactive lessons and real-world projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="courses-section">
        <div className="section-content">
          <h2 className="section-title">Our Popular Courses</h2>
          <div className="courses-grid">
            <div className="course-item">
              <FaCode className="course-icon" />
              <h3>Web Development</h3>
              <p>Build dynamic websites and web applications.</p>
            </div>
            <div className="course-item">
              <FaDatabase className="course-icon" />
              <h3>Data Science</h3>
              <p>Analyze and interpret complex data to drive decision-making.</p>
            </div>
            <div className="course-item">
              <FaPaintBrush className="course-icon" />
              <h3>Graphic Design</h3>
              <p>Create stunning visuals and compelling graphics.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="section-content">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-slider">
            <div className="testimonial">
              <p>"LearnHub's courses are incredibly well-designed and insightful. I’ve learned so much!" - Jane Doe</p>
            </div>
            <div className="testimonial">
              <p>"The flexibility of learning at my own pace has been a game-changer for me." - John Smith</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-content">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-text">Have any questions? Feel free to reach out to us!</p>
          <div className="contact-info">
            <a href="mailto:info@learnhub.com">info@learnhub.com</a>
            <div className="social-media">
              <a href="https://twitter.com/learnhub" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
              <a href="https://facebook.com/learnhub" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href="https://instagram.com/learnhub" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://linkedin.com/in/learnhub" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2024 LearnHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
