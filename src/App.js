import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className='bg-container'/>
      <div className='form-container'>
        <form className='form-main'>
          <label>CARDHOLDER NAME</label>
          <input type="text"  placeholder='e.g Jane Appleseed' />

          <label className='cardNo-container'>CARD NUMBER</label>
          <input type="text" placeholder='e.g 1234 5678 9123 0000' />
          <div className='inline-container'>
            <div className='expiry-container'>
            <label>EXP. DATE  (MM/YY)</label>
            <input type="date" />
            </div>
           <div className='cvc-container'>
           <label>CVC</label>
           <input type="text" placeholder='eg 123' />
           </div>
            
          </div>
          <div>
            <button className='confirm-btn'>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
