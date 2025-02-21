import React, { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { DetailView } from './components/DetailView';
import { Github, Twitter } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/swelancer_tasks.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        if (jsonData.length > 0) {
          setSelectedRow(jsonData[0]);
        }
        setError(null);
      } catch (err) {
        setError('Error loading data: ' + err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">SWE-Lancer Browser</h1>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/gingerhendrix/swelancer-viz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  title="View Browser Source"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/gingerhendrixai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  title="Follow on X"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="text-gray-600">
              An interface for browsing the{' '}
              <a 
                href="https://openai.com/index/swe-lancer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                SWE-Lancer Benchmark
              </a>
              {' '}introduced by OpenAI. View the benchmark on{' '}
              <a 
                href="https://github.com/openai/SWELancer-Benchmark/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                GitHub
              </a>.
            </p>
          </div>
        </div>
      </div>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      )}
      
      {error && (
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        </div>
      )}
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-4 p-4 pt-0 min-h-0">
        <div className="bg-white rounded-lg shadow flex flex-col min-h-0">
          <DataTable 
            data={data} 
            onRowClick={setSelectedRow}
            selectedRow={selectedRow}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow flex flex-col min-h-0">
          {selectedRow ? (
            <DetailView data={selectedRow} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No task selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;