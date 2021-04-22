import './App.css'
import { useCallback, useState } from 'react'

const fetchPredict = async (data) => {
  try {
    const response = await fetch('http://localhost:8180/predict', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}

function Survived(props) {
  if (props.survived === -1) {
    return null
  }

  return (
    <h1>{Boolean(Number(props.survived)) ? 'Survived' : 'Died'}</h1>
  )
}

function App() {
  const [error, setError] = useState("")
  const [survived, setSurvived] = useState(-1)

  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault()
    const fields = ["sex", "pclass", "age", "sibsp", "parch", "fare", "fullname", "embarked"]
    const data = fields.reduce((acc, val) => {
      acc[val] = ev.target[val].value
      return acc
    }, {})

    try {
      const response = await fetchPredict(data)
      setSurvived(response.predictions)
    } catch (e) {
      setError(e.toString())
    }
  }, [setSurvived, setError]);

  return (
    <div className="App">
      <h1>Titanic Survived Prediction</h1>
      <h3>Enter Passengers Parameters</h3>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="sex">Sex</label>
          <select name="sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="pclass">Passenger's Class</label>
          <select name="pclass">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="age">Passenger's Age</label>
          <input name="age" type="number" min={0} max={150} />
        </div>
        <div className="control">
          <label htmlFor="sibsp">Siblings / Spouses Aboard The Titanic</label>
          <select name="sibsp">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="parch">Parents / Children Aboard The Titanic</label>
          <select name="parch">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="fare">Passenger fare</label>
          <input name="fare" type="number" />
        </div>
        <div className="control">
          <label htmlFor="fullname">Passenger's fullname</label>
          <input name="fullname" type="text" />
        </div>
        <div className="control">
          <label htmlFor="embarked">Embarked</label>
          <select name="embarked">
            <option value="S">S</option>
            <option value="Q">Q</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="control">
          <button type="submit">Predict if person survived</button>
        </div>
      </form>
      <Survived survived={survived} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
