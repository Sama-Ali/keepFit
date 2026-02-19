import Link from 'next/link';
import './musclesExercises.css';
import '../../globals.css';

async function fetchExercises(muscle) { 
    try {
      const response = await fetch(
        `https://exercisedb.dev/api/v1/muscles/${muscle}/exercises`,
        { cache: 'no-store' }
      );
      const data = await response.json();
      console.log("========the data========", data);
      return data.data || [];
    } catch (error) {
      console.error(`Error fetching exercises for ${muscle}:`, error);
      return [];
    }
  }

export default async function MusclesExercises({ params }) {
  const { muscleExercises } = await params;
  const exercises = await fetchExercises(muscleExercises) || [];
  return (
    <div className="muscles-exercises-container">
      <h1 className="primary-font">{muscleExercises} Exercises</h1>
      <p className="secondary-font" style={{ marginTop: '5px' }}>
        {exercises.length} exercises available
      </p>
      
      <div className="exercises-grid">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <Link 
              href={`/${exercise.exerciseId}`} 
              key={exercise.exerciseId}
              style={{ textDecoration: 'none' }}
            >
              <div 
                className="exercise-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="exercise-image-wrapper">
                  <img 
                    src={exercise.gifUrl} 
                    alt={exercise.name}
                    className="exercise-gif"
                    loading="lazy"
                  />
                  <div className="exercise-overlay"></div>
                </div>
                <div className="exercise-content">
                  <h3 className="exercise-name">{exercise.name}</h3>
                  {exercise.equipment && (
                    <div className="exercise-equipment">
                      <span className="equipment-badge">{exercise.equipment}</span>
                    </div>
                  )}
                  {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                    <div className="exercise-muscles">
                      <span className="muscle-label">Secondary muscles:</span>
                      <div className="muscle-tags">
                        {exercise.secondaryMuscles.map((muscle, idx) => (
                          <span key={idx} className="muscle-tag">{muscle}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-exercises">
            <p>No exercises found for {muscleExercises}</p>
          </div>
        )}
      </div>
    </div>
  );
}