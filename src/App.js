import React, { useState } from 'react';
import './App.css';

function App() {

  const [status, setStatus] = useState('')
  const [urlData, setUrl] = useState('')
  const [urlDataDisplay, setUrlDataDisplay] = useState([])
  const submit = async () => {
    try {
      if (!urlData.includes('http')) {
        alert('please enter correct url')
      }
      console.log(urlData)
      const response = await fetch(`${urlData}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Methods': 'GET',
          'mode': 'no-cors'
        }
      });
      console.log(response, "response");
      let data = urlDataDisplay

      setStatus(response.status || 200)
      data.push({ urlData, status: response.status || 200 })
      setUrlDataDisplay([...data])
      return response
    } catch (err) {
      let data = urlDataDisplay
      data.push({ urlData, status: 400 })
      setUrlDataDisplay([...data])
      console.log(err)
      setStatus(400)
    }
  };
  // console.log(status, "status");

  const handleSubmit = (e) => {
    e.preventDefault();
    const webData = e.target.webStatus.value;
  }
  return (
    <div>
      <div class="" id="container">
        <div class="form-container log-in-container">
          <form action="#" onSubmit={handleSubmit}>
            <h3>Enter Web Address</h3>
            <input type="text" name="webStatus" onChange={(e) => {
              setUrl(e.target.value)
            }
            } placeholder="https://www.google.com/" />
            <button onClick={() => submit()} value="Sent" >Sent</button>
            {/* <button>+Add new Url</button> */}
            <table>
              <tr>
                <th>url</th>
                <th>status</th>
                <th>monitoring intreval</th>
              </tr>
              {urlDataDisplay && urlDataDisplay.map((ele) => (<tr>
                <td>{ele.urlData}</td>
                <td> {ele.status}</td>
              </tr>))}
            </table>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1>Demo Data</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
