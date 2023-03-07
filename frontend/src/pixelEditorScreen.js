import React, { useRef, useEffect } from 'react'
import "./pixelStyles.css"

function PixelEditor(props){
    let x=props.x;
    let y=props.y;
    let pixelWidth=props.pixelWidth;
    let gridWidth=props.gridWidth;
    let gridHeight=props.gridHeight;
    let defaultColor=props.defaultColor;
    let selectedColor=props.selectedColor;
    let screenOffset = 5; // 5 is the temporary offset before I fix the blur issue

    var screenWidth = (x+gridWidth*pixelWidth + screenOffset);  
    var screenHeight = (y+gridHeight*pixelWidth + screenOffset);

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

    function drawGrid(ctx, init){
        if(init){
            ctx.canvas.width = screenWidth;
            ctx.canvas.height = screenHeight;
            ctx.lineWidth = 1.3;
        }
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        for (let i = 0; i < gridWidth; i++) {
			for (let j = 0; j < gridHeight; j++) {
				ctx.fillStyle = gridColors[i][j];
				ctx.fillRect(i * pixelWidth + x, j * pixelWidth + y, pixelWidth, pixelWidth);
			}
		}
        for(let i = 0; i <= gridHeight; i++){
            ctx.moveTo(x-1, pixelWidth*i+y);                        //-1 and +1 create 
            ctx.lineTo(gridWidth*pixelWidth+x+1, pixelWidth*i+y);   //square corners 
        }
        for(let i = 0; i <= gridWidth; i++ ){
            ctx.moveTo(pixelWidth*i+x, y);
            ctx.lineTo(pixelWidth*i+x, gridHeight*pixelWidth+y);
        }
        ctx.stroke();
        ctx.closePath();
    }

    function onClick(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const mousex = event.clientX - rect.left
        const mousey = event.clientY - rect.top
        let xindex = (mousex-x)/pixelWidth, yindex = (mousey-y)/pixelWidth
        xindex = Math.floor(xindex)
        yindex = Math.floor(yindex)
        if(xindex<0||yindex<0||xindex>gridWidth-1||yindex>gridHeight-1){
            return
        }
        gridColors[xindex][yindex] = selectedColor;
        console.log(xindex+", "+yindex+", "+gridColors[xindex][yindex])
        drawGrid(canvas.getContext('2d'), false);
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        drawGrid(context, true)
        if(canvas){
            canvas.addEventListener('mousedown', function(e) {
                onClick(canvas, e)
            })
        }
    })
    
    return (
        <div>
            <canvas ref={canvasRef} {...props}/>
        </div>
    
    );
    
}

export default PixelEditor