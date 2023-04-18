import React, {FC, useState} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewCardSchema} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch, useAppSelector} from "app/store";
import {createCardTC} from "features/cards/cardsSlice";
import FileInput from "common/fileInput/FileInput";

type AddNewCardType = {
    question: string
    answer: string
    questionImg: string
}
type Props = {
    cardPack_id: string
}

export const AddNewCardModal: FC<Props> = ({cardPack_id}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const [questionType, setQuestionType] = useState<'text' | 'img'>('text')
    const [questionImg, setQuestionImg] = useState('')


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
                questionImg: data.questionImg
            }
        }))
        console.log(data)
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={questionType}
                                label="Question type"
                                onChange={(e) => setQuestionType(e.target.value as 'text' | 'img')}
                            >
                                <MenuItem value='text'>Text</MenuItem>
                                <MenuItem value='img'>Image</MenuItem>
                            </Select>
                        </FormControl>
                        {questionType === 'text' ?
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
                            : <Controller
                                control={control}
                                name={'questionImg'}
                                render={({field}) => (
                                    <FileInput
                                        img={questionImg}
                                        setImg={setQuestionImg}
                                        onChange={field.onChange}
                                    />)}/>
                        }
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

