import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

// render a list of questions and allow to add questions
class ExamWidget extends React.Component {
    static navigationOptions = { title: "Exam"}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={{padding: 15}}>
                    <Text h1>Exam Id {this.state.examId}</Text>
                    <Text h4>Exam Widget rendering a list of questions for the exam</Text>


                    {this.state.questions.map( (question, index) => (
                        <ListItem
                            key={index}
                            leftIcon={{name: question.icon}}
                            subtitle={question.subtitle}
                            title={question.title}/>
                    ))}

                    <Button  onPress={() => this.props.navigation
                        .navigate('QuestionWidget') }
                             backgroundColor='blue'
                             title='Add a Question'/>

                </View>
            </ScrollView>
        )
    }
}

export default ExamWidget