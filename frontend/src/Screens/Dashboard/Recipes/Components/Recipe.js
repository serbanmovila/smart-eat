import styled from 'styled-components'
import TimerIcon from '@material-ui/icons/Timer'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const Box = styled.div`
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 31.3%;
    margin: 1%;
    background: white;
    cursor: pointer;
    overflow: hidden;

    @media only screen and (max-width: 600px) {
        width: 95%;
        margin: 3% auto 3% auto;
    }
`

const BoxHeader = styled.div`
    background: rgb(55, 59, 96);
    padding: 3% 4%;

    p {
        color: white;
        font-size: 90%;
        font-weight: 500;
        text-align: left;
        margin: 0;
    }
`

const BoxContent = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 8% 5%;
`

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        font-size: 200%;
        color: rgba(55, 59, 96, 0.8);
    }

    .label {
        font-weight: 700;
        font-size: 70%;
        margin-top: 5px;
        color: rgba(0, 0, 0, 0.5);
    }

    .info {
        font-size: 120%;
        font-weight: 600;
        margin: 0 auto;
    }
`

export default function Recipe(props) {
    const { name, preparationTime, difficulty, price } = props.data
    const { handleClick } = props

    return (
        <Box
            onClick={props.handleClick}
            style={
                props.scoring
                    ? {
                          width: '100%'
                      }
                    : {}
            }
        >
            <BoxHeader>
                <p>{name}</p>
            </BoxHeader>
            <BoxContent
                style={
                    props.highlight == true
                        ? {
                              background: '#7D83B5'
                          }
                        : {}
                }
            >
                <InfoSection>
                    <TimerIcon />
                    <p className="label">TIME TO COOK</p>
                    <p className="info">{preparationTime} mins.</p>
                </InfoSection>
                <InfoSection>
                    <LocalOfferIcon />
                    <p className="label">APPROX. COST</p>
                    <p className="info">{price} lei</p>
                </InfoSection>
            </BoxContent>
        </Box>
    )
}
