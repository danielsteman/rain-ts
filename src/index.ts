class Universe {
  public drawGrid(): void {
    const canvas = <HTMLCanvasElement>document.getElementById("grid");
    const pixelSize = 16;
    const height = Math.floor(window.innerHeight / pixelSize) * pixelSize;
    const width = Math.floor(window.innerWidth / pixelSize) * pixelSize;

    canvas.setAttribute("height", height.toString());
    canvas.setAttribute("width", width.toString());

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not available");
    }

    const cols = Math.floor(width / pixelSize);
    const rows = Math.floor(height / pixelSize);

    context.clearRect(0, 0, width, height);

    for (let col = 0; col <= cols; col++) {
      const x = col * pixelSize;
      context.moveTo(x, 0);
      context.lineTo(x, rows * pixelSize);
    }

    for (let row = 0; row <= rows; row++) {
      const y = row * pixelSize;
      context.moveTo(0, y);
      context.lineTo(cols * pixelSize, y);
    }

    context.strokeStyle = "#000";
    context.stroke();
  }
}

const universe = new Universe();
universe.drawGrid();
