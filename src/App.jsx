// Vite + React JSX site scaffold for your CT Wine Tour presentation

import { useState, useRef, useEffect } from 'react';
import './App.css';

// Import images
import hawkRidgeImg from './assets/images/hawk_ridge.jpg';
import sunsetMeadowImg from './assets/images/sunset_meadow.jpeg';
import hopkinsImg from './assets/images/hopkins_vineyard.jpeg';
import whiteSiloImg from './assets/images/white_silo.jpeg';
import aquilasNestImg from './assets/images/aquila_nest.jpeg';

const navItems = [
  {
    key: 'locations',
    label: 'Wineries',
  },
  {
    key: 'schedule',
    label: 'Schedule',
  },
  {
    key: 'route',
    label: 'Route',
  },
];

const App = () => {
  const [page, setPage] = useState('locations');
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    // Start fade out after 2.2s, then remove splash after fade duration
    const fadeTimer = setTimeout(() => setFadeSplash(true), 2200);
    const removeTimer = setTimeout(() => setShowSplash(false), 3000); // 0.8s fade
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      {/* Splash Screen */}
      {showSplash && (
        <div className={`splash-screen${fadeSplash ? ' splash-fadeout' : ''}`}>
          <div className="splash-content">
            <h1 className="splash-title text-4xl md:text-5xl font-extrabold mb-4 text-purple-800 drop-shadow">
              Happy Mother's Day!
            </h1>
            <p className="splash-subtitle text-xl md:text-2xl text-gray-700 font-medium">
              Here's a day of wine tasting planned for us!
            </p>
          </div>
        </div>
      )}

      {/* Main App Content */}
      <main className="flex flex-1 min-h-0">
        {page === 'locations' && <Locations />}
        {page === 'schedule' && <Schedule />}
        {page === 'route' && <Route />}
      </main>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white shadow z-50 fixed-bottom-nav">
        <div className="flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`menuitems flex-1 py-4 text-base md:text-lg transition-colors ${
                page === item.key
                  ? 'text-purple-700 font-bold bg-purple-50'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-current={page === item.key ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Winery data with images
const WINERIES = [
  {
    name: "Hawk Ridge Winery",
    summary: "Lunch & vineyard views in Watertown",
    details: [
      "Hawk Ridge sits on a 58-acre farm perched on a ridge, offering sweeping views of the Litchfield Hills and a tranquil pond.",
      "This is our perfect first stop, with a full kitchen offering cheese boards, paninis, and even dessert flights.",
      "It's a welcoming atmosphere with casual outdoor seating and live music on the weekends.",
      "Address: 28 Plungis Rd, Watertown, CT 06795",
      "Hours: Mon–Thu 12–6 PM, Fri–Sat 12–8 PM, Sun 12–6 PM; no reservations needed for small groups."
    ],
    image: hawkRidgeImg,
  },
  {
    name: "Sunset Meadow Vineyards",
    summary: "Rolling hilltop vistas in Goshen",
    details: [
      "Nestled in the Litchfield Hills, this 160-acre farm vineyard features west-facing views perfect for enjoying the late afternoon sun.",
      "Tastings happen inside a cozy 1890s barn, with expansive views and a peaceful, countryside feel.",
      "This winery feels like a countryside escape—with vines rolling over hills and occasional views of nearby mountains.",
      "Address: 599 Old Middle St (Rte. 63), Goshen, CT 06756",
      "Hours: Thu–Fri 11 AM–5 PM, Sat 11 AM–6 PM, Sun 11 AM–5 PM; closed Tues/Wed; walk-ins welcome."
    ],
    image: sunsetMeadowImg,
  },
  {
    name: "Hopkins Vineyard",
    summary: "Lake Waramaug scenery in Warren",
    details: [
      "High above the glistening waters of Lake Waramaug, Hopkins Vineyard is one of the most picturesque stops on our tour.",
      "We can sit in their second-floor Hayloft Wine Bar and sip wine while overlooking the lake and surrounding hills.",
      "This family-run winery dates back to 1787 and has both charm and history to spare.",
      "Address: 25 Hopkins Rd, New Preston, CT 06777",
      "Hours: Mon–Fri 11 AM–5 PM, Sat 11 AM–7 PM, Sun 11 AM–6 PM; no reservations required for groups under 10."
    ],
    image: hopkinsImg,
  },
  {
    name: "White Silo Farm & Winery",
    summary: "Boutique farm wines in Sherman",
    details: [
      "This small family-run winery is built into a former dairy barn surrounded by fields and gardens.",
      "It's known for its unique fruit wines—especially raspberry, blackberry, and rhubarb—all made from estate-grown produce.",
      "We'll be able to enjoy light lunches and baked goods, all prepared on-site by a chef.",
      "Address: 32 Route 37 East, Sherman, CT 06784",
      "Hours: Fri–Sun 11 AM–6 PM; reservations not required."
    ],
    image: whiteSiloImg,
  },
  {
    name: "Aquila's Nest Vineyards",
    summary: "Sunset hilltop retreat in Newtown",
    details: [
      "Our final stop is the most modern, set atop a hill with clean architecture and an emphasis on experience.",
      "The view here stretches out across tree-covered ridges, and the sunset here is breathtaking.",
      "They often host events and art installations, and food trucks provide a casual dinner option.",
      "Address: 56 Pole Bridge Rd, Newtown, CT 06482",
      "Hours: Wed 6–9 PM, Thu 4–9 PM, Fri 1–9 PM, Sat–Sun 11:30 AM–9 PM; reservations strongly recommended."
    ],
    image: aquilasNestImg,
  },
];

function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStartX = useRef(null);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) onSwipeRight();
    if (deltaX < -50) onSwipeLeft();
    touchStartX.current = null;
  }
  return { onTouchStart, onTouchEnd };
}

const Locations = () => {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState('img-pan-right img-zoom-in');

  useEffect(() => {
    const panAnims = ['img-pan-right', 'img-pan-left', 'img-pan-down', 'img-pan-up'];
    const zoomAnims = ['img-zoom-in', 'img-zoom-out'];
    const pan = panAnims[Math.floor(Math.random() * panAnims.length)];
    const zoom = zoomAnims[Math.floor(Math.random() * zoomAnims.length)];
    setAnimClass(`${pan} ${zoom}`);
  }, [index]);

  const goPrev = () => setIndex(i => (i === 0 ? WINERIES.length - 1 : i - 1));
  const goNext = () => setIndex(i => (i === WINERIES.length - 1 ? 0 : i + 1));

  const swipeHandlers = useSwipe(goNext, goPrev);

  const winery = WINERIES[index];

  return (
    <div className="relative flex-1 min-h-0 flex flex-col justify-end overflow-hidden">
      {/* Background image as <img> */}
      <img
        src={winery.image}
        alt=""
        className={`bg-winery-img ${animClass}`}
        aria-hidden="true"
        draggable={false}
      />
      {/* Content overlay */}
      <div
        className="relative"
        style={{ zIndex: 10 }}
        {...swipeHandlers}
      >
        <div className="winery-card-overlay flex flex-col h-full justify-end">
          <div className="winery-header">{winery.name}</div>
          <div className="winery-summary">{winery.summary}</div>
          <hr className="winery-divider" />
          <div className="winery-details">
            {winery.details.map((line, idx) => <p key={idx}>{line}</p>)}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={goPrev}
              className="px-4 py-2 rounded bg-gray-900 bg-opacity-60 text-white hover:bg-opacity-80"
              aria-label="Previous winery"
            >
              ←
            </button>
            <span className="text-xs text-gray-500">
              {index + 1} / {WINERIES.length}
            </span>
            <button
              onClick={goNext}
              className="px-4 py-2 rounded bg-gray-900 bg-opacity-60 text-white hover:bg-opacity-80"
              aria-label="Next winery"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedule = () => (
  <div>
    <h2 className="text-lg md:text-xl font-semibold mb-3">Schedule & Availability Info</h2>
    <p className="mb-3">All wineries are open on weekends and some have weekday hours. Here are some things to keep in mind when picking a date:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Weekdays:</strong> Most wineries are closed on Tuesdays and/or Wednesdays. Very few open before 12 PM.</li>
      <li><strong>Weekends:</strong> All wineries are open Saturday and Sunday, usually starting around 11 AM and closing by 6–9 PM.</li>
      <li><strong>Evening Availability:</strong> Only a couple of wineries stay open past 6 PM (e.g., Aquila's Nest is open until 9 PM on weekends).</li>
      <li><strong>Early mornings:</strong> No winery opens before 11 AM, so 3 AM or early morning plans won't work.</li>
      <li><strong>Group visits:</strong> We do not need reservations for any of the stops included.</li>
    </ul>
    <p className="mt-3">So, we should aim for a full weekend day (Saturday or Sunday), starting around 11 AM and wrapping up before 9 PM. Let me know which weekends you're available within that window!</p>
  </div>
);

const Route = () => (
  <div>
    <h2 className="text-lg md:text-xl font-semibold mb-3">Driving Route</h2>
    <p className="mb-2">Our tour begins and ends in Woodbury, CT.</p>
    <ol className="list-decimal pl-5 space-y-2">
      <li>Start: Woodbury → Hawk Ridge Winery (Watertown)</li>
      <li>To: Sunset Meadow (Goshen)</li>
      <li>To: Hopkins Vineyard (Warren)</li>
      <li>To: White Silo (Sherman)</li>
      <li>To: Aquila's Nest (Newtown)</li>
      <li>Return to Woodbury</li>
    </ol>
    <p className="mt-2 text-xs text-gray-500">Estimated total drive time: 3 hours (spread out).</p>
  </div>
);

export default App;
