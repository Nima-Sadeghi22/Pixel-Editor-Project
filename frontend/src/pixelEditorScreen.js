import React, { useRef, useEffect, useState } from 'react'
import * as cx from 'classnames'
import "./pixelStyles.css"
import SignaturePad from './SignaturePad';

import './App.css'

function PixelEditor(props) {

    /**
     * Parse Properties
     */
    const x = props.x;
    const y = props.y;
    const pixelWidth = props.pixelwidth;
    const gridWidth = props.gridwidth;
    const gridHeight = props.gridheight;
    const defaultColor = props.defaultcolor;
    const screenOffset = 5; // 5 is the temporary offset before I fix the blur issue
    const screenWidth = (x + gridWidth * pixelWidth + screenOffset);
    const screenHeight = (y + gridHeight * pixelWidth + screenOffset);

    /**
     * Setup State
     */
    const [selectedColor, setSelectedColor] = useState('#FF0000')
    const [openModal, setOpenModal] = useState(false);
    const [signature, setSignature] = useState(null);
    const [gridColors, setGridColors] = useState(Array.from({ length: gridHeight }, () => Array.from({ length: gridWidth }, () => defaultColor)))
    const [drawMode, setDrawMode] = useState("draw")
    const canvasRef = useRef(null)
    const colorRef = useRef(null)
    // console.log(selectedColor)

    /**
     * Setup actions
     */
    const drawGrid = (ctx, init) => {
        if (init) {
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
        for (let i = 0; i <= gridHeight; i++) {
            ctx.moveTo(x - 1, pixelWidth * i + y);                        //-1 and +1 create 
            ctx.lineTo(gridWidth * pixelWidth + x + 1, pixelWidth * i + y);   //square corners 
        }
        for (let i = 0; i <= gridWidth; i++) {
            ctx.moveTo(pixelWidth * i + x, y);
            ctx.lineTo(pixelWidth * i + x, gridHeight * pixelWidth + y);
        }
        if (signature) {
            const imgX = ctx.canvas.width - signature.width + 525;
            const imgY = ctx.canvas.height - signature.height + 225;
            ctx.drawImage(signature,imgX,imgY,150, 50); 
        }

        ctx.stroke();
        ctx.closePath();
    }

    const fill = (i, j, oldColor) => {
        handleSet(i, j, selectedColor);
        if (i > 0 && gridColors[i - 1][j] === oldColor) {
            fill(i - 1, j, oldColor);
        }
        if (i < gridColors.length - 1 && gridColors[i + 1][j] === oldColor) {
            fill(i + 1, j, oldColor);
        }
        if (j > 0 && gridColors[i][j - 1] === oldColor) {
            fill(i, j - 1, oldColor);
        }
        if (j < gridColors[0].length - 1 && gridColors[i][j + 1] === oldColor) {
            fill(i, j + 1, oldColor);
        }
    }

    const handleSet = (i, j, val) => {
        let copy = [...gridColors]
        copy[i][j] = val
        setGridColors(copy)
    }

    const onClick = event => { // (canvas, event)=> {
        const canvas = event.target;
        // console.log(event.target, selectedColor, selectedColor.current);
        const rect = canvas.getBoundingClientRect()
        const mousex = event.clientX - rect.left
        const mousey = event.clientY - rect.top
        let xindex = (mousex - x) / pixelWidth, yindex = (mousey - y) / pixelWidth
        xindex = Math.floor(xindex)
        yindex = Math.floor(yindex)
        if (xindex < 0 || yindex < 0 || xindex > gridWidth - 1 || yindex > gridHeight - 1) {
            return
        }
        if (drawMode === "draw") {
            handleSet(xindex, yindex, selectedColor);
        } else if (drawMode === "fill") {
            if (selectedColor !== gridColors[xindex][yindex]) {
                fill(xindex, yindex, gridColors[xindex][yindex])
            }
        } else if (drawMode === "select") {
            setSelectedColor(gridColors[xindex][yindex])
        } else if (drawMode === "erase") {
            handleSet(xindex, yindex, "#FFFFFF");
        }
        // Does this do anything?
        drawGrid(canvas.getContext('2d'), false);
    }

    /**
     * Setup
     */
    useEffect(() => { 
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        drawGrid(context, true)
    })

    return (
        <div>
            <canvas id="pixel_canvas" ref={canvasRef} onMouseDown={onClick} {...props} />
            <div>
                <button
                    className={cx({"selection_buttons": true, "selected": drawMode === "draw"})}
                    onClick={() => setDrawMode("draw")}
                >
                    <img id="img" alt="Pencil Tool" src={require("./images/pencilTool.png")} />
                </button>
                <button
                    className={cx({"selection_buttons": true, "selected": drawMode === "fill"})}
                    onClick={() => setDrawMode("fill")}
                >
                    <img id="img" alt="Bucket Tool" src={require("./images/bucketTool.png")} />
                </button>
                <button
                    className={cx({"selection_buttons": true, "selected": drawMode === "select"})}
                    onClick={() => setDrawMode("select")}
                >
                    <img id="img" alt="Dropper Tool" src={require("./images/dropperTool.png")} />
                </button>
                <button
                    className={cx({"selection_buttons": true, "selected": drawMode === "erase"})}
                    onClick={() => setDrawMode("erase")}
                >
                    <img id="img" alt="Eraser Tool" src={require("./images/eraserTool.png")} />
                </button>
            </div>
            <div>
                <input
                    type="color"
                    ref={colorRef}
                    onChange={e => setSelectedColor(e.target.value)}
                    value={selectedColor}
                    className="text_input"
                />
            </div>
            <p><button onClick={() => setOpenModal(true)}>Create Signature</button></p>
            {/* <h3>Signature</h3> */}
            {/* <div className="signatureDisplay" >
                {signature ? <img src={signature} width="300" alt="Signature" /> : <p>No Signature Set</p>}
            </div> */}
            <button className="download_button" onClick={() => {
                var a = document.createElement('a');
                a.href = document
                    .getElementById('pixel_canvas')
                    .toDataURL('Pixel_Editor_Download/png');
                a.download = "Pixel_Editor_Download.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }}>Download</button>

            {openModal && (
                <div className="modalContainer">
                    <div className="modal">
                        <SignaturePad
                            setSignature={base64encodedPNG => {
                                // console.log(base64encodedPNG)
                                const img = document.createElement('img');
                                img.src = base64encodedPNG;
                                img.onload = () => setSignature(img)
                            }}
                            setOpenModal={setOpenModal}
                        />
                        <div className="modal__bottom">
                            <button onClick={() => setOpenModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
}


export default PixelEditor