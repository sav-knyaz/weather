import { Component, Fragment } from "react";

class Header extends Component{
    
    
    
    render(){ // в h1 принимаем название города из стейта родительского компонента
       // 
       const list = this.props.list;
        return(
        <header>
            <h1 className="title__city">{this.props.city}</h1> 
            <p className="header__tex descript">{list[0].weather[0].description}</p>
            <h2 className="title__temp">{Math.round(list[0].main.temp)} °</h2>
            <div className="header__temp">
            <span className="header__min_temp">
                Мин.{list[0].main.temp_min}°
             </span> <span className="header__max_temp">
                 Макс.{list[0].main.temp_max}°
             </span>
             </div>
        </header>
        )}
}

export default Header