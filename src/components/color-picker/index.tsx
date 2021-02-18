export function ColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (e: React.ChangeEvent) => void;
}) {
  return (
    <div style={{ backgroundColor: color }}>
      <input
        data-testid="color-picker"
        type="color"
        name="color"
        id="color"
        value={color}
        onChange={onChange}
      />
    </div>
  );
}
