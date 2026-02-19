import './bodyParts.css';
import Link from 'next/link';

// fetch body part exercises from the API
async function fetchBodyPartExercises(bodyPart) {
    const response = await fetch(`https://exercisedb.dev/api/v1/bodyparts/${bodyPart}/exercises?limit=1`, { cache: 'force-cache' })
    const data = await response.json();
    return data.data ? data.data[0] : null;
}

export default async function BodyParts() {
  const bodyParts = [
    { name: 'Chest', apiName: 'chest' },
    { name: 'Back', apiName: 'back' },
    { name: 'Legs', apiName: 'upper legs' },
    { name: 'Shoulders', apiName: 'shoulders' },
    { name: 'Arms', apiName: 'upper arms' },
    { name: 'Core', apiName: 'waist' }
  ];

  // Fetch exercises for all body parts in paralle
  const exercisesData = await Promise.all(
    bodyParts.map(async (part) => ({
      ...part,
      exercise: await fetchBodyPartExercises(part.apiName)
    }))
  );
//   console.log("the exercises data", exercisesData);

  return (
    <div className="body-parts-container">
      <h1 className="primary-font">Body Parts</h1>
      <p className="secondary-font" style={{ marginTop: '5px' }}>What’s your focus today?</p>
    
      <div className="body-parts-grid">
        {exercisesData.map((item, index) => (
          <Link href={`/bodyParts/${item.name}`} key={item.apiName}>
          <div key={item.apiName} className="body-part-card" style={{ animationDelay: `${index * 0.1}s` }}>
            {item.exercise ? (
              <>
                <div className="card-image-wrapper">
                  <img 
                    src={item.exercise.gifUrl} 
                    alt={item.exercise.name}
                    className="card-gif"
                    loading="lazy"
                  />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content">
                  <div className="card-divider"></div>
                  <h2 className="card-title">{item.name}</h2>
                </div>
              </>
            ) : (
              <div className="card-skeleton">
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            )}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}