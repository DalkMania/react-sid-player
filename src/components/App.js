import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalState";
import WebFont from "webfontloader";
import ImportScript from "../hooks/importScript";

import SiteHeader from "./SiteHeader";
import SidList from "./SidList";
import About from "./About";
import Player from "./Player";
import SiteFooter from "./SiteFooter";
import NotFound from "./NotFound";

import "../assets/css/app.css";

WebFont.load({
    google: {
        families: ["Lato:300", "sans-serif"]
    }
});

const App = () => {
    ImportScript(process.env.PUBLIC_URL + "/assets/js/libs/jsSID.js");

    return (
        <GlobalProvider>
            <Router basename={process.env.PUBLIC_URL}>
                <SiteHeader />
                <main className="site-content">
                    <Routes>
                        <Route path="/" element={<SidList />} />
                        <Route exact path="/player/:id" element={<Player />} />
                        <Route exact path="/about" element={<About />} />
                        <Route element={<NotFound />} />
                    </Routes>
                </main>
                <SiteFooter />
            </Router>
        </GlobalProvider>
    );
};

export default App;
