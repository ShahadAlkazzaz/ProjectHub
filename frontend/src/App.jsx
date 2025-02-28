import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import ProjectDetails from './pages/ProjectDetails'
import CreateCustomer from './pages/CreateCustomer' // 🟢 Se till att sökvägen stämmer
import SelectCustomer from "./pages/SelectCustomer";


function App() {
    return (
        <BrowserRouter>
            <div className="wrapper bg-light-beige text-dark-gray">
                <Header />
                <main className="flex-grow container mx-auto p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/projects/create"
                            element={<CreateProject />}
                        />
                        <Route
                            path="/projects/:id"
                            element={<ProjectDetails />}
                        />
                        <Route
                            path="/customers/create"
                            element={<CreateCustomer />}
                        />
                        <Route path="/projects/select-customer" element={<SelectCustomer />} />

                        {/* <Route path="/" element={<CreateProject />} /> */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
