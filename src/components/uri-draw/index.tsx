import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { parseUriToColor } from "../../services/uriUtils";
import { Grid } from "../grid";



export const UriDraw= ()=> {
  const location = useLocation()
  const param = useParams() as any
  //let dots2 = Array(40).fill(Array(40).fill({r:255,g:5,b:100,a:1}))
  
  return (
    <div className=" m-10 max-w-full bg-gray-700">
        <Grid dots={parseUriToColor(location.pathname)} />
    </div>
  );
}