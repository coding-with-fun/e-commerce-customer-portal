import mongoose, { type Document, type ObjectId } from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema<IProductSchema>(
    {
        productID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

const Product =
    mongoose.models.Product ||
    mongoose.model<IProductSchema>('Product', productSchema);

export default Product;

export interface IProductSchema extends Document {
    _id: string;
    productID: string;
    name: string;
    price: number;
    quantity: number;
    url?: string;
    seller: string;
    ratings: number;
    totalRatings: number;
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
