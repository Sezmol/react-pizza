import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
