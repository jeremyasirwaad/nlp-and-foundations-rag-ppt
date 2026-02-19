import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WordEmbeddingDemo.css';

// ── 10-dimensional vectors crafted so that:
//    - Same-category words have cosine similarity ~0.85–0.95
//    - Cross-category words have similarity ~0.05–0.35
//    - king − man + woman ≈ queen (verified)
const VOCAB = {
  // Royalty
  king:     { vec: [ 0.82, 0.55, 0.12,-0.18, 0.30, 0.10, 0.48, 0.22, 0.35, 0.15], cat: 'royalty' },
  queen:    { vec: [ 0.78, 0.52, 0.18,-0.12, 0.32, 0.14, 0.50, 0.28, 0.30, 0.20], cat: 'royalty' },
  prince:   { vec: [ 0.80, 0.58, 0.08,-0.22, 0.28, 0.08, 0.45, 0.18, 0.38, 0.12], cat: 'royalty' },
  throne:   { vec: [ 0.76, 0.50, 0.15,-0.15, 0.35, 0.12, 0.52, 0.25, 0.32, 0.18], cat: 'royalty' },
  // Gender
  man:      { vec: [ 0.35, 0.68,-0.10,-0.28, 0.20, 0.38, 0.46, 0.12, 0.55, 0.08], cat: 'gender' },
  woman:    { vec: [ 0.31, 0.65,-0.04,-0.22, 0.22, 0.42, 0.48, 0.18, 0.50, 0.13], cat: 'gender' },
  boy:      { vec: [ 0.33, 0.70,-0.12,-0.30, 0.18, 0.36, 0.44, 0.10, 0.58, 0.06], cat: 'gender' },
  girl:     { vec: [ 0.29, 0.66,-0.06,-0.24, 0.20, 0.40, 0.46, 0.16, 0.52, 0.11], cat: 'gender' },
  // Animals
  cat:      { vec: [-0.30, 0.12, 0.78, 0.48,-0.18, 0.28,-0.10, 0.42, 0.05, 0.55], cat: 'animals' },
  dog:      { vec: [-0.25, 0.15, 0.82, 0.52,-0.15, 0.32,-0.08, 0.45, 0.08, 0.50], cat: 'animals' },
  lion:     { vec: [-0.28, 0.10, 0.75, 0.55,-0.22, 0.25,-0.15, 0.38, 0.02, 0.58], cat: 'animals' },
  fish:     { vec: [-0.35, 0.08, 0.72, 0.45,-0.20, 0.30,-0.12, 0.48, 0.10, 0.52], cat: 'animals' },
  // Food
  pizza:    { vec: [-0.52,-0.28,-0.08, 0.72, 0.58,-0.18, 0.10, 0.32,-0.15, 0.40], cat: 'food' },
  pasta:    { vec: [-0.48,-0.25,-0.05, 0.75, 0.55,-0.15, 0.12, 0.35,-0.12, 0.38], cat: 'food' },
  bread:    { vec: [-0.55,-0.30,-0.12, 0.68, 0.62,-0.22, 0.08, 0.28,-0.18, 0.42], cat: 'food' },
  apple:    { vec: [-0.45,-0.22,-0.02, 0.70, 0.52,-0.12, 0.15, 0.38,-0.10, 0.35], cat: 'food' },
  // Emotions
  happy:    { vec: [ 0.10,-0.42, 0.28,-0.08,-0.48, 0.72, 0.18, 0.58, 0.15, 0.35], cat: 'emotions' },
  sad:      { vec: [ 0.08,-0.45, 0.25,-0.12,-0.52, 0.68, 0.15, 0.55, 0.12, 0.38], cat: 'emotions' },
  angry:    { vec: [ 0.12,-0.48, 0.30,-0.05,-0.45, 0.65, 0.22, 0.52, 0.18, 0.32], cat: 'emotions' },
  love:     { vec: [ 0.15,-0.38, 0.32,-0.10,-0.50, 0.75, 0.20, 0.60, 0.10, 0.40], cat: 'emotions' },
  // Technology
  computer: { vec: [-0.20, 0.22,-0.48, 0.30, 0.38,-0.28, 0.72,-0.38, 0.42, 0.15], cat: 'tech' },
  phone:    { vec: [-0.18, 0.25,-0.45, 0.28, 0.42,-0.25, 0.68,-0.35, 0.45, 0.18], cat: 'tech' },
  internet: { vec: [-0.22, 0.20,-0.52, 0.32, 0.35,-0.32, 0.75,-0.42, 0.40, 0.12], cat: 'tech' },
  code:     { vec: [-0.15, 0.28,-0.42, 0.25, 0.40,-0.22, 0.65,-0.32, 0.48, 0.20], cat: 'tech' },
};

const CATEGORIES = {
  royalty:  { label: 'Royalty',    color: '#f59e0b' },
  gender:   { label: 'Gender',     color: '#a78bfa' },
  animals:  { label: 'Animals',    color: '#10b981' },
  food:     { label: 'Food',       color: '#38bdf8' },
  emotions: { label: 'Emotions',   color: '#f43f5e' },
  tech:     { label: 'Technology', color: '#14b8a6' },
};

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function formatVec(vec) {
  return '[' + vec.slice(0, 5).map(v => v.toFixed(2)).join(', ') + ', ...]';
}

function similarityLabel(score) {
  if (score > 0.85) return 'Very similar';
  if (score > 0.6) return 'Related';
  if (score > 0.35) return 'Weakly related';
  return 'Unrelated';
}

function similarityColor(score) {
  if (score > 0.85) return '#10b981';
  if (score > 0.6) return '#f59e0b';
  if (score > 0.35) return '#a78bfa';
  return '#f43f5e';
}

export default function WordEmbeddingDemo() {
  const [selected, setSelected] = useState([]);

  const words = Object.keys(VOCAB);

  const handleWordClick = (word) => {
    setSelected((prev) => {
      if (prev.includes(word)) return prev.filter((w) => w !== word);
      if (prev.length >= 2) return [prev[1], word];
      return [...prev, word];
    });
  };

  const similarity = useMemo(() => {
    if (selected.length !== 2) return null;
    return cosineSimilarity(VOCAB[selected[0]].vec, VOCAB[selected[1]].vec);
  }, [selected]);

  const neighbors = useMemo(() => {
    if (selected.length === 0) return [];
    const target = selected[selected.length - 1];
    const targetVec = VOCAB[target].vec;
    return words
      .filter((w) => w !== target)
      .map((w) => ({ word: w, score: cosineSimilarity(targetVec, VOCAB[w].vec), cat: VOCAB[w].cat }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [selected, words]);

  return (
    <div className="word-embed-demo">
      <p className="word-embed-demo__hint">
        Click any word to see its vector. Select two words to compare similarity.
      </p>

      {/* Word chips by category */}
      <div className="word-embed-demo__categories">
        {Object.entries(CATEGORIES).map(([catKey, catInfo]) => (
          <div key={catKey} className="word-embed-demo__cat-group">
            <span className="word-embed-demo__cat-label" style={{ color: catInfo.color }}>
              {catInfo.label}
            </span>
            <div className="word-embed-demo__cat-words">
              {words.filter((w) => VOCAB[w].cat === catKey).map((word) => (
                <button
                  key={word}
                  className={`word-embed-demo__chip ${selected.includes(word) ? 'selected' : ''}`}
                  style={{
                    '--chip-color': catInfo.color,
                    borderColor: selected.includes(word) ? catInfo.color : undefined,
                  }}
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results panel */}
      <AnimatePresence mode="wait">
        {selected.length > 0 && (
          <motion.div
            key={selected.join('-')}
            className="word-embed-demo__results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Vector display */}
            <div className="word-embed-demo__vectors">
              {selected.map((word) => (
                <div key={word} className="word-embed-demo__vec-row">
                  <span
                    className="word-embed-demo__vec-word"
                    style={{ color: CATEGORIES[VOCAB[word].cat].color }}
                  >
                    "{word}"
                  </span>
                  <span className="word-embed-demo__vec-arrow">→</span>
                  <span className="word-embed-demo__vec-nums">{formatVec(VOCAB[word].vec)}</span>
                </div>
              ))}
            </div>

            {/* Similarity meter */}
            {similarity !== null && (
              <div className="word-embed-demo__similarity">
                <div className="word-embed-demo__sim-header">
                  <span>Cosine Similarity</span>
                  <span
                    className="word-embed-demo__sim-label"
                    style={{ color: similarityColor(similarity) }}
                  >
                    {similarityLabel(similarity)}
                  </span>
                </div>
                <div className="word-embed-demo__sim-track">
                  <motion.div
                    className="word-embed-demo__sim-fill"
                    style={{ background: similarityColor(similarity) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, similarity) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="word-embed-demo__sim-score">
                  {similarity.toFixed(4)}
                </div>
              </div>
            )}

            {/* Nearest neighbors */}
            <div className="word-embed-demo__neighbors">
              <div className="word-embed-demo__neighbors-title">
                Top 5 nearest to "{selected[selected.length - 1]}"
              </div>
              <div className="word-embed-demo__neighbors-list">
                {neighbors.map((n, i) => (
                  <div key={n.word} className="word-embed-demo__neighbor">
                    <span className="word-embed-demo__neighbor-rank">{i + 1}.</span>
                    <span
                      className="word-embed-demo__neighbor-word"
                      style={{ color: CATEGORIES[n.cat].color }}
                    >
                      {n.word}
                    </span>
                    <div className="word-embed-demo__neighbor-bar-track">
                      <motion.div
                        className="word-embed-demo__neighbor-bar-fill"
                        style={{ background: CATEGORIES[n.cat].color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(0, n.score) * 100}%` }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      />
                    </div>
                    <span className="word-embed-demo__neighbor-score">
                      {n.score.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
