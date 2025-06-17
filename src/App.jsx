import Converter from './components/Converter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Converter />
      </div>
    </div>
  );
}

export default App;
