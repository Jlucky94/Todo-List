import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import classes from "features/learnCards/LearnCards.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "app/store";
import {cardsActions, getCardsTC, rateCardTC} from "features/cards/cardsSlice";
import {CardType} from "api/cardsAPI";


const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
        return {sum: newSum, id: newSum < rand ? i : acc.id}
    }, {sum: 0, id: -1})
    return cards[res.id + 1]
}
const answers = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
const LearnCards = () => {
    const params = useParams()
    const packId = params.packId as string
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('1');
    const [showAnswer, setShowAnswer] = useState(false)
    const [currentCard, setCurrentCard] = useState<CardType>()

    const packName = useAppSelector(state => state.cards.packName)
    const cards = useAppSelector(state => state.cards.cards)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    const showAnswerHandler = () => setShowAnswer(true)
    const nextQuestionHandler = () => {
        dispatch(rateCardTC({card_id: currentCard?._id as string, grade: Number(value)}))
        setCurrentCard(getCard(cards))
        setShowAnswer(false)
        setValue('1')
    }
    const backToPackHandler = () => navigate("/cards/pack/" + packId)


    useEffect(() => {
        dispatch(cardsActions.setParams({cardsPack_id: packId}))
        dispatch(getCardsTC())
    }, [])
    useEffect(() => {
        setCurrentCard(getCard(cards))
    }, [cards])

    return (

        <Container style={{display: 'flex', flexDirection: 'column'}}>
            <Button style={{alignSelf: "start"}} variant={'contained'} onClick={backToPackHandler}>Back to
                pack </Button>
            <Typography component={'h3'} fontWeight={"bold"} fontStyle={"oblique"}>
                {packName}
            </Typography>
            <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                <Typography>
                    Количество попыток ответа на вопрос : {currentCard?.shots}
                </Typography>
                <Typography>
                    Question: {currentCard?.question}
                </Typography>
                {showAnswer ?
                    <>
                        <Typography>
                            Answer : {currentCard?.answer}
                        </Typography>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Rate yourself:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                {answers.map((answer, i) => (
                                    <FormControlLabel key={i} value={i + 1} control={<Radio/>}
                                                      label={answer}/>
                                ))}
                            </RadioGroup>
                            <Button onClick={nextQuestionHandler}>
                                Next question
                            </Button>
                        </FormControl>
                    </>
                    :
                    <>
                        <Button onClick={showAnswerHandler}>
                            Show answer
                        </Button>
                    </>
                }
            </Paper>
        </Container>
    );
};

export default LearnCards;