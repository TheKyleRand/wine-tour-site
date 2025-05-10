// Vite + React JSX site scaffold for your CT Wine Tour presentation

import { useState } from 'react';

const App = () => {
  const [page, setPage] = useState('locations');

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <header className="p-6 text-center border-b border-gray-200">
        <h1 className="text-3xl font-bold">Connecticut Wine Tour</h1>
        <p className="text-md text-gray-600">A scenic day planned for us, Mom 🍷</p>
      </header>

      <main className="flex-1 p-6">
        {page === 'locations' && <Locations />}
        {page === 'schedule' && <Schedule />}
        {page === 'route' && <Route />}
      </main>

      <footer className="p-4 border-t border-gray-200 flex justify-around text-sm bg-gray-50">
        <button onClick={() => setPage('locations')} className="hover:underline">Wineries</button>
        <button onClick={() => setPage('schedule')} className="hover:underline">Schedule Info</button>
        <button onClick={() => setPage('route')} className="hover:underline">Route</button>
      </footer>
    </div>
  );
};

const Locations = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Planned Wineries</h2>
    <ol className="list-decimal pl-5 space-y-3">
      <li><strong>Hawk Ridge Winery</strong> – Lunch & vineyard views in Watertown</li>
      <li><strong>Sunset Meadow Vineyards</strong> – Rolling hilltop vistas in Goshen</li>
      <li><strong>Hopkins Vineyard</strong> – Lake Waramaug scenery in Warren</li>
      <li><strong>White Silo Farm & Winery</strong> – Boutique farm wines in Sherman</li>
      <li><strong>Aquila’s Nest Vineyards</strong> – Sunset hilltop retreat in Newtown</li>
    </ol>
  </div>
);

const Schedule = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Schedule & Date Info</h2>
    <p className="mb-2">We’ll avoid the crowds on Mother's Day. Here are available weekends coming up:</p>
    <ul className="list-disc pl-5">
      <li>May 18–19 (Warm & Sunny!)</li>
      <li>May 25–26 (Memorial Day weekend – may be slightly busy)</li>
      <li>June 1–2 (Ideal scenic weather)</li>
      <li>June 8–9 (All wineries open, longer hours)</li>
    </ul>
  </div>
);

const Route = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Driving Route</h2>
    <p className="mb-2">Our tour begins and ends in Woodbury, CT.</p>
    <ol className="list-decimal pl-5 space-y-2">
      <li>Start: Woodbury → Hawk Ridge Winery (Watertown)</li>
      <li>To: Sunset Meadow (Goshen)</li>
      <li>To: Hopkins Vineyard (Warren)</li>
      <li>To: White Silo (Sherman)</li>
      <li>To: Aquila’s Nest (Newtown)</li>
      <li>Return to Woodbury</li>
    </ol>
    <p className="mt-2 text-sm text-gray-500">Estimated total drive time: 3 hours (spread out).</p>
  </div>
);

export default App;
