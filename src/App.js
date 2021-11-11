import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
