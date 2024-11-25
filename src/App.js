import React from 'react';

function App() {
  const items = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Grilla de Películas</h1>
      <div className="grid grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item} className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
