import { motion } from 'framer-motion';
import CodeBlock from '../components/CodeBlock';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const models = [
  { name: 'OpenAI', model: 'text-embedding-3-large', dims: '3072', color: 'var(--accent-emerald)' },
  { name: 'Google', model: 'text-embedding-004', dims: '768', color: 'var(--accent-sky)' },
  { name: 'Jina AI', model: 'jina-embeddings-v3', dims: '1024', color: 'var(--accent-amber)' },
  { name: 'Cohere', model: 'embed-v4.0', dims: '1024', color: 'var(--accent-violet)' },
];

const codeSnippet = `from openai import OpenAI

client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-large",
    input="The quick brown fox jumps"
)

vector = response.data[0].embedding
print(f"Dimensions: {len(vector)}")  # 3072
print(f"First 5: {vector[:5]}")`;

export default function EmbeddingModels() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Popular <span className="neon-text-sky">Embedding Models</span>
      </motion.h2>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {models.map((m) => (
          <div
            key={m.name}
            style={{
              flex: '1 1 140px',
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '1rem',
              borderTop: `3px solid ${m.color}`,
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: m.color, fontSize: '1rem', marginBottom: '0.3rem' }}>{m.name}</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
              {m.model}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {m.dims} dims
            </p>
          </div>
        ))}
      </motion.div>
      <motion.div variants={fadeUp}>
        <CodeBlock code={codeSnippet} language="python" filename="embed.py" />
      </motion.div>
    </motion.div>
  );
}
