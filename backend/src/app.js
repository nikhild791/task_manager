import express from 'express'
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';

const app = express();
app.use(express.json())

app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/user',userRouter)

export default app;