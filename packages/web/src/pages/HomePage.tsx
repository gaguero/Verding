import React from 'react';

export function HomePage() {
  return (
    <div className='home-page'>
      <section className='hero'>
        <h1>Welcome to Verding</h1>
        <p className='hero-subtitle'>Agent-First Microgreens Management Platform</p>
        <p className='hero-description'>
          Revolutionize your microgreens operation through natural language interaction. Manage your
          entire farm with simple conversations.
        </p>
        <div className='hero-actions'>
          <button className='btn btn-primary'>Get Started</button>
          <button className='btn btn-secondary'>Learn More</button>
        </div>
      </section>

      <section className='features'>
        <h2>Key Features</h2>
        <div className='features-grid'>
          <div className='feature-card'>
            <h3>🤖 AI Agent Interface</h3>
            <p>Manage your farm through natural language conversations</p>
          </div>
          <div className='feature-card'>
            <h3>🌱 Multi-Property Support</h3>
            <p>Manage multiple growing locations from one platform</p>
          </div>
          <div className='feature-card'>
            <h3>📊 Real-time Analytics</h3>
            <p>Track growth, yields, and performance metrics</p>
          </div>
          <div className='feature-card'>
            <h3>🔒 Secure & Scalable</h3>
            <p>Enterprise-grade security with role-based access</p>
          </div>
        </div>
      </section>
    </div>
  );
}
