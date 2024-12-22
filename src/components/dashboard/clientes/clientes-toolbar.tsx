'use client'
import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React from "react";
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export default function CustomToolbar(): React.JSX.Element {
    return (
        <GridToolbarContainer>

            <GridToolbarQuickFilter inputProps={{}} />

        </GridToolbarContainer>

    );
}