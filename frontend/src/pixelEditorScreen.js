import React, { useRef, useEffect } from 'react'
import "./pixelStyles.css"

const PixelEditor = props => {
  
    const canvasRef = useRef(null)
    
    const draw1 = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2*Math.PI)
        ctx.fill()
    }

    const draw2 = ctx => {
        ctx.fillStyle = '#c3c3c3'
        ctx.fillRect(100,100,100,100)
    }
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      draw1(context)
      draw2(context)
    })
    
    return (
        <div>
            This is the page for the pixel editor.
            <canvas ref={canvasRef} {...props}/>
        </div>
    
    );
}

export default PixelEditor
