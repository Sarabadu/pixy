import { useCallback, useState } from "react";
import { Grid } from "../grid";
import { ColorPicker } from "../color-picker";
import { constants } from "../../constants";

const { DEFAULT_GRID_SIZE } = constants;
export const MouseDraw = () => {
  const [dots, setdots] = useState(
    Array(DEFAULT_GRID_SIZE)
      .fill(0)
      .map(() =>
        Array(DEFAULT_GRID_SIZE)
          .fill(0)
          .map(() => ({ r: 0, g: 0, b: 0, a: 0 }))
      )
  );
  const [color, setColor] = useState("#FAFAFA");
  const changeInput = (e: React.ChangeEvent) => {
    const tar = e.target as HTMLInputElement;

    console.log(tar.value);
    setColor(tar.value);
  };

  const handleDotClick = useCallback(
    (e: React.MouseEvent, i: number, j: number) => {
      //console.debug(i,j,e)
      let [r, g, b] = color.match(/[a-f0-9]{1,2}/gi) as string[];
      setdots((dots) => {
        dots[j][i] = {
          r: parseInt(r, 16),
          g: parseInt(g, 16),
          b: parseInt(b, 16),
          a: 1,
        };

        return dots.map((c) => c.map((r: any) => r));
      });
    },
    [color]
  );
  return (
    <div className=" flex  flex-col items-center md:flex-row justify-center gap-1 ">
      <div className="md:w-1/12 w-11/12 flex flex-col justify-evenly h-full">
        <ColorPicker color={color} onChange={changeInput}></ColorPicker>
        <ColorPicker color={color} onChange={changeInput}></ColorPicker>
      </div>
      <div className="flex justify-center md:w-9/12 w-11/12 ">
        <Grid dots={dots} handleClick={handleDotClick} />
      </div>
    </div>
  );
};
