import Point from "./Point";

export default class Node {
    constructor(p5, x, y, z, size) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.halfSize = size/2;
        this.color = {r: 247, g: 192, b: 64};

        this.children = [];
        this.points = [];
        this.isLeaf = true;

        this.draw();
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.x, this.y, this.z);
        this.p5.noFill();
        this.p5.box(this.size);
        this.p5.pop();

        if (!this.isLeaf) {
            for (let child of this.children) {
                child.draw();
            }
        }

        for (let point of this.points) {
            point.draw();
        }
    }

    insert(point) {
        if(!this.contains(point)) {
            return;
        }

        if(this.isLeaf) {
            let newPoint = new Point(this.p5, point.x, point.y, point.z, this.color);
            this.points.push(newPoint);

            if(this.points.length > 8) {
                this.subdivide();

                for (let p of this.points) {
                    for(let child of this.children) {
                        if (child.contains(p)) {
                            child.insert(p);
                            break;
                        }
                    }
                }
                this.points = [];
            }
        } else {
            for(let child of this.children) {
                if(child.contains(point)) {
                    child.insert(point);
                    break;
                }
            }
        }
    }

    contains(point) {
        return(
            point.x >= this.x - this.halfSize && point.x <= this.x + this.halfSize &&
            point.y >= this.y - this.halfSize && point.y <= this.y + this.halfSize &&
            point.z >= this.z - this.halfSize && point.z <= this.z + this.halfSize)
    }

    subdivide() {
        console.log('Subdividing')
        const quarterSize = this.halfSize / 2;
        for(let i = 0; i < 8; i++) {
            const offsetX = ((i & 1) ? quarterSize : -quarterSize);
            const offsetY = ((i & 2) ? quarterSize : -quarterSize);
            const offsetZ = ((i & 4) ? quarterSize : -quarterSize);

            let newNode = new Node(this.p5, this.x + offsetX, this.y + offsetY, this.z + offsetZ, this.halfSize);
            newNode.color = {r: 247, g: (this.color.g - 50), b: 64};
            this.children.push(newNode);
        }
        this.isLeaf = false;
    }
}