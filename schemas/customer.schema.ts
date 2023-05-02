import mongoose, { type Document, type ObjectId } from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema<ICustomerSchema & Document>(
    {
        customerID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
        },
        url: {
            type: String,
        },
        favoriteProducts: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Customer =
    mongoose.models.Customer ||
    mongoose.model<ICustomerSchema>('Customer', customerSchema);

export default Customer;

export interface ICustomerSchema {
    _id: string;
    customerID: string;
    name: string;
    email: string;
    contactNumber: string;
    url?: string;
    favoriteProducts: {
        type: typeof mongoose.Types.ObjectId;
        ref: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export type CustomerDataType = Document<
    unknown,
    Record<string, unknown>,
    ICustomerSchema
> &
    Omit<
        ICustomerSchema & {
            _id: ObjectId;
        },
        never
    >;
