// // Randomly generate a fake allRooms JSON file

// const fs = require("fs");
// const numRooms = Math.floor(Math.random() * 10) + 16; // 16 - 26 (exclusive)

// let fakeRooms = [];
// for (i = 1; i < numRooms; i++) {
//   const chairs = Math.floor(Math.random() * 6) + 2; // 2-8 (exclusive)
//   const name = `Room ${i}`;
//   // const availability = [true, false][Math.round(Math.random())];
//   const location = ["First Floor", "Second Floor", "Third Floor"][Math.floor(Math.random() * 3)]; // 0-3 (exclusive)
//   fakeRooms.push({
//     name: name,
//     capacity: chairs,
//     // isAvailable: availability,
//     isAvailable: true,
//     location: location
//   });
// }

// let data = JSON.stringify({
//   rooms: fakeRooms
// });
// fs.writeFileSync(__dirname + "/AllRooms.json", data);