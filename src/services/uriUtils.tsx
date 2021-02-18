export function parseUriToColor(uri: string) {
  //console.log(uri);
  uri = uri.replace('/pix/', '');

  const rows = uri.split('/');

  return rows.map(row => {
    const pixels = row.match(/.{1,8}/g);

    const colorsPix = pixels?.map((pixel) => {
      let [r, g, b, a] = pixel.match(/.{1,2}/g) as string[];
      //console.log({r,g,b,a});
      r = parseBase36Color(r);
      g = parseBase36Color(g);
      b = parseBase36Color(b);
      a = parseBase36Alfa(a);
      return { r: r, g: g, b: b, a: a };

    });
    return colorsPix;
  });



}
function parseBase36Alfa(a: any): any {
  return Math.round((parseInt(a, 36) * 1000) / parseInt('zz', 36)) / 1000;
}
function parseBase36Color(color: any): any {
  return Math.round((parseInt(color, 36) * 255) / parseInt('zz', 36));
}
