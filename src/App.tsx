import './css/App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from './pages/Home';
import { NotFoundPage } from './pages/Error';
import { MoveItemList } from './pages/MoveItemList';
import DragAndDropList from './pages/DragAndDropList';

function App() {
  return (
    <div className="App">
      <Router basename="/Homework-02-Component-Add-Remove">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moveItemList" element={<MoveItemList />} />
          <Route path="/dragAndDropList" element={<DragAndDropList />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
