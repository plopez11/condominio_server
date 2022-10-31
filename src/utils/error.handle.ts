import { Response } from 'express';

const handleHttp = (res:Response, error: String) => {
    console.log(error);
    res.status(500).json('Internal Server error: '+error);
    // res.send({error});
};

export {handleHttp};