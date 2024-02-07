class CanvasManager {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private pixelSize: number;

  constructor(canvasId: string, pixelSize: number) {
    this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    this.pixelSize = pixelSize;
    this.context = this.canvas.getContext("2d");
    if (!this.context) {
      throw new Error("Canvas context is not available");
    }
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.drawGrid();
  }

  private setupEventListeners(): void {
    this.canvas.addEventListener("mousemove", this.handleMouse.bind(this));
  }

  private handleMouse(event: MouseEvent): void {
    if (!this.context) {
      throw new Error("Canvas context is not available");
    }

    this.context.fillStyle = "black";
    const pixelSize = this.pixelSize;

    this.context.fillRect(
      Math.floor(event.offsetX / pixelSize) * pixelSize,
      Math.floor(event.offsetY / pixelSize) * pixelSize,
      pixelSize,
      pixelSize
    );
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
