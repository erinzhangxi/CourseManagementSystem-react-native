import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import QuestionTypePicker from "../elements/QuestionTypePicker";

// render a list of questions and allow to add questions
class QuestionWidget extends React.Component {
    static navigationOptions = { title: "Choose a Question Type"}
    constructor(props) {
        super(props)
        this.state = {
          questions: []
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={{padding: 15}}>
                    <Text h1>Exam Id {this.state.examId}</Text>
                    <Text h4>Question List and add a qustion for the exam</Text>

                    {this.state.questions.map( (question, index) => (
                        <ListItem
                            key={index}
                            leftIcon={{name: question.icon}}
                            subtitle={question.subtitle}
                            title={question.title}/>
                    ))}


<QuestionTypePicker/>

                </View>
            </ScrollView>
        )
    }
}

export default QuestionWidget