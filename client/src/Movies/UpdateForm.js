import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useForm } from '../utils/useForm';

const UpdateForm = props => {

    let history = useHistory();

    const [movie, setMovie] = useState();
    

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                console.log('AAAAA IM IN UPDATE FORM AND HER EIS RES: ', res);
                setMovie(res.data);
            })
            .catch(err => console.log(err.response));
    }, []);

    // PUTting the edits up and setting to state::
    const submitCallback = () => {
        console.log(values);
        console.log('Look! Im handling the [PUT] for Movie:::- ', movie.id);

        // Constructing payload from partial movie object gathered from form and unchanged data from state.
        const payload = {
            ...movie,
            title: values.title,
            director: values.director,
            metascore: values.metascore
        };

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, payload)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };


    // {
    //     id: 5,
    //     title: 'Tombstone',
    //     director: 'George P. Cosmatos',
    //     metascore: 89,
    //     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
    // }

    // Methods for useForm Hook::
    const [values, handleChanges, handleSubmit] = useForm({
        title: '',
        director: '',
        metascore: ''
        // stars: movie.stars
    },
        submitCallback
    );

        console.log('Update Form: Movie state: ', movie);
    // Deleting::
    const handleRemove = e => {
        e.preventDefault();
        console.log('Look! Im handling the [DELETE] for Friend:::- ', movie.id);

        axios     
            .delete(`http://localhost:5000/api/movies/${movie.id}`)
            .then(res => {
                console.log('DELETED RESPONSE: ', res);
                history.push('/');
            })
            .catch(err => console.log('Axios Error:', err));
    }

    return (
        <div className='update-form'>
            {!movie ? (
                <h1>Fetching Movie...</h1>
            ) : (
                <div>
                    <h1>Editing: {movie.title}</h1>
                    <form onSubmit={handleSubmit}>
                        <input required type='text' name='title' placeholder={movie.title} onChange={handleChanges} value={values.title} />
                        <input required type='text' name='director' placeholder={movie.director} onChange={handleChanges} value={values.director} />
                        <input required type='number' name='metascore' placeholder={movie.metascore} onChange={handleChanges} value={values.metascore} />
                        {/* <input required type='text' name='stars' placeholder={movie.stars} onChange={handleChanges} value={values.stars} /> */}
                        <button type='submit'>Save Changes</button>
                    </form>
                    <button onClick={handleRemove}>Delete Listing</button>
                </div>
            )}
        </div>
    );
}

export default UpdateForm;