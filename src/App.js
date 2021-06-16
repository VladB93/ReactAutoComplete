import './App.css';
import { AutoComplete } from './AutoComplete/AutoComplete';
import { AutoCompleteHooks } from './AutoComplete/AutoCompleteHooks'

function App() {
  return (
   <>
   <div className="app">
      <div>
        <p>Auto complete with classes</p>
        <AutoComplete/>
      </div>
      <div>
        <p>Auto complete with hooks</p>
        <AutoCompleteHooks />
      </div>
    </div>
   </>
  );
}

export default App;

