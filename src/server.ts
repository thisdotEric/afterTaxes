import express, { Response } from 'express';

const app = express();

app.get('/', (_, res: Response) => {
    res.send('GraphQL');
});

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
    console.log(`ExTracker running on port ${PORT}`);
});
