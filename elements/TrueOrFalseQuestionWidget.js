import React from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class TrueOrFalseQuestionWidget extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props);
    this.state = {
        lessonId: 1,
        examId: 1,
      title: '',
      description: '',
      points: 0,
      isTrue: true
    }
    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
      const lessonId = this.props.navigation.getParam("lessonId");
      const examId = this.props.navigation.getParam("examId");
      this.setState({
          lessonId: lessonId,
          examId: examId
      })
  }

  updateForm(newState) {
    this.setState(newState)
  }
  submitForm(examId) {
      let truefalse = {
          title: this.state.title,
          subtitle:this.state.description,
          type: "TrueFalse",
          points: this.state.points,
          answers: this.state.isTrue
      };
      alert("Your form is successfully submitted.");
      fetch('http://localhost:8080/api/exam/EID/truefalse'.replace('EID', examId), {
          body: JSON.stringify(truefalse),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
      }).then(response => (response.json()));
      this.props.navigation
          .navigate('QuestionList');
  }
  render() {
    return(
        <ScrollView>
            <Text h4>Exam ID is {this.state.examId}</Text>
            <View style={{padding: 15}}>
                <FormLabel>Question Title</FormLabel>
                <FormInput onChangeText={
                    title => this.updateForm({title: title})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({point: text})
                }/>
                <FormValidationMessage>
                    Point is required
                </FormValidationMessage>

                <Text>
                    {"\n"}
                </Text>

                <Text>
                    {"\n"}
                </Text>


                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text h5 style={{textAlign: 'right'}}>{this.state.point} points</Text>

                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'/>


                <Text>
                    {"\n"}
                </Text>


                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() => this.props.navigation
                               .goBack() }/>
                <Button	backgroundColor="blue"
                           color="white"
                           title="Submit"
                           onPress={()=> this.submitForm(this.state.examId)}/>


                <Text>
                    {"\n"}
                </Text>

            </View>

        </ScrollView>
    )
  }
}

export default TrueOrFalseQuestionWidget