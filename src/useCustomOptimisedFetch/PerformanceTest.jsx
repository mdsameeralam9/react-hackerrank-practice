import React, { useState, useRef, useEffect } from "react";
import useFetch from "./useFetch";

// Non-optimized version (before)
const useFetchNonOptimized = (url) => {
  const renderCount = useRef(0);
  renderCount.current++;
  console.count("useFetchNonOptimized rendered");
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // Missing fetchData dependency - causes warning + infinite renders

  return { loading, data, error, renderCount: renderCount.current };
};

// Component using optimized hook
const OptimizedComponent = () => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  const { loading, data, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  return (
    <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
      <h3>✅ OPTIMIZED (with useCallback + useMemo)</h3>
      <p><strong>Component Renders:</strong> {renderCount.current}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Posts loaded: {data.length}</p>}
    </div>
  );
};

// Component using non-optimized hook
const NonOptimizedComponent = () => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  const { loading, data, error, renderCount: hookRenders } = useFetchNonOptimized(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  return (
    <div style={{ border: "2px solid red", padding: "10px", margin: "10px" }}>
      <h3>❌ NON-OPTIMIZED (before optimization)</h3>
      <p><strong>Component Renders:</strong> {renderCount.current}</p>
      <p><strong>Hook Renders:</strong> {hookRenders}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Posts loaded: {data.length}</p>}
    </div>
  );
};

// Main test component
const PerformanceTest = () => {
  const [testStarted, setTestStarted] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🔍 Optimization Comparison Test</h1>
      
      <div style={{ 
        backgroundColor: "#f0f0f0", 
        padding: "15px", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3>How to Check Optimization:</h3>
        <ol>
          <li>Open <strong>Browser DevTools (F12)</strong></li>
          <li>Go to <strong>Console tab</strong></li>
          <li>Look at console logs:
            <ul>
              <li>✅ Optimized: Should see "useFetch rendered: 2" or "3"</li>
              <li>❌ Non-Optimized: Will show much higher count (due to missing dependency)</li>
            </ul>
          </li>
          <li>Watch the <strong>render counts</strong> below as data loads</li>
          <li>Check <strong>Network tab</strong> to see API calls</li>
        </ol>
      </div>

      <button 
        onClick={() => setTestStarted(!testStarted)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {testStarted ? "Stop Test" : "Start Performance Test"}
      </button>

      {testStarted && (
        <div>
          <OptimizedComponent />
          <NonOptimizedComponent />
          
          <div style={{ 
            backgroundColor: "#fff3cd", 
            padding: "15px", 
            borderRadius: "8px",
            marginTop: "20px"
          }}>
            <h3>📊 Key Differences:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Feature</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Optimized ✅</th>
                  <th style={{ border: "1px solid #ddd", padding: "10px" }}>Non-Optimized ❌</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>useCallback</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>✅ Yes</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>❌ No</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>useMemo</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>✅ Yes</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>❌ No</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>Dependencies Correct</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>✅ Yes</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>❌ Missing fetchData</td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>Re-render Count</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>✅ Lower (2-3)</td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>❌ Higher (many)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTest;
