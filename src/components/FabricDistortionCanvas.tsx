import React, { useEffect, useRef, useState } from 'react';

interface FabricDistortionCanvasProps {
  imageSrc: string;
  alt: string;
  className?: string;
  isHovered?: boolean;
}

export const FabricDistortionCanvas: React.FC<FabricDistortionCanvasProps> = ({
  imageSrc,
  alt,
  className = '',
  isHovered = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [textureLoaded, setTextureLoaded] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const hoverFactorRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: false, alpha: true }) as WebGLRenderingContext | null;
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Fabric Weave & Silk Distortion)
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D u_image;
      uniform float u_time;
      uniform float u_hover;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = vUv;
        
        // Silk drape wave distortion
        float wave1 = sin(uv.y * 14.0 + u_time * 2.8) * cos(uv.x * 12.0 + u_time * 2.2);
        float wave2 = cos(uv.y * 22.0 - u_time * 1.5) * sin(uv.x * 18.0 + u_time * 1.8);
        
        float combinedWave = (wave1 + wave2 * 0.5);
        vec2 distortion = vec2(combinedWave * 0.018 * u_hover, combinedWave * 0.012 * u_hover);
        
        // Cursor proximity fabric ripple
        float mouseDist = distance(uv, u_mouse);
        float cursorInfluence = smoothstep(0.45, 0.0, mouseDist) * u_hover;
        distortion += vec2(
          sin(u_time * 3.5 + mouseDist * 12.0),
          cos(u_time * 3.5 + mouseDist * 12.0)
        ) * 0.015 * cursorInfluence;

        vec4 color = texture2D(u_image, uv + distortion);

        // Gold ambient sheen on silk wave crests (#C5A059)
        float crest = pow(clamp(combinedWave * 0.5 + 0.5, 0.0, 1.0), 3.0) * 0.15 * u_hover;
        color.rgb += vec3(0.77, 0.62, 0.35) * crest;

        gl_FragColor = color;
      }
    `;

    // Helper to compile shader
    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (fullscreen rectangle)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const imageLocation = gl.getUniformLocation(program, 'u_image');

    // Create & bind Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture params for non-power-of-2 images
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Load Image as Texture
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    let animId: number;
    let startTime = performance.now();

    img.onload = () => {
      try {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        setTextureLoaded(true);

        // Render Loop
        const render = (now: number) => {
          if (!canvas || !gl) return;

          // Resize canvas to client dimensions
          const rect = canvas.getBoundingClientRect();
          if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width;
            canvas.height = rect.height;
            gl.viewport(0, 0, canvas.width, canvas.height);
          }

          // Smooth hover factor interpolation
          const targetHover = isHovered ? 1.0 : 0.0;
          hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.08;

          const elapsedTime = (now - startTime) * 0.001;

          gl.useProgram(program);
          gl.uniform1f(timeLocation, elapsedTime);
          gl.uniform1f(hoverLocation, hoverFactorRef.current);
          gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
          gl.uniform1i(imageLocation, 0);

          gl.drawArrays(gl.TRIANGLES, 0, 6);

          animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);
      } catch (e) {
        console.warn('WebGL texture bind error, falling back to <img>:', e);
        setTextureLoaded(false);
      }
    };

    img.onerror = () => {
      setTextureLoaded(false);
    };

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, [imageSrc, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Base Standard Image (Shown if WebGL loading, or as seamless underlay) */}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 ${
          textureLoaded && webglSupported ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* WebGL Canvas with Fabric Distortion Fragment Shader */}
      {webglSupported && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
            textureLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
