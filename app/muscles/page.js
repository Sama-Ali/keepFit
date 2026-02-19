import Link from 'next/link';
import '../bodyParts/bodyParts.css';
import './muscels.css';

// Only show muscles that are known to have exercises
const MUSCLES_WITH_EXERCISES = [
  'biceps',
  'triceps',
  'lats',
  'quads',
  'hamstrings',
  'glutes',
  'delts',
  'traps',
  'abs',
  'calves',
  'forearms',
];

export default async function Muscles() {
  const muscles = MUSCLES_WITH_EXERCISES.map(name => ({ name }));

  return (
    <div className="body-parts-container">
      <h1 className="primary-font">Muscles</h1>
      <p className="secondary-font" style={{ marginTop: '5px' }}>Select today's target</p>
    
      <div className="muscles-grid">
        {muscles.map((muscle, index) => (
          <Link href={`/muscles/${muscle.name}`} key={muscle.name}>
            <div className="muscle-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <h2 className="muscle-name">{muscle.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}