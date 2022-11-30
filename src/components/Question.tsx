interface IProps {
  question: string
}

export const Question = ({ question }: IProps) => {
  return (
    <div className="question">
      <h4>{question}</h4>
      <div className="answer">
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias,
          quisquam.
        </p>
      </div>
      <div className="faq-line"></div>
    </div>
  )
}
