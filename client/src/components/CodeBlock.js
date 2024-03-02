import MonacoEditor from 'react-monaco-editor';
import { useDispatch, useSelector } from 'react-redux';

/**
 * CodeBlock: A Monaco Editor-based component for code editing and display.
 */

function CodeBlock({ language }) {
    const dispatch = useDispatch();
    const cwl = useSelector((state) => state.cwl_data);

    const options = {
        selectOnLineNumbers: true,
        minimap: { enabled: false }
    };

    const handleEditorChange = (newValue, e) => {
        dispatch({
            type: 'set', 
            value: { 
              data: newValue, 
            }
        });
    };

    return (
        <div className='monaco-editor'>
        <MonacoEditor
            height="calc(100vh - 61px)"
            language={language}
            theme="vs-dark"
            value={cwl.data}
            options={options}
            onChange={handleEditorChange}
        />        
        </div>

    );
}

export default CodeBlock;


