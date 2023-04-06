import React, {FC} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewPackSchema} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch, useAppSelector} from "app/store";
import {updatePackTC} from "features/packs/packsSlice";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

type EditNewPackType = {
    packName: string
    private: boolean
}
type Props = {
    packId: string
    packName: string
}

export const EditPackModal: FC<Props> = ({packId, packName}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<EditNewPackType>({resolver: yupResolver(addNewPackSchema), defaultValues: {packName}});

    const onSubmit = handleSubmit((data) => {
        dispatch(updatePackTC({
            cardsPack: {
                _id: packId,
                name: data.packName,
                private: data.private
            }
        }))
    });

    return (
        <BasicModal
            title={'Edit Pack'}
            label={<ModeEditIcon sx={{cursor: 'pointer'}}/>}
            children={
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
                                    label={'New pack name'}
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
            }
        />
    );
};

