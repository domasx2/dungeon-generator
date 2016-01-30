import './style.styl';
import Dungeon from '../src/generators/dungeon';

let editor;

const COLOR_EMPTY = '#FFFF80',
      COLOR_WALL = '#808080';

function generate() {
    let code = editor.getValue(),
        settings = JSON.parse(code),
        dungeon = new Dungeon(settings),
        canvas = document.getElementById('canvas'),
        canvas_wrap = document.getElementById('canvas_wrap'),
        ctx = canvas.getContext("2d");

    dungeon.generate();

    let cell_width = Math.min(Math.floor(canvas_wrap.clientWidth / dungeon.size[0]), Math.floor(canvas_wrap.clientHeight / dungeon.size[1]));

    canvas.width = dungeon.size[0] * cell_width;
    canvas.height = dungeon.size[1] * cell_width;

    for (let x = 0; x < dungeon.size[0]; x++) {
        for (let y = 0; y < dungeon.size[1]; y++) {
            ctx.fillStyle = dungeon.walls.get([x, y]) ? COLOR_WALL : COLOR_EMPTY;
            ctx.fillRect(x * cell_width,  y * cell_width, cell_width, cell_width);
        }
    }
}

window.addEventListener("load", () => {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/json");

    generate();

    let btn = document.getElementById('generate_btn');
    btn.addEventListener('click', generate);
});