import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RAGPipelineAnimation.css';

const STAGES = [
  {
    id: 'query',
    title: 'Query',
    icon: '❓',
    color: '#38bdf8',
    detail: 'User asks: "What are the benefits of RAG over fine-tuning?"',
    data: '"What are the benefits of RAG over fine-tuning?"',
  },
  {
    id: 'embed',
    title: 'Embed',
    icon: '🔢',
    color: '#a78bfa',
    detail: 'The query is converted into a vector embedding using an embedding model.',
    data: '[0.23, -0.45, 0.78, 0.12, -0.33, ...] (1536 dims)',
  },
  {
    id: 'search',
    title: 'Search',
    icon: '🔍',
    color: '#10b981',
    detail: 'The query vector is compared against all stored vectors using cosine similarity.',
    data: 'Top 3 matches: doc_42 (0.94), doc_17 (0.91), doc_85 (0.87)',
  },
  {
    id: 'retrieve',
    title: 'Retrieve',
    icon: '📄',
    color: '#f59e0b',
    detail: 'The original text chunks for the top matching vectors are fetched from storage.',
    data: '3 chunks retrieved:\n• "RAG provides real-time knowledge access..."\n• "Unlike fine-tuning, RAG doesn\'t require retraining..."\n• "RAG reduces hallucination by grounding responses..."',
  },
  {
    id: 'augment',
    title: 'Augment',
    icon: '💉',
    color: '#f43f5e',
    detail: 'Retrieved context is injected into the prompt alongside the original question.',
    data: 'System: Use this context to answer...\nContext: [3 retrieved chunks]\nUser: What are the benefits of RAG?',
  },
  {
    id: 'generate',
    title: 'Generate',
    icon: '✨',
    color: '#14b8a6',
    detail: 'The LLM generates a grounded response using both the question and retrieved context.',
    data: '"RAG offers several key benefits: real-time knowledge access without retraining, reduced hallucination through source grounding, and cost-effective knowledge updates..."',
  },
];

const PLAY_INTERVAL = 1500;

export default function RAGPipelineAnimation() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const maxStep = STAGES.length - 1;

  const stepForward = useCallback(() => {
    setStep((s) => {
      if (s >= maxStep) {
        setIsPlaying(false);
        return s;
      }
      return s + 1;
    });
  }, [maxStep]);

  const stepBack = useCallback(() => {
    setStep((s) => Math.max(-1, s - 1));
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setStep(-1);
    setIsPlaying(false);
  }, []);

  const goToEnd = useCallback(() => {
    setStep(maxStep);
    setIsPlaying(false);
  }, [maxStep]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      if (!p) {
        setStep((s) => {
          if (s >= maxStep) return -1;
          return s;
        });
      }
      return !p;
    });
  }, [maxStep]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= maxStep) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, PLAY_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, maxStep]);

  const activeStage = step >= 0 ? STAGES[step] : null;

  return (
    <div className="rag-pipeline">
      {/* Step counter */}
      <div className="rag-pipeline__counter">
        <span className="rag-pipeline__counter-label">Stage</span>
        <span className="rag-pipeline__counter-value">{step + 1}</span>
        <span className="rag-pipeline__counter-sep">/</span>
        <span className="rag-pipeline__counter-total">{STAGES.length}</span>
      </div>

      {/* Pipeline nodes */}
      <div className="rag-pipeline__nodes">
        {STAGES.map((stage, i) => {
          let state = 'inactive';
          if (i < step) state = 'completed';
          else if (i === step) state = 'active';

          return (
            <div key={stage.id} className="rag-pipeline__node-wrapper">
              <motion.div
                className={`rag-pipeline__node rag-pipeline__node--${state}`}
                style={{ '--node-color': stage.color }}
                animate={{
                  scale: state === 'active' ? 1.08 : 1,
                  borderColor: state === 'active' ? stage.color : state === 'completed' ? stage.color : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="rag-pipeline__node-icon">{stage.icon}</span>
                <span className="rag-pipeline__node-title">{stage.title}</span>
              </motion.div>
              {i < STAGES.length - 1 && (
                <div className={`rag-pipeline__arrow ${i < step ? 'completed' : ''}`}>→</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data panel */}
      <div className="rag-pipeline__panel">
        <AnimatePresence mode="wait">
          {activeStage ? (
            <motion.div
              key={activeStage.id}
              className="rag-pipeline__panel-content"
              style={{ '--panel-color': activeStage.color }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rag-pipeline__panel-header">
                <span className="rag-pipeline__panel-icon">{activeStage.icon}</span>
                <span className="rag-pipeline__panel-title">{activeStage.title}</span>
              </div>
              <p className="rag-pipeline__panel-detail">{activeStage.detail}</p>
              <div className="rag-pipeline__panel-data">
                <div className="rag-pipeline__panel-data-label">Data</div>
                <pre className="rag-pipeline__panel-data-content">{activeStage.data}</pre>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="rag-pipeline__panel-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Press play or step forward to start
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="rag-pipeline__controls">
        <button className="rag-pipeline__btn" onClick={reset} aria-label="Reset" title="Reset">
          &#x27F2;
        </button>
        <button className="rag-pipeline__btn" onClick={stepBack} disabled={step < 0} aria-label="Step back" title="Step Back">
          &#x25C0;
        </button>
        <button
          className="rag-pipeline__btn rag-pipeline__btn--play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '\u23F8' : '\u25B6'}
        </button>
        <button className="rag-pipeline__btn" onClick={stepForward} disabled={step >= maxStep} aria-label="Step forward" title="Step Forward">
          &#x25B6;
        </button>
        <button className="rag-pipeline__btn" onClick={goToEnd} aria-label="Go to end" title="Go to End">
          &#x23ED;
        </button>
      </div>
    </div>
  );
}
