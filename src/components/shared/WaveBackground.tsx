import React from 'react';

interface WaveBackgroundProps {
    idPrefix?: string;
    // Primary gradient (used for Top wave and first Bottom wave)
    primaryColorStart?: string;
    primaryColorEnd?: string;
    // Secondary gradient (used for second Bottom wave)
    secondaryColorStart?: string;
    secondaryColorEnd?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
    idPrefix = 'wave',
    // Defaults matching standard "Orange/Yellow" Hero theme
    primaryColorStart = 'rgba(243, 106, 62, 1)',
    primaryColorEnd = 'rgba(255, 179, 11, 1)',
    secondaryColorStart = 'rgba(141.602, 243, 62, 0.4)',
    secondaryColorEnd = 'rgba(70.411, 208.219, 0, 0.73)',
}) => {
    return (
        <>
            {/* Top SVG Wave Background */}
            <div className="absolute left-0 top-0 w-full overflow-hidden pointer-events-none opacity-10 z-0">
                <svg
                    className="w-screen h-[250px] md:h-[490px]"
                    style={{
                        transform: 'rotate(180deg)',
                    }}
                    viewBox="0 0 1440 490"
                    preserveAspectRatio="none"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id={`${idPrefix}-primary`} x1="0" x2="0" y1="1" y2="0">
                            <stop stopColor={primaryColorStart} offset="0%" />
                            <stop stopColor={primaryColorEnd} offset="100%" />
                        </linearGradient>
                    </defs>
                    <path
                        fill={`url(#${idPrefix}-primary)`}
                        d="M0,98L10,130.7C20,163,40,229,60,212.3C80,196,100,98,120,106.2C140,114,160,229,180,261.3C200,294,220,245,240,228.7C260,212,280,229,300,236.8C320,245,340,245,360,269.5C380,294,400,343,420,334.8C440,327,460,261,480,212.3C500,163,520,131,540,163.3C560,196,580,294,600,351.2C620,408,640,425,660,400.2C680,376,700,310,720,277.7C740,245,760,245,780,277.7C800,310,820,376,840,408.3C860,441,880,441,900,383.8C920,327,940,212,960,138.8C980,65,1000,33,1020,89.8C1040,147,1060,294,1080,334.8C1100,376,1120,310,1140,294C1160,278,1180,310,1200,302.2C1220,294,1240,245,1260,220.5C1280,196,1300,196,1320,179.7C1340,163,1360,131,1380,106.2C1400,82,1420,65,1430,57.2L1440,49L1440,490L1430,490C1420,490,1400,490,1380,490C1360,490,1340,490,1320,490C1300,490,1280,490,1260,490C1240,490,1220,490,1200,490C1180,490,1160,490,1140,490C1120,490,1100,490,1080,490C1060,490,1040,490,1020,490C1000,490,980,490,960,490C940,490,920,490,900,490C880,490,860,490,840,490C820,490,800,490,780,490C760,490,740,490,720,490C700,490,680,490,660,490C640,490,620,490,600,490C580,490,560,490,540,490C520,490,500,490,480,490C460,490,440,490,420,490C400,490,380,490,360,490C340,490,320,490,300,490C280,490,260,490,240,490C220,490,200,490,180,490C160,490,140,490,120,490C100,490,80,490,60,490C40,490,20,490,10,490L0,490Z"
                    />
                </svg>
            </div>

            {/* Bottom SVG Wave Background */}
            <div className="absolute left-0 bottom-0 w-full overflow-hidden pointer-events-none opacity-10 z-0">
                <svg
                    className="w-screen h-[250px] md:h-[490px]"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 490"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Gradient 0: Matches Primary */}
                        <linearGradient id={`${idPrefix}-bottom-0`} x1="0" x2="0" y1="1" y2="0">
                            <stop stopColor={primaryColorStart} offset="0%" />
                            <stop stopColor={primaryColorEnd} offset="100%" />
                        </linearGradient>

                        {/* Gradient 1: Matches Secondary */}
                        <linearGradient id={`${idPrefix}-bottom-1`} x1="0" x2="0" y1="1" y2="0">
                            <stop stopColor={secondaryColorStart} offset="0%" />
                            <stop stopColor={secondaryColorEnd} offset="100%" />
                        </linearGradient>
                    </defs>

                    {/* Path using Gradient 0 (Primary) */}
                    <path
                        fill={`url(#${idPrefix}-bottom-0)`}
                        d="M0,245L84.7,196L169.4,441L254.1,0L338.8,147L423.5,441L508.2,0L592.9,98L677.6,441L762.4,98L847.1,196L931.8,147L1016.5,49L1101.2,343L1185.9,0L1270.6,0L1355.3,294L1440,392L1524.7,0L1609.4,441L1694.1,147L1778.8,0L1863.5,392L1948.2,0L2032.9,147L2032.9,490L1948.2,490L1863.5,490L1778.8,490L1694.1,490L1609.4,490L1524.7,490L1440,490L1355.3,490L1270.6,490L1185.9,490L1101.2,490L1016.5,490L931.8,490L847.1,490L762.4,490L677.6,490L592.9,490L508.2,490L423.5,490L338.8,490L254.1,490L169.4,490L84.7,490L0,490Z"
                    />

                    {/* Path using Gradient 1 (Secondary) */}
                    <path
                        style={{ transform: 'translate(0, 50px)', opacity: 0.9 }}
                        fill={`url(#${idPrefix}-bottom-1)`}
                        d="M0,49L84.7,245L169.4,441L254.1,147L338.8,0L423.5,392L508.2,196L592.9,196L677.6,98L762.4,343L847.1,0L931.8,294L1016.5,0L1101.2,98L1185.9,343L1270.6,294L1355.3,196L1440,49L1524.7,343L1609.4,49L1694.1,441L1778.8,98L1863.5,0L1948.2,294L2032.9,245L2032.9,490L1948.2,490L1863.5,490L1778.8,490L1694.1,490L1609.4,490L1524.7,490L1440,490L1355.3,490L1270.6,490L1185.9,490L1101.2,490L1016.5,490L931.8,490L847.1,490L762.4,490L677.6,490L592.9,490L508.2,490L423.5,490L338.8,490L254.1,490L169.4,490L84.7,490L0,490Z"
                    />
                </svg>
            </div>
        </>
    );
};
