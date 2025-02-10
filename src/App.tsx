import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import AdminPage from './AdminPage';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>  
         
          <Routes>
          <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<LoginForm />} />
           
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
