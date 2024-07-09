export default class Point {
    constructor(p5, x, y, z, color) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = 0.12;
        this.color = color || { r: 255, g: 255, b: 255 };
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.x, this.y, this.z);
        this.p5.noStroke();
        this.p5.fill(this.color.r, this.color.g, this.color.b);
        this.p5.sphere(this.size, 8, 8);

        this.p5.pop();
    }
}
