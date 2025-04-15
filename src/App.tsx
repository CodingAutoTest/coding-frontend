import Navbar from './component/Navbar'
import './App.css'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Hello CAT</h1>
        </div>
      </main>
    </div>
  )
}

export default App