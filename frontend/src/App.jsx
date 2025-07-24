import DraftEmail from "./components/DraftEmail.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1C2C] to-[#928DAB] flex items-center justify-center px-4">
      <div className=" bg-gradient-to-br from-[#e7e3fa] to-[#665d8b] shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">AI Email Draft Generator</h1>
        <DraftEmail />
    </div>
    </div>
  );
}

export default App
