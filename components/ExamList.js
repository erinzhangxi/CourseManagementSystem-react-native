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
                            title={exam.text}/>))}

                <Button  onPress={() => this.props.navigation
                    .navigate('ExamWidget') }
                         backgroundColor='blue'
                         title='Add Exam'/>
            </View>
        )
    }
}
export default ExamList
