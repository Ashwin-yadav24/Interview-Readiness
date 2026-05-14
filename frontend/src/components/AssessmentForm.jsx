import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Send, Code, FileText, MessageSquare, Briefcase } from 'lucide-react';

const steps = [
  { id: 'technical', title: 'Technical Skills', icon: <Code size={20} /> },
  { id: 'resume', title: 'Resume', icon: <FileText size={20} /> },
  { id: 'communication', title: 'Communication', icon: <MessageSquare size={20} /> },
  { id: 'portfolio', title: 'Portfolio', icon: <Briefcase size={20} /> }
];

const AssessmentForm = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    technicalSkills: '',
    resumeText: '',
    communicationAnswer: '',
    portfolioLinks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        {steps.map((step, index) => (
          <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: index === currentStep ? 1 : 0.5 }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              background: index === currentStep ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem'
            }}>
              {step.icon}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: index === currentStep ? '600' : '400' }}>{step.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <div className="step-content">
            <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code size={24} color="var(--accent-primary)" /> Technical Skills
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>List your programming languages, frameworks, databases, and tools.</p>
            <div className="form-group">
              <label>Your Stack & Skills</label>
              <textarea 
                name="technicalSkills" 
                value={formData.technicalSkills} 
                onChange={handleChange} 
                rows="6" 
                placeholder="e.g., JavaScript, React, Node.js, Python, SQL. Experienced with REST APIs..."
                required
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="step-content">
            <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={24} color="var(--accent-primary)" /> Resume Summary
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Paste the textual content of your resume (experience, education, projects).</p>
            <div className="form-group">
              <label>Resume Content</label>
              <textarea 
                name="resumeText" 
                value={formData.resumeText} 
                onChange={handleChange} 
                rows="8" 
                placeholder="Education: B.S. Computer Science... Experience: Software Engineer at XYZ..."
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={24} color="var(--accent-primary)" /> Communication
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Answer this common interview question: "Tell me about a time you overcame a difficult technical challenge."</p>
            <div className="form-group">
              <label>Your Response</label>
              <textarea 
                name="communicationAnswer" 
                value={formData.communicationAnswer} 
                onChange={handleChange} 
                rows="8" 
                placeholder="Once, we faced a performance issue where..."
                required
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={24} color="var(--accent-primary)" /> Portfolio
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Provide links to your GitHub, LinkedIn, or personal website.</p>
            <div className="form-group">
              <label>Links</label>
              <textarea 
                name="portfolioLinks" 
                value={formData.portfolioLinks} 
                onChange={handleChange} 
                rows="4" 
                placeholder="GitHub: https://github.com/... LinkedIn: https://linkedin.com/..."
                required
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button type="button" className="btn" onClick={handlePrev} disabled={currentStep === 0 || isLoading} style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <ChevronLeft size={20} /> Back
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Evaluating...' : 'Submit Profile'} <Send size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
