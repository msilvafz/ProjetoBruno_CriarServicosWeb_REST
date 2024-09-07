import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import '../../assets/css/Cursos.css'; 
import JS from '../../assets/images/JS.png'
import Logica from '../../assets/images/Logica.png'
import RedesSociais from '../../assets/images/RedesSociais.png'
import ingles from '../../assets/images/ingles.png'
import java from '../../assets/images/java.png'
import Testes from '../../assets/images/Testes.png'

function Cursos() {
  const [ratings, setRatings] = useState({
    0: 4, 
    1: 3, 
    2: 5, 
    3: 4, 
    4: 3, 
    5: 5  
  });

  const handleRatingChange = (index, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [index]: newRating
    }));
  };

  const courses = [
    {
      id: 1,
      title: "Redes Sociais",
      professor: "João Silva",
      image: RedesSociais,
      progress: 70, 
      initialRating: 4 
    },
    {
      id: 2,
      title: "Lógica de Programação",
      professor: "Maria Oliveira",
      image: Logica,
      progress: 45, 
      initialRating: 3 
    },
    {
      id: 3,
      title: "Fundamentos de JavaScript",
      professor: "Carlos Souza",
      image: JS,
      progress: 85, 
      initialRating: 5 
    },
    {
      id: 4,
      title: "Inglês do Básico ao Avançado",
      professor: "Ana Costa",
      image: ingles,
      progress: 55, 
      initialRating: 4 
    },
    {
      id: 5,
      title: "Introdução a RestAPI com Java",
      professor: "Fernanda Lima",
      image: java,
      progress: 60, 
      initialRating: 3 
    },
    {
      id: 6,
      title: "Automação de Testes com JS, Java",
      professor: "Paulo Santos",
      image: Testes,
      progress: 90, 
      initialRating: 5 
    }
  ];

  return (
    <div className="container">
      <div className="row">
        {courses.map((course, index) => (
          <div className="col-md-4 mb-4" key={course.id}>
            <Link to={`/alunocursos/cursos/${course.id}`} className="text-decoration-none">
              <div className="card udemy-card">
                <img src={course.image} alt={course.title} className="card-img-top udemy-card-img" />
                <div className="card-body">
                  <h5 className="card-title text-center">{course.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">{course.professor}</h6>
                  <div className="progress-container">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="progress-text">{course.progress}%</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${course.progress}%` }}
                        aria-valuenow={course.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="rating-position">
                  <StarRatings
                    rating={ratings[index] || course.initialRating}
                    starRatedColor="gold"
                    changeRating={(newRating) => handleRatingChange(index, newRating)}
                    numberOfStars={5}
                    name={`rating-${index}`}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
