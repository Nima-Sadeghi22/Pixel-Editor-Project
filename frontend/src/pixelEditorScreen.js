import React, { useRef, useEffect } from 'react'
import "./pixelStyles.css"

function PixelEditor(props){
    let x=props.x;
    let y=props.y;
    let pixelWidth=props.pixelWidth;
    let gridWidth=props.gridWidth;
    let gridHeight=props.gridHeight;
    let defaultColor=props.defaultColor;

    var screenWidth = (x+gridWidth*pixelWidth + 5);  // + 5 is the temporary offset before I fix the blur issue
    var screenHeight = (y+gridHeight*pixelWidth + 5);

    var gridColors = [];
    for (let i = 0; i < gridWidth; i++) {
        gridColors.push([]);
        for (let j = 0; j < gridHeight; j++) {
            gridColors[i].push(defaultColor);
        }
    }
    
    //---------color demonstration----------
    //default color = #FFFF00
    gridColors[2][2] = "#000000";
    gridColors[7][2] = "#000000";
    gridColors[1][5] = "#000000";
    gridColors[1][6] = "#000000";
    gridColors[2][7] = "#000000";
    gridColors[3][7] = "#000000";
    gridColors[4][7] = "#000000";
    gridColors[5][7] = "#000000";
    gridColors[6][7] = "#000000";
    gridColors[7][7] = "#000000";
    gridColors[8][6] = "#000000";
    gridColors[8][5] = "#000000";
    //--------------------------------------

    const canvasRef = useRef(null)

    function drawGrid(ctx){
        ctx.canvas.width = screenWidth;
        ctx.canvas.height = screenHeight;
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = '#000000';
        for (let i = 0; i < gridWidth; i++) {
			for (let j = 0; j < gridHeight; j++) {
				ctx.fillStyle = gridColors[i][j];
				ctx.fillRect(i * pixelWidth + x, j * pixelWidth + y, pixelWidth, pixelWidth);
			}
		}
        ctx.beginPath();
        for(let i = 0; i <= gridHeight; i++){
            ctx.moveTo(x-1, pixelWidth*i+y);                        //-1 and +1 create 
            ctx.lineTo(gridWidth*pixelWidth+x+1, pixelWidth*i+y);   //square corners 
        }
        for(let i = 0; i <= gridWidth; i++){
            ctx.moveTo(pixelWidth*i+x, y);
            ctx.lineTo(pixelWidth*i+x, gridHeight*pixelWidth+y);
        }
        ctx.stroke();
    }

    // function getMousePos(canvas, evt) {
    //     var rect = canvas.getBoundingClientRect();
    //     return {
    //       x: evt.clientX - rect.left,
    //       y: evt.clientY - rect.top
    //     };
    // }
    
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      drawGrid(context)
    })
    
    return (
        <div>
            <canvas ref={canvasRef} {...props}/>
        </div>
    
    );
}

export default PixelEditor