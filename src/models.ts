export type TMessage = {
    id?: number,
    userId: string,
    content: string,
}

export interface IList {
    list: TMessage[],
}

export type TId = string;
