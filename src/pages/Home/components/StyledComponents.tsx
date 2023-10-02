import styled from 'styled-components'

const Form = styled.form`
  margin: 30px auto 0;
  max-width: 400px;
`

const Title = styled.h1`
  font-weight: bold;
  margin: 0 0 10px;
`

const AppBadges = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CustomRectangle = styled.a`
  align-items: center;
  background-color: #ccc;
  border-radius: 4px;
  color: #444;
  display: flex;
  margin-top: 18px;
  line-height: 1;
  padding: 8px 12px;
`

const WebLogo = styled.img`
  display: inline-block;
  height: 28px;
  margin-right: 8px;
`

export { Form, Title, AppBadges, CustomRectangle, WebLogo }
