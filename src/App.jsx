import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from './components/DataTable';
import { DetailView } from './components/DetailView';

function App() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const workbook = XLSX.read(e.target.result, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
            setError(null);
          } catch (err) {
            setError('Error parsing XLSX file: ' + err.message);
          }
        };
        reader.onerror = () => {
          setError('Error reading file');
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        setError('Error processing file: ' + err.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">SWELancer Benchmark Visualization</h1>
      
      <div className="mb-6">
        <label 
          htmlFor="xlsx-upload" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Benchmark XLSX
        </label>
        <input
          type="file"
          id="xlsx-upload"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
      
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