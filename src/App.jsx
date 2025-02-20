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
    <div className="container mx-auto p-4">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Benchmark Entries</h2>
          <DataTable 
            data={data} 
            onRowClick={setSelectedRow}
            selectedRow={selectedRow}
          />
        </div>
        
        {selectedRow && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Detail View</h2>
            <DetailView data={selectedRow} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;