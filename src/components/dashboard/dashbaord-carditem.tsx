'use client'
import { Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function CardItem(props: { children: React.ReactNode, }) {
    const theme = useTheme();
    return (

        <Paper sx={{
         
            paddingTop: 20,
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }}>
            {
            props.children
            }
        </Paper>
    )
};