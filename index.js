import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import db from "./utilis/db.js";
dotenv.config()

// import all routes
import userRoutes from "./routes/user.routes.js"

const app = express()

app.use(cors({
origin: process.env.BASE_URL,
credentials: true,
methods:['GET', 'POST', 'DELETE', 'OPTIONS'],
allowedHeaders:['Content-type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 4000; // 4000, 5000, 8080


app.get('/', (req, res) => {
  res.send('Shivam!')
});


app.get('/hitesh', (req, res) => {
    res.send('Shivam!')
  });

//   console.log(process.env.PORT);
  
app.get( '/shivam', (req, res) => {
    res.send('Whyshivam!')
})

// connect to db
db();

// user routes
app.use("/api/v1/user/", userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})