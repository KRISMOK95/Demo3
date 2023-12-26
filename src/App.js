import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ContextProvider } from './hooks/useStateContext'; // Import ContextProvider
import Authenticate from './components/Authenticate';
import Layout from './components/Layout';
import Login from './components/login';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Authenticate />}>
            <Route path="/" element={<Layout />}>
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter >
  );
}

export default App;
