import Link from 'next/link';
import './bodyPartsExercises.css';
import '../bodyParts.css';

// Map display names to API names
const bodyPartMap = {
  'Chest': 'chest',
  'Back': 'back',
  'Legs': 'upper legs',
  'Shoulders': 'shoulders',
  'Arms': 'upper arms',
  'Core': 'waist'
};

async function fetchExercises(bodyPart) { 
  try {
    const apiName = bodyPartMap[bodyPart] || bodyPart.toLowerCase();
    const response = await fetch(
      `https://exercisedb.dev/api/v1/bodyparts/${apiName}/exercises`,
      { cache: 'force-cache' }
    );
    const data = await response.json();
    console.log("========the data========", data.data);
    return data.data ;
  } catch (error) {
    console.error(`Error fetching exercises for ${bodyPart}:`, error);
    return [];
  }
}

export default async function BodyPartsExercises({ params }) {
  const { bodyPartsExercises } = await params;
  const exercises = await fetchExercises(bodyPartsExercises);
  console.log("========the exercises========", exercises);
  return (
    <div className="body-parts-container">
      <h1 className="primary-font">{bodyPartsExercises} Exercises</h1>
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
                  {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
                    <div className="exercise-muscles">
                      <span className="muscle-label">Target muscles:</span>
                      <div className="muscle-tags">
                        {exercise.targetMuscles.map((muscle, idx) => (
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
            <p>No exercises found for {bodyPartsExercises}</p>
          </div>
        )}
      </div>
    </div>
  );
}