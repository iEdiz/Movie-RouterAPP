import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { addComment, deleteMovie, getMovies } from '../../api/MoviesAPI';
import style from './MovieDetails.module.css'
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { Input } from '../../components/Input/Input';

type Movie = {
  id: number;
  title: string;
  genre: string;
  director: string;
  release_year: number;
  rating: number;
  image: string;
  comments: {
    id: number;
    text: string;
    userId: number;
  }[];
};

export const MovieDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState('');

    const postsQuery = useQuery({
        queryKey: ['movies'],
        queryFn: getMovies,
    });

    const CreateCommentMutation = useMutation({
      mutationFn: (data: { movieId: number; text: string; userId: number }) => addComment(data),
      onSuccess: () => {
          setNewComment('');
          queryClient.invalidateQueries(['movies']);
      },
  });

    const handleSubmitComment = (e: React.FormEvent) => {
      e.preventDefault();
  
      const userId = Math.random();
      CreateCommentMutation.mutate({
          movieId: Number(id),
          text: newComment,
          userId,
      });
  };

    if (postsQuery.status === 'pending') return <h1>Loading...</h1>;

    const selectedMovie = postsQuery.data.find((song: Movie) => song.id === Number(id));

    if (!selectedMovie) {
      navigate('/404')
    }

    const handleDelete = async () => {
        await deleteMovie({ id: selectedMovie.id });

        queryClient.invalidateQueries(['movies'])
        
        navigate('/movies');
    }

    return (
        <div className={style.wrapper}>
            <div key={selectedMovie.id} className={style.clickedMovie}>
              <img src={selectedMovie.image} alt='Movie image' className={style.clickedImage} />
              <h1 className={style.title}>{selectedMovie.title}</h1>
              <h3 className={style.genre}>{selectedMovie.genre}</h3>
              <h5 className={style.releaseYear}>{selectedMovie.release_year}</h5>
              <h6 className={style.rating}>{selectedMovie.rating}</h6>

              <div className={style.commentsWrapper}>
                <h3>Comments:</h3>
                {selectedMovie.comments.map((comment: { id: number; text: string; userId: number }) => (
                  <div key={comment.id} className={style.comments}>
                    <p>Commented by user with ID: {comment.userId}</p>
                    <p>{comment.text}</p>
                  </div>
                ))}
              <div className={style.buttons}>
                  <form onSubmit={handleSubmitComment}>
                    <Input 
                    value={newComment}
                    placeholder='Add new comment'
                    onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button text='Comment' type='submit'/>
                  </form>
                  <Button text='Delete' onClick={handleDelete} type='submit'/>
                </div>
              </div>
            </div>
        </div>
    );
};