import React, { useState } from "react";
import SignatureCanvas from 'react-signature-canvas'

function SignaturePad(){

const [openModel, setOpenModal] = useState(false);
  //Pad to Draw Signature
  return (
    <div className="sigPadContainer">
      <SignatureCanvas penColor="black" canvasProps={{ className: "sigCanvas" }} />
    </div>
  );
 }

 export default SignaturePad;