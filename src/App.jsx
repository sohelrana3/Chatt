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


// createRouter
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>

            {/* RootLayouts Path */}
            <Route path="/Root" element={<RootLayouts />}>
              <Route index element={<Home />}></Route>
              <Route path="chatt" element={<Chat />}></Route>
              <Route path="Friend" element={<Friend />}></Route>
              <Route path="Group" element={<Group />}></Route>
              <Route path="People" element={<People />}></Route>
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
