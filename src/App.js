import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef();
  const [modeCount, setModeCount] = useState(true);

  useEffect(() => {
    if (modeCount) {
      document.body.style.background = 'white';
    } else {
      document.body.style.background = 'black';
    }
  }, [modeCount])

  return (
    <div className="App">

      <div className={modeCount === true ? 'bg' : 'bg darkmode darkBg'}>
        <h2 className={modeCount === true ? 'title' : 'title darkmode'}>ToDoList</h2>
        <h5 className={modeCount === true ? 'sub-title' : 'sub-title darkmode'}>Organize your plans for today!</h5>
        <div className='form'>
          <form onSubmit={(e) => {
            e.preventDefault();
            let inputValue = inputRef.current.value.trim();
            if(inputValue !== '') {
              let copyText = [...text];
              copyText.push(inputValue)
              copyText = new Set(copyText);
              copyText = Array.from(copyText);
              setText(copyText);
              setInputVal('');
            }
          }}>
            <input ref={inputRef} value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} className={modeCount === true ? null : 'darkmode'} />
            <button className={modeCount === true ? 'btn' : 'btn darkmode darkbtnbackground'}>result</button>
          </form>
        </div>
        {
          text.map((d, i) => {
            return <TextBox d={d} i={i} text={text} setText={setText} key={i} darkmode={modeCount === true ? '' : 'darkmode darkcontentbackground'}  
            darkbtn={modeCount === true ? '' : 'darkmode darkcontentbackground darkbtn'}/>
          })
        }
        <div className='modeBtn'>
          <button className={modeCount === true ? 'btn mar' : 'btn darkmode darkbtnbackground mar'}
            onClick={() => { setModeCount(!modeCount) }}>
            {modeCount === true ? <span>darkmode</span> : <span>lightmode</span>}
          </button>
        </div>
      </div>

    </div>
  );
}

function TextBox({ d, i, text, setText, darkmode,darkbtn }) {
  return (
    <div className={`textBg ${darkmode} contentColor`}>
      <button onClick={() => {
        let updateText = [...text];
        updateText.splice(i, 1);
        setText(updateText);
      }} className={`remove btn ${darkmode} ${darkbtn}`}>X</button>
      <span className={`content ${darkmode}`}>{i + 1}. {d}</span>
    </div>
  )
}

export default App;
