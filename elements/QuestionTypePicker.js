import React from 'react'
import {Picker, Text, View} from 'react-native'

class QuestionTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       questionType: 0
    }
    this.updateType = this.updateType.bind(this);
  }

  updateType(itemValue, itemIndex) {
      this.setState({questionType: itemValue});
      this.props.handler(itemValue);
  }

  render() {
    return (
      <View>
        <Picker
          onValueChange={(itemValue, itemIndex) =>
            this.updateType(itemValue, itemIndex)}

          selectedValue={this.state.questionType}>
          <Picker.Item value="MC" label="Multiple choice" />
          <Picker.Item value="ES" label="Essay" />
          <Picker.Item value="TF" label="True or false" />
          <Picker.Item value="FB" label="Fill in the blanks" />
        </Picker>

      </View>
    )
  }
}

export default QuestionTypePicker