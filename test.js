import Dungeon from  './index';

let dungeon = new Dungeon({
    size: [1000, 1000],
    room_count: 20,
    interconnects: 5
});

dungeon.generate();
dungeon.print();