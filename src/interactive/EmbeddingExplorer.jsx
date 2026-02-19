import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EmbeddingExplorer.css';

const CLUSTERS = {
  royalty: {
    label: 'Royalty',
    color: '#f59e0b',
    words: [
      { word: 'king', x: 72, y: 18 },
      { word: 'queen', x: 78, y: 22 },
      { word: 'prince', x: 68, y: 25 },
      { word: 'princess', x: 75, y: 28 },
      { word: 'throne', x: 82, y: 16 },
    ],
  },
  emotions: {
    label: 'Emotions',
    color: '#f43f5e',
    words: [
      { word: 'happy', x: 20, y: 65 },
      { word: 'sad', x: 15, y: 72 },
      { word: 'angry', x: 12, y: 68 },
      { word: 'joy', x: 22, y: 60 },
      { word: 'love', x: 25, y: 70 },
    ],
  },
  animals: {
    label: 'Animals',
    color: '#10b981',
    words: [
      { word: 'cat', x: 45, y: 42 },
      { word: 'dog', x: 50, y: 45 },
      { word: 'lion', x: 55, y: 38 },
      { word: 'tiger', x: 52, y: 35 },
      { word: 'bear', x: 48, y: 48 },
    ],
  },
  food: {
    label: 'Food',
    color: '#38bdf8',
    words: [
      { word: 'pizza', x: 30, y: 15 },
      { word: 'pasta', x: 35, y: 18 },
      { word: 'bread', x: 28, y: 20 },
      { word: 'rice', x: 32, y: 12 },
      { word: 'salad', x: 38, y: 22 },
    ],
  },
  gender: {
    label: 'Gender',
    color: '#a78bfa',
    words: [
      { word: 'man', x: 60, y: 75 },
      { word: 'woman', x: 65, y: 80 },
      { word: 'boy', x: 58, y: 82 },
      { word: 'girl', x: 63, y: 85 },
      { word: 'father', x: 55, y: 78 },
    ],
  },
};

const VECTORS = {
  king: [0.52, -0.31, 0.89],
  queen: [0.48, -0.28, 0.91],
  man: [0.35, -0.55, 0.22],
  woman: [0.31, -0.52, 0.24],
};

const ARITHMETIC_STEPS = [
  { label: 'king', vec: '[ 0.52, -0.31,  0.89]', color: '#f59e0b' },
  { label: '- man', vec: '[-0.35,  0.55, -0.22]', color: '#a78bfa' },
  { label: '+ woman', vec: '[ 0.31, -0.52,  0.24]', color: '#a78bfa' },
  { label: '= queen', vec: '[ 0.48, -0.28,  0.91]', color: '#10b981' },
];

export default function EmbeddingExplorer() {
  const [activeCluster, setActiveCluster] = useState(null);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [arithmeticStep, setArithmeticStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const maxStep = ARITHMETIC_STEPS.length - 1;

  const playArithmetic = useCallback(() => {
    setIsPlaying(true);
    setArithmeticStep(-1);
  }, []);

  const resetArithmetic = useCallback(() => {
    setIsPlaying(false);
    setArithmeticStep(-1);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setArithmeticStep((s) => {
          if (s >= maxStep) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, maxStep]);

  const allWords = Object.entries(CLUSTERS).flatMap(([cluster, data]) =>
    data.words.map((w) => ({ ...w, cluster, color: data.color }))
  );

  return (
    <div className="embed-explorer">
      {/* Legend */}
      <div className="embed-explorer__legend">
        {Object.entries(CLUSTERS).map(([key, data]) => (
          <button
            key={key}
            className={`embed-explorer__legend-btn ${activeCluster === key ? 'active' : ''}`}
            style={{ '--cluster-color': data.color }}
            onClick={() => setActiveCluster(activeCluster === key ? null : key)}
          >
            <span className="embed-explorer__legend-dot" />
            {data.label}
          </button>
        ))}
      </div>

      {/* Scatter plot */}
      <div className="embed-explorer__plot">
        <div className="embed-explorer__axis-label embed-explorer__axis-x">Dimension 1</div>
        <div className="embed-explorer__axis-label embed-explorer__axis-y">Dimension 2</div>
        {allWords.map((w) => {
          const dimmed = activeCluster && activeCluster !== w.cluster;
          const isHovered = hoveredWord === w.word;
          return (
            <motion.div
              key={w.word}
              className={`embed-explorer__dot ${dimmed ? 'dimmed' : ''}`}
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                '--dot-color': w.color,
              }}
              animate={{
                opacity: dimmed ? 0.15 : 1,
                scale: isHovered ? 1.4 : 1,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredWord(w.word)}
              onMouseLeave={() => setHoveredWord(null)}
            >
              <span className="embed-explorer__dot-circle" />
              <span className="embed-explorer__dot-label">{w.word}</span>
              {isHovered && VECTORS[w.word] && (
                <div className="embed-explorer__tooltip">
                  [{VECTORS[w.word].join(', ')}]
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Arithmetic section */}
      <div className="embed-explorer__arithmetic">
        <div className="embed-explorer__arithmetic-header">
          <span>Vector Arithmetic</span>
          <div className="embed-explorer__arithmetic-controls">
            <button className="embed-explorer__arith-btn" onClick={resetArithmetic}>
              &#x27F2;
            </button>
            <button
              className="embed-explorer__arith-btn embed-explorer__arith-btn--play"
              onClick={playArithmetic}
              disabled={isPlaying}
            >
              {isPlaying ? '\u23F8' : '\u25B6'}
            </button>
          </div>
        </div>
        <div className="embed-explorer__arithmetic-steps">
          <AnimatePresence>
            {ARITHMETIC_STEPS.map((step, i) => (
              i <= arithmeticStep && (
                <motion.div
                  key={step.label}
                  className="embed-explorer__arith-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ '--step-color': step.color }}
                >
                  <span className="embed-explorer__arith-label">{step.label}</span>
                  <span className="embed-explorer__arith-vec">{step.vec}</span>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          {arithmeticStep < 0 && (
            <div className="embed-explorer__arith-empty">
              Press play to see: king - man + woman = ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
