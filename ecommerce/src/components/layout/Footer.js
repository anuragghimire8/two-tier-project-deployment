import React from 'react'
import { Link } from 'react-router-dom'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import NepaliDate from 'nepali-datetime';

 const now = new NepaliDate();
  
   const nepdate = now.format('YYYY-MM-DD');

const theme = {
  background: 'lightblue !important',
  headerBgColor: 'cadetblue !important',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: 'black',
  userFontColor: 'white',
  footerBgColor: 'cadetblue !important',
};
const steps = [
  {
      id: '0',
      message: 'Hello Sir !',

    
      trigger: '1',
  }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: 'Please write your username',
      trigger: '2'
  }, {
      id: '2',

      user: true,
      trigger: '3',
  }, {
      id: '3',
      message: " hi {previousValue}, how can I help you?",
      trigger: '4'
  },
  
  {
    id: '4',

    user: true,
    trigger: '5',
},
{
  id: '5',
  message: " Contact us on 9816232444 | or mail us homestoreecommmerce@gmail.com",
  trigger: '6',
},


  {
      id: '6',
      options: [
           

          { value: 1, label: 'Return Policy',trigger: '7' },
          { value: 2, label: 'Contact Number' ,trigger: '8'},
          { value: 3, label: 'Address' ,trigger: '9' },
          { value: 4, label: 'About E-Pustakalaya',trigger: '10' },
          { value: 5, label: 'Payment',trigger: '11' },
          { value: 6, label: 'Exit',trigger: '12' },

      ],
      
      
  },
  {
    id: '7',
    message: "24-days of Return Policy for Unsatisfied Customer.HomeStore Provides the Return Policy of 24-days After Buy of any Books. ",
    trigger: '6',
  },

  {
    id: '8',
    message: "Mobile Number 9816232444 | or mail shomestoreecommmerce@gmail.com",
    trigger: '6',
  },
  {
    id: '9',
    message: "Visit our Store at Khairahani-08,Parsa,Chitwan",
    trigger: '6',
  },
  {
    id: '10',
    message: "HomeStore, A B2C platform where user can Buy Products Online",
    trigger: '6',
  },
  {
    id: '11',
    message: "We Accept Credit Payment for our products",
    trigger: '6',
    
  },
  {
    id: '12',
    message: "Thank you for using our Service ,Sir",
    trigger: '6',
    end: true,
  },
  
];
const config = {
  botAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WlkWPmyjigRL9eEOPdWepFl9EWdnCE3YS2PkVAK5wB_g1vScQHO9bnuNPaNqdom2Z2E",
  floating: true,
};


const Footer = () => {
  return (
    <>
    <div className='footer'>
        <h3 className='text-center'>All Right Reserved &copy; HomeStore</h3>
        <p className="text-center mt-3">
    <Link to="/About"> About</Link>|
    <Link to ="/Contact">Contact</Link>|
    <Link to ="/Policy">Privacy Policy</Link>
        </p>
       
        </div>
         <ThemeProvider theme={theme}>
         <ChatBot headerTitle="HomeStore Bot" 
                   speechSynthesis={{ enable: true, lang: 'en' }}
                   steps={steps}
                   {...config}
                   
                   />
         </ThemeProvider>
         </>

  )
}

export default Footer