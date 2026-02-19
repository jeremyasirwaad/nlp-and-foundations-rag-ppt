import { Highlight, themes } from 'prism-react-renderer';
import './CodeBlock.css';

const emeraldTheme = {
  ...themes.nightOwl,
  plain: {
    ...themes.nightOwl.plain,
    backgroundColor: 'transparent',
  },
  styles: [
    ...themes.nightOwl.styles,
    { types: ['keyword'], style: { color: '#a78bfa' } },
    { types: ['string', 'template-string'], style: { color: '#10b981' } },
    { types: ['function'], style: { color: '#38bdf8' } },
    { types: ['comment'], style: { color: '#6a8a85', fontStyle: 'italic' } },
    { types: ['number', 'boolean'], style: { color: '#f59e0b' } },
    { types: ['operator', 'punctuation'], style: { color: '#9db8b5' } },
    { types: ['class-name', 'builtin'], style: { color: '#f43f5e' } },
    { types: ['parameter'], style: { color: '#e8f0ef' } },
  ],
};

export default function CodeBlock({ code, language = 'python', filename }) {
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        {filename && <span className="code-block-filename">{filename}</span>}
      </div>
      <Highlight theme={emeraldTheme} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
