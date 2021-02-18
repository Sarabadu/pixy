import React, { useState } from "react";
import { Pixel } from "../pixel"

const Pix = React.memo(Pixel);
export const Row = React.memo((props:any) => {
    
    
    return (
        <div className="flex max-w-max "  data-testid="row">
             {props.dots.map((dot:any, j:number) => <Pix 
             //handleClick={(e) => props.handleClick(e,props.i,j)} 
             x={j}
             y={props.i}
             key={props.i + ',' + j} 
             color={getColorFromObj(dot)}/>)}
        </div>
    );
})


export const Grid = (props:any) => {

    const [isPainting, setIsPainting] = useState(false)
    // console.debug(Pixel)
    const handleGridClick = (e:React.MouseEvent) =>{
        const tj = e.target as HTMLElement
        if (tj.classList.contains('pixel') ){
            props.handleClick(e,tj.dataset.x,tj.dataset.y)
        }
        // console.log(e,e.target)
    }

    const startPaint =()=>{ setIsPainting(true)}
    const endPaint =()=>{ setIsPainting(false)}
    const paint =(e:any) =>{
        
        console.log(e)
        const xcoord = e.touches? e.touches[0].pageX : e.pageX;
        const ycoord = e.touches? e.touches[0].pageY : e.pageY;
        const tj = document.elementFromPoint(xcoord - window.pageXOffset,ycoord- window.pageYOffset) as HTMLElement//e.target as HTMLElement
        if (tj?.classList?.contains('pixel') && isPainting){
            props.handleClick(e,tj.dataset.x,tj.dataset.y)
        }
        // console.log(e,e.target)
    }

    return (
        <div 
        className="flex flex-col items-center " 
        data-testid="grid"  
        onClick={handleGridClick}
        onMouseDown={startPaint}
        onMouseUp={endPaint}
        onMouseMove={paint}
        onTouchStart={startPaint}
        onTouchEnd={endPaint}
        onTouchMove={paint}
        style={{touchAction: 'none'}}
        >

            {props.dots.map((row:any[], i:number) => <Row {...props} key={i} dots={row} i={i}  ></Row>)}
        </div>
    );
}
function getColorFromObj(dot: any): (string & {}) {
    let {r,g,b,a} = dot
    const alpha = [r, g, b, a].every(v => v === undefined) ? 0 : a
    const red = r ?? 0
    const green = g ?? 0
    const blue = b ?? 0

    return `rgba(${red},${green},${blue},${alpha})`
}

