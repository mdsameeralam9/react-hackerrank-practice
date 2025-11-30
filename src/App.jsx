import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import CryptoExchanger from "./CryptoExchanger_Day_1/CryptoExchanger.jsx";
import ArticleSorting from "./ArticleSorting/index.jsx";
import WordOmitter from "./WordOmitter/index.jsx";
import FeedbackSystem from "./CodeReviewFeedbcak/index.jsx";
import DiceRoller from "./DiceRoller/DiceRoller";
import TimerWithRandom from "./RandomWithTimer/index";
import CounterWithMyUseState from "./UseStatePollyfill/index";
import DigitalClock from "./DigitalClock/index";
import MyCustomUseEffect from "./useEffectPolyFill/index";
import WordleGame from "./WordleGame/index";
import Virtualisation from "./Virtualisation/index";
import ProgressPattern from "./ProgressPattern/index"

const components = [
  { name: "CryptoExchanger", component: CryptoExchanger, path: "/crypto" },
  { name: "ArticleSorting", component: ArticleSorting, path: "/articles" },
  { name: "WordOmitter", component: WordOmitter, path: "/word-omitter" },
  { name: "FeedbackSystem", component: FeedbackSystem, path: "/feedback" },
  { name: "DiceRoller", component: DiceRoller, path: "/dice" },
  { name: "TimerWithRandom", component: TimerWithRandom, path: "/timer" },
  {
    name: "CounterWithMyUseState",
    component: CounterWithMyUseState,
    path: "/counter",
  },
  { name: "DigitalClock", component: DigitalClock, path: "/digitalClock" },
  {
    name: "My Custom UseEffect",
    component: MyCustomUseEffect,
    path: "/myCustomUseEffect",
  },
  {
    name: "Wordle Game",
    component: WordleGame,
    path: "/wordleGame",
  },
  {
    name: "Virtualisation",
    component: Virtualisation,
    path: "/virtualisation",
  },
  {
    name: "Progress Pattern",
    component: ProgressPattern,
    path: "/progressPattern"
  }
];

function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Components
          </h2>
          <div className="space-y-1">
            {components.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === path
                    ? "bg-green-100 text-green-800 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-red-500">
              React Components
            </h1>
            <p className="text-gray-600">
              Select a component from the sidebar to view the demo
            </p>
          </div>
        ),
      },
      ...components.map(({ component: Component, path }) => ({
        path,
        element: <Component />,
      })),
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
