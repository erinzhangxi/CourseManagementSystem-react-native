import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem, Divider,Button} from 'react-native-elements'
import QuestionTypePicker from './../elements/QuestionTypePicker'

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            lessonId: 1,
            examId: 1,
            questionType: 'MC'
        }
        this.updateQuestionType = this.updateQuestionType.bind(this);
        this.findAllQuestions = this.findAllQuestions.bind(this);
    }
    componentDidMount() {
        const examId = this.props.navigation.getParam("examId", 1);
        const lessonId = this.props.navigation.getParam("lessonId", 1);
        this.setState({
            examId: examId,
            lessonId: lessonId
        })
        this.findAllQuestions(lessonId,examId);

    }
    updateQuestionType(value) {
        this.setState({questionType: value})
    }
    componentWillReceiveProps() {
        this.findAllQuestions(this.state.lessonId, this.state.examId);
    }
    findAllQuestions(lessonId,examId) {
        fetch('http://localhost:8080/api/lesson/' + lessonId +
            '/exam/' + examId + '/questions')
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions}))
    }

    render() {
        return(
            <ScrollView>
                <View style={{padding: 15}}>
                    <Text h2>Question List</Text>
                    <Text h2>Exam Id {this.state.examId}</Text>
                    <Text h3>Questions {this.state.questions.length}</Text>

                    <Divider style={{
                        backgroundColor:
                            'blue' }}/>

                    {this.state.questions.map(
                        (question, index) => (
                            <ListItem
                                onPress={() => {
                                    if (question.type === "TrueFalse")
                                        this.props.navigation
                                            .navigate("TrueOrFalseQuestionWidget", {
                                                examId: this.state.examId,
                                                lessonId: this.state.lessonId,
                                                questionId: question.id})
                                    if (question.type === "MultipleChoice")
                                        this.props.navigation
                                            .navigate("MultipleChoiceQuestionWidget", {
                                                examId: this.state.examId,
                                                lessonId: this.state.lessonId,
                                                questionId: question.id})
                                }}
                                key={index}
                                subtitle={question.subtitle}
                                title={question.title}/>
                        ))}

                    <QuestionTypePicker handler={this.updateQuestionType}/>

                    <Text h1>{this.state.questionType}</Text>

                    <Text h4>Exam ID is {this.state.examId}</Text>
                    <Button  onPress={()=> {
                        if (this.state.questionType === "TF") {
                            this.props.navigation
                                .navigate("TrueOrFalseQuestionWidget", {
                                    examId: this.state.examId,
                                    lessonId: this.state.lessonId
                                });
                        }
                        if (this.state.questionType === "MC")
                            this.props.navigation
                                .navigate("MultipleChoiceQuestionWidget",{examId: this.state.examId,
                                                                            lessonId: this.state.lessonId})
                        if (this.state.questionType === "FB")
                            this.props.navigation
                                .navigate("FillInTheBlanksQuestionWidget")
                        if (this.state.questionType === "ES")
                            this.props.navigation
                                .navigate("EssayQuestionWidget",{lessonId: this.state.lessonId,
                                                                    examId: this.state.examId})
                    }}
                             backgroundColor='blue'
                             title='Add a Question'/>
                </View>
            </ScrollView>
        )
    }
}
export default QuestionList

// onPress={() => this.props.navigation
//               .navigate('QuestionWidget')