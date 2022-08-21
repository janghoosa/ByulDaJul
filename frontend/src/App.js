import { Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
