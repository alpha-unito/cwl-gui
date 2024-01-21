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

    function onChange(newValue, e) {
        dispatch({ type: 'set', value: { name: cwl.name, content: newValue } });
    }

    return (
        <div className='monaco-editor'>
        <MonacoEditor
            height="500"
            language={language}
            theme="vs-dark"
            value={cwl.data}
            options={options}
            onChange={onChange}
        />        
        </div>

    );
}

export default CodeBlock;


