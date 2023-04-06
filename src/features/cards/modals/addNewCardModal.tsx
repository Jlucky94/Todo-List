import React, {FC} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, FormGroup, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewCardSchema} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch, useAppSelector} from "app/store";
import {createCardTC} from "features/cards/cardsSlice";

type AddNewCardType = {
    question: string
    answer: string
}
type Props = {
    cardPack_id: string
}

export const AddNewCardModal: FC<Props> = ({cardPack_id}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<AddNewCardType>({resolver: yupResolver(addNewCardSchema)});

    const onSubmit = handleSubmit((data) => {
        dispatch(createCardTC({
            card: {
                cardsPack_id: cardPack_id,
                question: data.question,
                answer: data.answer,
            }
        }))
        reset()
    });


    return (
        <BasicModal
            title={'Add new card'}
            label={'Add new card'}
            type={"button"}
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

