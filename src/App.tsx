import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';

import Navbar from '@/components/Navbar';

import HomePage from './pages/Homepage';
import TrainingPage from './pages/TrainingPage';
import TestingPage from './pages/TestingPage';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="crop-prediction-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/testing" element={<TestingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;