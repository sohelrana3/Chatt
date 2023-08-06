import React from "react";
import { Outlet } from "react-router-dom";

const RootLayouts = () => {
    return (
        <>
            <div>RootLayouts</div>
            <div><Outlet /></div>
        </>
    );
};

export default RootLayouts;
