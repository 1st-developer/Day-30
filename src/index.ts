import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute'
import postRoute from './routes/postRoute'
import commentRoute from './routes/commentRoute'
import reactionRoute from './routes/reactionRoute'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/reactions", reactionRoute);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) );