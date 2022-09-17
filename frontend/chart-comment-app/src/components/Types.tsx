type DataPoint = {
    x: number,
    y: number,
    commentCount: number
}

export type { DataPoint };

type CommentType = {
    username: string,
    text: string,
    id: number,
    datapoint: number
}

export type { CommentType };