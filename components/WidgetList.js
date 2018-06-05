import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
        lessonId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
      this.setState({lessonId: lessonId})
    fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))

  }
  render() {
    return(
      <View style={{padding: 15}}>
          <Text h1>Widget List  {this.state.widgets.length}</Text>
        {this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.text}/>))}
            <Text>
          {"\n"}
            </Text>

          <Button  onPress={() => this.props.navigation
              .navigate('AssignmentList', {lessonId: this.state.lessonId}) }
                   backgroundColor='green'
                   title='Assignment List'/>
          <Button  onPress={() => this.props.navigation
              .navigate('ExamList') }
                   backgroundColor='green'
                   title='ExamList'/>
      </View>
    )
  }
}
export default WidgetList