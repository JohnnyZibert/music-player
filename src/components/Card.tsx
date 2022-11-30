import styled from 'styled-components'

interface IProps {
  img: string
  name: string
  alt: string
  text: string
}

export const Card = ({ img, alt, text }: IProps) => {
  return (
    <CardStyle>
      <div className="icon">
        <img src={img} alt={alt} />
        <h3>{text}</h3>
      </div>
      <p>Lorem ipsum dolor sit amet.</p>
    </CardStyle>
  )
}

const CardStyle = styled.div`
  flex-basis: 16rem;
  .icon {
    display: flex;
    align-items: center;
  }
  h3 {
    margin-left: 1rem;
    background: white;
    color: black;
    padding: 1rem;
  }
`
