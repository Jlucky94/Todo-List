import React, {FC} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewPackSchema} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch, useAppSelector} from "app/store";
import {updatePackTC} from "features/packs/packsSlice";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {updateCardTC} from "features/cards/cardsSlice";

type EditCardType = {
    question: string
    answer: string
}
type Props = {
    cardId: string
    question: string
    answer: string
}

export const EditCardModal: FC<Props> = ({question, answer, cardId}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<EditCardType>({resolver: yupResolver(addNewPackSchema), defaultValues: {answer, question}});

    const onSubmit = handleSubmit((data) => {
        dispatch(updateCardTC({
            card: {
                _id: cardId,
                question: data.question,
                answer: data.answer,
            }
        }))
    });

    return (
        <BasicModal
            title={'Edit Card'}
            label={<ModeEditIcon sx={{cursor: 'pointer'}}/>}
            children={
                <form onSubmit={onSubmit}>
                    <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                        <Controller
                            control={control}
                            name={'question'}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.question}
                                    helperText={errors.question?.message}
                                    variant={'standard'}
                                    label={'Question'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                />)
                            }/>
                        <Controller
                            control={control}
                            name={'answer'}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.answer}
                                    helperText={errors.answer?.message}
                                    variant={'standard'}
                                    label={'Answer'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                />)
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

