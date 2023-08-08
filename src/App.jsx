import { useState } from "react";
// react router dom
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

// import Pages
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RootLayouts from "./components/RootLayouts";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Friend from "./pages/Friends";
import Group from "./pages/Group";
import People from "./pages/People";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// createRouter
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>

            {/* RootLayouts Path */}
            <Route path="/chatt" element={<RootLayouts />}>
                <Route path="home" element={<Home />}></Route>
                <Route path="message" element={<Chat />}></Route>
                <Route path="friend" element={<Friend />}></Route>
                <Route path="group" element={<Group />}></Route>
                <Route path="people" element={<People />}></Route>
            </Route>
        </Route>
    )
);

function App() {
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <RouterProvider router={router} />
        </>
    );
}

export default App;
