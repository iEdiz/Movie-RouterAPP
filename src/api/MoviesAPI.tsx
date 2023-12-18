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
        const response = await axios.get(`http://localhost:3000/movies/${id}?_embed=comments`);
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
   }
}

export const addComment = async ({ id, text, userId }: { id: number; text: string; userId: number }) => {
    try {
        await axios.post(`http://localhost:3000/movies/${id}`, { text, userId });
    } catch (error) {
        console.error('Error adding a comment', error);
        throw error;
    }
};