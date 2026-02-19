import { motion } from 'framer-motion';
import WordEmbeddingDemo from '../interactive/WordEmbeddingDemo';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function WordEmbeddings() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-violet">Word Embeddings</span>: Words as Numbers
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}>
        Embeddings convert words into dense vectors where <strong>similar meanings = similar numbers</strong>. Cosine similarity is computed live below.
      </motion.p>
      <motion.div variants={fadeUp}>
        <WordEmbeddingDemo />
      </motion.div>
    </motion.div>
  );
}
