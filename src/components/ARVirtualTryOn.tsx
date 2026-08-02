import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Sparkles, X, RefreshCw, Download, Check, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ARVirtualTryOnProps {
  product: Product;
  onClose: () => void;
}

export const ARVirtualTryOn: React.FC<ARVirtualTryOnProps> = ({ product, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lightingMode, setLightingMode] = useState<'mayfair' | 'studio' | 'sunset'>('mayfair');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasCamera(false);
          setErrorMessage('Camera access is not supported by your browser environment.');
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasCamera(true);
        }
      } catch (err: any) {
        console.warn('Camera permission or availability notice:', err);
        setHasCamera(false);
        setErrorMessage(err.message || 'Camera permission was denied or camera is unavailable.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Render AR Overlay Loop
  useEffect(() => {
    let animationFrameId: number;

    const renderAR = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;

          ctx.clearRect(0, 0, w, h);

          // Draw lighting gradient filter
          if (lightingMode === 'mayfair') {
            const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 1.2);
            grad.addColorStop(0, 'rgba(197, 160, 89, 0.08)');
            grad.addColorStop(1, 'rgba(8, 8, 10, 0.45)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
          } else if (lightingMode === 'sunset') {
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, 'rgba(255, 140, 0, 0.12)');
            grad.addColorStop(1, 'rgba(197, 160, 89, 0.05)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
          }

          // AR Accessory Drawing
          const isAccessory = product.category.toLowerCase().includes('accessories') || product.name.toLowerCase().includes('glasses') || product.name.toLowerCase().includes('watch');

          // Draw Eyewear / Watch / Suit Canvas Overlay
          const time = Date.now() * 0.002;
          const floatOffset = Math.sin(time) * 4;

          // Target center for head / wrist
          const centerX = w / 2;
          const centerY = h / 2.3 + floatOffset;

          // Draw Bespoke Gold Wireframe Eyewear or Watch Overlay
          ctx.save();
          ctx.strokeStyle = '#C5A059';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#C5A059';
          ctx.shadowBlur = 12;

          if (product.name.toLowerCase().includes('glasses') || product.name.toLowerCase().includes('sunglasses') || isAccessory) {
            // Draw Glasses Frame
            const glassWidth = 140;
            const glassHeight = 60;

            // Left Lens
            ctx.beginPath();
            ctx.roundRect(centerX - glassWidth - 10, centerY - glassHeight / 2, glassWidth, glassHeight, 20);
            ctx.fillStyle = 'rgba(12, 12, 16, 0.45)';
            ctx.fill();
            ctx.stroke();

            // Right Lens
            ctx.beginPath();
            ctx.roundRect(centerX + 10, centerY - glassHeight / 2, glassWidth, glassHeight, 20);
            ctx.fillStyle = 'rgba(12, 12, 16, 0.45)';
            ctx.fill();
            ctx.stroke();

            // Bridge
            ctx.beginPath();
            ctx.moveTo(centerX - 10, centerY - 10);
            ctx.quadraticCurveTo(centerX, centerY - 20, centerX + 10, centerY - 10);
            ctx.stroke();

            // Gold Reflex Glint
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            ctx.moveTo(centerX - glassWidth + 10, centerY - glassHeight / 2 + 10);
            ctx.lineTo(centerX - 40, centerY + glassHeight / 2 - 10);
            ctx.lineTo(centerX - 30, centerY + glassHeight / 2 - 10);
            ctx.lineTo(centerX - glassWidth + 20, centerY - glassHeight / 2 + 10);
            ctx.fill();
          } else {
            // Suit / Outerwear AR Shoulder & Collar Blueprint Contour
            const collarY = centerY + 80;
            ctx.beginPath();
            ctx.moveTo(centerX - 180, collarY + 160);
            ctx.lineTo(centerX - 100, collarY);
            ctx.lineTo(centerX, collarY + 40);
            ctx.lineTo(centerX + 100, collarY);
            ctx.lineTo(centerX + 180, collarY + 160);
            ctx.stroke();

            // Gold Monogram Badge Tag
            ctx.fillStyle = 'rgba(197, 160, 89, 0.9)';
            ctx.font = '10px monospace';
            ctx.fillText(`AURELIUS AR • ${product.name.toUpperCase()}`, centerX - 100, collarY + 90);
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(renderAR);
    };

    renderAR();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [lightingMode, product]);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          if (video && video.readyState === 4) {
            ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
          } else {
            // Draw dark background if camera offline
            ctx.fillStyle = '#08080A';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          }
          ctx.drawImage(canvas, 0, 0);
          setCapturedImage(tempCanvas.toDataURL('image/png'));
        }
      }
      setIsCapturing(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080A]/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-xl max-w-3xl w-full p-6 relative shadow-2xl text-[#F8F9FA] space-y-4"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white cursor-pointer z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#C5A059]" />
          <div>
            <span className="text-[10px] font-mono tracking-extra uppercase text-[#C5A059]">
              ATELIER AR VIRTUAL FITTING
            </span>
            <h3 className="font-serif text-xl text-[#F8F9FA]">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Video / AR Viewport */}
        <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full bg-[#08080A] rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
          {hasCamera === false ? (
            /* Camera Permission Denied / Fallback Simulated Model Studio */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover filter brightness-50 blur-sm opacity-40"
              />
              <div className="relative z-10 glass-card p-6 rounded-xl max-w-md border border-[#C5A059]/40 space-y-3">
                <CameraOff className="w-8 h-8 text-[#C5A059] mx-auto" />
                <h4 className="font-serif text-lg text-[#F8F9FA]">Live Camera Preview Offline</h4>
                <p className="text-xs font-light text-white/70 leading-relaxed">
                  {errorMessage || 'Your browser camera feed is unavailable. Viewing simulated studio mannequin drape.'}
                </p>
                <div className="pt-2 flex justify-center">
                  <span className="text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/40 px-3 py-1 rounded">
                    3D SIMULATED MAYFAIR MANNEQUIN
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Live Camera Feed + AR Canvas Overlay */
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
              />
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
              />
            </>
          )}

          {/* Flash Effect on Capture */}
          {isCapturing && <div className="absolute inset-0 bg-white animate-ping z-30" />}
        </div>

        {/* Toolbar & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/50 uppercase">LIGHTING:</span>
            <button
              onClick={() => setLightingMode('mayfair')}
              className={`px-3 py-1 text-[10px] font-mono rounded border cursor-pointer ${
                lightingMode === 'mayfair'
                  ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059]'
                  : 'border-white/10 text-white/60'
              }`}
            >
              MAYFAIR EVENING
            </button>
            <button
              onClick={() => setLightingMode('sunset')}
              className={`px-3 py-1 text-[10px] font-mono rounded border cursor-pointer ${
                lightingMode === 'sunset'
                  ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059]'
                  : 'border-white/10 text-white/60'
              }`}
            >
              GOLDEN HOUR
            </button>
          </div>

          {/* Capture Snapshot Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCapture}
              data-cursor-text="SNAP"
              className="px-6 py-2.5 bg-[#C5A059] text-[#08080A] font-bold text-xs font-mono tracking-widest uppercase rounded hover:bg-white transition-colors cursor-pointer flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Look</span>
            </button>
          </div>
        </div>

        {/* Display Captured Snapshot Modal Preview */}
        {capturedImage && (
          <div className="p-4 bg-[#08080A] border border-[#C5A059]/40 rounded-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={capturedImage} alt="AR Snapshot" className="w-16 h-12 object-cover rounded border border-white/20" />
              <div>
                <p className="text-xs font-serif text-[#F8F9FA]">AR Fitting Captured</p>
                <p className="text-[10px] font-mono text-white/50">Saved to Mayfair Atelier session</p>
              </div>
            </div>

            <a
              href={capturedImage}
              download={`AURELIUS-AR-Fitting-${product.id}.png`}
              className="p-2.5 bg-white/10 hover:bg-[#C5A059] hover:text-[#08080A] text-white rounded transition-colors"
              title="Download Snapshot"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
