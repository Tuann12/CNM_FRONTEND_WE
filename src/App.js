import { Routes, Route } from 'react-router-dom';
import Login from './Screen/Login/Login';
import Register from './Screen/Register/Register';
import ForgotPass from './Screen/ForgotPass/Forgotpass';
import Home from './Screen/Home/Home';

function App() {
    return (
        <div>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPass" element={<ForgotPass />} />
                {/* <Route index element={<Home />} /> */}
            </Routes>
        </div>
    );
}

export default App;
