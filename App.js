

import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import SavedNews from './components/SavedNews';
import LikedNews from './components/LikedNews';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [progress, setProgress] = useState(0);

  return (
    <>
      <NavBar />

      <LoadingBar
        color="#0d6efd"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Routes>

        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              key="general"
              category="general"
            />
          }
        />

        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              key="business"
              category="business"
            />
          }
        />

        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              key="entertainment"
              category="entertainment"
            />
          }
        />

        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              key="health"
              category="health"
            />
          }
        />

        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              key="science"
              category="science"
            />
          }
        />

        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              key="sports"
              category="sports"
            />
          }
        />

        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              key="technology"
              category="technology"
            />
          }
        />

        <Route
          path="/saved"
          element={<SavedNews />}
        />

        <Route
          path="/liked"
          element={<LikedNews />}
        />

      </Routes>
    </>
  );
}

export default App;