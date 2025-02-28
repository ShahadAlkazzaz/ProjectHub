import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-light-beige text-dark-gray px-6">
            <h1 className="text-5xl font-bold mb-6 text-center">
                Välkommen till ProjectHub
            </h1>

            <p className="text-lg text-center max-w-2xl">
                Hantera dina projekt enkelt och smidigt med ProjectHub. Skapa,
                redigera och håll koll på dina projekt på ett ställe!
            </p>

            <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <Link to="/projects" className="btn btn-primary">
                    Se projekt
                </Link>
                <Link
                    to="/projects/select-customer"
                    className="bg-dark-gray text-white font-bold px-5 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Skapa nytt projekt
                </Link>
            </div>
        </div>
    )
}

export default Home
