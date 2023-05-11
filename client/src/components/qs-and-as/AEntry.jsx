import { React, useEffect, useState } from 'react';

const AEntry = (props) => {
  const [ answer, setQuestion] = useState('It is totally safe');
  const [ user, setUser] = useState('Karen');
  const [ answerDate, setAnswerDate] = useState('')

  const dateParse = (date) => {
    let d = new Date (date)
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-us', options)
  }


return (
<div>
<div> A: {props.answer.body}.</div>
<div> user: {props.answer.answerer_name}, date: {dateParse(props.answer.date)}</div>
<div> helpful? ({props.answer.helpfulness}) </div>
<div> report</div>
</div>

)

};

export default AEntry