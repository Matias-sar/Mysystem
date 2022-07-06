const app = require('./app')

require('./firebase')

app.listen(9000)
console.log(`Server is running on port ${9000}`)
