
import './App.css'

import heroImage from './assets/heroImage.jpg';

function App() {
  return (
    <>
      <div className="flex"> 
        {/* left half of hero */}
        <div className="basis-2/3 w-full">
          <h1>Hero</h1>
        </div>
        {/* right half of hero */}
        <div className="basis-1/3 w-full">
          <img src={heroImage} alt="Picture of a very handsome cat" className=""/>
        </div>
      </div>
    </>
  )
}

export default App
