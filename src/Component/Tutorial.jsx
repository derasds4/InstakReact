import {
    Step,
    Stepper,
    StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {updateStepperKeyByName} from '../Store/Action/Application'
import {connect} from 'react-redux'
import {Component} from 'react'
import map from 'lodash/map'

const contentStyle = {margin: '0 16px'};
const tutorialStyle = {width: '100%', margin: '16px auto auto', maxWidth: 700};

@connect(state=>({
    steppers: state.Application.stepper
}),{
    updateStepperKeyByName
})
export default class Tutorial extends Component{

    static defaultProps = {
        linear: false,
        name: 'default',
        items: []
    };

    get data(){
        return this.props.steppers[this.props.name];
    }
    get currentIndex(){
        return this.data.index;
    }
    get currentName(){
        return this.props.items[this.currentIndex];
    }
    get isLast(){
        return this.currentIndex === (this.props.items.length - 1)
    }

    back(){
        if(this.currentIndex > 0) {
            this.props.updateStepperKeyByName(this.props.name, 'index', this.currentIndex - 1);
        }
    }

    forward(){
        if(this.currentIndex < (this.props.items.length - 1)) {
            this.props.updateStepperKeyByName(this.props.name, 'index', this.currentIndex + 1);
        }else{
            this.props.updateStepperKeyByName(this.props.name, 'closed', true);
        }
    }

    go(index){
        this.props.updateStepperKeyByName(this.props.name, 'index', index);
    }

    render(){
        if(this.data.closed){
            return (
                <RaisedButton
                    label={counterpart("actions.openTutorial")}
                    secondary={true}
                    style={{margin: 12}}
                    onClick={()=>{
                        this.props.updateStepperKeyByName(this.props.name, 'closed', false);
                    }}
                />
            );
        }
        return (
            <div style={tutorialStyle}>
                <Stepper
                    linear={this.props.linear}
                    activeStep={this.currentIndex}
                >
                    {map(this.props.items, (name, index)=>(
                        <Step key={index}>
                            <StepButton onClick={()=>{this.go(index)}}>
                                <Translate content={"tutorial." + this.props.name + "." + name + ".title"} />
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div style={contentStyle}>
                    <Translate component="p" content={"tutorial." + this.props.name + "." + this.currentName + ".content"} />
                    <div style={{marginTop: 12}}>
                        <FlatButton
                            label={counterpart("actions.back")}
                            disabled={this.currentIndex === 0}
                            onTouchTap={()=>this.back()}
                            style={{marginRight: 12}}
                        />
                        <RaisedButton
                            label={counterpart("actions." + (!this.isLast ? 'next' : 'finish'))}
                            disabled={false}
                            primary={!this.isLast}
                            secondary={this.isLast}
                            onTouchTap={()=>this.forward()}
                        />
                    </div>
                </div>
            </div>
        )
    }

}