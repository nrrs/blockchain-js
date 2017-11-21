const axios = require('axios');

const URL = 'http://localhost';
const PORT = 4567;

function getBalance(user) {
    axios.get(`${URL}:${PORT}/balance`, { 
        params: {
            user: user
        }
    })
    .then(res => {
        
    });
}

// def create_user(name)
//   Faraday.post("#{URL}:#{PORT}/users", name: name).body
// end

// def get_balance(user)
//   Faraday.get("#{URL}:#{PORT}/balance", user: user).body
// end

// def transfer(from, to, amount)
//   Faraday.post("#{URL}:#{PORT}/transfers", from: from, to: to, amount: amount).body
// end