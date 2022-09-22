import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'My Page Title';
  });
  return (
    <div className="App">
      <header className="App-header">
        React
      </header>
    </div>
  );
}

export default App;
