import React, { useState, useCallback } from 'react';
import { Upload, Leaf, ShieldCheck, AlertCircle, RefreshCcw, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const predictDisease = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to connect to the backend. Is it running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container">
      <header className="hero-section">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
             <div className="glass" style={{ padding: '12px', borderRadius: '16px' }}>
                <Leaf color="#10b981" size={32} />
             </div>
          </div>
          <h1 className="hero-title">Plant Guard AI</h1>
          <p className="hero-subtitle">
            Instant plant disease detection using Deep Learning. 
            Keep your crops healthy and maximize your yield.
          </p>
        </motion.div>
      </header>

      <main>
        <div className="glass upload-card">
          {!preview ? (
            <motion.div 
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input 
                type="file" 
                id="fileInput" 
                hidden 
                onChange={handleImageChange}
                accept="image/*"
              />
              <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '50%' }}>
                    <Upload size={40} color="#10b981" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload Leaf Image</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Drag and drop or click to browse</p>
                  </div>
                </div>
              </label>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img src={preview} alt="Preview" className="image-preview" />
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {!result && !loading && (
                  <button className="btn btn-primary" onClick={predictDisease}>
                    <ShieldCheck size={20} />
                    Analyze Health
                  </button>
                )}
                
                {(result || error) && !loading && (
                  <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={reset}>
                    <RefreshCcw size={20} />
                    Try Another
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {loading && (
            <div style={{ marginTop: '2rem' }}>
              <span className="loader"></span>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Analyzing leaf patterns...</p>
            </div>
          )}

          {error && (
            <div style={{ marginTop: '2rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div 
                className="result-card glass"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <div style={{ textAlign: 'left' }}>
                    <span className={`status-badge ${result.is_healthy ? 'status-healthy' : 'status-unhealthy'}`}>
                      {result.is_healthy ? 'Healthy Leaf' : 'Diseased Detected'}
                    </span>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{result.class.replace(/___/g, ' ')}</h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Confidence</p>
                    <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{(result.confidence * 100).toFixed(1)}%</h3>
                  </div>
                </div>

                <div className="confidence-bar">
                  <motion.div 
                    className="confidence-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'left', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                    {result.is_healthy 
                      ? "Your plant looks healthy! Keep up the good work with regular watering and monitoring."
                      : "We've detected signs of disease. We recommend isolating this plant and applying appropriate treatment as soon as possible."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2025 Plant Guard AI | Empowering Farmers with Technology</p>
      </footer>
    </div>
  );
};

export default App;
