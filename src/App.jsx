import { useState } from "react";
// react router dom
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

// import Pages
import Login from './pages/Login';
import Registration  from './pages/Registration'
import RootLayouts from "./components/RootLayouts";
import Home from './pages/Home'
import Chat from './pages/Chat'
import Friend from './pages/Friends'
import Group from './pages/Group'
import People from './pages/People'
import ForgotPassword from './pages/ForgotPassword'


// router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Registration" element={<Registration />}></Route>
            <Route path="chatt">
              
            </Route>
        </Route>
    )
);
function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
