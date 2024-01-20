import './App.css';
import { useSelector } from 'react-redux';
import Content from './components/Content';
import Summary from './components/Summary';
import Actions from './components/Actions';
import Uploader from './components/Uploader';

function App() {
  const currentState = useSelector((state) => state.cwl_data);

  return (
    <div className='app'>
      {!currentState.isEmpty() ? (
        <>
          <Summary className="summary" />
          <Content className="content" />
          <Actions className="actions" />
        </>
      ) : (
        <div className='openfile'>
          <p>Cwl-gui</p>
          <Uploader className="filemanager" />
        </div>
      )}
    </div>
  );
}

export default App;
