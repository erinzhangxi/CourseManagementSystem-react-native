import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class ExamList extends Component {
    static navigationOptions = {title: 'Exams'}
    constructor(props) {
        super(props)
        this.state = {
            exams: [],
            lessonId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})
        fetch("http://localhost:8080/api/lesson/"+lessonId+"/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Exam List</Text>
                <Text h1>Lesson Id {this.state.lessonId}</Text>
                <Text h1>Exams {this.state.exams.length} </Text>

                {this.state.exams.map(
                    (exam, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {examId: exam.id})}
                            key={index}
                            subtitle={exam.description}
                            title={exam.title}/>))}

                <Button  onPress={() => this.props.navigation
                    .navigate('ExamWidget') }
                         backgroundColor='blue'
                         title='Add Exam'/>
            </View>
        )
    }
}
export default ExamList
