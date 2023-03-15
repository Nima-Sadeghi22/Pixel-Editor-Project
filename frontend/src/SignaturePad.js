import React, { useState, useRef,Fragment } from "react";
import SignatureCanvas from 'react-signature-canvas'


function SignaturePad(props){

  const { setSignature, setOpenModal } = props;
  const sigCanvas = useRef();
  const [penColor, setPenColor] = useState("black");
  const colors = ["black", "green", "red", "purple", "yellow", "blue", "pink", "orange"]

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(URL);
    setOpenModal(false);
  };

  //Pad to Draw Signature
  return (
    <Fragment>
      <div className="sigPad__penColors">
        <p>Pen Color:</p>
        {colors.map((color) => (
          <span
          key={color}
          style={{
            backgroundColor: color,
            border: `${color === penColor ? `2px solid ${color}` : ""}`,
          }}
          onClick={() => setPenColor(color)}
          ></span>
        ))}
      </div>

      <div className="sigPadContainer">
        <SignatureCanvas penColor={penColor}
          canvasProps={{ className: "sigCanvas" }} 
          ref={sigCanvas}
        />
        <hr/>
        <button onClick={() => sigCanvas.current.clear()}>Clear</button>
        <button className="create" onClick={create}>Create</button>
        
      </div>
    </Fragment>
  );
 }

 export default SignaturePad;