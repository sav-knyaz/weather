import { Component, Fragment } from "react";

class Days extends Component {

    render(){

     const ms = this.props.elemList.dt * 1000;  //получаем время в милисекундах
     const day = new Date(ms).toLocaleString('ru', { weekday: 'long' }) ; //получаем название дня недели на русском

     

    return (
    <div className="days__row">
        <p className="days__text">{day}</p>
        <img className="days__img" src={`http://openweathermap.org/img/wn/${this.props.elemList.weather[0].icon}@2x.png`}/>
        <p className="days__text">{Math.round(this.props.elemList.main.temp)}°</p>
    </div>
    )
     
     
    }
}

export default Days;