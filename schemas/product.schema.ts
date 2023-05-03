import mongoose, { type Document, type ObjectId } from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema<IProductSchema & Document>(
    {
        productID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        url: {
            type: String,
        },
        seller: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
            default: 0,
        },
        totalRatings: {
            type: Number,
            required: true,
            default: 0,
        },
        favoriteBy: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Customer',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product =
    // mongoose.models.Product ||
    mongoose.model<IProductSchema>('Product', productSchema);

export default Product;

export interface IProductSchema {
    _id: string;
    productID: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    url?: string;
    seller: string;
    ratings: number;
    totalRatings: number;
    favoriteBy: {
        type: typeof mongoose.Types.ObjectId;
        ref: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export type ProductDataType = Document<
    unknown,
    Record<string, unknown>,
    IProductSchema
> &
    Omit<
        IProductSchema & {
            _id: ObjectId;
        },
        never
    >;
