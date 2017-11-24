// Helpers
module.exports = {
    updateState: function(update) {
        console.log(update);
        for (let port in update) {
          if (update.hasOwnProperty(port)) {
            if (update[port] === null) {
                STATE[port] = null;
            } else {
                STATE[port] = update[port];
            }
          }
        }
    },
};

// function updateState(update) {
//   console.log(update);
//   for (let port in update) {
//     if (update.hasOwnProperty(port)) {
//       console.log(`${port}: `, update[port]);
//     }
//   }
// }
