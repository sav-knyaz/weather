import { Component, Fragment } from 'react';
import Header from './components/body.jsx';
import Card from './components/card.jsx';
import Days from './components/day.jsx';
import Spec from './components/specInfo.jsx';
import './App.css';



class App extends Component{
  state = {
    city: '',      //город для которого показывается прогнонз погоды
    response: '',  //декодированыый ответ сервер, обьект со всей инфой о погоде
    days: ''       //массив ближайших 5 дней
  }


  componentDidMount(){ //получаем координаты устройства
    navigator.geolocation.getCurrentPosition(this.showCord, this.err)
      
  }

showCord = (position) => {//получаем от геокодера ответ - город, где находиться устройство
  let latitude = position.coords.latitude,
      longitude = position.coords.longitude;

fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
  .then(resp => {
    if(resp.ok){
      return resp.json()
    } else {
      alert('error: ' + resp.status + ' ' + resp.statusText)
    }
  })
  .then(result => {
    console.log(result)

    this.setState({ city: result.address.city })
    this.autoGetWeather()
  })
 
}

err = (e) => {//обрабатываем ощибку 
   if(e === 1){ alert('Вы отказали в доступе к вашей геопозиции. Введите название города, где хотите узнать погоду!')}
}

autoGetWeather = () => {
  let urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&lang=ru&units=metric&APPID=6ab7590d1271ab894b83ce19e1f86361`;

  fetch(urlWeather) 
    .then(resp => {
      if(resp.ok){ //проверяем статус ответа сервера

     return   resp.json()  // декодируем ответ из формата json
 
     } else {
      alert('error: ' + resp.status + ' ' + resp.statusText)
     }
    })
    .then(result => {
      const dailyData = result.list.filter(reading => reading.dt_txt.includes("09:00:00")); //получаем массив ближайших 5 дней
      this.setState({ days: dailyData})

      this.setState({ response: result })

      console.log(result)})
      .finally(() => document.querySelector('.section_top__input').value = '') // очищаем input

    
}

keyDownEnter = (event) => {
  if(event.keyCode === 13){
    this.handelInput()
  }
}

handelInput = () => {

  this.setState({
     city: document.querySelector('.section_top__input').value
  })

this.getWeather()

}

//получаем данные о погоде
getWeather = () => {
  let urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${document.querySelector('.section_top__input').value}&lang=ru&units=metric&APPID=6ab7590d1271ab894b83ce19e1f86361`;

  fetch(urlWeather) 
    .then(resp => {
      if(resp.ok){ //проверяем статус ответа сервера

     return   resp.json()  // декодируем ответ из формата json
 
     } else {
      alert('error: ' + resp.status + ' ' + resp.statusText)
     }})
    .then(result => {
      const dailyData = result.list.filter(reading => reading.dt_txt.includes("09:00:00")); //получаем массив ближайших 5 дней
      this.setState({ days: dailyData})

      this.setState({ response: result })

      console.log(result)})
      .finally(() => document.querySelector('.section_top__input').value = '') // очищаем input

    
}

formatDays = () => { //рендерим компоненты Days с помощью метода map
  return this.state.days.map( day => <Days elemList={day} key={day.dt_txt} />)
}

formatCard = () => { //рендерим компоненты Card 
  return ( this.state.response.list.slice(0, 5).map( (card, index) =>  <Card temp={card.main.temp}
                                                             icon={card.weather[0].icon} time={card.dt_txt}
                                                             key={card.dt_txt}
                                                             index={index}/> )
        )
}


  
  render(){
    
    const list = this.state.response.list;

    return(
      <Fragment>

        <section className='section_top'>
            <lable>City: 
            <input className='section_top__input' type="text"
             onKeyDown={(event) => this.keyDownEnter(event)}  placeholder='ваш город / your city' />
            </lable>
            <button className='section_top__btn' onPointerDown={this.handelInput} >
            Send
            </button>
        </section>

        { this.state.response !== '' &&

        <Fragment>

        <Header city={this.state.response.city.name} list={list} />

        <main>
        <section className='section__card'>
              {this.formatCard()} 
        </section>
        <section className='section__days'>
              {this.formatDays()}
         </section>
         <section className='section__spec_info'>
              <Spec list={list} />
         </section>
        </main>

        </Fragment>

         }

      </Fragment>
    )
  }
}

export default App;
