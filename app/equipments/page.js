import Link from 'next/link';
import './equipments.css';

export default async function Equipments() {
  const response = await fetch('https://exercisedb.dev/api/v1/equipments', { cache: 'force-cache' });
  const equipmentsData = await response.json();
  const equipments = equipmentsData.data || [];

  return (
    <div className="body-parts-container">
      <h1 className="primary-font">Equipments</h1>
      <p className="secondary-font" style={{ marginTop: '5px' }}>Choose your equipment</p>
    
      <div className="equipments-grid">
        {equipments.map((equipment, index) => (
          <Link href={`/equipments/${equipment.name}`} key={equipment.name}>
            <div className="equipment-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <h2 className="equipment-name">{equipment.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}