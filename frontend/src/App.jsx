import React, { useState } from 'react';
import AssessmentForm from './components/AssessmentForm';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [evaluationData, setEvaluationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssessmentSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate profile');
      }

      const data = await response.json();
      setEvaluationData(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred during evaluation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEvaluationData(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Interview Readiness</h1>
        <p>AI-Powered Profile Assessment & Improvement Roadmap</p>
      </header>

      <main>
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid var(--danger)', padding: '1rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
            <p style={{ color: 'var(--danger)' }}>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Our AI is analyzing your profile...</p>
          </div>
        ) : evaluationData ? (
          <ResultsDashboard data={evaluationData} onReset={handleReset} />
        ) : (
          <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}

export default App;
