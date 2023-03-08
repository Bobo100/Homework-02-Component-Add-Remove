import './css/App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from './pages/Home';
import { NotFoundPage } from './pages/Error';
import AdvTest from './pages/AdvTest';

function App() {
  return (
    <div className="App">
      <Router basename="/Homework-02-Component-Add-Remove">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adv" element={<AdvTest />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
