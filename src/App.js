import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Redirect from './components/Redirect';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
