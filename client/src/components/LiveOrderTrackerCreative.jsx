import React, { useState, useEffect } from 'react';
import {
  SvgSaladBowl,
  SvgTadkaPan,
  SvgNagpurEV,
  SvgHarvestClock,
  SvgKnifeChop,
  SvgBagasseBox,
  SvgZeroMilePin,
  SvgOrderTicket
} from './TopicIllustrations';

export default function LiveOrderTrackerCreative({ order }) {
  const currentStatus = order?.status || 'received';
  
  // Status to step mapping
  const getStep = (s) => {
    if (s === 'delivered') return 5;
    if (s === 'out_for_delivery') return 4;
    if (s === 'tempering_tadka') return 3;
    if (s === 'chopping') return 2;
    return 1;
  };

  const activeStep = getStep(currentStatus);
  const [elapsedSec, setElapsedSec] = useState(8320); // ~2h 18m

  useEffect(() => {
    const t = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTimer = (total) => {
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const STAGES = [
    { num: '01', title: 'Placed', SvgComponent: SvgOrderTicket, detail: 'Kitchen ticket queued' },
    { num: '02', title: 'Cold Prep', SvgComponent: SvgKnifeChop, detail: 'Satara greens chopped' },
    { num: '03', title: 'Live Tadka', SvgComponent: SvgTadkaPan, detail: 'Mustard crackled in ghee' },
    { num: '04', title: 'In Transit', SvgComponent: SvgNagpurEV, detail: 'Nagpur EV dispatch' },
    { num: '05', title: 'At Door', SvgComponent: SvgSaladBowl, detail: 'Delivered fresh' }
  ];

  return (
    <div className="bg-jb-beige/40 rounded-2xl border-2 border-jb-dark p-3 sm:p-4 space-y-3 text-jb-dark text-xs">
      
      {/* 1. Precision Telemetry Header */}
      <div className="flex items-center justify-between pb-2 border-b border-jb-dark/20 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Telemetric Kitchen Feed // Nagpur</span>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <SvgHarvestClock className="w-3.5 h-3.5 text-jb-dark" />
          <span>HARVEST:</span>
          <span className="font-black text-jb-dark bg-white px-1.5 py-0.5 rounded border border-jb-dark/30">
            {formatTimer(elapsedSec)}
          </span>
        </div>
      </div>

      {/* 2. Sleek Linear Progress Rule with Custom Topic SVGs */}
      <div className="space-y-1 pt-1">
        <div className="relative flex items-center justify-between">
          {/* Connector hairline */}
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[2px] bg-jb-dark/20 z-0" />
          <div
            className="absolute top-1/2 left-3 -translate-y-1/2 h-[2px] bg-jb-dark z-0 transition-all duration-500"
            style={{ width: `${((activeStep - 1) / 4) * 94}%` }}
          />

          {STAGES.map((st, i) => {
            const stepNum = i + 1;
            const isDone = stepNum <= activeStep;
            const isCurrent = stepNum === activeStep;
            const StepSvg = st.SvgComponent;

            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-jb-green border-jb-dark text-jb-dark shadow-sm scale-110'
                      : isDone
                      ? 'bg-jb-dark border-jb-dark text-white'
                      : 'bg-white border-jb-dark/30 text-jb-muted'
                  }`}
                >
                  <StepSvg className={`w-3.5 h-3.5 ${isDone && !isCurrent ? 'text-white' : 'text-jb-dark'}`} />
                </div>
                <span
                  className={`text-[9px] uppercase font-black tracking-tight mt-1 ${
                    isCurrent ? 'text-jb-dark' : isDone ? 'text-jb-dark' : 'text-jb-muted'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Culinary Dispatch Receipt Strip */}
      <div className="bg-white rounded-xl border border-jb-dark/30 p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
        <div className="flex items-start gap-1.5">
          <SvgZeroMilePin className="w-3.5 h-3.5 text-jb-dark flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-jb-muted uppercase block text-[8px] font-bold">Prep Hub</span>
            <span className="font-black text-jb-dark block truncate">Dharampeth</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5">
          <SvgTadkaPan className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-jb-muted uppercase block text-[8px] font-bold">Live Tadka</span>
            <span className="font-black text-jb-dark block truncate">185°C Cow Ghee</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5">
          <SvgBagasseBox className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-jb-muted uppercase block text-[8px] font-bold">Container</span>
            <span className="font-black text-jb-dark block truncate">100% Bagasse</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5">
          <SvgNagpurEV className="w-3.5 h-3.5 text-jb-dark flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-jb-muted uppercase block text-[8px] font-bold">Transit</span>
            <span className="font-black text-jb-dark block truncate">Ather EV #04</span>
          </div>
        </div>
      </div>

      {/* 4. Live Chef's Status Dispatch Note */}
      <div className="p-2.5 rounded-xl bg-jb-beige/60 border border-jb-dark/20 flex items-start gap-2 text-[11px] font-medium leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 flex-shrink-0 animate-ping" />
        <p className="text-jb-dark">
          <strong className="uppercase font-bold">Kitchen Note: </strong>
          {activeStep >= 4
            ? 'Order dispatched on electric van. Insulated bagasse box maintains salad crispness at 8°C.'
            : activeStep === 3
            ? 'Mustard seeds and fresh curry leaves crackled live in pure cow ghee. Awaiting bagasse lid seal.'
            : 'Organic Satara greens cold-washed and protein tossed to order. Freshness guaranteed < 4 hours.'}
        </p>
      </div>

    </div>
  );
}
