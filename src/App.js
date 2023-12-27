import TextEditor from './components/TextEditor';
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Rendering the text editor component */}
      <h1 className="app-title"> Text Editor</h1>
      <TextEditor />
    </div>
  );
}

export default App;
