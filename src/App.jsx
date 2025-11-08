import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import { useEffect } from 'react';
import './App.css'
import useUiStore from './store/uiStore';

function App() {
  const theme = useUiStore((state) => state.theme);

  // This is the part that controls the whole page
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
