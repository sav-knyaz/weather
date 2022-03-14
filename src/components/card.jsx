import { Component, Fragment } from "react";
import PropsType from "prop-types";


class Card extends Component {

    render() {
   
        
        return(
            <div className="card">
              { this.props.index !== 0 &&
              <p className="card_text card_time">{this.props.time[11] + this.props.time[12]}</p>}
              { this.props.index == 0 && 
              <p className="card_text card_time">Сейчас</p> }
              <img className="card__img" src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`} />
              <p className="card_text card_temp">{Math.round(this.props.temp)}°</p>
            </div>
        )
    }
}

export default Card