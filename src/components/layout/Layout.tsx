import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

// I've extracted your SVGs into their own components for clarity.
const TopWave = () => (
  <svg
    id="wave-top"
    style={{
      width: '100%',
      height: '490px',
      transform: 'rotate(180deg)',
      transition: '0.3s',
    }}
    viewBox="0 0 1440 490"
    preserveAspectRatio="none"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Unique ID for top wave gradient 0 */}
      <linearGradient id="sw-gradient-top-0" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(243, 106, 62, 1)" offset="0%" />
        <stop stopColor="rgba(255, 179, 11, 1)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: 'translate(0, 0px)', opacity: 1 }}
      fill="url(#sw-gradient-top-0)"
      d="M0,98L10,130.7C20,163,40,229,60,212.3C80,196,100,98,120,106.2C140,114,160,229,180,261.3C200,294,220,245,240,228.7C260,212,280,229,300,236.8C320,245,340,245,360,269.5C380,294,400,343,420,334.8C440,327,460,261,480,212.3C500,163,520,131,540,163.3C560,196,580,294,600,351.2C620,408,640,425,660,400.2C680,376,700,310,720,277.7C740,245,760,245,780,277.7C800,310,820,376,840,408.3C860,441,880,441,900,383.8C920,327,940,212,960,138.8C980,65,1000,33,1020,89.8C1040,147,1060,294,1080,334.8C1100,376,1120,310,1140,294C1160,278,1180,310,1200,302.2C1220,294,1240,245,1260,220.5C1280,196,1300,196,1320,179.7C1340,163,1360,131,1380,106.2C1400,82,1420,65,1430,57.2L1440,49L1440,490L1430,490C1420,490,1400,490,1380,490C1360,490,1340,490,1320,490C1300,490,1280,490,1260,490C1240,490,1220,490,1200,490C1180,490,1160,490,1140,490C1120,490,1100,490,1080,490C1060,490,1040,490,1020,490C1000,490,980,490,960,490C940,490,920,490,900,490C880,490,860,490,840,490C820,490,800,490,780,490C760,490,740,490,720,490C700,490,680,490,660,490C640,490,620,490,600,490C580,490,560,490,540,490C520,490,500,490,480,490C460,490,440,490,420,490C400,490,380,490,360,490C340,490,320,490,300,490C280,490,260,490,240,490C220,490,200,490,180,490C160,490,140,490,120,490C100,490,80,490,60,490C40,490,20,490,10,490L0,490Z"
    />
    <defs>
      {/* Unique ID for top wave gradient 1 */}
      <linearGradient id="sw-gradient-top-1" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(146.673, 62.409, 151.3, 0.47)" offset="0%" />
        <stop stopColor="rgba(119.788, 0, 208.219, 0.73)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: 'translate(0, 50px)', opacity: 0.9 }}
      fill="url(#sw-gradient-top-1)"
      d="M0,294L10,277.7C20,261,40,229,60,179.7C80,131,100,65,120,89.8C140,114,160,229,180,285.8C200,343,220,343,240,310.3C260,278,280,212,300,212.3C320,212,340,278,360,285.8C380,294,400,245,420,253.2C440,261,460,327,480,318.5C500,310,520,229,540,179.7C560,131,580,114,600,163.3C620,212,640,327,660,318.5C680,310,700,180,720,122.5C740,65,760,82,780,147C800,212,820,327,840,310.3C860,294,880,147,900,73.5C920,0,940,0,960,0C980,0,1000,0,1020,49C1040,98,1060,196,1080,261.3C1100,327,1120,359,1140,367.5C1160,376,1180,359,1200,302.2C1220,245,1240,147,1260,130.7C1280,114,1300,180,1320,220.5C1340,261,1360,278,1380,285.8C1400,294,1420,294,1430,294L1440,294L1440,490L1430,490C1420,490,1400,490,1380,490C1360,490,1340,490,1320,490C1300,490,1280,490,1260,490C1240,490,1220,490,1200,490C1180,490,1160,490,1140,490C1120,490,1100,490,1080,490C1060,490,1040,490,1020,490C1000,490,980,490,960,490C940,490,920,490,900,490C880,490,860,490,840,490C820,490,800,490,780,490C760,490,740,490,720,490C700,490,680,490,660,490C640,490,620,490,600,490C580,490,560,490,540,490C520,490,500,490,480,490C460,490,440,490,420,490C400,490,380,490,360,490C340,490,320,490,300,490C280,490,260,490,240,490C220,490,200,490,180,490C160,490,140,490,120,490C100,490,80,490,60,490C40,490,20,490,10,490L0,490Z"
    />
  </svg>
);

const BottomWave = () => (
  <svg
    id="wave-bottom"
    style={{ width: '100%', height: '490px' }}
    preserveAspectRatio="none"
    viewBox="0 0 1440 490"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Unique ID for bottom wave gradient 0 */}
      <linearGradient id="sw-gradient-bottom-0" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(243, 106, 62, 1)" offset="0%" />
        <stop stopColor="rgba(255, 179, 11, 1)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: 'translate(0, 0px)', opacity: 1 }}
      fill="url(#sw-gradient-bottom-0)"
      d="M0,245L84.7,196L169.4,441L254.1,0L338.8,147L423.5,441L508.2,0L592.9,98L677.6,441L762.4,98L847.1,196L931.8,147L1016.5,49L1101.2,343L1185.9,0L1270.6,0L1355.3,294L1440,392L1524.7,0L1609.4,441L1694.1,147L1778.8,0L1863.5,392L1948.2,0L2032.9,147L2032.9,490L1948.2,490L1863.5,490L1778.8,490L1694.1,490L1609.4,490L1524.7,490L1440,490L1355.3,490L1270.6,490L1185.9,490L1101.2,490L1016.5,490L931.8,490L847.1,490L762.4,490L677.6,490L592.9,490L508.2,490L423.5,490L338.8,490L254.1,490L169.4,490L84.7,490L0,490Z"
    />
    <defs>
      {/* Unique ID for bottom wave gradient 1 */}
      <linearGradient id="sw-gradient-bottom-1" x1="0" x2="0" y1="1" y2="0">
        <stop stopColor="rgba(141.602, 243, 62, 0.4)" offset="0%" />
        <stop stopColor="rgba(70.411, 208.219, 0, 0.73)" offset="100%" />
      </linearGradient>
    </defs>
    <path
      style={{ transform: 'translate(0, 50px)', opacity: 0.9 }}
      fill="url(#sw-gradient-bottom-1)"
      d="M0,49L84.7,245L169.4,441L254.1,147L338.8,0L423.5,392L508.2,196L592.9,196L677.6,98L762.4,343L847.1,0L931.8,294L1016.5,0L1101.2,98L1185.9,343L1270.6,294L1355.3,196L1440,49L1524.7,343L1609.4,49L1694.1,441L1778.8,98L1863.5,0L1948.2,294L2032.9,245L2032.9,490L1948.2,490L1863.5,490L1778.8,490L1694.1,490L1609.4,490L1524.7,490L1440,490L1355.3,490L1270.6,490L1185.9,490L1101.2,490L1016.5,490L931.8,490L847.1,490L762.4,490L677.6,490L592.9,490L508.2,490L423.5,490L338.8,490L254.1,490L169.4,490L84.7,490L0,490Z"
    />
  </svg>
);


export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Top SVG Wave Background */}
      <div className="absolute left-0 top-0 w-full h-[490px] pointer-events-none opacity-10 z-10">
        <div 
          className="absolute top-0 left-0 h-full w-[200%]" 
          style={{ animation: `wave-animation 40s linear infinite normal` }}
        >
          <div className="absolute top-0 left-0 h-full w-1/2">
            <TopWave />
          </div>
          <div className="absolute top-0 left-1/2 h-full w-1/2">
            <TopWave />
          </div>
        </div>
      </div>

      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-linear-to-l from-amber-800 via-stone-500 to-amber-800 animate-gradient opacity-100 z-0" />
      <div className="absolute inset-0 bg-linear-to-b from-green-500 via-blue-500 to-purple-800 animate-gradient opacity-15 z-0" />
      
      {/* Bottom SVG Wave Background */}
      <div className="absolute left-0 bottom-0 w-full h-[490px] pointer-events-none opacity-10 z-0">
        <div 
          className="absolute top-0 left-0 h-full w-[200%]" 
          style={{ animation: `wave-animation 40s linear infinite reverse` }}
        >
          <div className="absolute top-0 left-0 h-full w-1/2">
            <BottomWave />
          </div>
          <div className="absolute top-0 left-1/2 h-full w-1/2">
            <BottomWave />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};
