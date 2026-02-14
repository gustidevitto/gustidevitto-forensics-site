// Sophisticated SVG Graphics for Entrance Gate
export function SingleEntityGraphic() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-30">
                <defs>
                    <radialGradient id="grad-blue" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Background Glow */}
                <circle cx="200" cy="200" r="150" fill="url(#grad-blue)" className="animate-pulse" />

                {/* Outer Fragments */}
                <g className="animate-[spin_40s_linear_infinite]">
                    <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 15" className="text-primary/20" />
                </g>

                {/* Main Rotating Rings */}
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30 animate-[spin_20s_linear_infinite]" strokeDasharray="60 20" />
                <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/40 animate-[spin_15s_linear_infinite_reverse]" strokeDasharray="10 40" />

                {/* Core Geometry - Diamond/Hex Hybrid */}
                <g className="animate-float">
                    <path
                        d="M200 140 L251.96 170 L251.96 230 L200 260 L148.04 230 L148.04 170 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary animate-pulse"
                    />
                    <path
                        d="M200 160 L234.64 180 L234.64 220 L200 240 L165.36 220 L165.36 180 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/60"
                        strokeDasharray="4 4"
                    />
                    <circle cx="200" cy="200" r="5" className="fill-primary animate-ping" />
                </g>

                {/* Data Pointers */}
                <g className="text-primary/50 text-[8px] font-mono">
                    <text x="210" y="130" className="animate-pulse">UNIT_ALPHA_01</text>
                    <text x="260" y="210" className="animate-pulse delay-700">ISO_CORE_ACTIVE</text>
                </g>

                {/* Scanning Vertical Line */}
                <line x1="100" y1="0" x2="100" y2="400" stroke="currentColor" strokeWidth="0.5" className="text-primary/20 animate-scanline" />
            </svg>
        </div>
    )
}

export function NetworkGraphic() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-30">
                <defs>
                    <radialGradient id="grad-red" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Background Glow */}
                <circle cx="200" cy="200" r="180" fill="url(#grad-red)" />

                {/* Background Grid */}
                <g className="text-red-900/10">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`h-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="currentColor" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="currentColor" strokeWidth="0.5" />
                    ))}
                </g>

                {/* Network Connections */}
                <g className="text-red-500/20">
                    <path d="M80 80 L320 80 L350 200 L320 320 L80 320 L50 200 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" className="animate-[spin_60s_linear_infinite]" />
                </g>

                {/* Enterprise Nodes */}
                {[
                    [80, 80], [320, 80], [350, 200], [320, 320], [80, 320], [50, 200], [200, 200], [200, 80], [200, 320]
                ].map(([x, y], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r="4" className="fill-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <circle cx={x} cy={y} r="10" className="stroke-red-500/30 fill-none animate-pulse" />
                        {i % 3 === 0 && <circle cx={x} cy={y} r="15" className="stroke-red-500/10 fill-none animate-ping" />}
                    </g>
                ))}

                {/* Data Streams (Active Pulses) */}
                <g className="text-red-400">
                    {[
                        { d: "M80 80 L200 200", dur: "1.5s", del: "0s" },
                        { d: "M320 80 L200 200", dur: "2s", del: "0.5s" },
                        { d: "M350 200 L200 200", dur: "1.2s", del: "0.2s" },
                        { d: "M320 320 L200 200", dur: "1.8s", del: "1s" },
                        { d: "M80 320 L200 200", dur: "2.5s", del: "0.3s" }
                    ].map((pulse, i) => (
                        <circle key={i} r="2" fill="currentColor">
                            <animateMotion
                                dur={pulse.dur}
                                repeatCount="indefinite"
                                path={pulse.d}
                                begin={pulse.del}
                            />
                        </circle>
                    ))}
                </g>

                {/* HUD Data Text */}
                <g className="text-red-500/40 text-[7px] font-mono leading-none">
                    <text x="50" y="30" className="animate-pulse">NODE_COUNT: 42</text>
                    <text x="300" y="370" className="animate-pulse delay-500">SYNC_ACTIVE</text>
                </g>
            </svg>
        </div>
    )
}
