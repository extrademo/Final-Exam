import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';

  // Project :- Final Exam
    
function App() {


    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index path='/' element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
