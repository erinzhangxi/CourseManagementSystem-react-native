import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class AssignmentList extends Component {
    static navigationOptions = {title: 'Assignments'}
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            lessonId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lesson = navigation.getParam("lessonId")
        this.setState({
            lessonId: lesson
        })
        fetch("http://localhost:8080/api/lesson/"+lesson+"/assignment/")
            .then(response => (response.json()))
            .then(assignments => this.setState({assignments}));

    }
    render() {
        return(
            <View style={{padding: 15}}>
                <Text h1>Lesson Id {this.state.lessonId}</Text>
                <Text h1>Assignments {this.state.assignments.length} </Text>
                {this.state.assignments.map(
                    (assignment, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("AssignmentWidget", {assignmentId: assignment.id})}
                            key={index}
                            title={assignment.text}/>))}
                <Button  onPress={() => this.props.navigation
                    .navigate('AssignmentWidget') }
                         backgroundColor='blue'
                         title='Add Assignment'/>
            </View>
        )
    }
}
export default AssignmentList