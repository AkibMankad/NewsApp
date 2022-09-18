import "./App.css";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const pageSize = 6;
  const country = 'in';
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Navbar />
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<News key="home" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='general' />} />
            <Route exact path="/business" element={<News key="business" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='business' />} />
            <Route exact path="/general" element={<News key="general" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='general' />} />
            <Route exact path="/health" element={<News  key="health" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='health' />} />
            <Route exact path="/science" element={<News key="science" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='science' />} />
            <Route exact path="/sports" element={<News key="sports" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='sports' />} />
            <Route exact path="/technology" element={<News key="technology" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='technology' />} />
            <Route exact path="/entertainment" element={<News key="entertainment" progress={setProgress} apiKey={apiKey} pageSize={pageSize} country={country} category='entertainment' />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
