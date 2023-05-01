import { IProductSchema } from '@/schemas/product.schema';
import Box from '@mui/material/Box';
import Product from './Product';

const ProductsList = ({ products }: IProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 'calc(100vw - 2rem)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
                marginX: 'auto',
            }}
        >
            {products.map((product) => {
                return <Product product={product} key={product._id} />;
            })}
        </Box>
    );
};

export default ProductsList;

interface IProps {
    products: IProductSchema[];
}
