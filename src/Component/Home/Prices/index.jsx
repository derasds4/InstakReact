import CSS from './index.less'
import {Component} from 'react'
import map from 'lodash/map'
import * as source from './source'
import {Element} from 'react-scroll'

const months = {
    1:null,
    3:10,
    6:20
};
const prices = {
    start:{
        price: 12.90,
        accounts: 1
    },
    standart:{
        price: 19.90,
        accounts: 3
    },
    premium:{
        price: 34.90,
        accounts: 7
    }
};

const Month = ({name, value, selected, onClick})=> (
    <button className={selected ? 'active' : null} onClick={()=>onClick(name)}>
        <Translate key="name" content={"home.section.prices.months." + name + ".title"}/>
        {value && <span key="discount" className={CSS.MonthDiscount}>{value}</span>}
    </button>
);

const PriceItemDetail = ({ name })=>(
    <li>
        <span className={CSS.PriceItemDetailCheckmark} style={{
            backgroundImage: `url("${source.checkmark}")`
        }}/>
        <Translate content={"home.section.prices." + name} />
    </li>
);

const Price = ({ months, price, name, accounts })=>(
    <div className={CSS.PriceItem}>
        <div className={CSS.PriceItemInfo}>
            <Translate component="h5" content={"home.section.prices.prices." + name + ".title"} />
            <div className={CSS.PriceItemPrice}>{price}</div>
            <div className={CSS.PriceItemMonths}>
                <Translate content={"home.section.prices.months." + months + ".title"} />
            </div>
        </div>
        <ul className={CSS.PriceItemDetails}>
            <PriceItemDetail name={"accounts." + accounts + ".add"}/>
            <PriceItemDetail name="access.all"/>
        </ul>
        <button>
            <Translate content={"home.section.prices.start"} />
        </button>
    </div>
);

export default class Prices extends Component {

    constructor(){
        super();
        this.state = {
            months: "1",
            factor: 1
        };
    }

    selectMonth(key){
        this.setState({
            months: key,
            factor: months[key]? (100 - months[key]) / 100: 1
        });
    }

    render(){
        return (
            <Element name="Home-prices" id={CSS.Section} style={{
                backgroundImage: `url("${source.background}")`
            }}>
                <div className={CSS.Container}>
                    <Translate component="h2" content="home.section.prices.title" />
                    <div className={CSS.description}>
                        <Translate content="home.section.prices.description.0" />
                        <br />
                        <Translate content="home.section.prices.description.1" />
                    </div>
                    <div className={CSS.Months}>
                        {map(months, (value, key)=>(
                            <Month
                                key={key}
                                name={key}
                                value={value}
                                selected={this.state.months == key}
                                onClick={this::this.selectMonth}
                            />
                        ))}
                    </div>
                    <div className={CSS.Prices}>
                        {map(prices, (value, key)=>(
                            <Price
                                key={key}
                                name={key}
                                price={(this.state.months * value.price * this.state.factor).toFixed(2)}
                                accounts={value.accounts}
                                months={this.state.months}
                            />
                        ))}
                    </div>
                </div>
            </Element>
        )
    }

}