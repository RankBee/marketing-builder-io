import logoMobile from '../assets/rankBeelogo_mobile.png'
import logoDesktop from '../assets/rankBeelogo_desktop.png'

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`logo-container ${className}`}>
      <picture>
        <source media="(min-width: 640px)" srcSet={logoDesktop} width={112} height={112} />
        <img 
          src={logoMobile}
          width={80}
          height={80}
          alt="RankBee Logo" 
          className="logo-image"
        />
      </picture>
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