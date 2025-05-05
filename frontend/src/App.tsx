import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Pages
import HomePage from './pages/HomePage';
import DeckGeneratorPage from './pages/DeckGeneratorPage';
import EditorPage from './pages/EditorPage';
import ViewerPage from './pages/ViewerPage';
import AuthPage from './pages/AuthPage';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<DeckGeneratorPage />} />
          <Route path="/editor/:deckId" element={<EditorPage />} />
          <Route path="/view/:deckId" element={<ViewerPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;