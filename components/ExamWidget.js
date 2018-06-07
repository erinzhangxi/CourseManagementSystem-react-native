import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class ExamWidget extends Component {
    static navigationOptions = {title: 'Exams'}
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
            lessonId: 1
        }
        this.createExam = this.createExam.bind(this);
        this.findAllExams = this.findAllExams.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId});
        this.findAllExams(lessonId);
    }

    findAllExams(id) {
            fetch("http://localhost:8080/api/lesson/"+id+"/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))
    }

    createExam() {
        alert("create exam is clicked");
        let newExamID = 1;
        let exam = {
            text: "default",
            widgetType: "exam",
            title: "default Exam",
            description: ""
        };
        fetch('http://localhost:8080/api/lesson/LID/exam'.replace('LID', this.state.lessonId), {
            body: JSON.stringify(exam),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(response => (response.json()))
            .then(function(data) {
                const items = data;
                newExamID = items.id;
            })
            .then(() => { this.findAllExams(); });

        this.props.navigation
            .navigate('QuestionList', {lessonId: this.state.lessonId,
                                        examId: newExamID})
    }

    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Exam Widget</Text>
                <Text h1>Lesson Id {this.state.lessonId}</Text>
                <Text h1>Exams {this.state.exams.length} </Text>

                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {lessonId: this.state.lessonId,
                                                            examId: exam.id})}
                            key={index}
                            subtitle={exam.description}
                            title={exam.title}/>))}

                <Button  onPress={() => this.createExam()}
                         backgroundColor='blue'
                         title='Add Exam'/>
            </View>
        )
    }
}
export default ExamWidget
