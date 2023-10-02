import React, { useState } from 'react'
import Cards, { Focused } from 'react-credit-cards-2'
import sendCardData from '../../services/Card'
import { Form, Title } from './components'

const Home = () => {
  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  })

  const [validCard, setValidCard] = useState<boolean>()
  const [message, setMessage] = useState<string>('')
  const [errors, setErrors] = useState<string[]>()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, focus: event.target.name }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cardValidationData = await sendCardData({
      pan: state.number,
      cvv: state.cvc,
      expirationDate: state.expiry,
    })
   
    if (cardValidationData.isValid) {
      setValidCard(true)
    } else {
      if (cardValidationData.errors) {
        setErrors(cardValidationData.errors)
      }

      if (cardValidationData.message) {
        setMessage(cardValidationData.message)
      }

      setValidCard(false)
    }
  }

  return (
    <div>
      <Title>Ecommerce Portal</Title>
      <div>
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus as Focused}
        />
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY Expiry"
                className="form-control"
                pattern="\d\d/\d\d"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                className="form-control"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
        </Form>

        {validCard ? (
          <div className="alert alert-success mt-3" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Your card is valid, you can continue with your purchase.</p>
          </div>
        ) : (
          <div className="alert alert-danger mt-3" role="alert">
            <h4 className="alert-heading">Oh snap!</h4>
            <p>{message}</p>
            {errors && (
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
