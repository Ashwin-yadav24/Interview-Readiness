import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { RefreshCcw, Award } from 'lucide-react';

const ResultsDashboard = ({ data, onReset }) => {
  if (!data) return null;

  const chartData = [
    { subject: 'Technical', A: data.categories.technical.score, fullMark: 100 },
    { subject: 'Resume', A: data.categories.resume.score, fullMark: 100 },
    { subject: 'Communication', A: data.categories.communication.score, fullMark: 100 },
    { subject: 'Portfolio', A: data.categories.portfolio.score, fullMark: 100 },
  ];

  return (
    <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={32} color="var(--accent-primary)" /> Assessment Complete
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>Here is your comprehensive interview readiness report.</p>
      </div>

      <div className="dashboard-grid">
        <div className="score-container">
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Overall Score</h3>
          <div className="overall-score">{data.overallScore}<span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>/100</span></div>
          
          <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-primary)' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--text-secondary)' }} />
                <Radar name="Score" dataKey="A" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="category-scores">
          {Object.entries(data.categories).map(([key, value]) => (
            <div key={key} className="category-item">
              <span className="category-name">{key}</span>
              <span className="category-value" style={{ color: value.score > 70 ? 'var(--success)' : value.score > 40 ? 'var(--warning)' : 'var(--danger)' }}>
                {value.score}/100
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="feedback-section">
        <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          Overall Feedback
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem', color: '#e2e8f0' }}>{data.overallFeedback}</p>

        <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          Personalized Improvement Plan
        </h3>
        <div className="dashboard-grid">
          {Object.entries(data.categories).map(([key, value]) => (
            <div key={key} className="feedback-card">
              <h4 style={{ color: 'var(--accent-primary)' }}>{key}</h4>
              <p>{value.feedback}</p>
              <ul className="action-items">
                {value.improvementPlan.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="btn btn-primary" onClick={onReset}>
          <RefreshCcw size={20} /> Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
