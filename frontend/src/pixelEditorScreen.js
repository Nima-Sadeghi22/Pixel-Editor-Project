import React, { useRef, useEffect, useState } from 'react'
import "./pixelStyles.css"
import SignaturePad from './SignaturePad';

import './App.css'

function PixelEditor(props){
    const drawMode = useRef("draw")
    const selectedColor = useRef(props.selectedColor)

    const [openModal, setOpenModal] = useState(false);
    const [signature, setSignature] = useState(null);

    var x=props.x;
    var y=props.y;
    var pixelWidth=props.pixelWidth;
    var gridWidth=props.gridWidth;
    var gridHeight=props.gridHeight;
    var defaultColor=props.defaultColor;
    var screenOffset = 5; // 5 is the temporary offset before I fix the blur issue

    var screenWidth = (x+gridWidth*pixelWidth + screenOffset);  
    var screenHeight = (y+gridHeight*pixelWidth + screenOffset);

    const [gridColors, setGridColors] = useState(Array.from({length: gridHeight},()=> Array.from({length: gridWidth}, () => defaultColor)))

    const canvasRef = useRef(null)

    useEffect(() => {
        var canvas = canvasRef.current
        var context = canvas.getContext('2d')
        drawGrid(context, true)
        if(canvas){
            canvas.addEventListener('mousedown', function(e) {
                onClick(canvas, e)
            })
        }
    }, [])

    return (
        <div>
            <canvas id = "pixel_canvas" ref={canvasRef} {...props}/>
            <div>
                <button class = "selection_buttons" onClick={() => drawMode.current="draw"}>
                    <img id = "img" src={require("./images/pencilTool.png")}/>
                </button>
                <button class = "selection_buttons" onClick={() => drawMode.current="fill"}>
                    <img id = "img" src={require("./images/bucketTool.png")}/>
                </button>
                <button class = "selection_buttons" onClick={() => drawMode.current="select"}>
                    <img id = "img" src={require("./images/dropperTool.png")}/>
                </button>
                <button class = "selection_buttons" onClick={() => drawMode.current="erase"}>
                    <img id = "img" src={require("./images/eraserTool.png")}/>
                </button>
            </div>
            <div>
                <input id="color_input" type="color" class="text_input" />
                <button
                    onClick={() => {
                        selectedColor.current = document.getElementById("color_input").value;
                        console.log(selectedColor.current)}
                    }
                    class="color_selection_buttons">
                    Choose Color (HEX)
                </button>
            </div>
            <p><button onClick={() => setOpenModal(true)}>Create Signature</button></p>
            {/* <h3>Signature</h3> */}
            <div className="signatureDisplay" >
                {signature ? <img src={signature} width="300" alt="Signature" /> : <p>No Signature Set</p>}
            </div>
            <button class = "download_button" onClick={() => {
                var a = document.createElement('a');
                a.href = document.getElementById('pixel_canvas').toDataURL('Pixel_Editor_Download/png')
                a.download = "Pixel_Editor_Download.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }}>Download</button>

            {openModal && (
            <div className="modalContainer">
                <div className="modal">
                    <SignaturePad setSignature={setSignature} setOpenModal={setOpenModal} />
                    <div className="modal__bottom">
                        <button onClick={() => setOpenModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>

           )}

        </div>
    );
    
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
        if(signature){
            ctx.drawImage(signature, 100, 100)
        }

        ctx.stroke();
        ctx.closePath();
        
    }

    function fill(i, j, oldColor){
        handleSet(i, j, selectedColor.current);
        if(i>0&&gridColors[i-1][j]==oldColor) {
            fill(i-1, j, oldColor);
        }
        if(i<gridColors.length-1&&gridColors[i+1][j]==oldColor) {
            fill(i+1, j, oldColor);
        }
        if(j>0&&gridColors[i][j-1]==oldColor) {
            fill(i, j-1, oldColor);
        }
        if(j<gridColors[0].length-1&&gridColors[i][j+1]==oldColor) {
            fill(i, j+1, oldColor);
        }
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
        if(drawMode.current=="draw"){
            handleSet(xindex, yindex, selectedColor.current);
        }else if(drawMode.current=="fill"){
            if(selectedColor.current!=gridColors[xindex][yindex]){
                fill(xindex, yindex, gridColors[xindex][yindex])
            }
        }else if(drawMode.current=="select"){
            selectedColor.current = gridColors[xindex][yindex];
        }else if(drawMode.current=="erase"){
            handleSet(xindex, yindex, "#FFFFFF");
        }
        drawGrid(canvas.getContext('2d'), false);
    }

    function handleSet(i, j, val){
        let copy = [...gridColors]
        copy[i][j] = val
        setGridColors(copy)
    }
      
}


export default PixelEditor