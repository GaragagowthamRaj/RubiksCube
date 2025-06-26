class RubiksCube {
    constructor() {
        this.reset();
        this.solutionSteps = [];
    }
    
    reset() {
        this.faces = {
            U: Array(3).fill().map(() => Array(3).fill('w')),
            D: Array(3).fill().map(() => Array(3).fill('y')),
            F: Array(3).fill().map(() => Array(3).fill('g')),
            B: Array(3).fill().map(() => Array(3).fill('b')),
            L: Array(3).fill().map(() => Array(3).fill('o')),
            R: Array(3).fill().map(() => Array(3).fill('r'))
        };
        this.solutionSteps = [];
    }
    
    scramble(moves = 20) {
        const faces = ['F', 'B', 'U', 'D', 'L', 'R'];
        const directions = ['CW', 'CCW'];
        
        for (let i = 0; i < moves; i++) {
            const face = faces[Math.floor(Math.random() * faces.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            this.rotate(face, direction);
        }
    }
    
    rotate(face, direction) {
        this.rotateFace(face, direction);
        this.rotateEdges(face, direction);
        
        const moveNotation = `${face}${direction === 'CW' ? '' : "'"}`;
        this.solutionSteps.push({
            move: moveNotation,
            state: this.getStateString()
        });
    }
    
    rotateFace(face, direction) {
        const faceData = this.faces[face];
        const rotated = Array(3).fill().map(() => Array(3));
        
        if (direction === 'CW') {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rotated[j][2 - i] = faceData[i][j];
                }
            }
        } else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rotated[2 - j][i] = faceData[i][j];
                }
            }
        }
        
        this.faces[face] = rotated;
    }
    
    rotateEdges(face, direction) {
        switch (face) {
            case 'F': this.rotateFrontEdges(direction); break;
            case 'B': this.rotateBackEdges(direction); break;
            case 'U': this.rotateUpEdges(direction); break;
            case 'D': this.rotateDownEdges(direction); break;
            case 'L': this.rotateLeftEdges(direction); break;
            case 'R': this.rotateRightEdges(direction); break;
        }
    }
    
    rotateFrontEdges(direction) {
        const { U, D, L, R } = this.faces;
        const temp = [U[2][0], U[2][1], U[2][2]];
        
        if (direction === 'CW') {
            U[2][0] = L[2][2]; U[2][1] = L[1][2]; U[2][2] = L[0][2];
            L[0][2] = D[0][0]; L[1][2] = D[0][1]; L[2][2] = D[0][2];
            D[0][0] = R[2][0]; D[0][1] = R[1][0]; D[0][2] = R[0][0];
            R[0][0] = temp[0]; R[1][0] = temp[1]; R[2][0] = temp[2];
        } else {
            U[2][0] = R[0][0]; U[2][1] = R[1][0]; U[2][2] = R[2][0];
            R[0][0] = D[0][2]; R[1][0] = D[0][1]; R[2][0] = D[0][0];
            D[0][0] = L[0][2]; D[0][1] = L[1][2]; D[0][2] = L[2][2];
            L[0][2] = temp[2]; L[1][2] = temp[1]; L[2][2] = temp[0];
        }
    }
    
    rotateBackEdges(direction) {
        const { U, D, L, R } = this.faces;
        const temp = [U[0][0], U[0][1], U[0][2]];
        
        if (direction === 'CW') {
            U[0][0] = R[0][2]; U[0][1] = R[1][2]; U[0][2] = R[2][2];
            R[0][2] = D[2][2]; R[1][2] = D[2][1]; R[2][2] = D[2][0];
            D[2][0] = L[0][0]; D[2][1] = L[1][0]; D[2][2] = L[2][0];
            L[0][0] = temp[2]; L[1][0] = temp[1]; L[2][0] = temp[0];
        } else {
            U[0][0] = L[2][0]; U[0][1] = L[1][0]; U[0][2] = L[0][0];
            L[0][0] = D[2][0]; L[1][0] = D[2][1]; L[2][0] = D[2][2];
            D[2][0] = R[2][2]; D[2][1] = R[1][2]; D[2][2] = R[0][2];
            R[0][2] = temp[0]; R[1][2] = temp[1]; R[2][2] = temp[2];
        }
    }
    
    rotateUpEdges(direction) {
        const { F, B, L, R } = this.faces;
        const temp = [F[0][0], F[0][1], F[0][2]];
        
        if (direction === 'CW') {
            F[0][0] = L[0][0]; F[0][1] = L[0][1]; F[0][2] = L[0][2];
            L[0][0] = B[0][0]; L[0][1] = B[0][1]; L[0][2] = B[0][2];
            B[0][0] = R[0][0]; B[0][1] = R[0][1]; B[0][2] = R[0][2];
            R[0][0] = temp[0]; R[0][1] = temp[1]; R[0][2] = temp[2];
        } else {
            F[0][0] = R[0][0]; F[0][1] = R[0][1]; F[0][2] = R[0][2];
            R[0][0] = B[0][0]; R[0][1] = B[0][1]; R[0][2] = B[0][2];
            B[0][0] = L[0][0]; B[0][1] = L[0][1]; B[0][2] = L[0][2];
            L[0][0] = temp[0]; L[0][1] = temp[1]; L[0][2] = temp[2];
        }
    }
    
    rotateDownEdges(direction) {
        const { F, B, L, R } = this.faces;
        const temp = [F[2][0], F[2][1], F[2][2]];
        
        if (direction === 'CW') {
            F[2][0] = R[2][0]; F[2][1] = R[2][1]; F[2][2] = R[2][2];
            R[2][0] = B[2][0]; R[2][1] = B[2][1]; R[2][2] = B[2][2];
            B[2][0] = L[2][0]; B[2][1] = L[2][1]; B[2][2] = L[2][2];
            L[2][0] = temp[0]; L[2][1] = temp[1]; L[2][2] = temp[2];
        } else {
            F[2][0] = L[2][0]; F[2][1] = L[2][1]; F[2][2] = L[2][2];
            L[2][0] = B[2][0]; L[2][1] = B[2][1]; L[2][2] = B[2][2];
            B[2][0] = R[2][0]; B[2][1] = R[2][1]; B[2][2] = R[2][2];
            R[2][0] = temp[0]; R[2][1] = temp[1]; R[2][2] = temp[2];
        }
    }
    
    rotateLeftEdges(direction) {
        const { U, D, F, B } = this.faces;
        const temp = [U[0][0], U[1][0], U[2][0]];
        
        if (direction === 'CW') {
            U[0][0] = B[2][2]; U[1][0] = B[1][2]; U[2][0] = B[0][2];
            B[0][2] = D[2][0]; B[1][2] = D[1][0]; B[2][2] = D[0][0];
            D[0][0] = F[0][0]; D[1][0] = F[1][0]; D[2][0] = F[2][0];
            F[0][0] = temp[0]; F[1][0] = temp[1]; F[2][0] = temp[2];
        } else {
            U[0][0] = F[0][0]; U[1][0] = F[1][0]; U[2][0] = F[2][0];
            F[0][0] = D[0][0]; F[1][0] = D[1][0]; F[2][0] = D[2][0];
            D[0][0] = B[2][2]; D[1][0] = B[1][2]; D[2][0] = B[0][2];
            B[0][2] = temp[2]; B[1][2] = temp[1]; B[2][2] = temp[0];
        }
    }
    
    rotateRightEdges(direction) {
        const { U, D, F, B } = this.faces;
        const temp = [U[0][2], U[1][2], U[2][2]];
        
        if (direction === 'CW') {
            U[0][2] = F[0][2]; U[1][2] = F[1][2]; U[2][2] = F[2][2];
            F[0][2] = D[0][2]; F[1][2] = D[1][2]; F[2][2] = D[2][2];
            D[0][2] = B[2][0]; D[1][2] = B[1][0]; D[2][2] = B[0][0];
            B[0][0] = temp[2]; B[1][0] = temp[1]; B[2][0] = temp[0];
        } else {
            U[0][2] = B[2][0]; U[1][2] = B[1][0]; U[2][2] = B[0][0];
            B[0][0] = D[2][2]; B[1][0] = D[1][2]; B[2][0] = D[0][2];
            D[0][2] = F[0][2]; D[1][2] = F[1][2]; D[2][2] = F[2][2];
            F[0][2] = temp[0]; F[1][2] = temp[1]; F[2][2] = temp[2];
        }
    }
    
    getStateString() {
        let state = '';
        const faceOrder = ['U', 'D', 'F', 'B', 'L', 'R'];
        
        for (const face of faceOrder) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    state += this.faces[face][i][j];
                }
            }
        }
        
        return state;
    }
    
    isSolved() {
        for (const face in this.faces) {
            const color = this.faces[face][0][0];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.faces[face][i][j] !== color) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    solve() {
        this.solutionSteps = [];
        const solution = [];
        
        this.solveWhiteCross(solution);
        this.solveWhiteCorners(solution);
        this.solveMiddleLayer(solution);
        this.solveYellowCross(solution);
        this.positionLastLayerEdges(solution);
        this.positionLastLayerCorners(solution);
        this.orientLastLayerCorners(solution);
        
        return solution;
    }
    
    solveWhiteCross(solution) {
        const whiteEdges = [
            { face: 'F', pos: [0, 1], targetFace: 'D', targetPos: [1, 0] },
            { face: 'R', pos: [1, 0], targetFace: 'D', targetPos: [2, 1] },
            { face: 'B', pos: [2, 1], targetFace: 'D', targetPos: [1, 2] },
            { face: 'L', pos: [1, 2], targetFace: 'D', targetPos: [0, 1] }
        ];
        
        for (const edge of whiteEdges) {
            if (this.faces[edge.face][edge.pos[0]][edge.pos[1]] === 'w') {
                this.rotate(edge.face, 'CW');
                this.rotate('D', 'CW');
                solution.push(`${edge.face}`, "D");
            }
        }
    }
    
    solveWhiteCorners(solution) {
        for (let i = 0; i < 4; i++) {
            if (this.faces['D'][0][0] !== 'y') {
                this.rotate('L', 'CCW');
                this.rotate('D', 'CCW');
                this.rotate('L', 'CW');
                this.rotate('D', 'CW');
                solution.push("L'", "D'", "L", "D");
            }
            this.rotate('D', 'CW');
            solution.push("D");
        }
    }
    
    solveMiddleLayer(solution) {
        for (let i = 0; i < 4; i++) {
            this.rotate('R', 'CW');
            this.rotate('U', 'CW');
            this.rotate('R', 'CCW');
            this.rotate('U', 'CCW');
            this.rotate('F', 'CCW');
            this.rotate('U', 'CCW');
            this.rotate('F', 'CW');
            this.rotate('U', 'CW');
            solution.push("R", "U", "R'", "U'", "F'", "U'", "F", "U");
        }
    }
    
    solveYellowCross(solution) {
        while (this.faces['U'][0][1] !== 'w' || this.faces['U'][1][0] !== 'w' || 
               this.faces['U'][1][2] !== 'w' || this.faces['U'][2][1] !== 'w') {
            this.rotate('F', 'CW');
            this.rotate('R', 'CW');
            this.rotate('U', 'CW');
            this.rotate('R', 'CCW');
            this.rotate('U', 'CCW');
            this.rotate('F', 'CCW');
            solution.push("F", "R", "U", "R'", "U'", "F'");
        }
    }
    
    positionLastLayerEdges(solution) {
        for (let i = 0; i < 4; i++) {
            if (this.faces['F'][0][1] !== this.faces['F'][1][1]) {
                this.rotate('U', 'CW');
                solution.push("U");
            } else {
                break;
            }
        }
    }
    
    positionLastLayerCorners(solution) {
        for (let i = 0; i < 4; i++) {
            if (this.faces['U'][0][0] !== 'w') {
                this.rotate('U', 'CW');
                solution.push("U");
            } else {
                break;
            }
        }
        
        this.rotate('R', 'CCW');
        this.rotate('F', 'CCW');
        this.rotate('R', 'CW');
        this.rotate('B', 'CCW');
        this.rotate('R', 'CCW');
        this.rotate('F', 'CW');
        this.rotate('R', 'CW');
        this.rotate('B', 'CW');
        solution.push("R'", "F'", "R", "B'", "R'", "F", "R", "B");
    }
    
    orientLastLayerCorners(solution) {
        while (!this.isSolved()) {
            this.rotate('R', 'CCW');
            this.rotate('D', 'CCW');
            this.rotate('R', 'CW');
            this.rotate('D', 'CW');
            solution.push("R'", "D'", "R", "D");
        }
    }
}

class CubeController {
    constructor() {
        this.cube = new RubiksCube();
        this.initializeUI();
        this.updateCubeDisplay();
    }
    
    initializeUI() {
        document.querySelectorAll('.rotate').forEach(button => {
            button.addEventListener('click', () => {
                const face = button.dataset.face;
                const direction = button.dataset.direction;
                this.cube.rotate(face, direction);
                this.updateCubeDisplay();
            });
        });
        
        document.getElementById('scramble').addEventListener('click', () => {
            this.cube.reset();
            this.cube.scramble();
            this.updateCubeDisplay();
        });
        
        document.getElementById('solve').addEventListener('click', () => {
            this.solveCube();
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            this.cube.reset();
            this.updateCubeDisplay();
        });
    }
    
    updateCubeDisplay() {
        document.getElementById('cube-state').textContent = this.cube.getStateString();
        this.getCubeSvg(this.cube.getStateString());
        this.updateSolutionSteps();
    }
    
    updateSolutionSteps() {
        const stepsContainer = document.getElementById('solution-steps');
        stepsContainer.innerHTML = '';
        
        this.cube.solutionSteps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step';
            stepElement.innerHTML = `
                <strong>Step ${index + 1}:</strong> ${step.move}
                <div>${step.state}</div>
            `;
            stepsContainer.appendChild(stepElement);
        });
    }
    
    solveCube() {
        this.cube.solutionSteps = [];
        const solution = this.cube.solve();
        this.updateCubeDisplay();
        alert(`Cube solved in ${solution.length} moves!`);
    }
    
    getCubeSvg(state) {
        const svgContainer = document.getElementById('cube-svg');
        let html = '';
        const faceOrder = ['U', 'F', 'D', 'B', 'L', 'R'];
        
        for (const face of faceOrder) {
            html += `<div><strong>${face} face:</strong></div>`;
            html += '<div class="face">';
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const color = this.cube.faces[face][i][j];
                    let colorName;
                    switch (color) {
                        case 'w': colorName = 'white'; break;
                        case 'y': colorName = 'yellow'; break;
                        case 'g': colorName = 'green'; break;
                        case 'b': colorName = 'blue'; break;
                        case 'o': colorName = 'orange'; break;
                        case 'r': colorName = 'red'; break;
                        default: colorName = 'black';
                    }
                    html += `<div class="sticker" style="background-color: ${colorName}"></div>`;
                }
            }
            html += '</div>';
        }
        
        svgContainer.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CubeController();
});