type CustomErrorMap = {
    message: string[]
}

export type CustomError = {
    response: {
        data?: {
            message?: string | CustomErrorMap
        };
        message?: string | CustomErrorMap
    };
}