import axios from "axios";

export const getMovies = async () => {
    try {
        const response = await axios.get('http://localhost:3000/movies');
        const moviesData = response.data || [];
        return moviesData;
    } catch (error) {
        console.error('Error getting movie data', error);
        return [];
    }
}

export const getMovieById = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting singular song data', error);
        throw error;
    }
};

export const deleteMovie = async ({ id }: { id: number }) => {
    try {
        await axios.delete(`http://localhost:3000/movies/${id}`)
   } catch(error) {
       console.error('Error deleting a song', error)
       throw error;
   }
}

export const addComment = async ({ id, text }: { id: number; text: string }) => {
    try {
        const movies = await axios.get(`http://localhost:3000/movies/${id}`);

        movies.data.comments.push(text);

        const response = await axios.patch(`http://localhost:3000/movies/${id}`, {
            comments: movies.data.comments
        })

        return response.data
    } catch (error) {
        console.error('Error adding a comment', error);
        throw error;
    }
};