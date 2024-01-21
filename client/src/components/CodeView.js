import React, { useEffect } from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-yaml";


/**
 * CodeView: A Prism.js component for view code.
 */
const CodeView = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default CodeView;



