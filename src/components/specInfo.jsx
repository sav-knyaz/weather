import { Component, Fragment } from "react";

class Spec extends Component {

    windowSide = () => { //определяем направление ветра 
       const wind = this.props.list[0].wind;
      
      if (wind.deg > 330 || wind.deg < 30){ return 'С' }
      if(wind.deg >= 30 || wind.deg <= 60){ return 'СВ' } 
      if (wind.deg > 60 || wind.deg < 120){ return 'B'  }
      if (wind.deg >= 120 || wind.deg <= 150){ return 'ЮВ'}
      if (wind.deg > 150 || wind.deg < 210){ return 'Ю' }
      if (wind.deg >= 210 || wind.deg <= 240){ return 'ЮЗ'}
      if (wind.deg > 240 || wind.deg < 300){ return 'З' }
      if (wind.deg >= 300 || wind.deg <= 330){ return 'СЗ'} 

    }

    render() {
          const list = this.props.list[0];
         
        return(
            <Fragment>
        <div className="spec_info__row">
          <p className="spec_info__title">
            ВЛАЖНОСТЬ
          </p>
          <p className="spec_info__value">
            {list.main.humidity} % 
          </p>
        </div>
        <div className="spec_info__row">
          <p className="spec_info__title">
             ДАВЛЕНИЕ   
          </p>
          <p className="spec_info__value">
             {Math.round((list.main.pressure * 100) / 133)} мм рт.ст. 
          </p>
        </div>
        <div className="spec_info__row">
          <p className="spec_info__title">
              ОЩУЩАЕТСЯ КАК
          </p>
          <p className="spec_info__value">
              {Math.round(list.main.feels_like)}°    
          </p>
        </div>
        <div className="spec_info__row">
          <p className="spec_info__title">
              ВЕТЕР   
          </p>
          <p className="spec_info__value">
              {this.windowSide() + '  ' + list.wind.speed} м/с    
          </p>
        </div>
        <div className="spec_info__row">
          <p className="spec_info__title">
              ВИДИМОСТЬ
          </p>
          <p className="spec_info__value">
              {list.visibility / 1000} км
          </p>
        </div>
        </Fragment>
        )
    }
}
export default Spec