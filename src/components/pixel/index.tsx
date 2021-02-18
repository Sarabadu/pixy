import { ReactNode } from "react";

interface Props {
  color?: string;
  children?: ReactNode;
  handleClick?: (e: React.MouseEvent) => void;
  x?: number;
  y?: number;
  //[key:string]:any
}
export const Pixel = ({ color, children, handleClick, x, y }: Props) => {
  return (
    <div
      data-testid="pixel"
      data-x={x}
      data-y={y}
      style={{ color: color || "transparent" }}
      className="pixel bg-current h-4 w-4 border border-gray-600 rounded-sm"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
