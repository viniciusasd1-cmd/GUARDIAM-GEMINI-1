import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  hexToHsl,
  hslToHex,
  hslToRgb,
  getContrastRatio,
  getWCAGContrastText,
  HSL,
} from '../../theme/themeEngine';
import { Check, Copy } from 'lucide-react';

interface ColorPickerProps {
  color: string; // Current HEX (e.g. #1565C0)
  onChange: (newHex: string) => void;
  id?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  id = 'guardiam-color-picker',
}) => {
  const [hsl, setHsl] = useState<HSL>(() => hexToHsl(color));
  const [hexInput, setHexInput] = useState(color.toUpperCase());
  const [copied, setCopied] = useState(false);

  const satValRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);
  const isDraggingSatVal = useRef(false);
  const isDraggingHue = useRef(false);

  // Sync internal state when external prop changes
  useEffect(() => {
    const nextHsl = hexToHsl(color);
    setHsl(nextHsl);
    setHexInput(color.toUpperCase());
  }, [color]);

  // Update color from HSL and propagate
  const updateHsl = useCallback(
    (newHsl: HSL) => {
      setHsl(newHsl);
      const newHex = hslToHex(newHsl);
      setHexInput(newHex);
      onChange(newHex);
    },
    [onChange]
  );

  // 1. Handle Saturation/Value 2D Plane Dragging
  const handleSatValMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!satValRef.current) return;
      const rect = satValRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

      const s = Math.round((x / rect.width) * 100);
      const v = Math.round((1 - y / rect.height) * 100); // 0 at bottom, 100 at top

      // Convert HSV (H, S, V) to HSL (H, S, L)
      const l = ((2 - s / 100) * (v / 100)) / 2;
      const sHsl = l !== 0 && l !== 1 ? ((v / 100) - l) / Math.min(l, 1 - l) : 0;

      updateHsl({
        h: hsl.h,
        s: Math.round(Math.max(0, Math.min(100, sHsl * 100))),
        l: Math.round(Math.max(0, Math.min(100, l * 100))),
      });
    },
    [hsl.h, updateHsl]
  );

  // 2. Handle Hue 1D Bar Dragging
  const handleHueMove = useCallback(
    (clientX: number) => {
      if (!hueBarRef.current) return;
      const rect = hueBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const h = Math.round((x / rect.width) * 360);

      updateHsl({
        ...hsl,
        h: Math.min(360, Math.max(0, h)),
      });
    },
    [hsl, updateHsl]
  );

  // Global mouse / touch listeners for seamless dragging
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingSatVal.current) {
        e.preventDefault();
        handleSatValMove(clientX, clientY);
      } else if (isDraggingHue.current) {
        e.preventDefault();
        handleHueMove(clientX);
      }
    };

    const handlePointerUp = () => {
      isDraggingSatVal.current = false;
      isDraggingHue.current = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: false });
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [handleSatValMove, handleHueMove]);

  // Handle manual HEX input
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    if (!val.startsWith('#')) val = '#' + val;
    setHexInput(val);

    if (/^#[0-9A-F]{6}$/i.test(val)) {
      const parsedHsl = hexToHsl(val);
      setHsl(parsedHsl);
      onChange(val);
    }
  };

  const copyHexToClipboard = () => {
    navigator.clipboard?.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Compute contrast against pure white & pure black for WCAG badge
  const contrastWithWhite = getContrastRatio(color, '#FFFFFF');
  const contrastWithBlack = getContrastRatio(color, '#0F172A');
  const recommendedTextColor = getWCAGContrastText(color);
  const bestRatio = Math.max(contrastWithWhite, contrastWithBlack);
  const isAASafe = bestRatio >= 4.5;
  const isAAASafe = bestRatio >= 7.0;

  // Pure hue background for the 2D picker
  const pureHueHex = hslToHex({ h: hsl.h, s: 100, l: 50 });

  return (
    <div id={id} className="w-full space-y-4 select-none">
      {/* 1. Interactive 2D Saturation / Value Gradient Area */}
      <div
        ref={satValRef}
        onMouseDown={(e) => {
          isDraggingSatVal.current = true;
          handleSatValMove(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          isDraggingSatVal.current = true;
          handleSatValMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        className="relative w-full h-44 rounded-2xl overflow-hidden cursor-crosshair shadow-inner border border-slate-200/80 dark:border-slate-700"
        style={{
          backgroundColor: pureHueHex,
        }}
      >
        {/* Horizontal white gradient (Saturation) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        {/* Vertical black gradient (Brightness/Value) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        {/* Draggable Circular Indicator */}
        <div
          className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.5)] pointer-events-none ring-1 ring-black/20"
          style={{
            left: `${hsl.s}%`,
            top: `${100 - hsl.l}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* 2. Rainbow Hue Slider (0° - 360°) */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Matiz (Hue)</span>
          <span className="font-mono text-[11px]">{hsl.h}°</span>
        </div>
        <div
          ref={hueBarRef}
          onMouseDown={(e) => {
            isDraggingHue.current = true;
            handleHueMove(e.clientX);
          }}
          onTouchStart={(e) => {
            isDraggingHue.current = true;
            handleHueMove(e.touches[0].clientX);
          }}
          className="relative w-full h-7 rounded-xl cursor-ew-resize border border-slate-200/80 dark:border-slate-700 shadow-inner"
          style={{
            background:
              'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
          }}
        >
          {/* Thumb indicator on Hue Bar */}
          <div
            className="absolute top-0 bottom-0 w-4 -ml-2 rounded-lg bg-white border-2 border-slate-800 shadow-md pointer-events-none transition-transform active:scale-110"
            style={{
              left: `${(hsl.h / 360) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 3. Color Preview, HEX input and WCAG Readability Badge */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
        {/* Real-time Swatch */}
        <div
          className="w-12 h-12 rounded-xl shadow-md border border-white/20 shrink-0 flex items-center justify-center transition-all"
          style={{ backgroundColor: color }}
        >
          <span
            className="text-[10px] font-bold"
            style={{ color: recommendedTextColor }}
          >
            Aa
          </span>
        </div>

        {/* HEX Input */}
        <div className="flex-1 text-left space-y-0.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Código HEX
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              maxLength={7}
              placeholder="#1565C0"
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 uppercase focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={copyHexToClipboard}
              className="absolute right-1.5 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Copiar HEX"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* WCAG Contrast Metric Indicator */}
        <div className="text-right shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Contraste WCAG
          </span>
          <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span>{bestRatio.toFixed(1)}:1</span>
            <span>{isAAASafe ? '· AAA' : isAASafe ? '· AA' : '· Ajustado'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
