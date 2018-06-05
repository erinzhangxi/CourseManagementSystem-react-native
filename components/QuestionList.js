import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import QuestionTypePicker from './../elements/QuestionTypePicker'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1,
        choices: [],
        truefalse: [],
        essay: [],
        blanks:[]
    }
  }
  componentDidMount() {
      const examId = this.props.navigation.getParam("examId", 1);   // default courseId set to 1 if parameter not provided
      this.setState({
          examId: examId
      })
      fetch('http://localhost:8080/api/exam/' + examId + '/question')
          .then(response => (response.json()))
          .then(choices => this.setState({choices: choices}))

  }
  render() {
    return(
      <View style={{padding: 15}}>
          <Text h2>Question List</Text>
          <Text h2>Exam Id {this.state.examId}</Text>

      {this.state.questions.map(
        (question, index) => (
          <ListItem
            onPress={() => {
              if(question.type === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}/>))}

         <QuestionTypePicker/>
      </View>
    )
  }
}
export default QuestionList