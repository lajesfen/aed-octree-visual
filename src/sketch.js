import Node from "./core/Node";
import Point from "./core/Point";

export const sketch = (p5) => {
    let root;
    let input, button;
    let predefinedPoints = ["1, 1, 1", "1, -1, 1", "-1, 1, 1", "-1, -1, 1", "1, 1, -1", "1, -1, -1", "-1, 1, -1", "-1, -1, -1", "2, 2, 2", "3, 3, 3", "3, 1, 3", "1, 3, 3", "1, 1, 3", "1, 3, 1", "3, 3, 1", "3, 1, 1"];
    let index = 0;

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);

        input = p5.createInput();
        input.position(10, 10);

        button = p5.createButton('Insertar');
        button.position(160, 10);
        button.mousePressed(() => insertPoint(input.value()));

        root = new Node(p5, 0, 0, 0, 8);
    };

    p5.draw = () => {
        p5.background(90);
        p5.scale(20);
        root.draw();

        p5.orbitControl();
    };

    p5.keyReleased = () => {
        if (p5.key === ' ' && index < predefinedPoints.length) {
            insertPoint(predefinedPoints[index]);
            index++;
        }
    };

    function insertPoint(_input) {
        _input.replace(/\s/g, '');
        let coords = _input.split(',').map(Number);
        if (coords.length === 3) {
            let [x, y, z] = coords;
            root.insert(new Point(p5, x, y, z));
            console.log(`Inserted Point at (${x}, ${y}, ${z})`);
        }
    }
};
