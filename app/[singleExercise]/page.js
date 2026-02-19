import './singleExercise.css';
import '../globals.css';

async function fetchExercise(exerciseId) {
  try {
    const response = await fetch(
      `https://exercisedb.dev/api/v1/exercises/${exerciseId}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching exercise ${exerciseId}:`, error);
    return null;
  }
}

export default async function SingleExercise({ params }) {
  const { singleExercise } = await params;
  const exercise = await fetchExercise(singleExercise);

  if (!exercise) {
    return (
      <div className="single-exercise-container">
        <div className="exercise-not-found">
          <h1>Exercise Not Found</h1>
          <p>The exercise you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="single-exercise-container">
      <div className="exercise-detail-card">
        {/* Exercise Header */}
        <div className="exercise-header">
          <h1 className="primary-font exercise-title">{exercise.name}</h1>
        </div>

        {/* Exercise GIF */}
        <div className="exercise-media">
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name}
            className="exercise-detail-gif"
          />
        </div>

        {/* Exercise Info Grid */}
        <div className="exercise-info-grid">
          {/* Target Muscles */}
          {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
            <div className="info-section">
              <h3 className="info-label">Target Muscles</h3>
              <div className="info-tags">
                {exercise.targetMuscles.map((muscle, idx) => (
                  <span key={idx} className="info-tag target-muscle">{muscle}</span>
                ))}
              </div>
            </div>
          )}

          {/* Body Parts */}
          {exercise.bodyParts && exercise.bodyParts.length > 0 && (
            <div className="info-section">
              <h3 className="info-label">Body Parts</h3>
              <div className="info-tags">
                {exercise.bodyParts.map((part, idx) => (
                  <span key={idx} className="info-tag body-part">{part}</span>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          {exercise.equipments && exercise.equipments.length > 0 && (
            <div className="info-section">
              <h3 className="info-label">Equipment</h3>
              <div className="info-tags">
                {exercise.equipments.map((equipment, idx) => (
                  <span key={idx} className="info-tag equipment">{equipment}</span>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Muscles */}
          {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
            <div className="info-section">
              <h3 className="info-label">Secondary Muscles</h3>
              <div className="info-tags">
                {exercise.secondaryMuscles.map((muscle, idx) => (
                  <span key={idx} className="info-tag secondary-muscle">{muscle}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        {exercise.instructions && exercise.instructions.length > 0 && (
          <div className="exercise-instructions">
            <h3 className="instructions-title">How to Perform</h3>
            <ol className="instructions-list">
              {exercise.instructions.map((instruction, idx) => (
                <li key={idx} className="instruction-item">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

