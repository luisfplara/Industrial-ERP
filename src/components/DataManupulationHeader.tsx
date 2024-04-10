
import { Box, BoxProps, Button } from "@mui/material";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
export default function DataManupulationHeader(props: { addDialogLink: string, deleteDialogLink: string }) {
    return (
        <Box sx={{ backgroundColor: '#bababa', borderRadius: 10, padding: 1, paddingX: 2 }} display="flex" alignItems="flex-start">
            <Link href={props.addDialogLink}>
                <Button
                    variant="outlined"
                    sx={{

                        backgroundColor: '#ededed', ':hover':
                        {
                            bgcolor: '#8ba691',
                        },
                    }}
                    startIcon={<AddIcon />}>
                    Add
                </Button>
            </Link>
            <Link href={props.deleteDialogLink}>
                <Button
                    sx={{

                        backgroundColor: '#ededed', ':hover': {
                            bgcolor: '#a68b8b', // theme.palette.primary.main

                        }
                    }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Link>

        </Box>
    )
}

