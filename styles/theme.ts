import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material';

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
    },
};

const theme = createTheme(themeOptions);

export default theme;
