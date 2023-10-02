import axios from 'axios'

interface CardData {
  pan: string
  expirationDate: string
  cvv: string
}

interface CardValidationResponse {
  isValid: boolean
  message?: string
  errors?: string[]
}

const sendCardData = async (
  cardData: CardData
): Promise<CardValidationResponse> => {
  const response = await axios
    .post(
      `https://ecommerce-api-production-1642.up.railway.app/card/validate`,
      {
        ...cardData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      const { data } = response
      const validation: CardValidationResponse = {
        isValid: data.valid,
      }
      return validation
    })
    .catch(err => {
      const { response } = err
      const validation: CardValidationResponse = {
        isValid: response.data.valid,
        message: response.data.message,
        errors: response.data.validationsErrors,
      }
      return validation
    })
  return response
}
export default sendCardData
