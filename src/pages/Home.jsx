import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies, getPopularMovies } from '../services/api';
import "../css/Home.css";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                setError("Failed to load movies.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setError(null);
        } catch (err) {
            setError("Failed to search for movies.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type="text"
                    placeholder='Search for movies...'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='submit' className='search-button'>Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
};

export default Home;
