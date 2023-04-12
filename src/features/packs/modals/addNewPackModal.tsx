import React from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewPackSchema} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch, useAppSelector} from "app/store";
import {createPackTC} from "features/packs/packsSlice";

type AddNewPackType = {
    packName: string
    private: boolean
}

export const AddNewPackModal = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<AddNewPackType>({resolver: yupResolver(addNewPackSchema)});

    const onSubmit = handleSubmit((data) => {
        dispatch(createPackTC({
            cardsPack: {
                name: data.packName,
                deckCover: '',
                private: data.private
            }
        }))
        reset()
    });


    return (
        <BasicModal
            title={'Add new pack'}
            label={'Add new pack'}
            type={'button'}>
            <form onSubmit={onSubmit}>
                <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                    <Controller
                        control={control}
                        name={'packName'}
                        render={({field}) => (
                            <TextField
                                error={!!errors.packName}
                                helperText={errors.packName?.message}
                                variant={'standard'}
                                label={'Pack name'}
                                value={field.value}
                                onChange={(e) => field.onChange(e)}
                            />)
                        }/>
                    <Controller
                        control={control}
                        name={'private'}
                        render={({field}) => (
                            <FormControlLabel label={'Private pack'}
                                              control={<Checkbox
                                                  onChange={(e) => field.onChange(e)}/>}/>)
                        }/>
                    <Button
                        style={{width: 100, alignSelf: "end"}}
                        type="submit" variant={'contained'}
                        disabled={isLoading === 'loading'}>
                        Confirm
                    </Button>
                </FormGroup>
            </form>
        </BasicModal>
    );
};

