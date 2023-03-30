import React from 'react';
import classes from './Paginator.module.css'
import {ThunkAppDispatchType} from "../../../app/store";
import {packsActions} from "../../../features/packs/packsSlice";
import {TablePagination} from "@mui/material";
import {parseInt} from "lodash";

type PaginatorPropsType = {
    dispatch: ThunkAppDispatchType
    totalItemsCount: number//cardPacksTotalCount
    pageSize: number//pageCount
    page: number
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null,
                       newPage: number,
    ) => void
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
}


const Paginator = (props: PaginatorPropsType) => {


    return (
        <div className={classes.paginatorContainer}>
            <TablePagination
                rowsPerPageOptions={[4, 7, 10]}
                count={props.totalItemsCount}
                rowsPerPage={props.pageSize}
                page={props.page}
                SelectProps={{
                    inputProps: {
                        'aria-label': '',
                    },
                    native: true,
                }}
                showFirstButton
                showLastButton
                onPageChange={props.handleChangePage}
                onRowsPerPageChange={props.handleChangeRowsPerPage}
            />
        </div>

    );
};
;

export default Paginator;