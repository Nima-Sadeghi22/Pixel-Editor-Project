import React, { useRef, useEffect } from 'react'
import "./pixelStyles.css"

    var x;
    var y;
    var pixelWidth;
    var gridWidth;
    var gridHeight;
    var defaultColor;
    var selectedColor;
    var screenOffset;

    var screenWidth; 
    var screenHeight;

    var gridColors = [];

function PixelEditor(props){

    x=props.x;
    y=props.y;
    pixelWidth=props.pixelWidth;
    gridWidth=props.gridWidth;
    gridHeight=props.gridHeight;
    defaultColor=props.defaultColor;
    selectedColor=props.selectedColor;
    screenOffset = 5; // 5 is the temporary offset before I fix the blur issue

    screenWidth = (x+gridWidth*pixelWidth + screenOffset);  
    screenHeight = (y+gridHeight*pixelWidth + screenOffset);

    gridColors = [];
    
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
    drawGrid(canvas.getContext('2d'), false);
}

export default PixelEditor