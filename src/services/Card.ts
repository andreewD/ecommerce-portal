import axios from 'axios'

interface CardData {
  pan: string
  expirationDate: string
  cvv: string
}

const sendCardData = async (cardData: CardData) => {
  const { data } = await axios
    .post(
      `${process.env.REACT_APP_API_URL}/card/validate`,
      {
        ...cardData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .catch(err => {
      console.log(err)
      return err
    })

  console.log(data)
  return data
}
export default sendCardData
