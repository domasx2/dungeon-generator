import Dungeon from  './src/generators/dungeon';

let dungeon = new Dungeon({
    size: [20, 20],
    room_count: 50,
    interconnects: 0
});

dungeon.generate();
dungeon.print();