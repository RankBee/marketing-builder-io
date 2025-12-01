import logoImage from '../assets/rankBeelogo_highres_blue_pink.png'

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={logoImage} 
        alt="RankBee Logo" 
        className="logo-image"
      />
      <svg className="logo-text" aria-hidden="true" viewBox="0 0 120 32" style={{ width: '120px' }}>
        <text x="0" y="24" fontSize="22" fill="#000000" fontWeight="500">
          Rank
        </text>
        <text x="52" y="24" fontSize="22" fill="#c25fe6" fontWeight="700">
          Bee
        </text>
      </svg>
    </div>
  )
}