// Custom Error for include status in Error Objects. 
    // export interface customError extends  Error  {
    //     status?: number;
    // }
export type CustomError = Error & {status?: number};