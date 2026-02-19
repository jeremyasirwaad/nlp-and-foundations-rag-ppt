import { motion } from 'framer-motion';
import RAGPipelineAnimation from '../interactive/RAGPipelineAnimation';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RAGDemo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        RAG Pipeline <span className="neon-text-emerald">In Action</span>
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: '1rem' }}>
        Step through each stage to see how a query flows through the RAG pipeline.
      </motion.p>
      <motion.div variants={fadeUp}>
        <RAGPipelineAnimation />
      </motion.div>
    </motion.div>
  );
}
