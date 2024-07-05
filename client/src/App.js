import { Route , Routes } from 'react-router-dom';
import './App.css';
import { LandingPage } from './views/LandingPage';
import { ChatsView } from './views/ChatsView';


function App() {
  return (
    <div className="App">
    <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/chats' element={<ChatsView />} />
    </Routes>
    </div>
  );
}

export default App;
