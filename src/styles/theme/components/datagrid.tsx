import type {DataGridComponents} from "@mui/x-data-grid/themeAugmentation";
import type { Theme } from '../types';


export const MuiDataGrid= {
  defaultProps: {
    slotProps: {
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: {
          variant: "outlined",
          size: "small"
        }
      }
    }
  }
} satisfies DataGridComponents<Theme>['MuiDataGrid'];
