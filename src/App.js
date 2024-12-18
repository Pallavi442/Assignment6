import logo from './logo.svg';
// import cardBackImg from './images/bg-card-back.png';
// import cardfrontImg from './images/bg-card-front.png';
import './App.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import check from './images/Frame 5843.png'

function App() {

  const [cardData, setCardData] = useState({
    cardHolderName: '',
    cardHolderNo: '',
    expDate: '',
    cvc: ''
  });
  const [errors, setErrors] = useState({});
  const [confirm,setConfrim]=useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; 
      return newErrors;
    });
    setCardData({ ...cardData, [name]: value });
  };


//validations
    const validate = () => {
      const newErrors = {};
      if (!cardData.cardHolderName) newErrors.cardHolderName = "Cardholder Name is required.";
      if (!cardData.cardHolderNo) newErrors.cardHolderNo = "Card Number is required.";
      else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardData.cardHolderNo)) {
        newErrors.cardHolderNo = "Card Number must be in the format 1234 5678 9123 0000.";
      }
      if (!cardData.expDate) newErrors.expDate = "Expiration Date is required.";
      if (!cardData.cvc) newErrors.cvc = "CVC is required.";
      else if (!/^\d{3}$/.test(cardData.cvc)) {
        newErrors.cvc = "CVC must be 3 digits.";
      }
      // console.log("newErrors",newErrors);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  //on confirm button click function
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("cardData", cardData)
    if (validate()) {
      setConfrim(true); 
      console.log(cardData);
    }
  };

  //on continue click
  const handleContinue=()=>{
    setConfrim(false); 
    setCardData({
        cardHolderName: '',
        cardHolderNo: '',
        expDate: '',
        cvc: ''
      });
      setErrors({});
  }
  const handleDateChange = (date) => {
    setCardData({ ...cardData, expDate: date });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.expDate; 
      return newErrors;
    });
  };


  const formatCardNumber=()=>{
    // console.log("inside");
    var cardNumber = document.getElementById("cardNumber");
    var value = cardNumber.value.replace(/\D/g, '');
    // console.log("value",value);
    var formattedValue = "";
      for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i > 0) {
          formattedValue += " ";
        }
        formattedValue += value[i];
      }
      cardNumber.value = formattedValue;
    }

  return (
    <div className="app-container">
      <div className='bg-container' />
      <div className="card-front">
        <div className='svg-img'>
        <svg width="84" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" /><path d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z" stroke="#fff" /></svg>
        </div>
        <div className="card-number">
          {cardData.cardHolderNo || '0000 0000 0000 0000'}
        </div>
        <div className='card-data1'>
        <div className="card-holder-name">
          {cardData.cardHolderName || 'Pallavi Patil'}
        </div>
       
      
          <div className="card-expiry">
            {cardData.expDate ?
              `${(new Date(cardData.expDate).getMonth() + 1)
                .toString()
                .padStart(2, "0")}/${new Date(cardData.expDate)
                  .getFullYear()
                  .toString()
                  .slice(-2)}`
              : "MM/YY"}
          </div>
          </div>
   
      </div>
      <div className="card-back">
        <div className="card-cvc">
          {cardData.cvc || '000'}
        </div>
      </div>
      {confirm ? (
        <div className="thankyou-container">
          <div className='thankyou-main'>
            <img src={check}/>
          <h3>Thank You!</h3>
          <p>we've added your card details </p>
          <button className='confirm-btn' onClick={handleContinue}>Continue</button>
        </div>
        </div>
      ) : (
      <div className='form-container'>
        <form className='form-main' onSubmit={handleSubmit}>
          <label>CARDHOLDER NAME</label>
          <input 
          className= {errors.cardHolderName && 'error-input'}
          type="text"
            name='cardHolderName'
            placeholder='e.g Jane Appleseed'
            value={cardData.cardHolderName}
            onChange={handleChange}
          />
          {errors.cardHolderName && <span className="error-message">{errors.cardHolderName}</span>}

          <label className='cardNo-container'>CARD NUMBER</label>
          <input type="text"
            className= {errors.cardHolderNo && 'error-input'}
            name='cardHolderNo'
            placeholder='e.g 1234 5678 9123 0000'
            value={cardData.cardHolderNo}
            onChange={handleChange}
            id="cardNumber" 
            onInput={formatCardNumber}
            maxlength="19" 
          />
          {errors.cardHolderNo && <span className="error-message">{errors.cardHolderNo}</span>}
          <div className='inline-container'>
            <div className='expiry-container'>
              <label>EXP. DATE  (MM/YY)</label>
              <DatePicker
                className= {errors.expDate ?'error-input':"date-picker"}
                selected={cardData.expDate}
                // onChange={(date) => setCardData({ ...cardData, expDate: date })}
                onChange={handleDateChange}
                dateFormat="MM/yy"
                showMonthYearPicker
                placeholderText="MM/YY"
              />
              {errors.expDate && <span className="error-message">{errors.expDate}</span>}
            </div>
          
            <div className='cvc-container'>
              <label>CVC</label>
              <input type="text"
                className= {errors.cvc && 'error-input'}
                placeholder='eg 123'
                name='cvc'
                value={cardData.cvc}
                onChange={handleChange}
                maxlength="3" 
                
              />
                 {errors.cvc && <span className="error-message">{errors.cvc}</span>}
            </div>
         

          </div>
          <div>
            <button type="submit" className='confirm-btn'>Confirm</button>
          </div>
        </form>

        <div className='thankyou-container'>

        </div>
      </div>)}
    </div>
  );
}

export default App;
