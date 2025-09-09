export interface Image {
    pieceImages: PieceImage[] ;
    legoImages: LegoImage[];
}

interface PieceImage {
    piece: number;
    image: string;
}

interface LegoImage {
    lego: number;
    image: string;
}
