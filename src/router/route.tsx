import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage/Home";
import { Movies } from "../pages/Movies/Movies";
import { About } from "../pages/About/About";
import { NotFound } from "../pages/NotFound/NotFound";
import { MovieDetails } from "../pages/MovieDetails/MovieDetails";

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path='/movies/:id' element={<MovieDetails />} />
            <Route path="about" element={<About />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}