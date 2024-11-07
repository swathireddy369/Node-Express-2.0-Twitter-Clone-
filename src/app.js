const {server} = require("./server.js")
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
      
});