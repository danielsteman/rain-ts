class CanvasManager {
  private canvas: HTMLCanvasElement;
  private pixelSize: number;

  constructor(canvasId: string, pixelSize: number) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.pixelSize = pixelSize;
    this.init();
  }

  private get context(): CanvasRenderingContext2D {
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is not available");
    }
    return context;
  }

  private init(): void {
    this.setupEventListeners();
    this.drawGrid();
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
  }

  private handleMouse(event: MouseEvent): void {
    this.fillPixel(event.offsetX, event.offsetY);
  }

  private setPixel(offsetX: number, offsetY: number, fillColor: string): void {
    this.context.fillStyle = fillColor;
    const pixelSize = this.pixelSize;

    this.context.fillRect(
      Math.floor(offsetX / pixelSize) * pixelSize,
      Math.floor(offsetY / pixelSize) * pixelSize,
      pixelSize,
      pixelSize
    );
  }

  private fillPixel(
    offsetX: number,
    offsetY: number,
    fillColor: string = "black"
  ): void {
    this.setPixel(offsetX, offsetY, fillColor);
  }

  private clearPixel(
    offsetX: number,
    offsetY: number,
    fillColor: string = "white"
  ): void {
    this.setPixel(offsetX, offsetY, fillColor);
  }

  private drawGrid(): void {
    if (!this.context) {
      throw new Error("Canvas context is not available");
    }
    const pixelSize = this.pixelSize;
    const height = Math.floor(window.innerHeight / pixelSize) * pixelSize;
    const width = Math.floor(window.innerWidth / pixelSize) * pixelSize;

    this.canvas.setAttribute("height", height.toString());
    this.canvas.setAttribute("width", width.toString());

    this.context.clearRect(0, 0, width, height);
  }
}

const canvasManager = new CanvasManager("grid", 8);
