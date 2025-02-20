import React, { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { DetailView } from './components/DetailView';

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
        // Select the first item by default
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
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">SWELancer Benchmark Visualization</h1>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-4 p-4 pt-0 min-h-0">
        <div className="bg-white rounded-lg shadow flex flex-col min-h-0">
          <h2 className="text-xl font-semibold p-4 border-b">Tasks</h2>
          <div className="flex-1 overflow-auto">
            <DataTable 
              data={data} 
              onRowClick={setSelectedRow}
              selectedRow={selectedRow}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow flex flex-col min-h-0">
          <h2 className="text-xl font-semibold p-4 border-b">Detail View</h2>
          <div className="flex-1 overflow-auto p-4">
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
    </div>
  );
}

export default App;