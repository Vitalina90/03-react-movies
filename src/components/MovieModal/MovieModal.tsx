import { useEffect } from 'react';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    const { title, overview, backdrop_path, release_date, vote_average } = movie;

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.code === 'Escape') onClose();
        };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
    } 
  };

    return (
        <div className={css.backdrop}
            role='dialog'
            aria-modal='true'
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                <button className={css.closeButton}
                    aria-label='Close modal'
                    onClick={onClose}
                >
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt={`movie.title`}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <p>
                        <strong>Release Date:</strong> {release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {vote_average}/10
                    </p>
                </div>
            </div>
        </div>
    );
}


// export default function MovieModal({ movie, onClose }) {
//   useEffect(() => {
//     const handleEsc = (e) => e.code === 'Escape' && onClose();
//     window.addEventListener('keydown', handleEsc);
//     document.body.style.overflow = 'hidden';

//     return () => {
//       window.removeEventListener('keydown', handleEsc);
//       document.body.style.overflow = 'auto';
//     };
//   }, [onClose]);

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   return (
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClick}
//     >
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           &times;
//         </button>
//         <img
//           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//           alt={movie.title}
//           className={css.image}
//         />
//         <div className={css.content}>
//           <h2>{movie.title}</h2>
//           <p>{movie.overview}</p>
//           <p>
//             <strong>Release Date:</strong> {movie.release_date}
//           </p>
//           <p>
//             <strong>Rating:</strong> {movie.vote_average}/10
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }