import { useSelector } from 'react-redux';
import CodeBlock from './CodeBlock';

/**
 * Summary: A component that displays a summary of the CWL data.
 * 
 * It retrieves CWL data from the Redux store and uses the CodeBlock component to display the data.
 */
function Summary({ className }) {
  const cwl = useSelector((state) => state.cwl_data);

  return (
    <div className={className}>
      <p className='name'>{cwl.name}</p>
      <div className='editor'>
        <CodeBlock code={cwl.data} language="yaml" />
      </div>
    </div>
  );
}
  
export default Summary;