import { content } from "@/lib/content";

/**
 * Чертёж зала. Фирменный элемент сайта: зал рисуется как план с размерами,
 * а не фотографируется. Рассадка — точками, по layout id из site.json.
 * Масштаб: 1 м = 20 px. Зал 24 × 14.4 м. Сцена у левой короткой стены.
 */
type Props = {
  layout?: "theatre" | "class" | "banquet" | "buffet" | "empty";
  rooms?: boolean;
  caption?: boolean;
  className?: string;
};

const S = 20; // px в метре
const W = content.hall.widthM * S; // 480
const H = content.hall.depthM * S; // 288
const OX = 84; // отступ для размерных линий
const OY = 44;

function Dim({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const horiz = y1 === y2;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g className="dim">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {horiz ? (
        <>
          <line x1={x1} y1={y1 - 5} x2={x1} y2={y1 + 5} />
          <line x1={x2} y1={y2 - 5} x2={x2} y2={y2 + 5} />
          <text x={mx} y={my - 6} textAnchor="middle">{label}</text>
        </>
      ) : (
        <>
          <line x1={x1 - 5} y1={y1} x2={x1 + 5} y2={y1} />
          <line x1={x2 - 5} y1={y2} x2={x2 + 5} y2={y2} />
          <text x={mx - 10} y={my} textAnchor="end" dominantBaseline="middle">{label}</text>
        </>
      )}
    </g>
  );
}

function Seats({ layout }: { layout: Props["layout"] }) {
  const items: React.ReactNode[] = [];
  const stageRight = OX + 5 * S; // сцена 5 м в глубину
  if (layout === "theatre") {
    // ряды кресел лицом к сцене: 12 рядов × 20 мест, центральный проход
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 20; c++) {
        if (c === 9 || c === 10) continue;
        const x = stageRight + 1.6 * S + r * 1.4 * S;
        const y = OY + 0.9 * S + c * 0.65 * S;
        items.push(<rect key={`t${r}-${c}`} x={x} y={y} width={9} height={9} />);
      }
    }
  } else if (layout === "class") {
    // столы 120×60 рядами, по два человека
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const x = stageRight + 1.6 * S + r * 2.6 * S;
        const y = OY + 0.9 * S + c * 1.85 * S;
        items.push(<rect key={`c${r}-${c}`} x={x} y={y} width={0.6 * S} height={1.2 * S} />);
        items.push(<circle key={`cs${r}-${c}a`} cx={x + 0.6 * S + 6} cy={y + 0.3 * S} r={4} />);
        items.push(<circle key={`cs${r}-${c}b`} cx={x + 0.6 * S + 6} cy={y + 0.9 * S} r={4} />);
      }
    }
  } else if (layout === "banquet") {
    // круглые столы по 10, свободная площадка перед сценой
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cx = stageRight + 5 * S + r * 3.4 * S;
        const cy = OY + 2.2 * S + c * 3.3 * S;
        items.push(<circle key={`b${r}-${c}`} cx={cx} cy={cy} r={0.75 * S} />);
        for (let k = 0; k < 10; k++) {
          const a = (k / 10) * Math.PI * 2;
          items.push(<circle key={`bs${r}-${c}-${k}`} cx={cx + Math.cos(a) * 1.15 * S} cy={cy + Math.sin(a) * 1.15 * S} r={3.5} />);
        }
      }
    }
  } else if (layout === "buffet") {
    // высокие столы по периметру и в шахматном порядке
    const pts: [number, number][] = [];
    for (let i = 0; i < 8; i++) pts.push([stageRight + 2.5 * S + i * 2.2 * S, OY + 1.2 * S]);
    for (let i = 0; i < 8; i++) pts.push([stageRight + 2.5 * S + i * 2.2 * S, OY + H - 1.2 * S]);
    for (let i = 0; i < 4; i++) pts.push([stageRight + 6 * S + i * 3.2 * S, OY + H / 2 - 1.5 * S]);
    for (let i = 0; i < 4; i++) pts.push([stageRight + 7.6 * S + i * 3.2 * S, OY + H / 2 + 1.5 * S]);
    pts.forEach(([x, y], i) => items.push(<circle key={`f${i}`} cx={x} cy={y} r={0.4 * S} />));
  }
  return <g className="seats">{items}</g>;
}

export default function FloorPlan({ layout = "theatre", rooms = false, caption = true, className = "" }: Props) {
  const hall = content.hall;
  const stageD = 5 * S;
  const stageW = 6 * S;
  const roomsW = rooms ? 8.5 * S + 24 : 0;
  const totalW = OX + W + roomsW + 24;
  const totalH = OY + H + 48;
  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        role="img"
        aria-label={`План зала ${hall.area} м², рассадка ${layout}`}
        className="h-auto w-full"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
      >
        <style>{`
          .wall { fill: none; stroke: var(--ink); stroke-width: 2.5; }
          .thin { fill: none; stroke: var(--line); stroke-width: 1; }
          .dim line { stroke: var(--dim); stroke-width: 1; }
          .dim text { fill: var(--dim); }
          .seats rect, .seats circle { fill: var(--ink); opacity: .78; }
          .seats circle[r="3.5"], .seats circle[r="4"] { fill: var(--dim); }
          .stage { fill: var(--signal); opacity: .9; }
          .label { fill: var(--ink); }
          .room { fill: var(--chalk); stroke: var(--ink); stroke-width: 1.5; }
        `}</style>

        {/* сетка 1 м */}
        <defs>
          <pattern id="grid" width={S} height={S} patternUnits="userSpaceOnUse" x={OX} y={OY}>
            <path d={`M ${S} 0 L 0 0 0 ${S}`} className="thin" />
          </pattern>
        </defs>
        <rect x={OX} y={OY} width={W} height={H} fill="url(#grid)" />

        {/* стены */}
        <rect x={OX} y={OY} width={W} height={H} className="wall" />

        {/* сцена и экран */}
        <rect x={OX} y={OY + (H - stageW) / 2} width={stageD} height={stageW} className="stage" />
        <text x={OX + stageD / 2} y={OY + H / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="12">
          сцена {hall.stageArea} м²
        </text>
        <line x1={OX + 4} y1={OY + (H - stageW) / 2 - 10} x2={OX + 4} y2={OY + (H + stageW) / 2 + 10} stroke="var(--ink)" strokeWidth="4" />
        <text x={OX + 12} y={OY + (H - stageW) / 2 - 16} className="label" fontSize="11">экран 5 × 2,5 м</text>

        {/* вход и бар */}
        <rect x={OX + W - 2 * S} y={OY + H - 4} width={2 * S} height={8} fill="var(--paper)" />
        <text x={OX + W - 1 * S} y={OY + H + 16} textAnchor="middle" className="label" fontSize="11">вход</text>
        <rect x={OX + W - 4 * S} y={OY + 4} width={3.5 * S} height={0.8 * S} className="thin" />
        <text x={OX + W - 2.25 * S} y={OY + 0.5 * S + 4} textAnchor="middle" className="label" fontSize="10">бар</text>

        <Seats layout={layout} />

        {/* размеры */}
        <Dim x1={OX} y1={OY - 18} x2={OX + W} y2={OY - 18} label={`${hall.widthM} м`} />
        <Dim x1={OX - 24} y1={OY} x2={OX - 24} y2={OY + H} label={`${String(hall.depthM).replace(".", ",")} м`} />
        <text x={OX + W / 2} y={OY + H + 36} textAnchor="middle" className="label">
          {hall.area} м² · h {hall.height} м · до {hall.capacityMax} чел.
        </text>

        {/* доп. помещения */}
        {rooms && (
          <g>
            <rect x={OX + W + 24} y={OY} width={8.5 * S} height={8 * S} className="room" />
            <text x={OX + W + 24 + 4.25 * S} y={OY + 3.6 * S} textAnchor="middle" className="label" fontSize="11">малый зал</text>
            <text x={OX + W + 24 + 4.25 * S} y={OY + 4.6 * S} textAnchor="middle" fill="var(--dim)" fontSize="11">68 м²</text>
            <rect x={OX + W + 24} y={OY + 8 * S + 12} width={6.6 * S} height={7 * S - 12} className="room" />
            <text x={OX + W + 24 + 3.3 * S} y={OY + 11.2 * S} textAnchor="middle" className="label" fontSize="11">переговорная</text>
            <text x={OX + W + 24 + 3.3 * S} y={OY + 12.2 * S} textAnchor="middle" fill="var(--dim)" fontSize="11">46 м²</text>
          </g>
        )}
      </svg>
      {caption && (
        <figcaption className="dimension mt-2">
          План схематичный: пропорции и расположение сцены уточняются по обмерам заказчика.
        </figcaption>
      )}
    </figure>
  );
}
