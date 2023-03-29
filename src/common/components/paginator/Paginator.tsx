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
    currentPage: number//page
    portionSize: number
    page: number
}


const Paginator = (props: PaginatorPropsType) => {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => props.dispatch(packsActions.setParams({page: newPage}))

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        props.dispatch(packsActions.setParams({pageCount: parseInt(event.target.value), page: 0}));
    };

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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>

    );
};
;

export default Paginator;