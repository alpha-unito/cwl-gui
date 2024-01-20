import MonacoEditor from 'react-monaco-editor';

/**
 * CodeBlock: A Monaco Editor-based component for code editing and display.
 */

function CodeBlock({ code, language }) {
  const options = {
      selectOnLineNumbers: true,
      minimap: { enabled: false }
  };

  function onChange(newValue, e) {
      console.log('onChange', newValue, e);
  }

  return (
      <MonacoEditor
          height="400"
          language={language}
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
      />
  );
}

export default CodeBlock;


