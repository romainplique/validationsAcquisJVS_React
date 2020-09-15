import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';

const App = () => (
    <BrowserRouter>
        <MainPage />
    </BrowserRouter>
);

export default App;
