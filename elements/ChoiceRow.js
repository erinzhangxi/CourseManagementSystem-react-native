import React, {Component} from 'react'
import {Alert, View} from 'react-native'
import {Text, Button, ListItem, CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ChoiceRow extends Component {
    constructor(props) {
        super(props)
        this.state={
            id:''
        };
    }

    ComponentDidMount() {
        this.setState({id: this.props.choice.id});
    }

    render() {
        return (
            <View style={{padding: 15}}>
               <View style={{flexDirection: 'row'}}>
                   <Text h4>{this.props.choice.key}</Text>
                   <Text h5>{this.props.choice.content}</Text>


                   <Icon
                       reverse
                       color='#517fa4'
                       name='minus-circle'
                       type='font-awesome'
                       size={30}
                       onPress={() =>
                       {this.props.delete(this.props.choice.id)}}
                   />

                </View>
            </View>

        )
    }
}



