import './App.css';
import ProductNavigationBar from './components/ProductNavigationBar';

import LibraryBooking from './components/LibraryComp/LibraryBooking';
import ProfilePage from './pages/Profile';
import { createContext } from 'react';
export const UserContext = createContext(' ');
function App() {
  return (
    <div className="App">
      <ProfilePage></ProfilePage>
    </div>
  );
}

export default App;
