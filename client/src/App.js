import './App.css';
import { useSelector } from 'react-redux';
import Content from './components/Content';
import Summary from './components/Summary';
import Actions from './components/Actions';
import Uploader from './components/Uploader';
import Toolbar from './components/Toolbar';
import {isStateEmpty} from './models/State';
import Exception from './components/Exception';

function App() {
  const cwl = useSelector((state) => state.cwl_data);

  return (
    <div className='app'>
      {!isStateEmpty(cwl) ? (
        <>
          <Toolbar className="toolbar" />
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
      {cwl.errorEnabled && <Exception content={cwl.errorEnabled} className="exception" title="CWL Exception"/>}
    </div>
  );
}

export default App;
